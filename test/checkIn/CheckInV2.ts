import { expect } from 'chai';
import { ethers, getNamedAccounts } from 'hardhat';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import {
  baalSetup,
  encodeMultiAction,
  NewBaalParams,
  ProposalHelpers,
  SHAMAN_PERMISSIONS,
  Signer,
  setupBaal
} from '@daohaus/baal-contracts/hardhat';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import { MultiSend, TestERC20 } from '../../src/types';
import { CheckInShamanV2, CheckInV2Summoner } from '../../src/types/contracts/checkIn/CheckInV2.sol';

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

type Scales = [number, number, number, number, number];

const DYNAMIC_RATES: Scales = [60, 80, 100, 120, 140];
const STATIC_RATES: Scales = [100, 100, 100, 100, 100];

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

const simulateProposal = async ({
  baal,
  multisend,
  targetAddress,
  txData,
  proposalHelpers,
}: {
  baal: Baal;
  multisend: MultiSend;
  targetAddress: string;
  txData: string;
  proposalHelpers: ProposalHelpers;
}) => {
  const encodedAction = encodeMultiAction(
    multisend,
    [txData],
    [targetAddress],
    [BigNumber.from(0)],
    [0]
  );

  const proposalId = await baal.proposalCount() + 1;

  await proposalHelpers.submitAndProcessProposal({
    baal,
    encodedAction,
    proposal: {
      data: '0x',
      details: '',
      expiration: '0',
      flag: '0',
      baalGas: '0',
      
    },
    proposalId,
  });

  return proposalId;
};

type CheckInSetup = {
  summoner: CheckInV2Summoner;
}

type CheckInInitArgs = {
  sharesOrLoot: boolean;
  tokenPerSecond: BigNumberish;
  checkInInterval: BigNumberish;
  teamLead: string;
  valueScalePercs: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish];
  projectMetadata: string;
};

const summonCheckInShaman = async function (
  baal: Baal,
  checkInSummoner: CheckInV2Summoner,
  initArgs: CheckInInitArgs
) {
  const {
    teamLead,
    sharesOrLoot,
    tokenPerSecond,
    checkInInterval,
    valueScalePercs,
    projectMetadata,
  } = initArgs;

  const checkInSummonTx = await checkInSummoner.summon(
    baal.address,
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
    return shamanAddress;
  }
  throw new Error('no shaman address found');
};

