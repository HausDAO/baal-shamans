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

import { CheckInShamanV2 } from '../src/types/contracts/checkInV2/checkInV2.sol';
import { CheckInV2Summoner } from '../src/types/contracts/checkInV2/checkInV2.sol/CheckInV2Summoner';

use(solidity);

const zeroAddress = '0x0000000000000000000000000000000000000000';

const SECONDS = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 60 * 60 * 24,
  WEEK: 60 * 60 * 24 * 7,
};
// BASE UNITS WEI PER SECOND

const METADATA = JSON.stringify({
  dataVersion: 0.1,
  morale:
    'The endless struggle for survival is a constant reminder of the fragility of life.',
  workDescription:
    'Today, I built a new staking contract for the DAO. I also worked on the CheckIn contract.',
  obstacles:
    'I had to figure out how to use the Safe contracts to build a transaction for the DAO to execute.',
  future:
    'I will continue to work on the CheckIn contract and the DAO staking contract.',
});
const ONE_SHARE_PER_HOUR = 277777777777778;

async function blockTime() {
  const block = await ethers.provider.getBlock('latest');
  return block.timestamp;
}

type Scales = [number, number, number, number, number];

const DYNAMIC_RATES: Scales = [60, 80, 100, 120, 140];
const STATIC_RATES: Scales = [100, 100, 100, 100, 100];

// async function blockNumber() {
//   const block = await ethers.provider.getBlock('latest');
//   return block.number;
// }

const calculateSessions = (
  times: number[],
  values: number[],
  scales: Scales,
  sharesPerSecond: number
) => {
  let totalEarned = BigNumber.from(0);

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const perc = scales[values[i]];

    const earned = BigNumber.from(time).mul(sharesPerSecond).mul(perc).div(100);
    totalEarned = totalEarned.add(earned);
  }

  return totalEarned;
};

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

const simulateProposal = async ({
  txData,
  baal,
  multisend,
  targetAddress,
}: {
  txData: string;
  baal: Baal;
  multisend: MultiSend;
  targetAddress: string;
}) => {
  const action = encodeMultiAction(
    multisend,
    [txData],
    [targetAddress],
    [BigNumber.from(0)],
    [0]
  );

  await baal.submitProposal(action, 0, 0, '');
  const proposalId = await baal.proposalCount();
  await baal.submitVote(proposalId, true);
  await moveForwardPeriods(2);
  const result = await baal.processProposal(proposalId, action);
  const receipt = await result.wait();
  // console.log('result', result);
  // console.log('receipt', receipt);
  // console.log(
  //   'receipt args',
  //   receipt.events?.find((event) => event.event === 'ProcessProposal')
  // );
  return proposalId;
};

type CheckInInitArgs = {
  baalAddress: string;
  sharesOrLoot: boolean;
  tokenPerSecond: number;
  checkInInterval: number;
  teamLead: string;
  valueScalePercs: [number, number, number, number, number];
  projectMetadata: string;
};

