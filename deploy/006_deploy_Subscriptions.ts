import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const subscriptionDeployed = await deploy('SubscriptionShaman', {
		contract: 'SubscriptionShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('SubscriptionShamanSummoner', {
		contract: 'SubscriptionShamanSummoner',
		from: deployer,
		args: [subscriptionDeployed.address],
		log: true,
	});

    // console.log(`SubscriptionShaman singleton deployed to ${subscriptionDeployed.address}`);
    // console.log(`SubscriptionShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'Subscriptions'];
