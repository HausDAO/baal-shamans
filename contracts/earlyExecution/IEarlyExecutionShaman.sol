// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IEarlyExecutionShaman is IERC165 {
    function setUp(bytes memory initializeParams) external;
    function checkEarlyExecution(uint32 _proposalId) external view returns (bool earlyExecuteReady);
    function submitProposal(
        bytes calldata proposalData,
        uint32 expiration,
        uint256 baalGas,
        string calldata details
    ) external payable returns (uint256);
    function earlyExecute(uint32 _proposalId, bytes calldata _proposalData) external returns (bool success);
    function setMinimumQuorumPercent(uint256 _quorumPercent) external;
}
