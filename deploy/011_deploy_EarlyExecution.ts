import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import { getSetupAddresses } from "@daohaus/baal-contracts";

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { ethers, deployments, getChainId, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

    const chainId = await getChainId();

	const _addresses = await getSetupAddresses(chainId, network, deployments);

	if ((!_addresses.moduleProxyFactory || _addresses.moduleProxyFactory === ethers.constants.AddressZero) && network.name !== 'hardhat') {
		console.log('ModuleProxyFactory not found!');
		return;
	}

	const templateDeployed = await deploy('EarlyExecutionShaman', {
		contract: 'EarlyExecutionShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('EarlyExecutionShamanSummoner', {
		contract: 'EarlyExecutionShamanSummoner',
		from: deployer,
		args: [_addresses.moduleProxyFactory, templateDeployed.address],
		log: true,
	});

    // console.log(`EarlyExecutionShaman singleton deployed to ${templateDeployed.address}`);
    // console.log(`EarlyExecutionShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'EarlyExecution'];
