// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "@prb/math/src/UD60x18.sol";

import "hardhat/console.sol";

// 0xsplits interface
interface ISPLITS {
    function createSplit(
        address[] memory accounts,
        uint32[] memory percentAllocations,
        uint32 distributorsFee,
        address controller
    ) external;

    function updateSplit(
        address split,
        address[] memory accounts,
        uint32[] memory percentAllocations,
        uint32 distributorsFee
    ) external;

    function transferControl(address split, address newController) external;

    function acceptControl(address split) external;

    function cancelControlTransfer(address split) external;
}

// DAO member registry
//  - keeps track of members
//  - keeps track of member part/full time activity (activity multiplier)
//  - keeps track of member start date
//  - keeps track of member total seconds active

contract PGRegistry is MemberRegistry, Ownable {
    ISPLITS public splitsMain;
    address public split;

    uint32 public constant PERCENTAGE_SCALE = 1e6;

    struct Split {
        address receiver;
        uint32 percentAllocations;
    }

    constructor(address _splitsMain, address _split) {
        splitsMain = ISPLITS(_splitsMain);
        split = _split;
    }

    // REGISTERY MODIFIERS

    // add member to registry
    function setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) external onlyOwner {
        _setNewMember(_member, _activityMultiplier, _startDate);
    }

    // update member activity multiplier
    function updateMember(address _member, uint32 _activityMultiplier)
        external
        onlyOwner
    {
        _updateMember(_member, _activityMultiplier);
    }

    // BATCH OPERATIONS
    function batchNewMember(
        address[] memory _members,
        uint32[] memory _activityMultipliers,
        uint32[] memory _startDates
    ) external onlyOwner {
        for (uint256 i = 0; i < _members.length; i++) {
            _setNewMember(_members[i], _activityMultipliers[i], _startDates[i]);
        }
    }

    function batchUpdateMember(
        address[] memory _members,
        uint32[] memory _activityMultipliers
    ) external onlyOwner {
        for (uint256 i = 0; i < members.length; i++) {
            _updateMember(_members[i], _activityMultipliers[i]);
        }
    }

    // update member total seconds and seconds in last period
    function updateSecondsActive() external {
        _updateSecondsActive();
    } 

    // takes a sorted (offchain) list of addresses from the member array
    // verifys the address list is sorted, has no dups, and is valid
    // gets the total seconds from all members square rooted for % calc
    // set up arrays and parameters for 0xsplits contract call
    //  addresses sorted, only non zero allocations
    //  keep track of running total of allocations because it must equal PERCENTAGE_SCALE
    // send update to 0xsplits
    // update seconds active on all members 
    function updateSplits(address[] memory _sortedList) public {
        
        (address[] memory _receivers, uint32[] memory _percentAllocations) = calculate(_sortedList);
        
        uint32 _distributorsFee = 0;
        // run splits update
        splitsMain.updateSplit(
            split,
            _receivers,
            _percentAllocations,
            _distributorsFee
        );
    }

    function calculate(address[] memory _sortedList) public view returns (address[] memory, uint32[] memory){
        uint256 nonZeroCount;
        uint256 total;
        address previous;


        // verify list is current members and is sorted
        require(_sortedList.length == members.length, "invalid list");
        for (uint256 i = 0; i < _sortedList.length; i++) {
            address listAddr = _sortedList[i];
            require(
                memberIdxs[listAddr] > 0 && previous < listAddr,
                "account not a member or not sorted"
            );
            previous = listAddr;
        }

        // get the total seconds in the last period
        // ignore inactive members
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i].activityMultiplier > 0) {
                UD60x18 udActiveSeconds = wrap(members[i].secondsActive);
                total = total + unwrap(udActiveSeconds.sqrt());
                nonZeroCount++;
            }
        }
        
        // define variables for split params
        address[] memory _receivers = new address[](nonZeroCount);
        uint32[] memory _percentAllocations = new uint32[](nonZeroCount);
        
        // define variables for second loop
        uint32 runningTotal;
        uint256 nonZeroIndex; // index counter for non zero allocations
        // fill 0xsplits arrays with sorted list
        for (uint256 i = 0; i < _sortedList.length; i++) {
            uint256 memberIdx = memberIdxs[_sortedList[i]];
            Member memory _member = members[memberIdx - 1];
            if (_member.activityMultiplier > 0) {
                _receivers[nonZeroIndex] = _member.account;

                _percentAllocations[nonZeroIndex] = uint32(
                    (unwrap(wrap(_member.secondsActive).sqrt()) *
                        PERCENTAGE_SCALE) / total
                );

                runningTotal += _percentAllocations[nonZeroIndex];
                nonZeroIndex++;
            }
        }

        // if there was any loss add it to the first account.
        if (runningTotal != PERCENTAGE_SCALE) {
            _percentAllocations[0] += uint32(PERCENTAGE_SCALE - runningTotal);
        }

        return (_receivers, _percentAllocations);
    }

    function transferControl(address _split, address _newController)
        external
        onlyOwner
    {
        splitsMain.transferControl(_split, _newController);
    }

    function acceptControl(address _split) external onlyOwner {
        splitsMain.acceptControl(_split);
    }

    function cancelControlTransfer(address _split) external onlyOwner {
        splitsMain.cancelControlTransfer(_split);
    }
}
