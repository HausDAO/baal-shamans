import { ethers } from "hardhat";

async function main() {

  // deployed at https://etherscan.io/address/0x3840453a3907916113dB88bFAc2349533a736c64#code

  const [deployer] = await ethers.getSigners();
	const address = await deployer.getAddress();
	console.log('Account address:', address);
  console.log(
		'Account balance:',
		ethers.utils.formatEther(await deployer?.provider?.getBalance(address) || 0)
	);

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
