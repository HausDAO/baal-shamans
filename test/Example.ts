import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Baal } from '@daohaus/baal-contracts';
import { baalSetup, Signer } from '@daohaus/baal-contracts/hardhat';

import { ExampleManagerShaman, TestERC20 } from "../src/types";

describe("ExampleManagerShaman", function () {
  let baal: Baal;
  let token: TestERC20;

  let exampleManagerShaman: ExampleManagerShaman;

  let users: {
    [key: string]: Signer;
  };

  // const yes = true;
  // const no = false;

  const TEN_MIN_IN_SECS = 10 * 60;

  const deployConfig = {
    shares: true,
    perPeriod: "1000000000000000000",
    period: TEN_MIN_IN_SECS
  }

  beforeEach(async function () {

    const {
      Baal,
      // Loot,
      // Shares,
      // BaalSummoner,
      // GnosisSafe,
      // MultiSend,
      WETH,
      signers
    } = await baalSetup({});

    baal = Baal;
    // lootToken = Loot;
    // sharesToken = Shares;
    // baalSummoner = BaalSummoner;
    // gnosisSafe = GnosisSafe;
    // multisend = MultiSend;
    token = WETH;
    users = signers;

    const { deployer } = await getNamedAccounts();

    const shamanDeployed = await deployments.deploy('ExampleManagerShaman', {
      contract: 'ExampleManagerShaman',
      from: deployer,
      args: [
        baal.address,
        deployConfig.shares,
        deployConfig.perPeriod,
        deployConfig.period

      ],
      log: true,
    });

    exampleManagerShaman = await ethers.getContractAt('ExampleManagerShaman', shamanDeployed.address, deployer);

    // TODO: attach shaman as {role}


  });

  describe("attached to baal", function () {
    it("shaman owns baal", async () => {

      const currentBaal = await exampleManagerShaman.baal();
      expect(currentBaal).to.equal(baal.address);

      // baal.is
    });
    // it("mint loot on ...", async function () {
        
    // });
  });
});
