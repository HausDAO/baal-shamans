// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

// Register
abstract contract MemberRegistry {
    // Member struct 20 + 4 + 4 + 4 packed
    struct Member {
        address account;
        uint32 secondsActive;
        uint32 activityMultiplier;
        uint32 startDate;
    }

    // store when a update happens
    uint32 public lastUpdate;
    uint32 public lastTrigger;
    // iterable
    Member[] public members;
    uint256 public count = 1;
    mapping(address => uint256) public memberIdxs;
    // mapping(address => uint256) public start;

    // EVENTS
    event SetMember(Member member);
    event UpdateMember(Member member);
    event Update(uint32);
    event Trigger(uint32);
    event Claim(address);

    // REGISTER MODIFIERS

    function _setNewMember(
        address _member,
        uint32 _activityMultiplier,
        uint32 _startDate
    ) internal {
        // require unique?
        require(memberIdxs[_member] == 0, "already registered");
        members.push(
            Member(
                _member,
                uint32(block.timestamp) - _startDate,
                _activityMultiplier,
                _startDate
            )
        );
        memberIdxs[_member] = count;
        emit SetMember(members[count - 1]); // index is minus 1 for 0 index array
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

    //todo: delete member?

    // REGISTER ACTIONS

    // add seconds active to member from last update
    function updateSecondsActive() public virtual {
        // cache this because it is the same for all members
        uint32 newSeconds = (uint32(block.timestamp) - lastUpdate);
        for (uint256 i = 0; i < members.length; i++) {
            Member storage _member = members[i];
            // multiple by modifier and divide by 100 to get %
            _member.secondsActive += (newSeconds * _member.activityMultiplier) / 100;
        }
        lastUpdate = uint32(block.timestamp);
        emit Update(lastUpdate);
    }

    // trigger splits call for all members
    
    function trigger() public virtual {
        // todo: require tigger to happen after/before update?

        // bound array to hold calculated values
         // todo: 
        uint256[] memory calculated = new uint256[](members.length);

        for (uint256 i = 0; i < members.length; i++) {
            calculated[i] = _calculate(members[i].account);
        }
        _distribute(calculated); 
        lastTrigger = uint32(block.timestamp);
        emit Trigger(lastTrigger);
    }

    // INTERNAL VIRTUALS
    function _calculate(address _account)
        internal
        view
        virtual
        returns (uint256)
    {
        uint256 memberIdx = memberIdxs[_account];
        Member storage member = members[memberIdx - 1];
        return member.secondsActive * member.activityMultiplier;
    }

    function _distribute(uint256[] memory calculated)
        internal
        virtual
        returns (bool success)
    {
        for (uint256 i = 0; i < calculated.length; i++) {
        // todo: interact with external contract
        }
        return true;
    }

    function _sync(address _account) internal view virtual returns (uint256) {}
}
