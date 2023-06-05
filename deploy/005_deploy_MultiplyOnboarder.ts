import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const onboarderDeployed = await deploy('MultiplyOnboarderShaman', {
		contract: 'MultiplyOnboarderShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('MultiplyOnboarderShamanSummoner', {
		contract: 'MultiplyOnboarderShamanSummoner',
		from: deployer,
		args: [onboarderDeployed.address],
		log: true,
	});

    // console.log(`MultiplyOnboarderShaman singleton deployed to ${onboarderDeployed.address}`);
    // console.log(`MultiplyOnboarderShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'MultiplyOnboarder'];
