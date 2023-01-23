import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Account address:", address);

  const Claimer = await ethers.getContractFactory("NFTClaimerShaman");
  const claimerSingleton = await Claimer.deploy();

  await claimerSingleton.deployed();

  const NftClaimerFactory = await ethers.getContractFactory(
    "NFTClaimerShamanSummoner"
  );
  const nftClaimerFactory = await NftClaimerFactory.deploy(
    claimerSingleton.address
  );

  await nftClaimerFactory.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
