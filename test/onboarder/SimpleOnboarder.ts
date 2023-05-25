import { expect } from 'chai';
import { deployments, ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Baal, Loot, MultiSend, Shares } from '@daohaus/baal-contracts';

import { baalSetup, setShamanProposal, SHAMAN_PERMISSIONS, Signer } from '../utils';
import { SimpleOnboarderShamanSummoner, TestERC20 } from '../../src/types';

type OnboarderSetup = {
  onboarderSummoner: SimpleOnboarderShamanSummoner;
};

type OnboarderArgs = {
  amounts: Array<BigNumberish>;
  cuts: Array<string>;
  details: string;
  expiry: BigNumberish;
  price: BigNumber;
  shares: boolean;
  token: string;
};

const summonOnboarder = async (
  baal: Baal,
  onboarderSummoner: SimpleOnboarderShamanSummoner,
  onboarderArgs: OnboarderArgs,
) => {
  
  let onboarderAddress;
  let summonOnboarder = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.token,
    onboarderArgs.expiry,
    onboarderArgs.shares,
    onboarderArgs.cuts,
    onboarderArgs.amounts,
    onboarderArgs.details
  );
  
  let result = await summonOnboarder.wait();
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

describe('SimpleOnboarderShaman', function () {
  let baal: Baal;
  let token: TestERC20;

  let lootToken: Loot;
  let sharesToken: Shares;

  let onboarderSummoner: SimpleOnboarderShamanSummoner;

  let multisend: MultiSend;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.ALL; // 7

  const defaultOnboarderArgs: OnboarderArgs = {
    token: ethers.constants.AddressZero,
    expiry: Math.floor(Date.now() / 1000) + 86400 * 365,
    details: 'test',
    shares: true,
    cuts: [],
    amounts: [],
    price: ethers.utils.parseUnits('1.0', 'ether'),
  };

  beforeEach(async function () {
    const {
      Baal,
      Loot,
      Shares,
      MultiSend,
      DAI,
      signers
    } = await baalSetup({});

    baal = Baal;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    token = DAI;
    users = signers;

    const onboarderSetup = deployments.createFixture<OnboarderSetup, any>(
      async (hre: HardhatRuntimeEnvironment, options?: any
    ) => {
        const { getNamedAccounts } = hre;
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(['SimpleOnboarder']);
        const summoner =
          (await ethers.getContract('SimpleOnboarderShamanSummoner', deployer)) as SimpleOnboarderShamanSummoner;
        return {
          onboarderSummoner: summoner,
        };
    });
    const setup = await onboarderSetup();
    onboarderSummoner = setup.onboarderSummoner;
  });

  describe('onboarder', function () {

    it('mint shares on sending token', async () => {
      const amount = ethers.utils.parseUnits('5.250', 'ether');
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        token: token.address,
      };
      console.log('summoning');
      

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs
      );      
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const applicantOnboarder = await ethers.getContractAt(
        'SimpleOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const s2BalanceBefore = await token.balanceOf(users.s2.address);
      const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await users.s2.dai?.approve(onboarderAddress, amount);
      await applicantOnboarder.onboarder(amount);

      const s2BalanceAfter = await token.balanceOf(users.s2.address);
      const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount)
      );
      
      expect(s2BalanceAfter).to.equal(
        s2BalanceBefore.sub(amount)
      );

      expect(s2SharesAfter).to.equal(s2SharesBefore.add(amount));
    });

    it('mint loot on sending token', async () => {
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        token: token.address,
        shares: false,
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const applicantOnboarder = await ethers.getContractAt(
        'SimpleOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const s2BalanceBefore = await token.balanceOf(users.s2.address);
      const s2LootBefore = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await users.s2.dai?.approve(
        onboarderAddress,
        ethers.utils.parseUnits('1.0', 'ether')
      );
      await applicantOnboarder.onboarder(
        ethers.utils.parseUnits('1.0', 'ether')
      );

      const s2BalanceAfter = await token.balanceOf(users.s2.address);
      const s2LootAfter = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(onboarderArgs.price)
      );
      expect(s2BalanceAfter).to.equal(
        s2BalanceBefore.sub(onboarderArgs.price)
      );
      expect(s2LootAfter).to.equal(s2LootBefore.add(onboarderArgs.price));
    });
  });
});
