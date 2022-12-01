// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../interfaces/IBAAL.sol";

// Made for use with Baal(Molochv3)
// Example use of Manager shamans
// Any account can claim some amount of shares or loot per period
// this shaman must be set as a manager role in the dao
contract ExampleManagerShaman {
    IBAAL public baal;
    IERC20 public token;

    mapping(address => uint256) public claims;
    bool public shares;
    uint256 public period; // length of period in seconds
    uint256 public perPeriod; // amount of loot or shares to mint

    event SetMember(address account);
    event Claim(address account, uint256 timestamp);

    constructor(address _moloch, bool _shares, uint256 _perPeriod, uint256 _period) {
        baal = IBAAL(_moloch);
        shares = _shares;
        // get shares or loot token address from dao based on 'shares' flag
        if (shares) {
            token = IERC20(baal.sharesToken());
        } else {
            token = IERC20(baal.lootToken());
        }
        period = _period;
        perPeriod = _perPeriod;
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
    function claim() public {
        require(
            block.timestamp - claims[msg.sender] >= period || claims[msg.sender] == 0,
            "Can only claim 1 time per period"
        );

        uint256 amount = calculate();
        _mintTokens(msg.sender, amount);
        claims[msg.sender] = block.timestamp;
        emit Claim(msg.sender, block.timestamp);
    }

    function calculate() internal view returns (uint256 total) {
        total = perPeriod;
    }

}
