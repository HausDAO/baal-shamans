import { ethers } from "hardhat";

async function main() {

  const Onboarder = await ethers.getContractFactory("SimpleOnboarderShaman");
  const onboarderSingleton = await Onboarder.deploy();

  await onboarderSingleton.deployed();

  console.log(`onboarderSingleton deployed to ${onboarderSingleton.address}`);

  const OnboarderSummoner = await ethers.getContractFactory("SimpleOnboarderShamanSummoner");
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
