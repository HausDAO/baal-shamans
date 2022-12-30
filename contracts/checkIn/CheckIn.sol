// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IBAAL.sol";

// Made for use with Baal(Molochv3)
// Example use of Manager shamans
// Any account can claim some amount of shares or loot per period
// this shaman must be set as a manager role in the dao
contract CheckInShaman {
    IBAAL public baal;
    IERC20 public token;

    mapping(address => uint256) public timeLedger;
    bool public shares;
    uint256 public period; // length of period in seconds
    uint256 public sharesPerMinute; // Amount of shares awarded per hour of work
    event SetMember(address account);
    event Claim(address account, uint256 timestamp);

    constructor(
        address _moloch,
        bool _shares,
        uint256 _sharesPerMinute,
        uint256 _period
    ) {
        baal = IBAAL(_moloch);
        shares = _shares;
        // get shares or loot token address from dao based on 'shares' flag
        if (shares) {
            token = IERC20(baal.sharesToken());
        } else {
            token = IERC20(baal.lootToken());
        }
        period = _period;
        sharesPerMinute = _sharesPerMinute;
    }

    // Mint share or loot tokens
    function _mintTokens(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

        if (shares) {
            baal.mintShares(_receivers, _amounts); // interface to mint shares
        } else {
            baal.mintLoot(_receivers, _amounts); // interface to mint loot
        }
    }

    // can be called by any account to claim per period tokens
    function claim(uint16 _minutesWorked) public {
        // Not sure if I need this
        require(
            _minutesWorked > 0,
            "Must claim shares for more than 0 hours work"
        );
        require(
            block.timestamp - timeLedger[msg.sender] >= period ||
                timeLedger[msg.sender] == 0,
            "Can only claim 1 time per period"
        );
        require(
            token.balanceOf(msg.sender) > 0,
            "Members Only: Must have DAO tokens in order to claim through this shaman"
        );

        uint256 amount = calculate(_minutesWorked, sharesPerMinute);
        _mintTokens(msg.sender, amount);
        timeLedger[msg.sender] = block.timestamp;
        emit Claim(msg.sender, block.timestamp);
    }

    function calculate(uint16 _minutesWorked, uint256 _sharesPerMinute)
        internal
        pure
        returns (uint256 total)
    {
        total = _minutesWorked * _sharesPerMinute;
    }
}
