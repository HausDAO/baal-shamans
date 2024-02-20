// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IManagerShaman } from "./IManagerShaman.sol";
import { IERC165, ShamanBase } from "./ShamanBase.sol";

error ManagerShaman__NoManagerRole();

abstract contract ManagerShaman is ShamanBase, IManagerShaman {

    modifier isBaalManager() {
        if(!isManager()) revert ManagerShaman__NoManagerRole();
        _;
    }

    function __ManagerShaman_init(address _baalAddress) internal onlyInitializing {
        __ShamanBase_init(_baalAddress);
        // __ManagerShamanBase_init_unchained();
    }

    function __ManagerShaman_init_unchained() internal onlyInitializing { }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ShamanBase, IERC165) returns (bool) {
        return
            interfaceId == type(IManagerShaman).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function isManager() public view virtual returns (bool) {
        return _baal.isManager(address(this));
    }

    function mintShares(address[] calldata to, uint256[] calldata amount) public virtual {
        _baal.mintShares(to, amount);
    }

    function burnShares(address[] calldata from, uint256[] calldata amount) public virtual {
        _baal.burnShares(from, amount);
    }

    function mintLoot(address[] calldata to, uint256[] calldata amount) public virtual {
        _baal.mintLoot(to, amount);
    }

    function burnLoot(address[] calldata from, uint256[] calldata amount) public virtual {
        _baal.burnLoot(from, amount);
    }
}
