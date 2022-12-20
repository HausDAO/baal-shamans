// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "@prb/math/src/UD60x18.sol";

import "hardhat/console.sol";

interface ISPLITS {
    function createSplit(
        address[] memory _receivers,
        uint32[] memory _percentAllocations,
        uint32 _distributorsFee,
        address _controller
    ) external;
}

// Register
contract PGRegistry is MemberRegistry, Ownable {
    ISPLITS public splits;

    uint32 public constant PERCENTAGE_SCALE = 1e6;

    constructor(address _splits) {
        splits = ISPLITS(_splits);
        lastUpdate = uint32(block.timestamp);
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
        // update member total seconds and seconds in last period
        updateSecondsActive();

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
        
        // fill arrays
        for (uint256 i = 0; i < members.length; i++) {
            Member memory _member = members[i];
            if(members[i].periodSecondsActive > 0) {
                UD60x18 udActiveSeconds = ud(_member.periodSecondsActive);
                _receivers[i] = members[i].account;
                _percentAllocations[i] =
                (uint32(unwrap(udActiveSeconds.sqrt())) * PERCENTAGE_SCALE) /
                total;
            }
        }
        splits.createSplit(_receivers, _percentAllocations, _distributorsFee, _controller);
        emit Trigger(uint32(block.timestamp));
    }
}
