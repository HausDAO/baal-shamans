import { ethers } from "hardhat";

import { DIDStampVcVerifier, DIDStampVcVerifier__factory } from "../src/types";

async function main() {
  const domainName = "Passport";
  const ISSUER = "0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e";

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const stampVcVerifierFactory = <DIDStampVcVerifier__factory>await ethers.getContractFactory("DIDStampVcVerifier");
  const didStampVCVerifier = <DIDStampVcVerifier>await stampVcVerifierFactory.deploy(domainName, ISSUER);

  console.log(`DIDStampVcVerifier deployed to ${didStampVCVerifier.address}`);

  const VCOnboarder = await ethers.getContractFactory("VCOnboarderShaman");
  const onboarderSingleton = await VCOnboarder.deploy();

  await onboarderSingleton.deployed();

  console.log(`onboarderSingleton deployed to ${onboarderSingleton.address}`);

  const OnboarderSummoner = await ethers.getContractFactory("VCOnboarderShamanSummoner");
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
