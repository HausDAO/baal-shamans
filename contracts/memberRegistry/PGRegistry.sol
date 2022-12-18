// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "../interfaces/IBAAL.sol";

import "hardhat/console.sol";

// Register
contract PGRegistry is MemberRegistry, Ownable {
    IBAAL public moloch;
    IERC20 public shares;
    
    constructor(address _moloch) {
        moloch = IBAAL(_moloch);
        shares = IERC20(moloch.sharesToken());
        lastUpdate = uint32(block.timestamp);
    }

    function setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) public onlyOwner {
        _setNewMember(_member, _activityMultiplier, _startDate);
    }

    function updateMember(
        address _member,
        uint32 _activityMultiplier
        ) public onlyOwner {
        _updateMember(_member, _activityMultiplier);
    }

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

    // special to imnt shares
    function _calculate(address _account) internal override view returns (uint256) {
        uint256 activeSeconds = super._calculate(_account);
        return (activeSeconds * 1e18);
        // return member.secondsActive.sqrt(); 
        // SQRT((Total_Months - Months_on_break)* Time_Multiplier)
    }

    // special to imnt shares
    function _distribute(uint256[] memory calculated) internal override view returns(bool) {
        address[] memory _receivers = new address[](calculated.length);
 
        for (uint256 i = 0; i < calculated.length; i++) {
            address account = members[i].account;
            
            _receivers[i] = account;

        }
        // comment out for gas test
        // moloch.mintShares(_receivers, calculated);
        return true;
 
    }
}