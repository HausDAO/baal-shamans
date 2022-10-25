import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Onboarder = await ethers.getContractFactory("OnboarderShaman");
  const onboarderSingleton = await Onboarder.deploy();

  await onboarderSingleton.deployed();

  console.log(`onboarderSingleton deployed to ${onboarderSingleton.address}`);

  const OnboarderSummoner = await ethers.getContractFactory("OnboarderShamanSummoner");
  const onboarderSummoner = await OnboarderSummoner.deploy(onboarderSingleton.address);

  await onboarderSummoner.deployed();

  console.log(`onboarderSummoner deployed to ${onboarderSummoner.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
