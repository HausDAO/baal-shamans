// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IShaman } from "./IShaman.sol";

interface IManagerShaman is IShaman {
    function isManager() external view returns (bool);

    function mintShares(address[] calldata to, uint256[] calldata amount) external;

    function burnShares(address[] calldata from, uint256[] calldata amount) external;

    function mintLoot(address[] calldata to, uint256[] calldata amount) external;

    function burnLoot(address[] calldata from, uint256[] calldata amount) external;
}
