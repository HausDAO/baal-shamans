import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import { PGRegistry } from '../src/types';

// NOTICE: DAO + 0xSplits config
const deployConfig = {
    moloch: "0x7839755b77aadcd6a8cdb76248b3dddfa9b7f5f1",
    safe: "0xaccd85e73639b5213a001630eb2512dbd6292e32",
    splitsMain: "0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE" ,
    splits: "0x50730dF422AF6c5465C6EfdE58dEC6443908a059"
  }

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

    const registryDeployed = await deploy('PGRegistry', {
        contract: 'PGRegistry',
        from: deployer,
        args: [deployConfig.splitsMain, deployConfig.splits],
        log: true,
      });
    console.log(`PGRegistry deployed to ${registryDeployed.address}`);

    const registryContract = (await ethers.getContractAt('PGRegistry', registryDeployed.address, deployer) as PGRegistry);

    await registryContract.transferOwnership(deployConfig.safe);
    console.log(`PGRegistry ownership transferred to ${deployConfig.safe}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'PGRegistry'];
