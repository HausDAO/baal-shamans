import { expect } from 'chai';
import { BigNumber, BigNumberish } from 'ethers';
import { deployments, ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Baal, Loot, MultiSend, Shares } from '@daohaus/baal-contracts';

import { baalSetup, setShamanProposal, Signer, SHAMAN_PERMISSIONS } from './utils';
import { OnboarderShamanSummoner, TestERC20 } from '../src/types';

type OnboarderSetup = {
  onboarderSummoner: OnboarderShamanSummoner;
};

type OnboarderArgs = {
  amounts: Array<BigNumberish>;
  cuts: Array<string>;
  details: string;
  expiry: BigNumberish;
  pricePerUnit: BigNumber;
  unitPer: BigNumber;
  shares: boolean;
  token: string;
};

const summonOnboarder = async (
  baal: Baal,
  onboarderSummoner: OnboarderShamanSummoner,
  onboarderArgs: OnboarderArgs
) => {
  let onboarderAddress;
  let summonOnboarder = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.token,
    onboarderArgs.pricePerUnit,
    onboarderArgs.unitPer,
    onboarderArgs.expiry,
    onboarderArgs.details,
    onboarderArgs.shares,
    onboarderArgs.cuts,
    onboarderArgs.amounts
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

describe('OnboardeShaman', function () {
  let baal: Baal;
  let token: TestERC20;

  let lootToken: Loot;
  let sharesToken: Shares;

  let onboarderSummoner: OnboarderShamanSummoner;

  let multisend: MultiSend;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.ALL; // 7

  const defaultnboarderArgs: OnboarderArgs = {
    token: ethers.constants.AddressZero,
    pricePerUnit: ethers.utils.parseUnits('1.0', 'ether'),
    unitPer: ethers.utils.parseUnits('1.0', 'ether'),
    expiry: (Math.floor(Date.now() /1000)) + (86400 * 365),
    details: 'onboarding',
    shares: true,
    cuts: [],
    amounts: [],
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
        await deployments.fixture(['Onboarder']);
        const summoner =
          (await ethers.getContract('OnboarderShamanSummoner', deployer)) as OnboarderShamanSummoner;
        return {
          onboarderSummoner: summoner,
        };
    });
    const setup = await onboarderSetup();
    onboarderSummoner = setup.onboarderSummoner;
  });

  describe('onboarder', function () {
    it('mint shares on sending eth', async () => {
      const onboarderArgs = {
        ...defaultnboarderArgs,
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs
      );

      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      // const s2BalanceBefore = await ethers.provider.getBalance(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);

      const s2 = await ethers.getSigner(users.s2.address);
      await s2.sendTransaction({
        to: onboarderAddress,
        value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
      });

      // const s2BalanceAfter = await ethers.provider.getBalance(users.s2.address);
      const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      expect(s2SharesAfter).to.equal(s2SharesBefore.add(onboarderArgs.unitPer));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.unitPer));
    });

    it('mint loot on sending eth', async () => {
        const onboarderArgs = {
          ...defaultnboarderArgs,
          shares: false,
        };
  
        let onboarderAddress = await summonOnboarder(
          baal,
          onboarderSummoner,
          onboarderArgs
        );
        users.summoner.baal &&
          await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);
  
        // const s2BalanceBefore = await ethers.provider.getBalance(users.s2.address);
        const s2LootBefore = await lootToken.balanceOf(users.s2.address);
        const baalTotalSupplyBefore = await baal.totalSupply();
  
        const s2 = await ethers.getSigner(users.s2.address);
        await s2.sendTransaction({
          to: onboarderAddress,
          value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
        });
  
        // const s2BalanceAfter = await s2.getBalance();
        const s2LootAfter = await lootToken.balanceOf(users.s2.address);
        const baalTotalSupplyAfter = await baal.totalSupply();
        // const baalTotalShares = await baal.totalShares();
  
        expect(s2LootAfter).to.equal(s2LootBefore.add(onboarderArgs.unitPer));
        expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.unitPer));  
  
      });

      it('mint shares on sending token', async () => {
        const onboarderArgs = {
          ...defaultnboarderArgs,
          token: token.address,
        };
  
        let onboarderAddress = await summonOnboarder(
          baal,
          onboarderSummoner,
          onboarderArgs
        );

        users.summoner.baal &&
          await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);
        
        const applicantOnboarder = await ethers.getContractAt(
          'OnboarderShaman',
          onboarderAddress,
          users.s2.address
        );

        const s2BalanceBefore = await token.balanceOf(users.s2.address);
        const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
        const baalTotalSupplyBefore = await baal.totalSupply();

        await users.s2.dai?.approve(onboarderAddress, ethers.utils.parseUnits('1.0', 'ether'));
        await applicantOnboarder.onboarder20(ethers.utils.parseUnits('1.0', 'ether'));
  
        const s2BalanceAfter = await token.balanceOf(users.s2.address);
        const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
        const baalTotalSupplyAfter = await baal.totalSupply();
  
        expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.unitPer));  
        expect(s2BalanceAfter).to.equal(s2BalanceBefore.sub(onboarderArgs.unitPer));  
        expect(s2SharesAfter).to.equal(s2SharesBefore.add(onboarderArgs.unitPer));
      });

      it('mint loot on sending token', async () => {
        const onboarderArgs = {
          ...defaultnboarderArgs,
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
          'OnboarderShaman',
          onboarderAddress,
          users.s2.address
        );

        const s2BalanceBefore = await token.balanceOf(users.s2.address);
        const s2LootBefore = await lootToken.balanceOf(users.s2.address);
        const baalTotalSupplyBefore = await baal.totalSupply();

        await users.s2.dai?.approve(onboarderAddress, ethers.utils.parseUnits('1.0', 'ether'));
        await applicantOnboarder.onboarder20(ethers.utils.parseUnits('1.0', 'ether'));
  
        const s2BalanceAfter = await token.balanceOf(users.s2.address);
        const s2LootAfter = await lootToken.balanceOf(users.s2.address);
        const baalTotalSupplyAfter = await baal.totalSupply();
        // const baalTotalShares = await baal.totalShares();
  
        expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.unitPer));  
        expect(s2BalanceAfter).to.equal(s2BalanceBefore.sub(onboarderArgs.unitPer));  
        expect(s2LootAfter).to.equal(s2LootBefore.add(onboarderArgs.unitPer));
  
      });
  });
});
