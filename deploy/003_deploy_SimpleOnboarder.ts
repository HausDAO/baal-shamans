import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const onboarderDeployed = await deploy('SimpleOnboarderShaman', {
		contract: 'SimpleOnboarderShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('SimpleOnboarderShamanSummoner', {
		contract: 'SimpleOnboarderShamanSummoner',
		from: deployer,
		args: [onboarderDeployed.address],
		log: true,
	});

    // console.log(`SimpleOnboarderShaman singleton deployed to ${onboarderDeployed.address}`);
    // console.log(`SimpleOnboarderShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'SimpleOnboarder'];
