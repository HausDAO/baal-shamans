// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IGovernorShaman } from "./IGovernorShaman.sol";
import { IERC165, ShamanBase } from "./ShamanBase.sol";

error GovernorShaman__NoGovernorRole();

abstract contract GovernorShaman is ShamanBase, IGovernorShaman {

    modifier isBaalGovernor() {
        if(!isGovernor()) revert GovernorShaman__NoGovernorRole();
        _;
    }

    function __GovernorShaman_init(address _baalAddress) internal onlyInitializing {
        __ShamanBase_init(_baalAddress);
        // __GovernorShamanBase_init_unchained();
    }

    function __GovernorShaman_init_unchained() internal onlyInitializing { }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ShamanBase, IERC165) returns (bool) {
        return
            interfaceId == type(IGovernorShaman).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function isGovernor() public view virtual returns (bool) {
        return _baal.isGovernor(address(this));
    }

    function cancelProposal(uint32 _proposalId) public virtual nonReentrant {
        _baal.cancelProposal(_proposalId);
    }

    function setGovernanceConfig(bytes memory _governanceConfig) public virtual {
        _baal.setGovernanceConfig(_governanceConfig);
    }

    function setTrustedForwarder(address _trustedForwarderAddress) public virtual {
        _baal.setTrustedForwarder(_trustedForwarderAddress);
    }
}