const summonCheckInShaman = async function (
  initArgs: CheckInInitArgs,
  checkInShaman: CheckInShamanV2,
  checkInSummoner: CheckInV2Summoner
) {
  const {
    teamLead,
    baalAddress,
    sharesOrLoot,
    tokenPerSecond,
    checkInInterval,
    valueScalePercs,
    projectMetadata,
  } = initArgs;
  const checkInSummonTx = await checkInSummoner.summon(
    baalAddress,
    teamLead,
    sharesOrLoot,
    tokenPerSecond,
    checkInInterval,
    valueScalePercs,
    projectMetadata
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

describe('CheckIn ShamanV2 Initialize', function () {
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
  let checkInSingleton: CheckInShamanV2;
  let checkInShaman: CheckInShamanV2;

  let CheckInSummonerFactory: ContractFactory;
  let checkInSummonerSingleton: CheckInV2Summoner;

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

    CheckInFactory = await ethers.getContractFactory('CheckInShamanV2');
    checkInSingleton = (await CheckInFactory.deploy()) as CheckInShamanV2;

    CheckInSummonerFactory = await ethers.getContractFactory(
      'CheckInV2Summoner'
    );
    checkInSummonerSingleton = (await CheckInSummonerFactory.deploy(
      checkInSingleton.address
    )) as CheckInV2Summoner;
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
        [summoner.address, applicant.address, s1.address, s2.address],
        [shares, shares, shares, shares],
      ],
      [
        [summoner.address, applicant.address, s1.address, s2.address],
        [loot, loot, loot, loot],
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

  describe('CheckIn Shaman Claim V2', function () {
    it('Mints shares if initialized with shares', async function () {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const s1SharesBefore = await sharesToken.balanceOf(s1.address);
      const s1LootBefore = await lootToken.balanceOf(s1.address);
      const lootTotalSupplyBefore = await lootToken.totalSupply();

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], '');

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
        teamLead: s1.address,
        sharesOrLoot: false,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const s1SharesBefore = await sharesToken.balanceOf(s1.address);
      const s1LootBefore = await lootToken.balanceOf(s1.address);

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();
      const lootTotalSupplyBefore = await lootToken.totalSupply();
      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;

      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], '');

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
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA);

      await expect(
        daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA)
      ).to.be.revertedWith('Can only claim 1 time per interval');
    });
    it('should revert if claimer is not a member', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s3);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await expect(
        daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA)
      ).to.be.revertedWith(
        'Members Only: Must have DAO tokens in order to claim through this shaman'
      );
    });
    it('should revert if claimer tries to claim more than the interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);

      await setShamanProposal(baal, multisend, checkInAddress, 2);

      // reverts if equal
      await expect(
        daoMemberCheckIn.claim([SECONDS.DAY], [3], METADATA)
      ).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
      // reverts if greater-than
      await expect(
        daoMemberCheckIn.claim([SECONDS.DAY + 1], [3], METADATA)
      ).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
    });
    it('should reward users based on varying value levels and times for multiple sessions', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: DYNAMIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const TIMES = [
        2 * SECONDS.HOUR,
        2 * SECONDS.HOUR,
        1 * SECONDS.HOUR,
        3 * SECONDS.HOUR,
      ];
      const VALUES = [0, 4, 3, 2];

      const totalEarned = calculateSessions(
        TIMES,
        VALUES,
        DYNAMIC_RATES,
        ONE_SHARE_PER_HOUR
      );

      const s1SharesBefore = await sharesToken.balanceOf(s1.address);

      const totalExpectedValue = totalEarned.add(s1SharesBefore);

      await daoMemberCheckIn.claim(TIMES, VALUES, METADATA);
      const s1SharesAfter = await sharesToken.balanceOf(s1.address);

      expect(s1SharesAfter.sub(totalExpectedValue)).to.equal(0);
    });
    it('should revert if a user tries to claim more than the interval over many sessions', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const SIX_HOURS_WORKED = 6 * SECONDS.HOUR;

      await expect(
        daoMemberCheckIn.claim(
          [
            SIX_HOURS_WORKED,
            SIX_HOURS_WORKED,
            SIX_HOURS_WORKED,
            SIX_HOURS_WORKED + 1,
          ],
          [3, 3, 3, 3],
          METADATA
        )
      ).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
    });
    it('should revert if contract is locked', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      const daoMemberCheckIn2 = checkInShaman.connect(s2);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      await daoMemberCheckIn.lock(true);

      await expect(
        daoMemberCheckIn.claim([3 * SECONDS.HOUR], [3], METADATA)
      ).to.be.revertedWith('Contract is locked');
      await expect(
        daoMemberCheckIn2.claim([3 * SECONDS.HOUR], [3], METADATA)
      ).to.be.revertedWith('Contract is locked');
    });
    it('should revert if non-team lead tries to lock or unlock', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      const daoMemberCheckIn2 = checkInShaman.connect(s2);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      await expect(daoMemberCheckIn2.lock(true)).to.be.revertedWith(
        'Only teamLead can lock or unlock this shaman'
      );
      await daoMemberCheckIn.lock(true);

      await expect(daoMemberCheckIn2.lock(false)).to.be.revertedWith(
        'Only teamLead can lock or unlock this shaman'
      );
    });
  });

  describe('CheckInShamanV2 - Updating shaman config', () => {
    it('should allow members to use a proposal to remove the team lead', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      await setShamanProposal(baal, multisend, checkInAddress, 2);
      const oldLead = await checkInShaman.teamLead();

      expect(oldLead).to.equal(s1.address);
      const mutinyAction = checkInShaman.interface.encodeFunctionData(
        'mutiny',
        [s2.address]
      );
      await simulateProposal({
        baal,
        multisend,
        txData: mutinyAction,
        targetAddress: checkInShaman.address,
      });
      const newLead = await checkInShaman.teamLead();

      expect(newLead).to.equal(s2.address);
    });
    it('should allow the DAO to change their value scale', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;

      await setShamanProposal(baal, multisend, checkInAddress, 2);
      const updateScaleAction = checkInShaman.interface.encodeFunctionData(
        'updateValueScalePercs',
        [DYNAMIC_RATES]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateScaleAction,
        targetAddress: checkInShaman.address,
      });
      const scale0 = await checkInShaman.valueScalePercs([0]);
      const scale1 = await checkInShaman.valueScalePercs([1]);
      const scale2 = await checkInShaman.valueScalePercs([2]);
      const scale3 = await checkInShaman.valueScalePercs([3]);
      const scale4 = await checkInShaman.valueScalePercs([4]);

      expect(scale2).to.equal(DYNAMIC_RATES[2]);
      expect(scale0).to.equal(DYNAMIC_RATES[0]);
      expect(scale1).to.equal(DYNAMIC_RATES[1]);
      expect(scale3).to.equal(DYNAMIC_RATES[3]);
      expect(scale4).to.equal(DYNAMIC_RATES[4]);
    });
    it('The DAO should be able to update the Check In interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;

      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const oldInterval = await checkInShaman.checkInInterval();
      expect(oldInterval).to.equal(SECONDS.DAY);

      const updateIntervalAction = checkInShaman.interface.encodeFunctionData(
        'updateCheckInInterval',
        [6 * SECONDS.DAY]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateIntervalAction,
        targetAddress: checkInShaman.address,
      });
      const newInterval = await checkInShaman.checkInInterval();
      expect(newInterval).to.equal(6 * SECONDS.DAY);
    });
    it('The DAO should be able to the amount of DAO tokens per second reward', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;

      await setShamanProposal(baal, multisend, checkInAddress, 2);

      const oldTPS = await checkInShaman.tokenPerSecond();
      expect(oldTPS).to.equal(ONE_SHARE_PER_HOUR);

      const updateTPSAction = checkInShaman.interface.encodeFunctionData(
        'updateTokenPerSecond',
        [ONE_SHARE_PER_HOUR * 2]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateTPSAction,
        targetAddress: checkInShaman.address,
      });
      const newTPS = await checkInShaman.tokenPerSecond();
      expect(newTPS).to.equal(ONE_SHARE_PER_HOUR * 2);
    });
    it('should revert if a team lead or member tries to call any of the updater functions', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        baalAddress: baal.address,
        teamLead: s1.address,
        sharesOrLoot: true,
        tokenPerSecond: ONE_SHARE_PER_HOUR,
        checkInInterval: SECONDS.DAY,
        valueScalePercs: STATIC_RATES,
        projectMetadata: 'test',
      };
      const checkInAddress = await summonCheckInShaman(
        checkInSummonArgs,
        checkInSingleton,
        checkInSummonerSingleton
      );

      checkInShaman = CheckInFactory.attach(checkInAddress) as CheckInShamanV2;
      const daoMemberCheckIn = checkInShaman.connect(s1);
      const daoMemberCheckIn2 = checkInShaman.connect(s2);
      await setShamanProposal(baal, multisend, checkInAddress, 2);

      await expect(daoMemberCheckIn2.mutiny(s2.address)).to.be.revertedWith(
        'This can only be called by a Baal Proposal'
      );
      await expect(
        daoMemberCheckIn2.updateTokenPerSecond(ONE_SHARE_PER_HOUR)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');
      await expect(
        daoMemberCheckIn2.updateCheckInInterval(SECONDS.DAY)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');
      await expect(
        daoMemberCheckIn2.updateValueScalePercs(STATIC_RATES)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');

      await expect(daoMemberCheckIn.mutiny(s2.address)).to.be.revertedWith(
        'This can only be called by a Baal Proposal'
      );
      await expect(
        daoMemberCheckIn.updateTokenPerSecond(ONE_SHARE_PER_HOUR)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');
      await expect(
        daoMemberCheckIn.updateCheckInInterval(SECONDS.DAY)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');
      await expect(
        daoMemberCheckIn.updateValueScalePercs(STATIC_RATES)
      ).to.be.revertedWith('This can only be called by a Baal Proposal');
    });
  });
});
