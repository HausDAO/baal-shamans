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

import { MultiSend, MultiplyOnboarderShamanSummoner, TestERC20 } from '../../src/types';

type OnboarderArgs = {
  details: string;
  expiry: BigNumberish;
  multiplier: BigNumberish;
  shares: boolean;
  token: string;
};

const summonOnboarder = async (
  baal: Baal,
  onboarderSummoner: MultiplyOnboarderShamanSummoner,
  onboarderArgs: OnboarderArgs
) => {
  
  let onboarderAddress;
  let summonOnboarder1 = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.token,
    onboarderArgs.expiry,
    onboarderArgs.multiplier,
    onboarderArgs.shares,
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
    onboarderAddress = result.events[1].args.onboarder;
  }

  return onboarderAddress;
};

describe('MultiplyOnboarder', function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;
  let token: TestERC20;

  let onboarderSummoner: MultiplyOnboarderShamanSummoner;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.MANAGER; // 2

  const defaultOnboarderArgs: OnboarderArgs = {
    token: ethers.constants.AddressZero,
    expiry: Math.floor(Date.now() / 1000) + 86400 * 365,
    multiplier: 100,
    details: 'MultiplyOnboarder test',
    shares: true,
  };

  let proposalHelpers: ProposalHelpers;

  beforeEach(async () => {
    const {
      Baal,
      Loot,
      Shares,
      MultiSend,
      DAI,
      signers,
      helpers,
    } = await baalSetup({
      fixtureTags: ['MultiplyOnboarder'],
      setupBaalOverride: async (params: NewBaalParams) => {
        console.log('OVERRIDE baal setup ******');
        const { deployer } = await getNamedAccounts();
        onboarderSummoner =
          (await ethers.getContract('MultiplyOnboarderShamanSummoner', deployer)) as MultiplyOnboarderShamanSummoner;
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

  describe('multiply onboarder', function () {

    it('mint shares on sending token', async () => {
      const amount = ethers.utils.parseUnits('5.250', 'ether');
      const onboarderArgs: OnboarderArgs = {
        ...defaultOnboarderArgs,
        token: token.address,
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      await users.s2.dai?.approve(
        onboarderAddress,
        amount
      );

      const applicantOnboarder = await ethers.getContractAt(
        'MultiplyOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const s2BalanceBefore = await token.balanceOf(users.s2.address);
      const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await applicantOnboarder.onboarder(
        amount
      );

      const s2BalanceAfter = await token.balanceOf(users.s2.address);
      const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.mul(onboarderArgs.multiplier))
      );
      
      expect(s2BalanceAfter).to.equal(
        s2BalanceBefore.sub(amount)
      );

      expect(s2SharesAfter).to.equal(s2SharesBefore.add(amount.mul(onboarderArgs.multiplier)));
    });

    it('mint loot on sending token', async () => {
      const amount = ethers.utils.parseUnits('1', 'ether');
      const onboarderArgs: OnboarderArgs = {
        ...defaultOnboarderArgs,
        multiplier: 10,
        shares: false,
        token: token.address,
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      await users.s2.dai?.approve(
        onboarderAddress,
        ethers.utils.parseUnits('10.0', 'ether')
      );

      const applicantOnboarder = await ethers.getContractAt(
        'MultiplyOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const s2BalanceBefore = await token.balanceOf(users.s2.address);
      // const s2LootBefore = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await applicantOnboarder.onboarder(
        amount
      );

      const s2BalanceAfter = await token.balanceOf(users.s2.address);
      const s2LootAfter = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.mul(onboarderArgs.multiplier))
      );
      expect(s2BalanceAfter).to.equal(
        s2BalanceBefore.sub(amount)
      );
      expect(s2LootAfter).to.equal(amount.mul(onboarderArgs.multiplier));
    });
  });
});
