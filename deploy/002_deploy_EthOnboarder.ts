import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const onboarderDeployed = await deploy('EthOnboarderShaman', {
		contract: 'EthOnboarderShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('EthOnboarderShamanSummoner', {
		contract: 'EthOnboarderShamanSummoner',
		from: deployer,
		args: [onboarderDeployed.address],
		log: true,
	});

    // console.log(`EthOnboarderShaman singleton deployed to ${onboarderDeployed.address}`);
    // console.log(`EthOnboarderShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'EthOnboarder'];
