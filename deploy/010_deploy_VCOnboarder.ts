import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network,  } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const onboarderDeployed = await deploy('VCOnboarderShaman', {
		contract: 'VCOnboarderShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('VCOnboarderShamanSummoner', {
		contract: 'VCOnboarderShamanSummoner',
		from: deployer,
		args: [onboarderDeployed.address],
		log: true,
	});

    // console.log(`VCOnboarderShaman singleton deployed to ${onboarderDeployed.address}`);
    // console.log(`VCOnboarderShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'VCOnboarder'];
