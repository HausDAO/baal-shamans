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
  MultiSend,
  MyNft,
  MyToken,
  NFTClaimerShaman,
  SubscriptionShaman,
  SubscriptionShamanSummoner,
} from "../src/types";
import {
  Baal,
  BaalSummoner,
} from "../src/types/contracts/fixtures/Baal/contracts";
import { Loot } from "../src/types/contracts/fixtures/Baal/contracts/LootERC20.sol";
import { Shares } from "../src/types/contracts/fixtures/Baal/contracts/SharesERC20.sol";
import { NFTClaimerShamanSummoner } from "../src/types/contracts/nftClaimer/NFTClaimer.sol";

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

const summonSubscription = async function (
  subscriptionArgs: any,
  multisend: MultiSend,
  subscriptionSingleton: SubscriptionShaman,
  subscriptionSummoner: SubscriptionShamanSummoner,
  baal: Baal
) {
  let subscriptionAddress;
  let summonSubscriptionTx = await subscriptionSummoner.summonSubscription(
    baal.address,
    subscriptionArgs.token,
    subscriptionArgs.priceActivation,
    subscriptionArgs.pricePer,
    subscriptionArgs.lootPerUnit,
    subscriptionArgs.periodLength,
    subscriptionArgs.shares,
    subscriptionArgs.cuts,
    subscriptionArgs.amounts
  );

  let result = await summonSubscriptionTx.wait();
  if (
    result &&
    result.events &&
    result.events[1] &&
    result.events[1].args &&
    result.events[1].args.subscription
  ) {
    // console.log("subscription", result.events[1].args.subscription);
    subscriptionAddress = result.events[1].args.subscription;
  }

  const subscription = subscriptionSingleton.attach(subscriptionAddress);

  return subscriptionAddress;
};

const summonNftClaimer = async function (
  nftClaimerArgs: any,
  nftClaimerSingleton: NFTClaimerShaman,
  nftClaimerShamanSummoner: NFTClaimerShamanSummoner,
  baal: Baal
) {
  let nftClaimerAddress;
  let summonNftClaimerTx = await nftClaimerShamanSummoner.summonNFTClaimer(
    baal.address,
    nftClaimerArgs.nftAddress,
    nftClaimerArgs.isShares,
    nftClaimerArgs.perNft
  );

  let result = await summonNftClaimerTx.wait();
  if (
    result &&
    result.events &&
    result.events[1] &&
    result.events[1].args &&
    result.events[1].args.claimer
  ) {
    // console.log("subscription", result.events[1].args.subscription);
    nftClaimerAddress = result.events[1].args.claimer;
  }

  const nftClaimer = nftClaimerSingleton.attach(nftClaimerAddress);

  return nftClaimer;
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

describe("NFTClaimerShaman", function () {
  let baal: Baal;
  let lootSingleton: Loot;
  let LootFactory: ContractFactory;
  let sharesSingleton: Shares;
  let SharesFactory: ContractFactory;
  let ERC20: ContractFactory;
  let ERC721: ContractFactory;
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

  let nftToken: MyNft;

  let gnosisSafeSingleton: GnosisSafe;
  let gnosisSafe: GnosisSafe;

  let SubscriptionFactory: ContractFactory;
  let subscriptionSingleton: SubscriptionShaman;
  let SubscriptionSummonerFactory: ContractFactory;
  let subscriptionSummoner: SubscriptionShamanSummoner;
  let subscription: SubscriptionShaman;

  let NFTClaimerFactory: ContractFactory;
  let nftClaimerSingleton: NFTClaimerShaman;
  let NFTClaimerSummonerFactory: ContractFactory;
  let nftClaimerSummoner: NFTClaimerShamanSummoner;
  let nftClaimer: NFTClaimerShaman;

  const shares = 100;
  const sharesPaused = false;
  const loot = 100;

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
    NFTClaimerFactory = await ethers.getContractFactory("NFTClaimerShaman");
    nftClaimerSingleton =
      (await NFTClaimerFactory.deploy()) as NFTClaimerShaman;
    NFTClaimerSummonerFactory = await ethers.getContractFactory(
      "NFTClaimerShamanSummoner"
    );
    nftClaimerSummoner = (await NFTClaimerSummonerFactory.deploy(
      nftClaimerSingleton.address
    )) as NFTClaimerShamanSummoner;
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

    ERC721 = await ethers.getContractFactory("MyNft");
    nftToken = (await ERC721.deploy("12345")) as MyNft;

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

    // proposal = {
    //   flag: 0,
    //   account: applicant.address,
    //   data: selfTransferAction,
    //   details: "all hail baal",
    //   expiration: 0,
    //   baalGas: 0,
    // };

    // TODO: deploy an nft
    // mint to some address in the tests

    let nftClaimerArgs = {
      baal: baal.address,
      nftAddress: nftToken.address,
      isShares: true,
      perNft: ethers.utils.parseUnits("1.0", "ether"),
    };

    nftClaimer = await summonNftClaimer(
      nftClaimerArgs,
      nftClaimerSingleton,
      nftClaimerSummoner,
      baal
    );

    const id = await setShamanProposal(baal, multisend, nftClaimer.address, 3);
  });

  describe("nftClaim", function () {
    it("mint shares on claim", async function () {
      const memberBalance = await sharesToken.balanceOf(summoner.address);
      await nftClaimer.claim("12345");
      const memberNewBalance = await sharesToken.balanceOf(summoner.address);
      const perNft = await nftClaimer.perNft();

      expect(memberNewBalance).to.equal(memberBalance.add(perNft));
    });
  });
});
