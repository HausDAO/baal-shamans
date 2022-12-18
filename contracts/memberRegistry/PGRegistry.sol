// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemberRegistry.sol";

import "@prb/math/src/UD60x18.sol";

import "../interfaces/IBAAL.sol";

import "hardhat/console.sol";

// Register
contract PGRegistry is MemberRegistry, Ownable {

    constructor() {
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

    // OVERRIDES
    function _calculate(address _account) internal override view returns (uint256) {
        UD60x18 activeSeconds = ud(super._calculate(_account));
        return unwrap(activeSeconds.sqrt()); 
        // orig SQRT((Total_Months - Months_on_break)* Time_Multiplier)
    }

    function _distribute(uint256[] memory calculated) internal override view returns(bool) {
        address[] memory _receivers = new address[](calculated.length);
 
        for (uint256 i = 0; i < calculated.length; i++) {
            address account = members[i].account;   
            _receivers[i] = account;
        }
        // send to 0xsplits?
        return true;
 
    }
}