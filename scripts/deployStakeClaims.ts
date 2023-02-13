import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Account address:", address);

  const StakeClaims = await ethers.getContractFactory("StakeClaimShaman");
  const stakeClaimSingleton = await StakeClaims.deploy();

  await stakeClaimSingleton.deployed();

  console.log(`stakeClaimSingleton deployed to ${stakeClaimSingleton.address}`);

  const StakeClaimSummoner = await ethers.getContractFactory(
    "StakeClaimShamanSummoner"
  );
  const stakeClaimSummoner = await StakeClaimSummoner.deploy(
    stakeClaimSingleton.address
  );

  await stakeClaimSummoner.deployed();

  console.log(`stakeClaimSummoner deployed to ${stakeClaimSummoner.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
