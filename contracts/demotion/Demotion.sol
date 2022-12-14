// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../interfaces/IBAAL.sol";


// Allow an account to convert shares to loot without a proposal
// this shaman must be set as a manager role in the dao
contract DemotionShaman {
    IBAAL public baal;
    IERC20 public sharesToken;
    IERC20 public lootToken;


    event Demote(address account, uint256 timestamp, uint256 amount);

    constructor(address _moloch) {
        baal = IBAAL(_moloch);
        sharesToken = IERC20(baal.sharesToken());
        lootToken = IERC20(baal.lootToken());
    }

    // Burn share and mint loot tokens
    function _convertShares(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;
    
        baal.burnShares(_receivers, _amounts); // interface to burn shares
        baal.mintLoot(_receivers, _amounts); // interface to mint loot
    }

    // can be called by any account holding share tokens
    function demote(uint256 amount) public {
        require(sharesToken.balanceOf(msg.sender) >= amount, "account does not hold enough shares");

        _convertShares(msg.sender, amount);

        emit Demote(msg.sender, block.timestamp, amount);
    }
}
