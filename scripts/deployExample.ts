import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const TEN_MIN_IN_SECS = 10 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log('Account address:', address);

  const deployConfig = {
    moloch: '0xc035dd7cda32ae73f0f306ed56658527aad47648',
    shares: true,
    perPeriod: '1000000000000000000',
    period: TEN_MIN_IN_SECS,
  };

  const Example = await ethers.getContractFactory('Test');
  const exampleContract = await Example.deploy(
    deployConfig.moloch,
    deployConfig.shares,
    deployConfig.perPeriod,
    deployConfig.period
  );

  await exampleContract.deployed();

  console.log(`exampleContract deployed to ${exampleContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
