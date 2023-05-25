import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const checkInDeployed = await deploy('CheckInShaman', {
		contract: 'CheckInShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('CheckInSummoner', {
		contract: 'CheckInSummoner',
		from: deployer,
		args: [checkInDeployed.address],
		log: true,
	});

    // console.log(`CheckInShaman singleton deployed to ${checkInDeployed.address}`);
    // console.log(`CheckInSummoner deployed to ${CheckInSummoner.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'CheckInShaman'];
