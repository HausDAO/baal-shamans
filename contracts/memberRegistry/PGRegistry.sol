// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "@prb/math/src/UD60x18.sol";

import "hardhat/console.sol";

interface ISPLITS {
    function createSplit(
        address[] memory _accounts,
        uint32[] memory _percentAllocations,
        uint32 _distributorsFee,
        address _controller
    ) external;

    function updateSplit(
        address split,
        address[] memory _accounts,
        uint32[] memory _percentAllocations,
        uint32 _distributorsFee,
    ) external;

    function transferControl
}

// Register
contract PGRegistry is MemberRegistry, Ownable {
    ISPLITS public splitsMain;
    address public split;

    uint32 public constant PERCENTAGE_SCALE = 1e6;

    constructor(address _splitsMain, address _split) {
        splitsMain = ISPLITS(_splitsMain);
        lastUpdate = uint32(block.timestamp);
        split = _split;
    }

    function setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) public onlyOwner {
        _setNewMember(_member, _activityMultiplier, _startDate);
    }

    function updateMember(address _member, uint32 _activityMultiplier)
        public
        onlyOwner
    {
        _updateMember(_member, _activityMultiplier);
    }

    // BATCH OPERATIONS
    function batchNewMember(
        address[] memory _members,
        uint32[] memory _activityMultipliers,
        uint32[] memory _startDates
    ) public onlyOwner {
        for (uint256 i = 0; i < _members.length; i++) {
            _setNewMember(_members[i], _activityMultipliers[i], _startDates[i]);
        }
    }

    function batchUpdateMember(
        address[] memory _members,
        uint32[] memory _activityMultipliers
    ) public onlyOwner {
        for (uint256 i = 0; i < members.length; i++) {
            _updateMember(_members[i], _activityMultipliers[i]);
        }
    }

    function triggerCalcAndSplits() public {

        uint256 nonZeroCount;
        uint32 total;
        // get the total of seconds in the last period
        for (uint256 i = 0; i < members.length; i++) {
            if(members[i].periodSecondsActive > 0) {
                total += members[i].periodSecondsActive;
                nonZeroCount++;
            }
        }

        // define variables for split params
        address[] memory _receivers = new address[](nonZeroCount);
        uint32[] memory _percentAllocations = new uint32[](nonZeroCount);
        uint32 _distributorsFee = 0;
        address _controller = address(0);
        
        uint32 runningTotal;
        // fill arrays
        for (uint256 i = 0; i < members.length; i++) {
            Member memory _member = members[i];
            if(members[i].periodSecondsActive > 0) {
                UD60x18 udActiveSeconds = ud(_member.periodSecondsActive);
                _receivers[i] = members[i].account;
                _percentAllocations[i] =
                (uint32(unwrap(udActiveSeconds.sqrt())) * PERCENTAGE_SCALE) /
                total;
                runningTotal += _percentAllocations[i];
            }
        }
        // if there was any loss add it to the first account.
        if(runningTotal != PERCENTAGE_SCALE) {
            _percentAllocations[0] += (PERCENTAGE_SCALE - runningTotal);
        }

        // run split
        splitsMain.updateSplit(split, _receivers, _percentAllocations, _distributorsFee);
        
        // update member total seconds and seconds in last period
        // is this happening after?
        updateSecondsActive();
    }
}
