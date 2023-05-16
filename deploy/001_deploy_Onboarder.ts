import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const onboarderDeployed = await deploy('OnboarderShaman', {
		contract: 'OnboarderShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('OnboarderShamanSummoner', {
		contract: 'OnboarderShamanSummoner',
		from: deployer,
		args: [onboarderDeployed.address],
		log: true,
	});

    // console.log(`OnboarderShaman singleton deployed to ${onboarderDeployed.address}`);
    // console.log(`OnboarderSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'Onboarder'];
