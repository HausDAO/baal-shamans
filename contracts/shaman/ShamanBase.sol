// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

// import { IBaal } from "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import { IBaal } from "../interfaces/IBaal.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { ERC165Upgradeable } from "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import { ContextUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import { IShaman } from "./IShaman.sol";

error Shaman__InvalidBaalAddress();

abstract contract ShamanBase is ContextUpgradeable, ReentrancyGuardUpgradeable, ERC165Upgradeable, IShaman {
    IBaal internal _baal;

    function __ShamanBase_init(address _baalAddress) internal onlyInitializing {
        if (_baalAddress == address(0)) revert Shaman__InvalidBaalAddress();
        // __Context_init();
        // __ReentrancyGuard_init();
        // __ERC165_init();
        __ShamanBase_init_unchained(_baalAddress);
    }

    function __ShamanBase_init_unchained(address _baalAddress) internal onlyInitializing {
        // TODO: validate address(0)
        _baal = IBaal(_baalAddress);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165Upgradeable, IERC165) returns (bool) {
        return
            interfaceId == type(IShaman).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function baal() public view returns (address) {
        return address(_baal);
    }
}
