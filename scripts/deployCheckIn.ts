import { ethers } from 'hardhat';

const networkCurrency: Record<number, string> = {
  4: 'ETH',
  5: 'ETH',
  1: 'ETH',
  137: 'matic',
  42: 'ETH',
  100: 'xDai',
};

async function main() {
  const CheckIn = await ethers.getContractFactory('CheckInShaman');
  const checkInTemplate = await CheckIn.deploy();

  await checkInTemplate.deployed();

  console.log(`checkInTemplate deployed to ${checkInTemplate.address}`);

  const CheckInSummoner = await ethers.getContractFactory('CheckInSummoner');
  const checkInSummoner = await CheckInSummoner.deploy(checkInTemplate.address);

  await checkInSummoner.deployed();

  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  const { chainId } = await (deployer as any).provider.getNetwork();
  console.log('Account address:', address);
  console.log(
    'Account balance:',
    ethers.utils.formatEther(
      await (deployer as any)?.provider?.getBalance?.(address)
    ),
    networkCurrency?.[chainId]
  );
  console.log(`checkInSummoner deployed to ${checkInSummoner.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
