// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MemberRegistry.sol";

// Register
contract PGRegistry is MemberRegistry, Ownable {

    constructor() {}

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

    function _calculate(address _account) internal override view returns (uint256) {
        uint256 activeSeconds = super._calculate(_account);
        return activeSeconds;
        // return member.secondsActive.sqrt(); 
        // SQRT((Total_Months - Months_on_break)* Time_Multiplier)
    }

    function _distribute(uint256[] memory calculated) internal override pure returns (uint256) {
        for (uint256 i = 0; i < calculated.length; i++) {
            // todo: store in format for 0xsplits
        }
        return 1;
    }
}