/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "FallbackManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FallbackManager__factory>;
    getContractFactory(
      name: "Guard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Guard__factory>;
    getContractFactory(
      name: "GuardManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GuardManager__factory>;
    getContractFactory(
      name: "ModuleManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ModuleManager__factory>;
    getContractFactory(
      name: "OwnerManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnerManager__factory>;
    getContractFactory(
      name: "EtherPaymentFallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EtherPaymentFallback__factory>;
    getContractFactory(
      name: "StorageAccessible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StorageAccessible__factory>;
    getContractFactory(
      name: "SignMessageLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignMessageLib__factory>;
    getContractFactory(
      name: "GnosisSafe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GnosisSafe__factory>;
    getContractFactory(
      name: "CompatibilityFallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompatibilityFallbackHandler__factory>;
    getContractFactory(
      name: "DefaultCallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DefaultCallbackHandler__factory>;
    getContractFactory(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TokenReceiver__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "ERC777TokensRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777TokensRecipient__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ISignatureValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISignatureValidator__factory>;
    getContractFactory(
      name: "MultiSend",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiSend__factory>;
    getContractFactory(
      name: "GnosisSafeProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GnosisSafeProxy__factory>;
    getContractFactory(
      name: "IProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProxy__factory>;
    getContractFactory(
      name: "GnosisSafeProxyFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GnosisSafeProxyFactory__factory>;
    getContractFactory(
      name: "IProxyCreationCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProxyCreationCallback__factory>;
    getContractFactory(
      name: "Module",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Module__factory>;
    getContractFactory(
      name: "FactoryFriendly",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FactoryFriendly__factory>;
    getContractFactory(
      name: "ModuleProxyFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ModuleProxyFactory__factory>;
    getContractFactory(
      name: "BaseGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseGuard__factory>;
    getContractFactory(
      name: "Guardable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Guardable__factory>;
    getContractFactory(
      name: "IAvatar",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAvatar__factory>;
    getContractFactory(
      name: "IGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGuard__factory>;
    getContractFactory(
      name: "BaseRelayRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseRelayRecipient__factory>;
    getContractFactory(
      name: "IRelayRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRelayRecipient__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "IERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "ERC20SnapshotUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20SnapshotUpgradeable__factory>;
    getContractFactory(
      name: "IERC20MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "EIP712Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822Proxiable__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "ERC1967Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Proxy__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ExampleManagerShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ExampleManagerShaman__factory>;
    getContractFactory(
      name: "Baal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Baal__factory>;
    getContractFactory(
      name: "BaalSummoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaalSummoner__factory>;
    getContractFactory(
      name: "IAdminShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAdminShaman__factory>;
    getContractFactory(
      name: "IBaal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBaal__factory>;
    getContractFactory(
      name: "IBaalToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBaalToken__factory>;
    getContractFactory(
      name: "IGovernorShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGovernorShaman__factory>;
    getContractFactory(
      name: "IManagerShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IManagerShaman__factory>;
    getContractFactory(
      name: "Loot",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Loot__factory>;
    getContractFactory(
      name: "BaalLessShares",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaalLessShares__factory>;
    getContractFactory(
      name: "MockBaal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockBaal__factory>;
    getContractFactory(
      name: "TestAvatar",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestAvatar__factory>;
    getContractFactory(
      name: "TestERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC20__factory>;
    getContractFactory(
      name: "Shares",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Shares__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "TributeMinion",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TributeMinion__factory>;
    getContractFactory(
      name: "BaalVotes",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaalVotes__factory>;
    getContractFactory(
      name: "DelegationEIP712Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DelegationEIP712Upgradeable__factory>;
    getContractFactory(
      name: "Poster",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Poster__factory>;
    getContractFactory(
      name: "IBAAL",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBAAL__factory>;
    getContractFactory(
      name: "MyToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MyToken__factory>;
    getContractFactory(
      name: "MultiplyOnboarderShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiplyOnboarderShaman__factory>;
    getContractFactory(
      name: "MultiplyOnboarderShamanSummoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiplyOnboarderShamanSummoner__factory>;
    getContractFactory(
      name: "OnboarderShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnboarderShaman__factory>;
    getContractFactory(
      name: "OnboarderShamanSummoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnboarderShamanSummoner__factory>;
    getContractFactory(
      name: "SimpleOnboarderShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleOnboarderShaman__factory>;
    getContractFactory(
      name: "SimpleOnboarderShamanSummoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleOnboarderShamanSummoner__factory>;
    getContractFactory(
      name: "SubscriptionShaman",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SubscriptionShaman__factory>;
    getContractFactory(
      name: "SubscriptionShamanSummoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SubscriptionShamanSummoner__factory>;
    getContractFactory(
      name: "DhSignalTCR",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DhSignalTCR__factory>;
    getContractFactory(
      name: "DhSignalTCRSumoner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DhSignalTCRSumoner__factory>;
    getContractFactory(
      name: "IBAAL",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBAAL__factory>;
    getContractFactory(
      name: "IBAALTOKEN",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBAALTOKEN__factory>;

    getContractAt(
      name: "FallbackManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FallbackManager>;
    getContractAt(
      name: "Guard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Guard>;
    getContractAt(
      name: "GuardManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GuardManager>;
    getContractAt(
      name: "ModuleManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ModuleManager>;
    getContractAt(
      name: "OwnerManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnerManager>;
    getContractAt(
      name: "EtherPaymentFallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EtherPaymentFallback>;
    getContractAt(
      name: "StorageAccessible",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StorageAccessible>;
    getContractAt(
      name: "SignMessageLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignMessageLib>;
    getContractAt(
      name: "GnosisSafe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GnosisSafe>;
    getContractAt(
      name: "CompatibilityFallbackHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CompatibilityFallbackHandler>;
    getContractAt(
      name: "DefaultCallbackHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DefaultCallbackHandler>;
    getContractAt(
      name: "ERC1155TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TokenReceiver>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "ERC777TokensRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC777TokensRecipient>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ISignatureValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISignatureValidator>;
    getContractAt(
      name: "MultiSend",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiSend>;
    getContractAt(
      name: "GnosisSafeProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GnosisSafeProxy>;
    getContractAt(
      name: "IProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProxy>;
    getContractAt(
      name: "GnosisSafeProxyFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GnosisSafeProxyFactory>;
    getContractAt(
      name: "IProxyCreationCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProxyCreationCallback>;
    getContractAt(
      name: "Module",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Module>;
    getContractAt(
      name: "FactoryFriendly",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FactoryFriendly>;
    getContractAt(
      name: "ModuleProxyFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ModuleProxyFactory>;
    getContractAt(
      name: "BaseGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseGuard>;
    getContractAt(
      name: "Guardable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Guardable>;
    getContractAt(
      name: "IAvatar",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAvatar>;
    getContractAt(
      name: "IGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGuard>;
    getContractAt(
      name: "BaseRelayRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseRelayRecipient>;
    getContractAt(
      name: "IRelayRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRelayRecipient>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "PausableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableUpgradeable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "ERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Upgradeable>;
    getContractAt(
      name: "ERC20PermitUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20PermitUpgradeable>;
    getContractAt(
      name: "IERC20PermitUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20PermitUpgradeable>;
    getContractAt(
      name: "ERC20SnapshotUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20SnapshotUpgradeable>;
    getContractAt(
      name: "IERC20MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20MetadataUpgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "EIP712Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712Upgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1822Proxiable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822Proxiable>;
    getContractAt(
      name: "IBeacon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeacon>;
    getContractAt(
      name: "ERC1967Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Proxy>;
    getContractAt(
      name: "ERC1967Upgrade",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Upgrade>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ExampleManagerShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ExampleManagerShaman>;
    getContractAt(
      name: "Baal",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Baal>;
    getContractAt(
      name: "BaalSummoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaalSummoner>;
    getContractAt(
      name: "IAdminShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAdminShaman>;
    getContractAt(
      name: "IBaal",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBaal>;
    getContractAt(
      name: "IBaalToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBaalToken>;
    getContractAt(
      name: "IGovernorShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGovernorShaman>;
    getContractAt(
      name: "IManagerShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IManagerShaman>;
    getContractAt(
      name: "Loot",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Loot>;
    getContractAt(
      name: "BaalLessShares",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaalLessShares>;
    getContractAt(
      name: "MockBaal",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockBaal>;
    getContractAt(
      name: "TestAvatar",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestAvatar>;
    getContractAt(
      name: "TestERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC20>;
    getContractAt(
      name: "Shares",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Shares>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "TributeMinion",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TributeMinion>;
    getContractAt(
      name: "BaalVotes",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaalVotes>;
    getContractAt(
      name: "DelegationEIP712Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DelegationEIP712Upgradeable>;
    getContractAt(
      name: "Poster",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Poster>;
    getContractAt(
      name: "IBAAL",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBAAL>;
    getContractAt(
      name: "MyToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MyToken>;
    getContractAt(
      name: "MultiplyOnboarderShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiplyOnboarderShaman>;
    getContractAt(
      name: "MultiplyOnboarderShamanSummoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiplyOnboarderShamanSummoner>;
    getContractAt(
      name: "OnboarderShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OnboarderShaman>;
    getContractAt(
      name: "OnboarderShamanSummoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OnboarderShamanSummoner>;
    getContractAt(
      name: "SimpleOnboarderShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleOnboarderShaman>;
    getContractAt(
      name: "SimpleOnboarderShamanSummoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleOnboarderShamanSummoner>;
    getContractAt(
      name: "SubscriptionShaman",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SubscriptionShaman>;
    getContractAt(
      name: "SubscriptionShamanSummoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SubscriptionShamanSummoner>;
    getContractAt(
      name: "DhSignalTCR",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DhSignalTCR>;
    getContractAt(
      name: "DhSignalTCRSumoner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DhSignalTCRSumoner>;
    getContractAt(
      name: "IBAAL",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBAAL>;
    getContractAt(
      name: "IBAALTOKEN",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBAALTOKEN>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
