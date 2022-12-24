import { ContractFactory, ContractTransaction }from "ethers";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ethers } from "hardhat";
import {
  CompatibilityFallbackHandler,
  GnosisSafe,
  Loot,
  MultiSend,
  MyToken,
  Shares
} from "./types";
import {
  Baal,
  BaalSummoner,
} from "./types/contracts/fixtures/Baal/contracts";
import { encodeMultiAction, moveForwardPeriods } from './util';

export type DAOSettings = {
  PROPOSAL_OFFERING: any;
  GRACE_PERIOD_IN_SECONDS: any;
  VOTING_PERIOD_IN_SECONDS: any;
  QUORUM_PERCENT: any;
  SPONSOR_THRESHOLD: any;
  MIN_RETENTION_PERCENT: any;
  MIN_STAKING_PERCENT: any;
  TOKEN_NAME: any;
  TOKEN_SYMBOL: any;
};

const getBaalParams = async function (
  baal: Baal,
  config: DAOSettings,
  adminConfig: [boolean, boolean],
  shares: [string[], number[]],
  loots: [string[], number[]]
) {
  const governanceConfig = ethers.utils.defaultAbiCoder.encode(
    ["uint32", "uint32", "uint256", "uint256", "uint256", "uint256"],
    [
      config.VOTING_PERIOD_IN_SECONDS,
      config.GRACE_PERIOD_IN_SECONDS,
      config.PROPOSAL_OFFERING,
      config.QUORUM_PERCENT,
      config.SPONSOR_THRESHOLD,
      config.MIN_RETENTION_PERCENT,
    ]
  );

  const setAdminConfig = await baal.interface.encodeFunctionData(
    "setAdminConfig",
    adminConfig
  );
  const setGovernanceConfig = await baal.interface.encodeFunctionData(
    "setGovernanceConfig",
    [governanceConfig]
  );

  const mintShares = await baal.interface.encodeFunctionData(
    "mintShares",
    shares
  );
  const mintLoot = await baal.interface.encodeFunctionData("mintLoot", loots);

  const initalizationActions = [
    setAdminConfig,
    setGovernanceConfig,
    mintShares,
    mintLoot,
  ];

  return {
    initParams: ethers.utils.defaultAbiCoder.encode(
      ["string", "string"],
      [config.TOKEN_NAME, config.TOKEN_SYMBOL]
    ),
    initalizationActions,
  };
};

const getNewBaalAddresses = async (
  tx: ContractTransaction
): Promise<{ baal: string; loot: string; safe: string }> => {
  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  // console.log({logs: receipt.logs})
  let baalSummonAbi = [
    "event SummonBaal(address indexed baal, address indexed loot, address indexed shares, address safe, bool existingSafe)",
  ];
  let iface = new ethers.utils.Interface(baalSummonAbi);
  let log = iface.parseLog(receipt.logs[receipt.logs.length - 1]);
  const { baal, loot, safe } = log.args;
  return { baal, loot, safe };
};

export const setupBaal = async (
  baal: Baal,
  baalSummoner: BaalSummoner,
  config: DAOSettings,
  adminConfig: [boolean, boolean],
  shares: [string[], number[]],
  loots: [string[], number[]]
) => {
  const saltNonce = (Math.random() * 1000).toFixed(0);
  const encodedInitParams = await getBaalParams(
    baal,
    config,
    adminConfig,
    shares,
    loots
  );
  const tx = await baalSummoner.summonBaalAndSafe(
    encodedInitParams.initParams,
    encodedInitParams.initalizationActions,
    saltNonce
  );
  return await getNewBaalAddresses(tx);
};

export const summonBaal = async(
  daoSettings: DAOSettings,
  lootConfig : { amount: number, paused: boolean },
  sharesConfig: { amount: number, paused: boolean },
) => {
  // Gnosis Contracts
  const GnosisSafe = await ethers.getContractFactory("GnosisSafe");
  const CompatibilityFallbackHandler = await ethers.getContractFactory(
    "CompatibilityFallbackHandler"
  );
  const GnosisSafeProxyFactory = await ethers.getContractFactory(
    "GnosisSafeProxyFactory"
  );
  const ModuleProxyFactory = await ethers.getContractFactory(
    "ModuleProxyFactory"
  );
  const MultisendContract = await ethers.getContractFactory("MultiSend");

  // Baal Contracts
  const BaalSummoner = await ethers.getContractFactory("BaalSummoner");
  const BaalFactory = await ethers.getContractFactory("Baal");
  const LootFactory = await ethers.getContractFactory("Loot");
  const lootSingleton = (await LootFactory.deploy()) as Loot;
  const SharesFactory = await ethers.getContractFactory("Shares");
  const sharesSingleton = (await SharesFactory.deploy()) as Shares;

  // Utils Contracts
  const ERC20 = await ethers.getContractFactory("MyToken");
  const token = (await ERC20.deploy(
    ethers.utils.parseUnits("100.0", "ether")
  )) as MyToken;

  const [summoner, applicant, s1] = await ethers.getSigners();

  await token.transfer(applicant.address, ethers.utils.parseUnits("10.0", "ether"));
  await token.transfer(s1.address, ethers.utils.parseUnits("10.0", "ether"));

  const multisend = (await MultisendContract.deploy()) as MultiSend;
  const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe;
  const handler =
    (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler;
  const proxy = await GnosisSafeProxyFactory.deploy();
  const moduleProxyFactory = await ModuleProxyFactory.deploy();
  
  
  const baalSingleton = (await BaalFactory.deploy()) as Baal;

  const baalSummoner = (await BaalSummoner.deploy(
    baalSingleton.address,
    gnosisSafeSingleton.address,
    handler.address,
    multisend.address,
    proxy.address,
    moduleProxyFactory.address,
    lootSingleton.address,
    sharesSingleton.address
  )) as BaalSummoner;

  return {
     ... (await setupBaal(
        baalSingleton,
        baalSummoner,
        daoSettings,
        [sharesConfig.paused, lootConfig.paused],
        [
          [summoner.address, applicant.address],
          [sharesConfig.amount, sharesConfig.amount],
        ],
        [
          [summoner.address, applicant.address],
          [lootConfig.amount, lootConfig.amount],
        ]
      )
    ),
    multisend: multisend.address,
  };
};

export const setShamanProposal = async function (
  baal: Baal,
  multisend: MultiSend,
  shaman: string,
  permission: BigNumberish
) {
  const setShaman = await baal.interface.encodeFunctionData("setShamans", [
    [shaman],
    [permission],
  ]);
  const setShamanAction = encodeMultiAction(
    multisend,
    [setShaman],
    [baal.address],
    [BigNumber.from(0)],
    [0]
  );
  await baal.submitProposal(setShamanAction, 0, 0, "");
  const proposalId = await baal.proposalCount();
  await baal.submitVote(proposalId, true);
  const votingPeriod = await baal.votingPeriod();
  await moveForwardPeriods(votingPeriod * 2);
  await baal.processProposal(proposalId, setShamanAction);
  return proposalId;
};
