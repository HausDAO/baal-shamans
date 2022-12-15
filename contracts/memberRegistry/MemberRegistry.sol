// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

// Register
abstract contract MemberRegistry {

    // 20 + 4 + 4
    struct Member {
        address account;
        uint32 secondsActive;
        uint32 activityMultiplier;
    }

    uint32 public lastUpdate;
    uint32 public lastTrigger;
    Member[] public members;
    // iterable
    uint256 public count = 1;
    mapping(address => uint256) public memberIdxs; 

    event SetMember(Member member);
    event UpdateMember(Member member);
    event Update(uint32);
    event Trigger(uint32);
    event Claim(address);

    // todo: batch?
    function _setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) internal {
        // require unique?
        require(memberIdxs[_member] == 0, "already registered");
        members[count-1] = Member(
            _member,
            uint32(block.timestamp) - _startDate,
            _activityMultiplier
        );
        memberIdxs[_member] = count-1;
        emit SetMember(members[count-1]);
        count += 1;
    }

    function _updateMember(
        address _member,
        uint32 _activityMultiplier
        ) internal {
        require(memberIdxs[_member] != 0, "not registered");
        members[memberIdxs[_member]].activityMultiplier = _activityMultiplier;
        emit UpdateMember(members[memberIdxs[_member]]);
    }

    //todo: zero out or delete member

    function _updateSecondsActive() virtual public {
        for (uint256 i = 0; i < members.length; i++) {
            Member storage _member = members[i];
            _member.secondsActive += (uint32(block.timestamp) - lastUpdate) * _member.activityMultiplier;
        }
        lastUpdate = uint32(block.timestamp);
        emit Update(lastUpdate);
    }

    // trigger distribute for all members
    function trigger() virtual public {
        // todo: require tigger to happen after/before update?
        uint256[] memory calculated = new uint[](members.length);

        for (uint256 i = 0; i < members.length; i++) {
            calculated[i] = _calculate(members[i].account); // todo: store in format for 0xsplits
        }
        _distribute(calculated); // param of data struct
        lastTrigger = uint32(block.timestamp);
        emit Trigger(lastTrigger);
    }

    // per member claim
    function claim() virtual public {
        require(memberIdxs[msg.sender] != 0, "not registered");
        _sync(msg.sender);
        emit Claim(msg.sender);
    }

    // internal
    function _calculate(address _account) virtual internal view returns (uint256) {
        uint256 memberIdx = memberIdxs[_account];
        Member storage member = members[memberIdx];
        return member.secondsActive; // todo: do something more with this?
        // return member.secondsActive.sqrt(); 
        // SQRT((Total_Months - Months_on_break)* Time_Multiplier)
    }

    function _distribute(uint256[] memory calculated) virtual internal view returns (uint256) {
        for (uint256 i = 0; i < calculated.length; i++) {
            // todo: store in format for 0xsplits
        }
        return 1;
    }

    function _sync(address _account) virtual internal view returns (uint256) {
    }

}