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
  MyToken,
  EthOnboarderShaman,
  EthOnboarderShamanSummoner,
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

const summonOnboarder = async function (
  onboarderArgs: any,
  multisend: MultiSend,
  onboarderSingleton: EthOnboarderShaman,
  onboarderSummoner: EthOnboarderShamanSummoner,
  baal: Baal
) {
  
  let onboarderAddress;
  let summonOnboarder1 = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.expiery,
    onboarderArgs.multiply,
    onboarderArgs.minTribute,
    onboarderArgs.isShares,
    onboarderArgs.cuts,
    onboarderArgs.amounts,
    onboarderArgs.details
  );
  
  let result = await summonOnboarder1.wait();
  if (
    result &&
    result.events &&
    result.events[1] &&
    result.events[1].args &&
    result.events[1].args.onboarder
  ) {
    // console.log("onboarder", result.events[1].args.onboarder);
    onboarderAddress = result.events[1].args.onboarder;
  }  

  const onboarder = onboarderSingleton.attach(onboarderAddress);

  return onboarderAddress;
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

describe("Onboarder", function () {
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

  let OnboarderFactory: ContractFactory;
  let onboarderSingleton: EthOnboarderShaman;
  let OnboarderSummonerFactory: ContractFactory;
  let onboarderSummoner: EthOnboarderShamanSummoner;
  let onboarder: EthOnboarderShaman;

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
    OnboarderFactory = await ethers.getContractFactory("EthOnboarderShaman");
    onboarderSingleton =
      (await OnboarderFactory.deploy()) as EthOnboarderShaman;
    OnboarderSummonerFactory = await ethers.getContractFactory(
      "EthOnboarderShamanSummoner"
    );
    onboarderSummoner = (await OnboarderSummonerFactory.deploy(
      onboarderSingleton.address
    )) as EthOnboarderShamanSummoner;
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
      ethers.utils.parseUnits("100.0", "ether")
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
  });

  describe.only("onboarder", function () {

    it("mint shares on sending eth", async function () {
      const amount = ethers.utils.parseUnits("5.250", "ether");
      const onboarderArgs = {
        expiery: Math.floor(Date.now() / 1000) + 86400 * 365,
        multiply: 100,
        minTribute: ethers.utils.parseUnits("0.01", "ether"),
        details: "test",
        isShares: true,
        cuts: [],
        amounts: [],
      };
      console.log("summoning");
      

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        multisend,
        onboarderSingleton,
        onboarderSummoner,
        baal
      );      
      const id = await setShamanProposal(baal, multisend, onboarderAddress, 7);
      const applicantToken = token.connect(s2);
      await applicantToken.approve(
        onboarderAddress,
        amount
      );

      onboarder = onboarderSingleton.attach(onboarderAddress);
      const applicantOnboarder = onboarder.connect(s2);

      const s2BalanceBefore = await ethers.provider.getBalance(s2.address);
      const s2SharesBefore = await sharesToken.balanceOf(s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      const s2BalanceAfter = await ethers.provider.getBalance(s2.address);
      const s2SharesAfter = await sharesToken.balanceOf(s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      const baalTotalShares = await baal.totalShares();
      console.log('s2BalanceAfter', s2BalanceAfter);
      console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.mul(onboarderArgs.multiply))
      );

      expect(s2SharesAfter).to.equal(s2SharesBefore.add(amount.mul(onboarderArgs.multiply)));


    });
    it("mint loot on sending token", async function () {
      const onboarderArgs = {
        expiery: Math.floor(Date.now() / 1000) + 86400 * 365,
        multiply: 100,
        minTribute: ethers.utils.parseUnits("0.01", "ether"),
        details: "test",
        isShares: false,
        cuts: [],
        amounts: [],
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        multisend,
        onboarderSingleton,
        onboarderSummoner,
        baal
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, 7);

      onboarder = onboarderSingleton.attach(onboarderAddress);
      const applicantOnboarder = onboarder.connect(s2);

      const s2BalanceBefore = await ethers.provider.getBalance(s2.address);
      const s2LootBefore = await lootToken.balanceOf(s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await applicantOnboarder.onboarder({value: ethers.utils.parseEther("1.0")});
        // ethers.utils.parseUnits("1.0", "ether")

      const s2BalanceAfter = await ethers.provider.getBalance(s2.address);
      const s2LootAfter = await lootToken.balanceOf(s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      const baalTotalShares = await baal.totalShares();

      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(ethers.utils.parseEther("1.0").mul(onboarderArgs.multiply))
      );

      expect(s2LootAfter).to.equal(s2LootBefore.add(ethers.utils.parseEther("1.0").mul(onboarderArgs.multiply)));
    });

    it("mint shares on sending eth minus fees", async function () {
      const amount = ethers.utils.parseUnits("1.0", "ether");
      const fee = 250000;
      const onboarderArgs = {
        expiery: Math.floor(Date.now() / 1000) + 86400 * 365,
        multiply: 100,
        minTribute: ethers.utils.parseUnits("0.01", "ether"),
        details: "test",
        isShares: true,
        cuts: [s1.address],
        amounts: [fee],
      };
      console.log("summoning");
      

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        multisend,
        onboarderSingleton,
        onboarderSummoner,
        baal
      );      
      const id = await setShamanProposal(baal, multisend, onboarderAddress, 7);
      const applicantToken = token.connect(s2);
      await applicantToken.approve(
        onboarderAddress,
        amount
      );

      onboarder = onboarderSingleton.attach(onboarderAddress);
      const applicantOnboarder = onboarder.connect(s2);

      const baalBalanceBefore = await ethers.provider.getBalance(await baal.target());
      const s1BalanceBefore = await ethers.provider.getBalance(s1.address);
      const s2SharesBefore = await sharesToken.balanceOf(s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      const baalBalanceAfter = await ethers.provider.getBalance(await baal.target());
      const s2SharesAfter = await sharesToken.balanceOf(s2.address);
      const s1BalanceAfter = await ethers.provider.getBalance(s1.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      const baalTotalShares = await baal.totalShares();
      console.log('baalBalanceAfter', baalBalanceAfter);
      console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.sub(amount.div(1e6).mul(fee)).mul(onboarderArgs.multiply))
      );

      expect(baalBalanceAfter).to.equal(
        baalBalanceBefore.add(amount.sub(amount.div(1e6).mul(fee)))
      );

      expect(s1BalanceAfter).to.equal(
        s1BalanceBefore.add(amount.div(1e6).mul(fee))
      );

    });

    it("mint shares on sending eth minus fee splits to multiple", async function () {
      const amount = ethers.utils.parseUnits("1.0", "ether");
      const fee = 2500; // .25% 
      const fee2 = 10000; // 1%
      const fee3 = 37500; // 3.75%
      const totalFee = fee + fee2 + fee3;
      const onboarderArgs = {
        expiery: Math.floor(Date.now() / 1000) + 86400 * 365,
        multiply: 100,
        minTribute: ethers.utils.parseUnits("0.01", "ether"),
        details: "test",
        isShares: true,
        cuts: [s1.address, s3.address, s4.address],
        amounts: [fee, fee2, fee3],
      };
      console.log("summoning");
      

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        multisend,
        onboarderSingleton,
        onboarderSummoner,
        baal
      );      
      const id = await setShamanProposal(baal, multisend, onboarderAddress, 7);
      const applicantToken = token.connect(s2);
      await applicantToken.approve(
        onboarderAddress,
        amount
      );

      onboarder = onboarderSingleton.attach(onboarderAddress);
      const applicantOnboarder = onboarder.connect(s2);

      const baalBalanceBefore = await ethers.provider.getBalance(await baal.target());
      const s1BalanceBefore = await ethers.provider.getBalance(s1.address);
      const s3BalanceBefore = await ethers.provider.getBalance(s3.address);
      const s4BalanceBefore = await ethers.provider.getBalance(s4.address);
      const s2SharesBefore = await sharesToken.balanceOf(s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      const baalBalanceAfter = await ethers.provider.getBalance(await baal.target());
      const s2SharesAfter = await sharesToken.balanceOf(s2.address);
      const s1BalanceAfter = await ethers.provider.getBalance(s1.address);
      const s3BalanceAfter = await ethers.provider.getBalance(s3.address);
      const s4BalanceAfter = await ethers.provider.getBalance(s4.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      const baalTotalShares = await baal.totalShares();
      console.log('baalBalanceAfter', baalBalanceAfter);
      console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      console.log("baalTotalSupply delta");
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.sub(amount.div(1e6).mul(totalFee)).mul(onboarderArgs.multiply))
      );

      console.log("baalBalance delta");
      expect(baalBalanceAfter).to.equal(
        baalBalanceBefore.add(amount.sub(amount.div(1e6).mul(totalFee)))
      );
      console.log("s1 balance delta");
      expect(s1BalanceAfter).to.equal(
        s1BalanceBefore.add(amount.div(1e6).mul(fee))
      );
      console.log("s3 balance delta");
      expect(s3BalanceAfter).to.equal(
        s3BalanceBefore.add(amount.div(1e6).mul(fee2))
      );
      console.log("s4 balance delta");
      expect(s4BalanceAfter).to.equal(
        s4BalanceBefore.add(amount.div(1e6).mul(fee3))
      );

    });

    it("revert if doesn't meet min tribute", async function () {
      const amount = ethers.utils.parseUnits("0.009", "ether");
      const fee = 250000;
      const onboarderArgs = {
        expiery: Math.floor(Date.now() / 1000) + 86400 * 365,
        multiply: 100,
        minTribute: ethers.utils.parseUnits("0.01", "ether"),
        details: "test",
        isShares: true,
        cuts: [s1.address],
        amounts: [fee],
      };
      console.log("summoning");
      

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        multisend,
        onboarderSingleton,
        onboarderSummoner,
        baal
      );      
      const id = await setShamanProposal(baal, multisend, onboarderAddress, 7);
      const applicantToken = token.connect(s2);
      await applicantToken.approve(
        onboarderAddress,
        amount
      );

      onboarder = onboarderSingleton.attach(onboarderAddress);
      const applicantOnboarder = onboarder.connect(s2);
      
      
      const tribute = applicantOnboarder.onboarder({value: amount});

      await expect(tribute).to.be.revertedWith("!minTribute");

    });
  });
});
