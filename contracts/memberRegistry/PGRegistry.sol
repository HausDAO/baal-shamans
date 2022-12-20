// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "@prb/math/src/UD60x18.sol";

import "hardhat/console.sol";

interface ISPLITS {
    function createSplit(
        address[] memory accounts,
        uint48[] memory percentAllocations,
        uint48 distributorsFee,
        address controller
    ) external;

    function updateSplit(
        address split,
        address[] memory accounts,
        uint48[] memory percentAllocations,
        uint48 distributorsFee
    ) external;

    function transferControl(address split, address newController) external;
    function acceptControl(address split) external;
    function cancelControlTransfer(address split) external;
}

// Register
contract PGRegistry is MemberRegistry, Ownable {
    ISPLITS public splitsMain;
    address public split;

    uint48 public constant PERCENTAGE_SCALE = 1e6;

    constructor(address _splitsMain, address _split) {
        splitsMain = ISPLITS(_splitsMain);
        lastUpdate = uint48(block.timestamp);
        split = _split;
    }

    function setNewMember(
        address _member,
        uint48 _activityMultiplier,
        uint48 _startDate
    ) external onlyOwner {
        _setNewMember(_member, _activityMultiplier, _startDate);
    }

    function updateMember(address _member, uint48 _activityMultiplier)
        external
        onlyOwner
    {
        _updateMember(_member, _activityMultiplier);
    }

    // BATCH OPERATIONS
    function batchNewMember(
        address[] memory _members,
        uint48[] memory _activityMultipliers,
        uint48[] memory _startDates
    ) external onlyOwner {
        for (uint256 i = 0; i < _members.length; i++) {
            _setNewMember(_members[i], _activityMultipliers[i], _startDates[i]);
        }
    }

    function batchUpdateMember(
        address[] memory _members,
        uint48[] memory _activityMultipliers
    ) external onlyOwner {
        for (uint256 i = 0; i < members.length; i++) {
            _updateMember(_members[i], _activityMultipliers[i]);
        }
    }

    function triggerCalcAndSplits() public {

        uint256 nonZeroCount;
        uint48 total;
        // get the total of seconds in the last period
        for (uint256 i = 0; i < members.length; i++) {
            if(members[i].periodSecondsActive > 0) {
                total += members[i].periodSecondsActive;
                nonZeroCount++;
            }
        }
        console.log('nonZeroCount', nonZeroCount);

        // define variables for split params
        address[] memory _receivers = new address[](nonZeroCount);
        uint48[] memory _percentAllocations = new uint48[](nonZeroCount);
        uint48 _distributorsFee = 0;
        
        uint48 runningTotal;
        // fill arrays
        for (uint256 i = 0; i < members.length; i++) {
            Member memory _member = members[i];
            if(members[i].periodSecondsActive > 0) {
                UD60x18 udActiveSeconds = ud(_member.periodSecondsActive);
                _receivers[i] = members[i].account;
                _percentAllocations[i] =
                (uint48(unwrap(udActiveSeconds)) * PERCENTAGE_SCALE) /
                total;
                // todo mat is weird here.
                // (uint48(unwrap(udActiveSeconds.sqrt())) * PERCENTAGE_SCALE) /
                // total;
                runningTotal += _percentAllocations[i];
            }
        }
        console.log('runningTotal', runningTotal);
        // if there was any loss add it to the first account.
        if(runningTotal != PERCENTAGE_SCALE) {
            _percentAllocations[0] += (PERCENTAGE_SCALE - runningTotal);
        }

        // run split
        // todo: mock
        // splitsMain.updateSplit(split, _receivers, _percentAllocations, _distributorsFee);
        // update member total seconds and seconds in last period
        // is this happening after?
        updateSecondsActive();
    }

    function transferControl(address _split, address _newController) external onlyOwner {
        splitsMain.transferControl(_split, _newController);
    }
    function acceptControl(address _split) external onlyOwner {
        splitsMain.acceptControl(_split);
    }
    function cancelControlTransfer(address _split) external onlyOwner {
        splitsMain.cancelControlTransfer(_split);
    }
}
