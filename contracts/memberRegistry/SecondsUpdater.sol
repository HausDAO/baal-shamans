// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

interface IREGISTRY {
    struct Member {
        address account;
        uint32 activity;
        uint32 activityMultiplier;
        uint32 startDate;
    }

    function _setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) external;

    function _updateMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) external;

    function _addToActivity(address _member, uint32 _activity) external;

    function getMembers() external returns (Member[] memory);

    function lastUpdate() external returns (uint32);
}

contract SecondsUpdater {
    event UpdateMemberActivity(
        address registry,
        address member,
        uint32 newActivity
    );

    constructor() {}

    function update() external returns (uint32 currentUpdate) {
        // update seconds
        currentUpdate = uint32(block.timestamp);
        // get registry
        IREGISTRY registry = IREGISTRY(msg.sender);
        // update struct with total seconds active and seconds in last claim
        IREGISTRY.Member[] memory members = registry.getMembers();
        for (uint256 i = 0; i < members.length; i++) {
            IREGISTRY.Member memory _member = members[i];

            uint32 newSeconds = 0;
            if (_member.activity == 0) {
                // new member will be 0 and should get seconds from start date
                newSeconds = (currentUpdate - _member.startDate);
            } else {
                newSeconds = (currentUpdate - registry.lastUpdate());
            }
            // multiple by modifier and divide by 100 to get modifier % of seconds
            uint32 newSecondsActive = (newSeconds *
                _member.activityMultiplier) / 100;
            registry._addToActivity(_member.account, newSecondsActive);
            emit UpdateMemberActivity(
                address(registry),
                _member.account,
                newSecondsActive
            );
        }
    }
}
