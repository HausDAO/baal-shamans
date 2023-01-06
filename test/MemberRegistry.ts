import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { use, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { decodeMultiAction, encodeMultiAction } from "../src/util";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { buildContractCall } from "@gnosis.pm/safe-contracts";
import { ContractFactory, ContractTransaction } from "ethers";
import { it, Test } from "mocha";
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

const rgaddrsUnsorted = [
    "0xced608aa29bb92185d9b6340adcbfa263dae075b",
    "0xd26a3f686d43f2a62ba9eae2ff77e9f516d945b9",
    "0x83ab8e31df35aa3281d630529c6f4bf5ac7f7abf",
    "0x146cfed833cc926b16b0da9257e8a281c2add9f3",
    "0x131fde92e4e88fa0746d9aba3dd4ec8aac1786a6",
    "0x0f10f27fbe3622e7d4bdf1f141c6e50ed8845af6",
    "0x66b1de0f14a0ce971f7f248415063d44caf19398",
    "0x6b0b5a413286c98ef8bc6de3dc2541e42863c43b",
    "0x8f942eced007bd3976927b7958b50df126feecb5",
    "0x20efcd9b9ade8bd586f840c83a6d8dd8c1d6623b",
    "0xdf73fe01dfddb55a900b947c5726b2e54dddd95a",
    "0xa3564677fc4907a15c9a7eae1dbc1ae9ac57b8e1",
    "0xffadc07f1bfb127f4312e8652fe94ab0c771b54d",
    "0xb53b0255895c4f9e3a185e484e5b674bccfbc076",
    "0x15c6ac4cf1b5e49c44332fb0a1043ccab19db80a",
    "0x06134ad890b6edb42bc0487c4e8dbbc17e3e0326",
    "0xc746708e27c5a8013fe8a9c62af17f64610acdfc",
    "0x9583648c314cdf666f4f555299db3b36f5d5b2f9",
    "0x68d36dcbdd7bbf206e27134f28103abe7cf972df",
    "0xfacef700458d4fc9746f7f3e0d37b462711ff09e",
    "0xf925fdaea552d36a5291335941ab7a046f960a80",
    "0xf7f189082878846c11a94ddac51c41afc7a7c772",
    "0xef42cf85be6adf3081ada73af87e27996046fe63",
    "0xe9a82a8a6e543890f60f3bca8685f56dc89aeb48",
    "0xe8adaea0ba507a28d1309051beceb4db7fe377af",
    "0xe775f37efe72d5a695b23e6ea7769f98cfbfaeb4",
    "0xe4cc688726dd0a1f8c464054ea1a1218d0cd9fc4",
    "0xda5b2cd0d0bb26e79fb3210233ddabdb7de131c9",
    "0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88",
    "0x851fb899da7f80c211d9b8e5f231fb3bc9eca41a",
    "0x81aaa9a7a8358cc2971b9b8de72acce6d7862bc8",
    "0x818ff73a5d881c27a945be944973156c01141232",
    "0x756ee8b8e898d497043c2320d9909f1dd5a7077f",
    "0x710e2f9d630516d3afdd053de584f1fa421e84bc",
    "0x70c58b28f5e39da89bee0e6e8623e3faf51f0ed1",
    "0xd8c1f97348da216c2ded7a3a92274f2ff5cf37b2",
    "0xd714dd60e22bbb1cbafd0e40de5cfa7bbdd3f3c8",
    "0xd3e9d60e4e4de615124d5239219f32946d10151d",
    "0xce7298e5ef1ae8af0573edc2ebd03ab0f837e214",
    "0xcbbd18d3ac27ab0fffd04bccd091b2802c92e0ca",
    "0xcb42ac441fcade3935243ea118701f39aa004486",
    "0xca7a1a193a02e0520b6b745cd2eb24967c27ca00",
    "0xc7f459c7edcf9333d223bd1c346f46819403ca06",
    "0xc2013c235cf746a8164747e25254c7b538864e10",
    "0xb4135c81b194cae8dd2c4426527e880f95840acc",
    "0xb2f4b16595e02a9721f97e3e30fb5bbbf73f5f54",
    "0xafd5f60aa8eb4f488eaa0ef98c1c5b0645d9a0a0",
    "0xa5741cb7cfba784bcd07196d862558bc0c42a890",
    "0xa15ca74e65bf72730811abf95163e89ad9b9dff6",
    "0x9d06abcb6bf6ba8284255ce1d4cf965a04810336",
    "0xbfc7cae0fad9b346270ae8fde24827d2d779ef07",
    "0x1dac51886d5b461fccc784ad3813a5969dd42e6f",
    "0x5a9e792143bf2708b4765c144451dca54f559a19",
    "0xe68967c95f5a9bccfdd711a2cbc23ec958f147ef",
    "0x956d5740b3477f0b46dae26753b07ecbd8055908",
    "0x6dc43be93a8b5fd37dc16f24872babc6da5e5e3e",
    "0x6d97d65adff6771b31671443a6b9512104312d3d",
    "0x5f350bf5fee8e254d6077f8661e9c7b83a30364e",
    "0x5bb3e1774923b75ecb804e2559149bbd2a39a414",
    "0x5b93ff82faaf241c15997ea3975419dddd8362c5",
    "0x58f123bd4261ea25955b362be57d89f4b6e7110a",
    "0x54becc7560a7be76d72ed76a1f5fee6c5a2a7ab6",
    "0x4fafa767c9cb71394875c139d43aee7799748908",
    "0x4b037687c1c5159285a7defad3681f8e123d2478",
    "0x4059457092cc3812d56676df6a75fd21204fbe2f",
    "0x3839acf1ee7699d1f46b1be840d8ad8317fdf757",
    "0x2c3dd65e94f97b2a25239eddffd2e192c08769b8",
    "0x27c72e4bd23c910218d8f06c4a1742e06657c874",
    "0x224aba5d489675a7bd3ce07786fada466b46fa0f",
    "0x1e9c89aff77215f3ad26bffe0c50d4fdeba6a352",
    "0x1d076fcf1598c285d1c2f0685202afacdbcb0832",
    "0x1c0aa8ccd568d90d61659f060d1bfb1e6f855a20",
    "0x1a9cee6e1d21c3c09fb83a980ea54299f01920cd",
    "0x164ba6d1e6dd5f937908c34137d271ea3852c214",
    "0x0eabffd8ce94ab2387fc44ba32642af0c58af433",
    "0x08913515803c69ee3c2b8bdff49cf53baa1694d6",
    "0x06535a967d958dea135f6b50056362947ae5754b",
    "0xb4c3a698874b625df289e97f718206701c1f4c0f",
    "0x60959ed8307ee2b0d04306f6b319aeee8864f1ee",
  ];
  const rgsorted = rgaddrsUnsorted.slice()
  rgsorted.sort((a, b) => {
    return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
  });
  
  const rgshares = rgaddrsUnsorted.map(() => ethers.utils.parseUnits("1.0", "ether"));
  const rgmods = rgaddrsUnsorted.map(() => 100);
  const rgdates = rgaddrsUnsorted.map(() => Math.floor(Date.now() / 1000) - 60 * 60 * 24);
  
  

const zeroAddress = "0x0000000000000000000000000000000000000000";

async function gasStats(name: string, tx: ContractTransaction) {
  const rec = await tx.wait();
  console.log(
    name,
    "used",
    rec.gasUsed.toString(),
    "cost@15",
    ethers.utils.formatEther(rec.gasUsed.mul(15000000000))
  );
}

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

const newBatchMemberAndProcess = async function (
  baal: Baal,
  memberRegistry: PGRegistry,
  multisend: MultiSend
) {
  const newDaoMember = await baal.interface.encodeFunctionData("mintShares", [
    rgaddrsUnsorted,
    rgshares, //
  ]);
  const newRegistryMember = await memberRegistry.interface.encodeFunctionData(
    "batchNewMember",
    [
      rgaddrsUnsorted,
      rgmods,
      rgdates, //
    ]
  );

  const setMemberAction = encodeMultiAction(
    multisend,
    [
        // newDaoMember, 
        newRegistryMember],
    [
        // baal.address, 
        memberRegistry.address],
    [
        // BigNumber.from(0), 
        BigNumber.from(0)],
    [
        // 0, 
        0,
    ]
  );
  await baal.submitProposal(setMemberAction, 0, 0, "");
  const proposalId = await baal.proposalCount();
  await baal.submitVote(proposalId, true);
  await moveForwardPeriods(2);
  const tx = await baal.processProposal(proposalId, setMemberAction);
  gasStats("batch member " + rgaddrsUnsorted.length.toString(), tx);
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
  const newRegistryMember = await memberRegistry.interface.encodeFunctionData(
    "setNewMember",
    [
      member,
      100,
      Math.floor(Date.now() / 1000) - 60 * 60 * 24, // 1 day ago
    ]
  );

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
  const tx = await baal.processProposal(proposalId, setMemberAction);

  return proposalId;
};

const editMemberAndProcess = async function (
  baal: Baal,
  memberRegistry: PGRegistry,
  multisend: MultiSend,
  member: string
) {
  const editRegistryMember = await memberRegistry.interface.encodeFunctionData(
    "updateMember",
    [member, 0]
  );

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
    const tx = await baalSummoner.summonBaalAndSafe(encodedInitParams.initParams,
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

    await token.transfer(
      applicant.address,
      ethers.utils.parseUnits("10.0", "ether")
    );
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

    // todo: mock splits
    memberRegistry = (await MemberRegistryFactory.deploy(s4.address, s3.address)) as PGRegistry;

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

    setShamanProposal(baal, multisend, memberRegistry.address, 7);
  });

  describe.only("member registry", function () {
    it("adds new member", async function () {
      const proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s1.address
      );
      const s1Balance = await sharesToken.balanceOf(s1.address);
      const s1RegistryId = await memberRegistry.memberIdxs(s1.address);
      const s1RegistryMember = await memberRegistry.members(
        s1RegistryId.sub(1)
      );

      expect(s1Balance).to.equal(ethers.utils.parseUnits("1.0", "ether"));
      expect(s1RegistryMember.secondsActive).to.be.greaterThan(0);
    });
    it("adds new member batch trigger", async function () {
      // console.log(rgaddrsUnsorted, rgshares, rgmods, rgdates);
      

      const proposalId = await newBatchMemberAndProcess(
        baal,
        memberRegistry,
        multisend
      );
      const count = await memberRegistry.count();

      // todo: example of getting unsorted list from contract

      const memberList = await memberRegistry.getMembers();
      // console.log(memberList);
      const addrList = memberList.map((item: any) => item.account)
      addrList.sort((a: any, b: any) => {
        return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
      });

      const tx = await memberRegistry.triggerCalcAndSplits(addrList);
      gasStats("batch update secs", tx);

    });
    it("edits member", async function () {
      const s1proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s1.address
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s2.address
      );
      await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
      const s2RegistryId = await memberRegistry.memberIdxs(s2.address);

      const s2RegistryMember = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      expect(s2RegistryMember.activityMultiplier).to.equal(0);
    });
    it("seconds update on all members member", async function () {
      const s1proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s1.address
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s2.address
      );
      await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
      const s2RegistryId = await memberRegistry.memberIdxs(s2.address);
      const s2RegistryMembera = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      const secsActive = s2RegistryMembera.secondsActive;

      const tx = await memberRegistry.triggerCalcAndSplits([s1.address, s2.address]);
      gasStats("update seconds", tx);

      const s2RegistryMemberb = await memberRegistry.members(
        s2RegistryId.sub(1)
      );

      // same because adds 0 with update
      expect(s2RegistryMemberb.secondsActive).to.equal(secsActive);
    });
    it("trigger distribute shares", async function () {
      const s1proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s1.address
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        memberRegistry,
        multisend,
        s2.address
      );
      await editMemberAndProcess(baal, memberRegistry, multisend, s2.address);
      const s2RegistryId = await memberRegistry.memberIdxs(s2.address);
      const s2RegistryMembera = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      const secsActive = s2RegistryMembera.secondsActive;

      const s1RegistryId = await memberRegistry.memberIdxs(s1.address);
      const s1RegistryMember = await memberRegistry.members(
        s1RegistryId.sub(1)
      );

      const tx = await memberRegistry.triggerCalcAndSplits([s1.address, s2.address]);
      gasStats("trigger", tx);

      const s2RegistryMemberb = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      // todo: test
      const s2Balance = await sharesToken.balanceOf(s2RegistryMembera.account);
      const s1Balance = await sharesToken.balanceOf(s1RegistryMember.account);
      console.log("balances", s2Balance, s1Balance);
    });
  });
});
