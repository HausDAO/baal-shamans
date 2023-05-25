import { expect } from 'chai';
import { deployments, ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import { BigNumberish } from '@ethersproject/bignumber';

import { baalSetup, setShamanProposal, SHAMAN_PERMISSIONS, Signer } from '../utils';
import { EthOnboarderShamanSummoner, MultiSend, TestERC20 } from '../../src/types';

type OnboarderSetup = {
  onboarderSummoner: EthOnboarderShamanSummoner;
};

type OnboarderArgs = {
  amounts: Array<BigNumberish>;
  cuts: Array<string>;
  details: string;
  expiry: BigNumberish;
  minTribute: BigNumberish;
  multiply: BigNumberish;
  isShares: boolean;
};

const summonOnboarder = async function (
  baal: Baal,
  onboarderSummoner: EthOnboarderShamanSummoner,
  onboarderArgs: OnboarderArgs
) {
  
  let onboarderAddress;
  let summonOnboarder1 = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.expiry,
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
    onboarderAddress = result.events[1].args.onboarder;
  }

  return onboarderAddress;
};

describe("EthOnboarderShaman", function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let token: TestERC20;

  let onboarderSummoner: EthOnboarderShamanSummoner;

  let users: {
    [key: string]: Signer;
  };

  const shamanPermissions = SHAMAN_PERMISSIONS.ALL; // 7

  const defaultOnboarderArgs: OnboarderArgs = {
    expiry: Math.floor(Date.now() / 1000) + 86400 * 365,
    multiply: 100,
    minTribute: ethers.utils.parseUnits("0.01", "ether"),
    details: "test",
    isShares: true,
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
        await deployments.fixture(['EthOnboarder']);
        const summoner =
          (await ethers.getContract('EthOnboarderShamanSummoner', deployer)) as EthOnboarderShamanSummoner;
        return {
          onboarderSummoner: summoner,
        };
    });
    const setup = await onboarderSetup();
    onboarderSummoner = setup.onboarderSummoner;

  });

  describe("onboarder", function () {

    it("mint shares on sending eth", async () => {
      const amount = ethers.utils.parseUnits("5.250", "ether");
      const onboarderArgs = {
        ...defaultOnboarderArgs,
      };
      
      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs,
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      await users.s2.dai?.approve(
        onboarderAddress,
        amount
      );

      const applicantOnboarder = await ethers.getContractAt(
        'EthOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      // const s2BalanceBefore = await ethers.provider.getBalance(users.s2.address);
      const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      // console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      // console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      // const s2BalanceAfter = await ethers.provider.getBalance(users.s2.address);
      const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      // console.log('s2BalanceAfter', s2BalanceAfter);
      // console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.mul(onboarderArgs.multiply))
      );

      expect(s2SharesAfter).to.equal(s2SharesBefore.add(amount.mul(onboarderArgs.multiply)));
    });

    it("mint loot on sending token", async () => {
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        isShares: false,
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs,
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const applicantOnboarder = await ethers.getContractAt(
        'EthOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      // const s2BalanceBefore = await ethers.provider.getBalance(users.s2.address);
      const s2LootBefore = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();

      await applicantOnboarder.onboarder({value: ethers.utils.parseEther("1.0")});

      // const s2BalanceAfter = await ethers.provider.getBalance(users.s2.address);
      const s2LootAfter = await lootToken.balanceOf(users.s2.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(ethers.utils.parseEther("1.0").mul(onboarderArgs.multiply))
      );

      expect(s2LootAfter).to.equal(s2LootBefore.add(ethers.utils.parseEther("1.0").mul(onboarderArgs.multiply)));
    });

    it("mint shares on sending eth minus fees", async () => {
      const amount = ethers.utils.parseUnits("1.0", "ether");
      const fee = 250000;
      const feeRecipientAddress = users.s1.address;
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        cuts: [feeRecipientAddress],
        amounts: [fee],
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs,
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      await users.s2.dai?.approve(
        onboarderAddress,
        amount
      );

      const applicantOnboarder = await ethers.getContractAt(
        'EthOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const baalBalanceBefore = await ethers.provider.getBalance(await baal.target());
      const recipientBalanceBefore = await ethers.provider.getBalance(feeRecipientAddress);
      // const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      // console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      // console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      const baalBalanceAfter = await ethers.provider.getBalance(await baal.target());
      // const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const recipientBalanceAfter = await ethers.provider.getBalance(feeRecipientAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      // console.log('baalBalanceAfter', baalBalanceAfter);
      // console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.sub(amount.div(1e6).mul(fee)).mul(onboarderArgs.multiply))
      );

      expect(baalBalanceAfter).to.equal(
        baalBalanceBefore.add(amount.sub(amount.div(1e6).mul(fee)))
      );

      expect(recipientBalanceAfter).to.equal(
        recipientBalanceBefore.add(amount.div(1e6).mul(fee))
      );

    });

    it("mint shares on sending eth minus fee splits to multiple", async () => {
      const amount = ethers.utils.parseUnits("1.0", "ether");
      const fee = 2500; // .25% 
      const fee2 = 10000; // 1%
      const fee3 = 37500; // 3.75%
      const totalFee = fee + fee2 + fee3;
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        cuts: [users.s1.address, users.s3.address, users.s4.address],
        amounts: [fee, fee2, fee3],
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs,
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);
      
      await users.s2.dai?.approve(
        onboarderAddress,
        amount
      );

      const applicantOnboarder = await ethers.getContractAt(
        'EthOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const baalBalanceBefore = await ethers.provider.getBalance(await baal.target());
      const s1BalanceBefore = await ethers.provider.getBalance(users.s1.address);
      const s3BalanceBefore = await ethers.provider.getBalance(users.s3.address);
      const s4BalanceBefore = await ethers.provider.getBalance(users.s4.address);
      // const s2SharesBefore = await sharesToken.balanceOf(users.s2.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      
      // console.log('baalTotalSupplyBefore', baalTotalSupplyBefore);
      // console.log('amount', amount);

      await applicantOnboarder.onboarder({value: amount});

      const baalBalanceAfter = await ethers.provider.getBalance(await baal.target());
      // const s2SharesAfter = await sharesToken.balanceOf(users.s2.address);
      const s1BalanceAfter = await ethers.provider.getBalance(users.s1.address);
      const s3BalanceAfter = await ethers.provider.getBalance(users.s3.address);
      const s4BalanceAfter = await ethers.provider.getBalance(users.s4.address);
      const baalTotalSupplyAfter = await baal.totalSupply();
      // const baalTotalShares = await baal.totalShares();

      // console.log('baalBalanceAfter', baalBalanceAfter);
      // console.log('baalTotalSupplyAfter', baalTotalSupplyAfter);
      
      // console.log("baalTotalSupply delta");
      expect(baalTotalSupplyAfter).to.equal(
        baalTotalSupplyBefore.add(amount.sub(amount.div(1e6).mul(totalFee)).mul(onboarderArgs.multiply))
      );

      // console.log("baalBalance delta");
      expect(baalBalanceAfter).to.equal(
        baalBalanceBefore.add(amount.sub(amount.div(1e6).mul(totalFee)))
      );
      // console.log("s1 balance delta");
      expect(s1BalanceAfter).to.equal(
        s1BalanceBefore.add(amount.div(1e6).mul(fee))
      );
      // console.log("s3 balance delta");
      expect(s3BalanceAfter).to.equal(
        s3BalanceBefore.add(amount.div(1e6).mul(fee2))
      );
      // console.log("s4 balance delta");
      expect(s4BalanceAfter).to.equal(
        s4BalanceBefore.add(amount.div(1e6).mul(fee3))
      );

    });

    it("revert if doesn't meet min tribute", async () => {
      const amount = ethers.utils.parseUnits("0.009", "ether");
      const fee = 250000;
      const onboarderArgs = {
        ...defaultOnboarderArgs,
        cuts: [users.s1.address],
        amounts: [fee],
      };

      const onboarderAddress = await summonOnboarder(
        baal,
        onboarderSummoner,
        onboarderArgs,
      );
      users.summoner.baal &&
        await setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);
      
      await users.s2.dai?.approve(
        onboarderAddress,
        amount
      );

      const applicantOnboarder = await ethers.getContractAt(
        'EthOnboarderShaman',
        onboarderAddress,
        users.s2.address
      );

      const tribute = applicantOnboarder.onboarder({value: amount});

      await expect(tribute).to.be.revertedWith("!minTribute");
    });
  });
});
