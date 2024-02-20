// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IShaman } from "./IShaman.sol";

interface IGovernorShaman is IShaman {
    function isGovernor() external view returns (bool);

    function cancelProposal(uint32 _proposalId) external;

    function setGovernanceConfig(bytes memory _governanceConfig) external;

    function setTrustedForwarder(address _trustedForwarderAddress) external;
}
