import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
	const address = await deployer.getAddress();
	console.log('Account address:', address);

  const DhSignalTCR = await ethers.getContractFactory("DhSignalTCR");
  const dhSignalTCRsingleton = await DhSignalTCR.deploy();

  await dhSignalTCRsingleton.deployed();

  console.log(`DhSignalTCR deployed to ${dhSignalTCRsingleton.address}`);

  const DhSignalTCRSummoner = await ethers.getContractFactory("DhSignalTCRSumoner");
  const dhSignalTCRSummoner = await DhSignalTCRSummoner.deploy(dhSignalTCRsingleton.address);

  await dhSignalTCRSummoner.deployed();

  console.log(`dhSignalTCRSummoner deployed to ${dhSignalTCRSummoner.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
