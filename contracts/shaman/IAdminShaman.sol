// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IShaman } from "./IShaman.sol";

interface IAdminShaman is IShaman {
    function isAdmin() external view returns (bool);

    function setAdminConfig(bool pauseShares, bool pauseLoot) external;
}