describe('CheckIn ShamanV2 Initialize', function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let token: TestERC20;

  let checkInSummoner: CheckInV2Summoner;

  let users: {
    [key: string]: Signer;
  };

  const shamanPermissions = SHAMAN_PERMISSIONS.MANAGER; // 2

  const defaultCheckInSummonArgs: CheckInInitArgs = {
    teamLead: ethers.constants.AddressZero,
    sharesOrLoot: true,
    tokenPerSecond: ONE_SHARE_PER_HOUR,
    checkInInterval: SECONDS.DAY,
    valueScalePercs: STATIC_RATES,
    projectMetadata: 'test',
  };

  let proposalHelpers: ProposalHelpers;

  beforeEach(async function () {
    const {
      Baal,
      Loot,
      Shares,
      MultiSend,
      DAI,
      signers,
      helpers,
    } = await baalSetup({
      fixtureTags: ['CheckInShamanV2'],
      setupBaalOverride: async (params: NewBaalParams) => {
        console.log('OVERRIDE baal setup ******');
        const { deployer } = await getNamedAccounts();
        checkInSummoner =
          (await ethers.getContract('CheckInV2Summoner', deployer)) as CheckInV2Summoner;
        
        return setupBaal(params);
      },
    });

    baal = Baal;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    token = DAI;
    users = signers;

    proposalHelpers = helpers;
  });

  describe('CheckIn Shaman Claim V2', function () {
    it('Mints shares if initialized with shares', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const s1SharesBefore = await sharesToken.balanceOf(users.applicant.address);
      const s1LootBefore = await lootToken.balanceOf(users.applicant.address);
      const lootTotalSupplyBefore = await lootToken.totalSupply();

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], '');

      const s1SharesAfter = await sharesToken.balanceOf(users.applicant.address);
      const s1LootAfter = await lootToken.balanceOf(users.applicant.address);

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

    it('mints loot if initialized with loot', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
        sharesOrLoot: false,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const s1SharesBefore = await sharesToken.balanceOf(users.applicant.address);
      const s1LootBefore = await lootToken.balanceOf(users.applicant.address);

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();
      const lootTotalSupplyBefore = await lootToken.totalSupply();
      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;

      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], '');

      const s1SharesAfter = await sharesToken.balanceOf(users.applicant.address);
      const s1LootAfter = await lootToken.balanceOf(users.applicant.address);

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
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA);

      await expect(
        daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA)
      ).to.be.revertedWith('Can only claim 1 time per interval');
    });

    it('should revert if claimer is not a member', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await expect(
        daoMemberCheckIn.claim([THREE_HOURS_WORKED], [3], METADATA)
      ).to.be.revertedWith(
        'Members Only: Must have DAO tokens in order to claim through this shaman'
      );
    });

    it('should revert if claimer tries to claim more than the interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

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
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
        valueScalePercs: DYNAMIC_RATES,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

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

      const s1SharesBefore = await sharesToken.balanceOf(users.applicant.address);

      const totalExpectedValue = totalEarned.add(s1SharesBefore);

      await daoMemberCheckIn.claim(TIMES, VALUES, METADATA);
      const s1SharesAfter = await sharesToken.balanceOf(users.applicant.address);

      expect(s1SharesAfter.sub(totalExpectedValue)).to.equal(0);
    });

    it('should revert if a user tries to claim more than the interval over many sessions', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

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
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;
      const daoMemberCheckIn2 = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      await daoMemberCheckIn.lock(true);

      await expect(
        daoMemberCheckIn.claim([3 * SECONDS.HOUR], [3], METADATA)
      ).to.be.revertedWith('Contract is locked.');
      await expect(
        daoMemberCheckIn2.claim([3 * SECONDS.HOUR], [3], METADATA)
      ).to.be.revertedWith('Contract is locked.');
    });

    it('should revert if non-team lead tries to lock or unlock', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;
      const daoMemberCheckIn2 = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

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
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);


      const oldLead = await daoMemberCheckIn.teamLead();

      expect(oldLead).to.equal(users.applicant.address);

      const mutinyAction = daoMemberCheckIn.interface.encodeFunctionData(
        'mutiny',
        [users.s1.address]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: mutinyAction,
        targetAddress: daoMemberCheckIn.address,
        proposalHelpers,
      });
      const newLead = await daoMemberCheckIn.teamLead();

      expect(newLead).to.equal(users.s1.address);
    });

    it('should allow the DAO to change their value scale', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const updateScaleAction = daoMemberCheckIn.interface.encodeFunctionData(
        'updateValueScalePercs',
        [DYNAMIC_RATES]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateScaleAction,
        targetAddress: daoMemberCheckIn.address,
        proposalHelpers,
      });
      const scale0 = await daoMemberCheckIn.valueScalePercs([0]);
      const scale1 = await daoMemberCheckIn.valueScalePercs([1]);
      const scale2 = await daoMemberCheckIn.valueScalePercs([2]);
      const scale3 = await daoMemberCheckIn.valueScalePercs([3]);
      const scale4 = await daoMemberCheckIn.valueScalePercs([4]);

      expect(scale2).to.equal(DYNAMIC_RATES[2]);
      expect(scale0).to.equal(DYNAMIC_RATES[0]);
      expect(scale1).to.equal(DYNAMIC_RATES[1]);
      expect(scale3).to.equal(DYNAMIC_RATES[3]);
      expect(scale4).to.equal(DYNAMIC_RATES[4]);
    });

    it('The DAO should be able to update the Check In interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const oldInterval = await daoMemberCheckIn.checkInInterval();
      expect(oldInterval).to.equal(SECONDS.DAY);

      const updateIntervalAction = daoMemberCheckIn.interface.encodeFunctionData(
        'updateCheckInInterval',
        [6 * SECONDS.DAY]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateIntervalAction,
        targetAddress: daoMemberCheckIn.address,
        proposalHelpers,
      });
      const newInterval = await daoMemberCheckIn.checkInInterval();
      expect(newInterval).to.equal(6 * SECONDS.DAY);
    });

    it('The DAO should be able to the amount of DAO tokens per second reward', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const oldTPS = await daoMemberCheckIn.tokenPerSecond();
      expect(oldTPS).to.equal(ONE_SHARE_PER_HOUR);

      const updateTPSAction = daoMemberCheckIn.interface.encodeFunctionData(
        'updateTokenPerSecond',
        [ONE_SHARE_PER_HOUR * 2]
      );

      await simulateProposal({
        baal,
        multisend,
        txData: updateTPSAction,
        targetAddress: daoMemberCheckIn.address,
        proposalHelpers,
      });
      const newTPS = await daoMemberCheckIn.tokenPerSecond();
      expect(newTPS).to.equal(ONE_SHARE_PER_HOUR * 2);
    });

    it('should revert if a team lead or member tries to call any of the updater functions', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
        teamLead: users.applicant.address,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs,
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShamanV2;
      const daoMemberCheckIn2 = (
        await ethers.getContractAt(
          'CheckInShamanV2',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShamanV2;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      await expect(daoMemberCheckIn2.mutiny(users.s1.address)).to.be.revertedWith(
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

      await expect(daoMemberCheckIn.mutiny(users.s1.address)).to.be.revertedWith(
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
