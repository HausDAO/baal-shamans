import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// NOTICE: TODO - set 0xSplit contract addresses
const SPLITS_MAIN_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // dummy address
const SPLIT_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // dummy address

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

    const registryDeployed = await deploy('PGRegistry', {
        contract: 'PGRegistry',
        from: deployer,
        args: [SPLITS_MAIN_ADDRESS, SPLIT_ADDRESS],
        log: true,
      });

    console.log(`PGRegistry deployed to ${registryDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'PGRegistry'];
