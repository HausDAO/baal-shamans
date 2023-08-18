import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BigNumberish } from "@ethersproject/bignumber";
import { Baal, Loot, MultiSend, Shares } from '@daohaus/baal-contracts';
import { baalSetup, setShamanProposal, SHAMAN_PERMISSIONS, Signer } from '@daohaus/baal-contracts';

import { SubscriptionShamanSummoner, TestERC20 } from '../src/types';

type SubscriptionSetup = {
  subscriptionSummoner: SubscriptionShamanSummoner;
};

type SubscriptionArgs = {
  amounts: Array<BigNumberish>;
  cuts: Array<string>;
  lootPerUnit: BigNumberish;
  periodLength: BigNumberish;
  priceActivation: BigNumberish;
  pricePer: BigNumberish;
  shares: boolean;
  token: string;
};

const summonSubscription = async (
  baal: Baal,
  subscriptionSummoner: SubscriptionShamanSummoner,
  subscriptionArgs: SubscriptionArgs
) => {
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
    subscriptionAddress = result.events[1].args.subscription;
  }

  return subscriptionAddress;
};

describe("SubscriptionShaman", function () {
  let baal: Baal;
  let token: TestERC20;

  let lootToken: Loot;
  let sharesToken: Shares;

  let subscriptionSummoner: SubscriptionShamanSummoner;

  let multisend: MultiSend;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.ALL; // 7

  const defaultSubscriptionArgs = {
    token: ethers.constants.AddressZero,
    priceActivation: ethers.utils.parseUnits("0.01", "ether"),
    pricePer: ethers.utils.parseUnits("1000.0", "ether"),
    lootPerUnit: 10,
    periodLength: (86400 * 30),
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
    
    const onboarderSetup = deployments.createFixture<SubscriptionSetup, any>(
      async (hre: HardhatRuntimeEnvironment, options?: any
    ) => {
        const { getNamedAccounts } = hre;
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(['Subscriptions']);
        const summoner =
          (await ethers.getContract('SubscriptionShamanSummoner', deployer)) as SubscriptionShamanSummoner;
        return {
          subscriptionSummoner: summoner,
        };
    });
    const setup = await onboarderSetup();
    subscriptionSummoner = setup.subscriptionSummoner;
  });

  describe("subscription", function () {
    it("mint shares on subscribing", async () => {
      const subscriptionArgs = {
        ...defaultSubscriptionArgs,
        token: token.address,
      };

      let subscriptionAddress = await summonSubscription(
        baal,
        subscriptionSummoner,
        subscriptionArgs
      );
      // const id = await setShamanProposal(baal, multisend, subscriptionAddress, 7);
      // console.log('subscriptionAddress', subscriptionAddress);

      //   const applicantToken = token.connect(s2);
      //   await applicantToken.approve(subscriptionAddress, ethers.utils.parseUnits("100000000000.0", "ether"));
          
      //   const onboarder = subscriptionSingleton.attach(subscriptionAddress);
      //   const applicantOnboarder = onboarder.connect(s2);

      //   onboarder.subscribe({
      //     value: ethers.utils.parseEther("0.01"), // Sends exactly 0.01 ether
      //   });
 

    });
    it("mint loot on ...", async () => {
        const subscriptionArgs = {
          ...defaultSubscriptionArgs,
          token: token.address,
          shares: false,
        };

        let subscriptionAddress = await summonSubscription(
          baal,
          subscriptionSummoner,
          subscriptionArgs
        );
        
        users.summoner.baal &&
          await setShamanProposal(users.summoner.baal, multisend, subscriptionAddress, shamanPermissions);
  
    });
  });
});
