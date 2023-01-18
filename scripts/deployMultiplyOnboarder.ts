import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
	const address = await deployer.getAddress();
	console.log('Account address:', address);

  const Onboarder = await ethers.getContractFactory("MultiplyOnboarderShaman");
  const onboarderSingleton = await Onboarder.deploy();

  await onboarderSingleton.deployed();

  console.log(`onboarderSingleton deployed to ${onboarderSingleton.address}`);

  const OnboarderSummoner = await ethers.getContractFactory("MultiplyOnboarderShamanSummoner");
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
