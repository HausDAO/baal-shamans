// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

// Register
abstract contract MemberRegistry {

    struct Member {
        address account;
        uint64 secondsActive;
        uint64 activityMultiplier;
        uint64 startDate;
        uint64 periodSecondsActive;
    }

    // store when a update happens
    uint64 public lastUpdate;
    uint64 public lastTrigger;
    // iterable
    Member[] public members;
    uint256 public count = 1;
    mapping(address => uint256) public memberIdxs;
    // mapping(address => uint256) public start;

    // EVENTS
    event SetMember(Member member);
    event UpdateMember(Member member);
    event Update(uint64);
    event Trigger(uint64);

    // REGISTER MODIFIERS

    function _setNewMember(
        address _member,
        uint64 _activityMultiplier,
        uint64 _startDate
    ) internal {
        // require unique?
        require(memberIdxs[_member] == 0, "already registered");
        uint64 secsActive = uint64(block.timestamp) - _startDate;
        members.push(
            Member(
                _member,
                secsActive,
                _activityMultiplier,
                _startDate,
                secsActive
            )
        );
        memberIdxs[_member] = count;
        emit SetMember(members[count - 1]); // index is minus 1 for 0 index array
        count += 1;
    }

    function _updateMember(
        address _member,
        uint64 _activityMultiplier // 0-100 %
    ) internal {
        require(memberIdxs[_member] != 0, "not registered");
        require(_activityMultiplier <= 100, "invalid _activityMultiplier");
        members[memberIdxs[_member] - 1]
            .activityMultiplier = _activityMultiplier;
        emit UpdateMember(members[memberIdxs[_member] - 1]);
    }

    //todo: delete member?

    // REGISTER ACTIONS

    // add seconds active to member from last update
    function updateSecondsActive() internal virtual {
        // cache this because it is the same for all members
        uint64 newSeconds = (uint64(block.timestamp) - lastUpdate);
        // update struct with total seconds active and seconds in last claim
        for (uint256 i = 0; i < members.length; i++) {
            Member memory _member = members[i];
            // multiple by modifier and divide by 100 to get %
            uint64 newSecondsActive = (newSeconds * _member.activityMultiplier) / 100;
            _member.secondsActive += newSecondsActive;
            _member.periodSecondsActive = newSecondsActive;
        }

        emit Update(uint64(block.timestamp));
    }

}
