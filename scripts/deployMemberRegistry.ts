import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

  const [deployer] = await ethers.getSigners();
	const address = await deployer.getAddress();
	console.log('Account address:', address);



  const deployConfig = {
    moloch: "0x8dcc8cdbfb97200bd08e05f580c236b3ac655fd8",
    safe: "0xe014057ebe435dbcf0139a9a05b7ee0a05b74ec8",
  }

  const PGRegistry = await ethers.getContractFactory("PGRegistry");
  const registryContract = await PGRegistry.deploy(
    deployConfig.moloch
  );

  await registryContract.deployed();

  console.log(`registryContract deployed to ${registryContract.address}`);

  await registryContract.transferOwnership(deployConfig.safe);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
