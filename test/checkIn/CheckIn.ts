import { expect } from 'chai';
import { ethers, getNamedAccounts } from 'hardhat';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import {
  baalSetup,
  NewBaalParams,
  ProposalHelpers,
  SHAMAN_PERMISSIONS,
  Signer,
  setupBaal
} from '@daohaus/baal-contracts/hardhat';
import { BigNumberish } from '@ethersproject/bignumber';

import { MultiSend, TestERC20 } from '../../src/types';
import { CheckInShaman, CheckInSummoner } from '../../src/types/contracts/checkIn/CheckIn.sol';

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

type CheckInSetup = {
  summoner: CheckInSummoner;
};

type CheckInInitArgs = {
  sharesOrLoot: boolean;
  sharesPerSecond: BigNumberish;
  checkInInterval: BigNumberish;
};

const summonCheckInShaman = async (
  baal: Baal,
  checkInSummoner: CheckInSummoner,
  initArgs: CheckInInitArgs
) => {
  const { sharesOrLoot, sharesPerSecond, checkInInterval } =
    initArgs;
  const checkInSummonTx = await checkInSummoner.summon(
    baal.address,
    sharesOrLoot,
    sharesPerSecond,
    checkInInterval
  );
  const result = await checkInSummonTx.wait();

  if (result.events?.[1]?.args?.shamanAddress) {
    const shamanAddress = result.events[1].args.shamanAddress;
    return shamanAddress;
  }
  throw new Error('no shaman address found');
};

describe('CheckIn Shaman Initialize', function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let token: TestERC20;

  let checkInSummoner: CheckInSummoner;

  let users: {
    [key: string]: Signer;
  };

  const shamanPermissions = SHAMAN_PERMISSIONS.MANAGER; // 2

  const defaultCheckInSummonArgs: CheckInInitArgs = {
    sharesOrLoot: true,
    sharesPerSecond: ONE_SHARE_PER_HOUR,
    checkInInterval: SECONDS.DAY,
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
      fixtureTags: ['CheckInShaman'],
      setupBaalOverride: async (params: NewBaalParams) => {
        console.log('OVERRIDE baal setup ******');
        const { deployer } = await getNamedAccounts();
        checkInSummoner =
          (await ethers.getContract('CheckInSummoner', deployer)) as CheckInSummoner;
        
        return setupBaal(params);
      }
    });

    baal = Baal;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    token = DAI;
    users = signers;

    proposalHelpers = helpers;
  });

  describe('CheckIn Shaman Claim', function () {
    it('Mints shares if initialized with shares', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShaman',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShaman;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const s1SharesBefore = await sharesToken.balanceOf(users.applicant.address);
      const s1LootBefore = await lootToken.balanceOf(users.applicant.address);
      const lootTotalSupplyBefore = await lootToken.totalSupply();

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim(THREE_HOURS_WORKED, '');

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
        sharesOrLoot: false
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShaman',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShaman;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const s1SharesBefore = await sharesToken.balanceOf(users.applicant.address);
      const s1LootBefore = await lootToken.balanceOf(users.applicant.address);

      const sharesTotalSupplyBefore = await sharesToken.totalSupply();
      const lootTotalSupplyBefore = await lootToken.totalSupply();
      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;

      await daoMemberCheckIn.claim(THREE_HOURS_WORKED, METADATA);

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
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShaman',
          checkInAddress,
          users.applicant.address
        )
      ) as CheckInShaman;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await daoMemberCheckIn.claim(THREE_HOURS_WORKED, METADATA);

      await expect(
        daoMemberCheckIn.claim(THREE_HOURS_WORKED, METADATA)
      ).to.be.revertedWith('Can only claim 1 time per interval');
    });

    it('should revert if claimer is not a member', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs,
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShaman',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShaman;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      const THREE_HOURS_WORKED = 3 * SECONDS.HOUR;
      await expect(
        daoMemberCheckIn.claim(THREE_HOURS_WORKED, METADATA)
      ).to.be.revertedWith(
        'Members Only: Must have DAO tokens in order to claim through this shaman'
      );
    });

    it('should revert if claimer tries to claim more than the interval', async () => {
      const checkInSummonArgs: CheckInInitArgs = {
        ...defaultCheckInSummonArgs
      };
      const checkInAddress = await summonCheckInShaman(
        baal,
        checkInSummoner,
        checkInSummonArgs
      );

      const daoMemberCheckIn = (
        await ethers.getContractAt(
          'CheckInShaman',
          checkInAddress,
          users.s1.address
        )
      ) as CheckInShaman;

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, checkInAddress, shamanPermissions);

      await expect(
        daoMemberCheckIn.claim(SECONDS.DAY, METADATA)
      ).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
      await expect(
        daoMemberCheckIn.claim(SECONDS.DAY + 1, METADATA)
      ).to.be.revertedWith(
        'Claimable work period must be less than the check in interval'
      );
    });
  });
});
