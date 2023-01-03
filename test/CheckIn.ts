import { ethers } from 'hardhat';
import { solidity } from 'ethereum-waffle';
import { use, expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import { decodeMultiAction, encodeMultiAction } from '../src/util';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { buildContractCall } from '@gnosis.pm/safe-contracts';
import { ContractFactory, ContractTransaction } from 'ethers';
import { Test } from 'mocha';
import {
  CompatibilityFallbackHandler,
  GnosisSafe,
  MultiSend,
  MyToken,
} from '../src/types';
import {
  Baal,
  BaalSummoner,
} from '../src/types/contracts/fixtures/Baal/contracts';
import { Loot } from '../src/types/contracts/fixtures/Baal/contracts/LootERC20.sol';
import { Shares } from '../src/types/contracts/fixtures/Baal/contracts/SharesERC20.sol';
import { CheckInShaman } from '../src/types/contracts/checkIn/CheckIn.sol';
import { CheckInSummoner } from '../src/types/contracts/checkIn/CheckIn.sol/CheckInSummoner';

use(solidity);

const zeroAddress = '0x0000000000000000000000000000000000000000';

const SECONDS = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 60 * 60 * 24,
  WEEK: 60 * 60 * 24 * 7,
};
// BASE UNITS WEI PER SECOND

const ONE_SHARE_PER_HOUR = 277777777777778;

async function blockTime() {
  const block = await ethers.provider.getBlock('latest');
  return block.timestamp;
}

// async function blockNumber() {
//   const block = await ethers.provider.getBlock('latest');
//   return block.number;
// }

async function moveForwardPeriods(periods: number, extra?: number) {
  const goToTime =
    (await blockTime()) +
    defaultDAOSettings.VOTING_PERIOD_IN_SECONDS * periods +
    (extra ? extra : 0);
  await ethers.provider.send('evm_mine', [goToTime]);
  return true;
}

const setShamanProposal = async function (
  baal: Baal,
  multisend: MultiSend,
  shamanAddress: string,
  permission: BigNumberish
) {
  const setShaman = baal.interface.encodeFunctionData('setShamans', [
    [shamanAddress],
    [permission],
  ]);
  const setShamanAction = encodeMultiAction(
    multisend,
    [setShaman],
    [baal.address],
    [BigNumber.from(0)],
    [0]
  );
  await baal.submitProposal(setShamanAction, 0, 0, '');
  const proposalId = await baal.proposalCount();
  await baal.submitVote(proposalId, true);
  await moveForwardPeriods(2);
  await baal.processProposal(proposalId, setShamanAction);
  return proposalId;
};

type CheckInInitArgs = {
  baalAddress: string;
  sharesOrLoot: boolean;
  sharesPerSecond: number;
  checkInInterval: number;
};

const summonCheckInShaman = async function (
  initArgs: CheckInInitArgs,
  checkInShaman: CheckInShaman,
  checkInSummoner: CheckInSummoner
) {
  const { baalAddress, sharesOrLoot, sharesPerSecond, checkInInterval } =
    initArgs;
  const checkInSummonTx = await checkInSummoner.summon(
    baalAddress,
    sharesOrLoot,
    sharesPerSecond,
    checkInInterval
  );
  const result = await checkInSummonTx.wait();

  if (result.events?.[1]?.args?.shamanAddress) {
    const shamanAddress = result.events[1].args.shamanAddress;
    checkInShaman.attach(shamanAddress);
    return shamanAddress;
  }
  throw new Error('no shaman address found');
};

const getNewBaalAddresses = async (
  tx: ContractTransaction
): Promise<{ baal: string; loot: string; safe: string }> => {
  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  // console.log({logs: receipt.logs})
  let baalSummonAbi = [
    'event SummonBaal(address indexed baal, address indexed loot, address indexed shares, address safe, bool existingSafe)',
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
  TOKEN_NAME: 'BAALtests',
  TOKEN_SYMBOL: 'BAAL',
};

// const metadataConfig = {
//   CONTENT: '{"name":"test"}',
//   TAG: 'daohaus.summoner.daoProfile',
// };

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
    ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
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
    'setAdminConfig',
    adminConfig
  );
  const setGovernanceConfig = await baal.interface.encodeFunctionData(
    'setGovernanceConfig',
    [governanceConfig]
  );

  const mintShares = await baal.interface.encodeFunctionData(
    'mintShares',
    shares
  );
  const mintLoot = await baal.interface.encodeFunctionData('mintLoot', loots);

  const initalizationActions = [
    setAdminConfig,
    setGovernanceConfig,
    mintShares,
    mintLoot,
  ];

  return {
    initParams: abiCoder.encode(
      ['string', 'string'],
      [config.TOKEN_NAME, config.TOKEN_SYMBOL]
    ),
    initalizationActions,
  };
};

