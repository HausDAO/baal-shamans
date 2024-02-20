// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

// import { IBaal } from "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import { IBaal } from "../interfaces/IBaal.sol";
import { Enum } from "@gnosis.pm/safe-contracts/contracts/common/Enum.sol";
import { FactoryFriendly, Module } from "@gnosis.pm/zodiac/contracts/core/Module.sol";
import { ModuleProxyFactory } from "@gnosis.pm/zodiac/contracts/factory/ModuleProxyFactory.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

import { IEarlyExecutionShaman } from "./IEarlyExecutionShaman.sol";
import { IERC165, GovernorShaman } from "../shaman/GovernorShaman.sol";

// import "hardhat/console.sol";

error EarlyExecutionShaman__OperationNotSupported();
error EarlyExecutionShaman__InvalidQuorumPercent();
error EarlyExecutionShaman__Proposal_NotWhitelisted();
error EarlyExecutionShaman__Proposal_NoVotingPeriod();
error EarlyExecutionShaman__Proposal_NoMinimumThreshold();
error EarlyExecutionShaman__Proposal_CalldataMismatch();

contract EarlyExecutionShaman is GovernorShaman, Module, IEarlyExecutionShaman {
    address internal _multisendLibrary;

    uint256 internal _minimumQuorumPercent;

    mapping(uint256 => bool) private _whitelistedProposals;

    event ProposalWhitelisted(uint256 _proposalId);
    event ProposalEarlyExecuted(uint256 indexed _proposalId, bool _actionFailed);

    function __EarlyExecutionShaman_init(address baalAddress, uint256 minimumQuorumPercent) internal onlyInitializing {
        if (minimumQuorumPercent > 100) revert EarlyExecutionShaman__InvalidQuorumPercent();
        __GovernorShaman_init(baalAddress);
        __Ownable_init();
        __EarlyExecutionShaman_init_unchained(minimumQuorumPercent);
    }

    function __EarlyExecutionShaman_init_unchained(uint256 minimumQuorumPercent) internal onlyInitializing {
        // Baal config
        _multisendLibrary = _baal.multisendLibrary();
        address _avatar = _baal.avatar();
        // Zodiac Module config
        avatar = _avatar;
        target = _avatar;
        // Shaman config
        _minimumQuorumPercent = minimumQuorumPercent;
        _transferOwnership(_avatar);
        
    }

    function setUp(bytes memory initializeParams) public override(FactoryFriendly, IEarlyExecutionShaman) initializer nonReentrant {
        (address baalAddress, uint256 minimumQuorumPercent) = abi.decode(initializeParams, (address, uint256));
        __EarlyExecutionShaman_init(baalAddress, minimumQuorumPercent);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(GovernorShaman, IERC165) returns (bool) {
        return
            interfaceId == type(IEarlyExecutionShaman).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function setMinimumQuorumPercent(uint256 _quorumPercent) external onlyOwner {
        if (_quorumPercent > 100) revert EarlyExecutionShaman__InvalidQuorumPercent();
        _minimumQuorumPercent = _quorumPercent;
    }

    function setGovernanceConfig(bytes memory /*_governanceConfig*/) public pure override(GovernorShaman) {
        revert EarlyExecutionShaman__OperationNotSupported();
    }

    function setTrustedForwarder(address /*_trustForwarderAddress*/) public pure override(GovernorShaman) {
        revert EarlyExecutionShaman__OperationNotSupported();
    }

    // TODO: should be sent via dao proposal? -> NO. explain need for sponsor to avoid spamming
    function submitProposal(
        bytes calldata _proposalData,
        uint32 _expiration,
        uint256 _baalGas,
        string calldata _details
    ) external payable returns (uint256 proposalId) {
        proposalId = _baal.submitProposal{value: msg.value}(_proposalData, _expiration, _baalGas, _details);
        _whitelistedProposals[proposalId] = true;
        emit ProposalWhitelisted(proposalId);
    }

    function _checkEarlyExecution(IBaal.Proposal memory _proposal) internal view returns (bool) {
        // TODO:
        if (_baal.state(_proposal.id) != IBaal.ProposalState.Voting)
            revert EarlyExecutionShaman__Proposal_NoVotingPeriod();

        // uint256 quorumPercent = _baal.quorumPercent(); /* minimum % of shares that must vote yes for it to pass*/
        // standard validation -> proposal.yesVotes * 100 < quorumPercent * proposal.maxTotalSharesAtSponsor
        if (_proposal.yesVotes * 100 < _minimumQuorumPercent * _proposal.maxTotalSharesAtSponsor)
            revert EarlyExecutionShaman__Proposal_NoMinimumThreshold();

        // TODO: should it verify dilution?
        // /* auto-fails a proposal if more than (1- minRetentionPercent) * total shares exit before processing*/
        // uint256 public minRetentionPercent = _baal.minRetentionPercent();
        // (_baal.totalSupply()) <
        //     (proposal.maxTotalSharesAndLootAtVote * minRetentionPercent) / 100 /*Check for dilution since high water mark during voting*/
        
        return true;
    }

    function checkEarlyExecution(uint32 _proposalId) public view override returns (bool earlyExecuteReady) {
        IBaal.Proposal memory proposal = _baal.proposals(_proposalId);
        earlyExecuteReady = _checkEarlyExecution(proposal);
    }

    function earlyExecute(
        uint32 _proposalId,
        bytes calldata _proposalData
    ) external isBaalGovernor returns (bool success) {
        // TODO: check avatar module is enabled
        if (!_whitelistedProposals[_proposalId]) revert EarlyExecutionShaman__Proposal_NotWhitelisted();
        IBaal.Proposal memory proposal = _baal.proposals(_proposalId);
        _checkEarlyExecution(proposal);

        // verify proposalData matches
        if (proposal.proposalDataHash != _baal.hashOperation(_proposalData))
            revert EarlyExecutionShaman__Proposal_CalldataMismatch();
        
        // cancel proposal
        cancelProposal(_proposalId);

        // execute proposal calldata as zodiac module
        success = exec(
            _multisendLibrary,
            0,
            _proposalData,
            Enum.Operation.DelegateCall
        );
        emit ProposalEarlyExecuted(_proposalId, success);
    }
}

contract EarlyExecutionShamanSummoner is Ownable {
    address public template;
    ModuleProxyFactory public moduleProxyFactory;

    event EarlyExecutionShamanSummoned(
        address indexed baal,
        address indexed shamanAddress,
        uint256 minimumQuorumPercent,
        string details
    );

    constructor(address _moduleProxyFactory, address _template) Ownable() {
        moduleProxyFactory = ModuleProxyFactory(_moduleProxyFactory);
        template = _template;
    }

    function setSummonerConfig(address _moduleProxyFactory, address _template) external onlyOwner {
        moduleProxyFactory = ModuleProxyFactory(_moduleProxyFactory);
        template = _template;
    }
    
    function summon(
        address _baalAddress,
        uint256 _minimumQuorumPercent,
        uint256 _saltNonce,
        string calldata _details
    ) external returns (address proxy) {
        bytes memory initializationParams = abi.encode(_baalAddress, _minimumQuorumPercent);
        proxy = moduleProxyFactory.deployModule(
            template, 
            abi.encodeWithSelector(EarlyExecutionShaman.setUp.selector, (initializationParams)),
            _saltNonce
        );
        emit EarlyExecutionShamanSummoned(_baalAddress, proxy, _minimumQuorumPercent, _details);
    }
}
