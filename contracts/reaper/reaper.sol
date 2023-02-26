// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "../interfaces/IBAAL.sol";

// Liquitates the treasury of a DAO if deemed to not be livging upto the mission of the DAO based on weighted matrix
contract ReaperShaman is ReentrancyGuard, Initializable {
    IBAAL public baal;

    mapping(address => uint256) public timeLedger;
    uint256 public liqudationThreshold; // Threshold for liqudation. If the value returned by the weighted matrix is less than this, the contract will liqudate
    uint256 public checkInInterval; // length of checkInInterval in seconds
    uint256 public tokenPerSecond; // Amount of shares awarded per second of work

    bool public isLocked = false;

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
        uint256 _liqudationThreshold,
        uint32[5] calldata _weightedMatrix
    ) external initializer {
        baal = IBAAL(_baal);
        liqudationThreshold = _liqudationThreshold;
        tokenPerSecond = _tokenPerSecond;
        weightedMatrix = _weightedMatrix;
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

contract ReaperSummoner {
    address public template;
    /// Instinate a new ReaperShaman contract
    /// This function will:
    ///   RES1. Create a new ReaperShaman contract
    ///   RES2. Accept weighted matrix of values, the liqudation threshold, and the destination address !HARD CODED FOR NOW!
    ///   RES3. Allow the contract to spend or swap out of the treasury
    ///   RES4. emits a `SummonSuccessful` event with baal address, summoner, and shamanAddress
    ///   RETURNS: the amount of tokens staked by the user
    /// Given the following:
    ///   S1. :: otherwise, reverts
    ///   S2. :: otherwise, reverts
    ///   S3.  

    event CheckInSummonComplete(
        address indexed baal,
        address indexed summoner,
        address indexed shamanAddress,
    );

    constructor(address _template) {
        template = _template;
    }

    function summon(
        address _baal,
    ) public returns (address) {
        CheckInShamanV2 checkInShaman = CheckInShamanV2(
            payable(Clones.clone(template))
        );
        checkInShaman.init(
            _baal,
        );

        emit CheckInSummonComplete(
            _baal,
            msg.sender,
            address(checkInShaman),
        );
        return address(checkInShaman);
    }
}