const setupBaal = async (
  baal: Baal,
  config: DAOSettings,
  adminConfig: [boolean, boolean],
  shares: [string[], number[]],
  loots: [string[], number[]],
  baalSummoner: BaalSummoner
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

describe('CheckIn Shaman Initialize', function () {
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

  let CheckInFactory: ContractFactory;
  let checkInSingleton: CheckInShaman;
  let checkInShaman: CheckInShaman;

  let CheckInSummonerFactory: ContractFactory;
  let checkInSummonerSingleton: CheckInSummoner;

  let proposal: { [key: string]: any };

  const loot = 500;
  const shares = 100;
  const sharesPaused = false;
  const lootPaused = false;

  this.beforeAll(async function () {
    LootFactory = await ethers.getContractFactory('Loot');
    lootSingleton = (await LootFactory.deploy()) as Loot;

    SharesFactory = await ethers.getContractFactory('Shares');
    sharesSingleton = (await SharesFactory.deploy()) as Shares;

    BaalFactory = await ethers.getContractFactory('Baal');
    baalSingleton = (await BaalFactory.deploy()) as Baal;

    CheckInFactory = await ethers.getContractFactory('CheckInShaman');
    checkInSingleton = (await CheckInFactory.deploy()) as CheckInShaman;

    CheckInSummonerFactory = await ethers.getContractFactory('CheckInSummoner');
    checkInSummonerSingleton = (await CheckInSummonerFactory.deploy(
      checkInSingleton.address
    )) as CheckInSummoner;
  });

  beforeEach(async function () {
    const GnosisSafe = await ethers.getContractFactory('GnosisSafe');
    const BaalSummoner = await ethers.getContractFactory('BaalSummoner');
    const CompatibilityFallbackHandler = await ethers.getContractFactory(
      'CompatibilityFallbackHandler'
    );
    const BaalContract = await ethers.getContractFactory('Baal');
    const MultisendContract = await ethers.getContractFactory('MultiSend');
    const GnosisSafeProxyFactory = await ethers.getContractFactory(
      'GnosisSafeProxyFactory'
    );
    const ModuleProxyFactory = await ethers.getContractFactory(
      'ModuleProxyFactory'
    );

    [summoner, applicant, s1, s2, s3, s4, s5, s6] = await ethers.getSigners();

    ERC20 = await ethers.getContractFactory('MyToken');
    token = (await ERC20.deploy(
      ethers.utils.parseUnits('100000.0', 'ether')
    )) as MyToken;
    applicantToken = token.connect(applicant);

    await token.transfer(
      applicant.address,
      ethers.utils.parseUnits('10.0', 'ether')
    );
    await token.transfer(s2.address, ethers.utils.parseUnits('10.0', 'ether'));

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
        [summoner.address, applicant.address, s1.address],
        [shares, shares, shares],
      ],
      [
        [summoner.address, applicant.address, s1.address],
        [loot, loot, loot],
      ],
      baalSummoner
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
      ['0x'],
      [baal.address],
      [BigNumber.from(0)],
      [0]
    );

    proposal = {
      flag: 0,
      account: applicant.address,
      data: selfTransferAction,
      details: 'all hail baal',
      expiration: 0,
      baalGas: 0,
    };
  });

  describe('CheckIn Shaman Claim', function () {
    it('Mints shares if initialized with shares', async function () {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        sharesOrLoot: true,
        sharesPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShaman;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const s1SharesBefore = await sharesToken.balanceOf(s1.address);
      const s1LootBefore = await lootToken.balanceOf(s1.address);
      const lootTotalSupplyBefore = await lootToken.totalSupply();

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim(THREE_HOURS_WORKED);

      const s1SharesAfter = await sharesToken.balanceOf(s1.address);
      const s1LootAfter = await lootToken.balanceOf(s1.address);

      const sharesTotalSupplyAfter = await sharesToken.totalSupply();
      const lootTotalSupplyAfter = await lootToken.totalSupply();

      const AMT_MINTED = (
        BigInt(THREE_HOURS_WORKED) * BigInt(ONE_SHARE_PER_HOUR)
      ).toString();

      expect(s1SharesAfter.sub(s1SharesBefore)).to.equal(AMT_MINTED);
      expect(sharesTotalSupplyAfter.sub(sharesTotalSupplyBefore)).to.equal(
        AMT_MINTED
      );
      expect(s1LootBefore).to.equal(s1LootAfter);
      expect(lootTotalSupplyBefore).to.equal(lootTotalSupplyAfter);
    });
    it('mints loot if initialized with loot', async function () {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        sharesOrLoot: false,
        sharesPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShaman;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const s1SharesBefore = await sharesToken.balanceOf(s1.address);
      const s1LootBefore = await lootToken.balanceOf(s1.address);

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();
      const lootTotalSupplyBefore = await lootToken.totalSupply();
      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;

      await daoMemberCheckIn.claim(THREE_HOURS_WORKED);

      const s1SharesAfter = await sharesToken.balanceOf(s1.address);
      const s1LootAfter = await lootToken.balanceOf(s1.address);

      const sharesTotalSupplyAfter = await sharesToken.totalSupply();
      const lootTotalSupplyAfter = await lootToken.totalSupply();
      const AMT_MINTED = (
        BigInt(THREE_HOURS_WORKED) * BigInt(ONE_SHARE_PER_HOUR)
      ).toString();

      expect(s1LootAfter.sub(s1LootBefore)).to.equal(AMT_MINTED);
      expect(lootTotalSupplyAfter.sub(lootTotalSupplyBefore)).to.equal(
        AMT_MINTED
      );
      expect(s1SharesBefore).to.equal(s1SharesAfter);
      expect(sharesTotalSupplyAfter).to.equal(sharesTotalSupplyBefore);
    });
    it('revert if a user tries a doublespend', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        sharesOrLoot: true,
        sharesPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShaman;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim(THREE_HOURS_WORKED);

      await expect(
        daoMemberCheckIn.claim(THREE_HOURS_WORKED)
      ).to.be.revertedWith('Can only claim 1 time per interval');
    });
    it('should revert if claimer is not a member', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        sharesOrLoot: true,
        sharesPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShaman;
      const daoMemberCheckIn = checkInShaman.connect(s2);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await expect(
        daoMemberCheckIn.claim(THREE_HOURS_WORKED)
      ).to.be.revertedWith(
        'Members Only: Must have DAO tokens in order to claim through this shaman'
      );
    });
    it('should revert if claimer tries to claim more than the interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        sharesOrLoot: true,
        sharesPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShaman;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      await expect(daoMemberCheckIn.claim(SECONDS.DAY)).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
      await expect(daoMemberCheckIn.claim(SECONDS.DAY + 1)).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
    });
  });
});
