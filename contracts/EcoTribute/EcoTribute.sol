// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;
import "../interfaces/IBAAL.sol";
import "hardhat/console.sol";

abstract contract EcoTribute {

    function tribute(uint256 _value, uint256 _tribute, uint256 percPoints, IBAAL baal) internal virtual returns (uint256 _cut) {

        address[] memory _receivers = new address[](1);
        _receivers[0] = 0x4A9a27d614a74Ee5524909cA27bdBcBB7eD3b315; // eco.daohaus.eth

        // loop to fill amount per cut
        uint256[] memory _amounts = new uint256[](1);
        _cut = (_value / percPoints) * _tribute;
        _amounts[0] = _cut;
        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);
    }

}