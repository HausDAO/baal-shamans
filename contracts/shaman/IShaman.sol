// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IShaman is IERC165 {
    function baal() external view returns (address);
}
