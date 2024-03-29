// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// import "hardhat/console.sol";

contract CheckInShamanV2 is ReentrancyGuard, Initializable {
    IBaal public baal;
    IERC20 public token;

    mapping(address => uint256) public timeLedger;
    bool public sharesOrLoot;
    uint256 public checkInInterval; // length of checkInInterval in seconds
    uint256 public tokenPerSecond; // Amount of shares awarded per second of work
    uint32[5] public valueScalePercs; // Array of percentage numbers for each value scale, ex. [60, 80, 100, 120, 140]

    address public teamLead;
    bool public isLocked = false;

    event Claim(
        address indexed account,
        uint256 timestamp,
        uint256 tokenAmountClaimed,
        uint64 totalSecondsWorked,
        uint64[] sessionsTime,
        uint8[] sessionsValue,
        string metadata
    );

    event Mutiny(address from, address to);
    event UpdateInterval(uint256 from, uint256 to);
    event UpdateTokenPerSecond(uint256 from, uint256 to);
    event UpdatePercs(uint32[5] from, uint32[5] to);

    event Post(address indexed account, string indexed tag, string metadata);

    modifier baalOnly() {
        require(
            msg.sender == baal.avatar(),
            "This can only be called by a Baal Proposal"
        );
        _;
    }

    function init(
        address _baal,
        address _teamLead,
        bool _sharesOrLoot,
        uint256 _tokenPerSecond,
        uint256 _checkInInterval,
        uint32[5] calldata _valueScalePercs
    ) external initializer {
        baal = IBaal(_baal);

        sharesOrLoot = _sharesOrLoot;
        teamLead = _teamLead;
        // get shares or loot token address from dao based on 'shares' flag
        if (sharesOrLoot) {
            token = IERC20(baal.sharesToken());
        } else {
            token = IERC20(baal.lootToken());
        }
        checkInInterval = _checkInInterval;
        tokenPerSecond = _tokenPerSecond;
        valueScalePercs = _valueScalePercs;
    }

    // Mint share or loot tokens
    function _mintTokens(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

        if (sharesOrLoot) {
            baal.mintShares(_receivers, _amounts); // interface to mint shares
        } else {
            baal.mintLoot(_receivers, _amounts); // interface to mint loot
        }
    }

    // can be called by any account to claim per checkInInterval tokens
    function claim(
        uint64[] memory _sessionsTime,
        uint8[] memory _sessionsValue,
        string calldata _metadata
    ) public nonReentrant {
        require(!isLocked, "Contract is locked.");

        require(
            block.timestamp - timeLedger[msg.sender] >= checkInInterval ||
                timeLedger[msg.sender] == 0,
            "Can only claim 1 time per interval"
        );
        require(
            token.balanceOf(msg.sender) > 0,
            "Members Only: Must have DAO tokens in order to claim through this shaman"
        );

        uint64 totalSecondsWorked = 0;
        uint256 totalAmtEarned = 0;

        for (uint256 i = 0; i < _sessionsTime.length; i++) {
            totalSecondsWorked += _sessionsTime[i];
            totalAmtEarned += _calculate(
                _sessionsTime[i],
                tokenPerSecond,
                valueScalePercs[_sessionsValue[i]]
            );
        }
        require(
            totalSecondsWorked < checkInInterval,
            "Claimable work period must be less than the check in interval"
        );

        _mintTokens(msg.sender, totalAmtEarned);
        timeLedger[msg.sender] = block.timestamp;

        emit Claim(
            msg.sender,
            block.timestamp,
            totalAmtEarned,
            totalSecondsWorked,
            _sessionsTime,
            _sessionsValue,
            _metadata
        );
    }

    function _calculate(
        uint64 _secondsWorked,
        uint256 _tokenPerSecond,
        uint32 _percentage
    ) internal pure returns (uint256 total) {
        total = ((_secondsWorked * _percentage) / 100) * _tokenPerSecond;
    }

    function lock(bool _shouldLock) public {
        require(
            msg.sender == teamLead,
            "Only teamLead can lock or unlock this shaman"
        );
        isLocked = _shouldLock;
    }

    function mutiny(address _newTeamLead) public baalOnly {
        address oldTeamLead = teamLead;
        teamLead = _newTeamLead;
        emit Mutiny(oldTeamLead, _newTeamLead);
    }

    function updateCheckInInterval(uint256 _newCheckInInterval)
        public
        baalOnly
    {
        uint256 oldInterval = checkInInterval;
        checkInInterval = _newCheckInInterval;
        emit UpdateInterval(oldInterval, _newCheckInInterval);
    }

    function updateTokenPerSecond(uint256 _newTokenPerSecond) public baalOnly {
        uint256 oldTokenPerSecond = tokenPerSecond;
        tokenPerSecond = _newTokenPerSecond;
        emit UpdateTokenPerSecond(oldTokenPerSecond, _newTokenPerSecond);
    }

    function updateValueScalePercs(uint32[5] calldata _newValueScalePercs)
        public
        baalOnly
    {
        uint32[5] memory oldPercs = valueScalePercs;
        valueScalePercs = _newValueScalePercs;
        emit UpdatePercs(oldPercs, _newValueScalePercs);
    }

    function post(string calldata content, string calldata tag) external {
        emit Post(msg.sender, content, tag);
    }
}

contract CheckInV2Summoner {
    address public template;

    event CheckInSummonComplete(
        address indexed baal,
        address indexed summoner,
        address indexed shamanAddress,
        address teamLead,
        bool sharesOrLoot,
        uint256 tokenPerSecond,
        uint256 checkInInterval,
        uint32[5] valueScalePercs,
        string projectMetadata
    );

    constructor(address _template) {
        template = _template;
    }

    function summon(
        address _baal,
        address _teamLead,
        bool _sharesOrLoot,
        uint256 _tokenPerSecond,
        uint256 _checkInInterval,
        uint32[5] calldata _valueScalePercs,
        string memory _projectMetadata
    ) public returns (address) {
        CheckInShamanV2 checkInShaman = CheckInShamanV2(
            payable(Clones.clone(template))
        );
        checkInShaman.init(
            _baal,
            _teamLead,
            _sharesOrLoot,
            _tokenPerSecond,
            _checkInInterval,
            _valueScalePercs
        );

        emit CheckInSummonComplete(
            _baal,
            msg.sender,
            address(checkInShaman),
            _teamLead,
            _sharesOrLoot,
            _tokenPerSecond,
            _checkInInterval,
            _valueScalePercs,
            _projectMetadata
        );
        return address(checkInShaman);
    }
}
