// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

// Register
abstract contract MemberRegistry {
    struct Member {
        address account;
        uint32 secondsActive;
        uint32 activityMultiplier;
        uint32 startDate;
    }

    // store when a update happens
    uint32 public lastUpdate;
    // iterable
    Member[] public members;
    uint256 public count = 1;
    mapping(address => uint256) public memberIdxs;

    // EVENTS
    event SetMember(Member member, uint32 initialSeconds);
    event UpdateMemberSeconds(Member member, uint32 newSeconds);
    event UpdateMember(Member member);
    event Update(uint32 date);

    // REGISTER MODIFIERS

    function _setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) internal {
        // require unique?
        require(memberIdxs[_member] == 0, "already registered");
        uint32 secsActive = uint32(block.timestamp) - _startDate;
        members.push(
            Member(_member, secsActive, _activityMultiplier, _startDate)
        );
        memberIdxs[_member] = count;
        emit SetMember(members[count - 1], secsActive); // index is minus 1 for 0 index array
        count += 1;
    }

    function _updateMember(
        address _member,
        uint32 _activityMultiplier // 0-100 %
    ) internal {
        require(memberIdxs[_member] != 0, "not registered");
        require(_activityMultiplier <= 100, "invalid _activityMultiplier");
        members[memberIdxs[_member] - 1]
            .activityMultiplier = _activityMultiplier;
        emit UpdateMember(members[memberIdxs[_member] - 1]);
    }

    // add seconds active to member from last update
    function updateSecondsActive() internal virtual {
        // cache this because it is the same for all members
        uint32 currentUpdate = uint32(block.timestamp);
        uint32 newSeconds = (currentUpdate - lastUpdate);
        // update struct with total seconds active and seconds in last claim
        for (uint256 i = 0; i < members.length; i++) {
            Member memory _member = members[i];
            // multiple by modifier and divide by 100 to get %
            uint32 newSecondsActive = (newSeconds *
                _member.activityMultiplier) / 100;
            _member.secondsActive += newSecondsActive;
            emit UpdateMemberSeconds(_member, newSecondsActive);
        }
        emit Update(currentUpdate);
    } 

    function getMembers() public view returns(Member[] memory) {
        return members;
    }
}
