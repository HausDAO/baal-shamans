import { ethers } from "hardhat";

async function main() {

  const DhSignalTCR = await ethers.getContractFactory("DhSignalTCR");
  const dhSignalTCRsingleton = await DhSignalTCR.deploy();

  await dhSignalTCRsingleton.deployed();

  console.log(`DhSignalTCR deployed to ${dhSignalTCRsingleton.address}`);

  const DhSignalTCRSummoner = await ethers.getContractFactory("DhSignalTCRFactory");
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
