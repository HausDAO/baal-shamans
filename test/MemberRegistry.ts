import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { use, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { decodeMultiAction, encodeMultiAction } from "../src/util";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { buildContractCall } from "@gnosis.pm/safe-contracts";
import { ContractFactory, ContractTransaction } from "ethers";
import { Test } from "mocha";
import {
  CompatibilityFallbackHandler,
  GnosisSafe,
  MemberRegistry,
  MultiSend,
  MyToken,
  PGRegistry,
  SubscriptionShaman,
  SubscriptionShamanSummoner,
} from "../src/types";
import {
  Baal,
  BaalSummoner,
} from "../src/types/contracts/fixtures/Baal/contracts";
import { Loot } from "../src/types/contracts/fixtures/Baal/contracts/LootERC20.sol";
import { Shares } from "../src/types/contracts/fixtures/Baal/contracts/SharesERC20.sol";

use(solidity);

const zeroAddress = "0x0000000000000000000000000000000000000000";

async function blockTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

async function blockNumber() {
  const block = await ethers.provider.getBlock("latest");
  return block.number;
}

async function moveForwardPeriods(periods: number, extra?: number) {
  const goToTime =
    (await blockTime()) +
    defaultDAOSettings.VOTING_PERIOD_IN_SECONDS * periods +
    (extra ? extra : 0);
  await ethers.provider.send("evm_mine", [goToTime]);
  return true;
}

const setShamanProposal = async function (
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
  await moveForwardPeriods(2);
  await baal.processProposal(proposalId, setShamanAction);
  return proposalId;
};

const newMemberAndProcess = async function (
    baal: Baal,
    memberRegistry: PGRegistry,
    multisend: MultiSend,
    member: string
  ) {
    const newDaoMember = await baal.interface.encodeFunctionData("mintShares", [
      [member],
      [ethers.utils.parseUnits("1.0", "ether")], // 1 share
    ]);
    const newRegistryMember = await memberRegistry.interface.encodeFunctionData("setNewMember", [
        member,
        100,
        Math.floor(Date.now() / 1000) - (60*60*24) // 1 day ago
      ]);
      console.log("memberRegistry.address", memberRegistry.address);
      
    const setMemberAction = encodeMultiAction(
      multisend,
      [newDaoMember, newRegistryMember],
      [baal.address, memberRegistry.address],
      [BigNumber.from(0), BigNumber.from(0)],
      [0, 0]
    );
    await baal.submitProposal(setMemberAction, 0, 0, "");
    const proposalId = await baal.proposalCount();
    await baal.submitVote(proposalId, true);
    await moveForwardPeriods(2);
    await baal.processProposal(proposalId, setMemberAction);
    return proposalId;
  };

  const editMemberAndProcess = async function (
    baal: Baal,
    memberRegistry: PGRegistry,
    multisend: MultiSend,
    member: string
  ) {

    const editRegistryMember = await memberRegistry.interface.encodeFunctionData("updateMember", [
        member,
        0,
      ]);
      
    const setMemberAction = encodeMultiAction(
      multisend,
      [editRegistryMember],
      [memberRegistry.address],
      [BigNumber.from(0)],
      [0]
    );
    await baal.submitProposal(setMemberAction, 0, 0, "");
    const proposalId = await baal.proposalCount();
    await baal.submitVote(proposalId, true);
    await moveForwardPeriods(2);
    await baal.processProposal(proposalId, setMemberAction);
    return proposalId;
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

const defaultDAOSettings = {
  GRACE_PERIOD_IN_SECONDS: 43200,
  VOTING_PERIOD_IN_SECONDS: 432000,
  PROPOSAL_OFFERING: 69,
  SPONSOR_THRESHOLD: 1,
  MIN_RETENTION_PERCENT: 0,
  MIN_STAKING_PERCENT: 0,
  QUORUM_PERCENT: 0,
  TOKEN_NAME: "BAALtests",
  TOKEN_SYMBOL: "BAAL",
};

const metadataConfig = {
  CONTENT: '{"name":"test"}',
  TAG: "daohaus.summoner.daoProfile",
};

const abiCoder = ethers.utils.defaultAbiCoder;

type DAOSettings = {
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
  const governanceConfig = abiCoder.encode(
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
    initParams: abiCoder.encode(
      ["string", "string"],
      [config.TOKEN_NAME, config.TOKEN_SYMBOL]
    ),
    initalizationActions,
  };
};

describe("Member registry", function () {
  let baal: Baal;
  let lootSingleton: Loot;
  let LootFactory: ContractFactory;
  let sharesSingleton: Shares;
  let SharesFactory: ContractFactory;
  let ERC20: ContractFactory;
  let lootToken: Loot;
  let sharesToken: Shares;
  let applicantBaal: Baal;
  let multisend: MultiSend;

  let BaalFactory: ContractFactory;
  let baalSingleton: Baal;
  let baalSummoner: BaalSummoner;

  let s1Baal: Baal;
  let s2Baal: Baal;
  let s3Baal: Baal;
  let s4Baal: Baal;
  let s5Baal: Baal;
  let s6Baal: Baal;

  let applicant: SignerWithAddress;
  let summoner: SignerWithAddress;
  let s1: SignerWithAddress;
  let s2: SignerWithAddress;
  let s3: SignerWithAddress;
  let s4: SignerWithAddress;
  let s5: SignerWithAddress;
  let s6: SignerWithAddress;

  let token: MyToken;
  let applicantToken: MyToken;

  let gnosisSafeSingleton: GnosisSafe;
  let gnosisSafe: GnosisSafe;

  let MemberRegistryFactory: ContractFactory;
  let memberRegistry: PGRegistry;

  let proposal: { [key: string]: any };

  const loot = 500;
  const shares = 100;
  const sharesPaused = false;
  const lootPaused = false;

  const yes = true;
  const no = false;

  const setupBaal = async (
    baal: Baal,
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

  this.beforeAll(async function () {
    LootFactory = await ethers.getContractFactory("Loot");
    lootSingleton = (await LootFactory.deploy()) as Loot;
    SharesFactory = await ethers.getContractFactory("Shares");
    sharesSingleton = (await SharesFactory.deploy()) as Shares;
    BaalFactory = await ethers.getContractFactory("Baal");
    baalSingleton = (await BaalFactory.deploy()) as Baal;
    MemberRegistryFactory = await ethers.getContractFactory("PGRegistry");
  });

  beforeEach(async function () {
    const GnosisSafe = await ethers.getContractFactory("GnosisSafe");
    const BaalSummoner = await ethers.getContractFactory("BaalSummoner");
    const CompatibilityFallbackHandler = await ethers.getContractFactory(
      "CompatibilityFallbackHandler"
    );
    const BaalContract = await ethers.getContractFactory("Baal");
    const MultisendContract = await ethers.getContractFactory("MultiSend");
    const GnosisSafeProxyFactory = await ethers.getContractFactory(
      "GnosisSafeProxyFactory"
    );
    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );
    [summoner, applicant, s1, s2, s3, s4, s5, s6] = await ethers.getSigners();

    ERC20 = await ethers.getContractFactory("MyToken");
    token = (await ERC20.deploy(
      ethers.utils.parseUnits("100000.0", "ether")
    )) as MyToken;
    applicantToken = token.connect(applicant);

    await token.transfer(applicant.address, ethers.utils.parseUnits("10.0", "ether"));
    await token.transfer(s2.address, ethers.utils.parseUnits("10.0", "ether"));

    multisend = (await MultisendContract.deploy()) as MultiSend;
    gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe;
    const handler =
      (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler;
    const proxy = await GnosisSafeProxyFactory.deploy();
    const moduleProxyFactory = await ModuleProxyFactory.deploy();

    baalSummoner = (await BaalSummoner.deploy(
      baalSingleton.address,
      gnosisSafeSingleton.address,
      handler.address,
      multisend.address,
      proxy.address,
      moduleProxyFactory.address,
      lootSingleton.address,
      sharesSingleton.address
    )) as BaalSummoner;

    const addresses = await setupBaal(
      baalSingleton,
      defaultDAOSettings,
      [sharesPaused, lootPaused],
      [
        [summoner.address, applicant.address],
        [shares, shares],
      ],
      [
        [summoner.address, applicant.address],
        [loot, loot],
      ]
    );

    baal = BaalFactory.attach(addresses.baal) as Baal;
    gnosisSafe = BaalFactory.attach(addresses.safe) as GnosisSafe;
    applicantBaal = baal.connect(applicant);
    s1Baal = baal.connect(s1);
    s2Baal = baal.connect(s2);
    s3Baal = baal.connect(s3);
    s4Baal = baal.connect(s4);
    s5Baal = baal.connect(s5);
    s6Baal = baal.connect(s6);

    memberRegistry = (await MemberRegistryFactory.deploy(addresses.baal)) as PGRegistry;
    await memberRegistry.transferOwnership(gnosisSafe.address);

    const lootTokenAddress = await baal.lootToken();

    lootToken = LootFactory.attach(lootTokenAddress) as Loot;

    const sharesTokenAddress = await baal.sharesToken();

    sharesToken = SharesFactory.attach(sharesTokenAddress) as Shares;

    const selfTransferAction = encodeMultiAction(
      multisend,
      ["0x"],
      [baal.address],
      [BigNumber.from(0)],
      [0]
    );

    proposal = {
      flag: 0,
      account: applicant.address,
      data: selfTransferAction,
      details: "all hail baal",
      expiration: 0,
      baalGas: 0,
    };

    setShamanProposal(baal,multisend,memberRegistry.address,7);
  });

  describe.only("member registry", function () {
    it("adds new member", async function () {
        const proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s1.address);
        const s1Balance = await sharesToken.balanceOf(s1.address);
        const s1RegistryId = await memberRegistry.memberIdxs(s1.address);
        const s1RegistryMember = await memberRegistry.members(s1RegistryId.sub(1));
        
        expect(s1Balance).to.equal(
            ethers.utils.parseUnits("1.0", "ether")
        );
        expect(s1RegistryMember.secondsActive).to.be.greaterThan(
            0
        );
        
    });
    it("edits member", async function () {
        const s1proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s1.address);
        const s2proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        const s2RegistryId = await memberRegistry.memberIdxs(s2.address);
        console.log('s2RegistryId', s2RegistryId);
        
        const s2RegistryMember = await memberRegistry.members(s2RegistryId.sub(1));
        expect(s2RegistryMember.activityMultiplier).to.equal(
            0
        );
    });
    it("seconds update on all members member", async function () {
        const s1proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s1.address);
        const s2proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        const s2RegistryId = await memberRegistry.memberIdxs(s2.address);
        const s2RegistryMembera = await memberRegistry.members(s2RegistryId.sub(1));
        const secsActive = s2RegistryMembera.secondsActive

        await memberRegistry.updateSecondsActive();

        const s2RegistryMemberb = await memberRegistry.members(s2RegistryId.sub(1));

        // same because adds 0 with update
        expect(s2RegistryMemberb.secondsActive).to.equal(
            secsActive
        );
        
    });
    it("trigger distribute shares", async function () {
        const s1proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s1.address);
        const s2proposalId = await newMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
        const s2RegistryId = await memberRegistry.memberIdxs(s2.address);
        const s2RegistryMembera = await memberRegistry.members(s2RegistryId.sub(1));
        const secsActive = s2RegistryMembera.secondsActive

        const s1RegistryId = await memberRegistry.memberIdxs(s1.address);
        const s1RegistryMember = await memberRegistry.members(s1RegistryId.sub(1));

        await memberRegistry.updateSecondsActive();
        await memberRegistry.trigger();

        const s2RegistryMemberb = await memberRegistry.members(s2RegistryId.sub(1));
        // todo: test
        const s2Balance = await sharesToken.balanceOf(s2RegistryMembera.account);
        const s1Balance = await sharesToken.balanceOf(s1RegistryMember.account)
        console.log("balances", s2Balance, s1Balance);
        
    });

  });
});
