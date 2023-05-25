import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const checkInDeployed = await deploy('CheckInShamanV2', {
		contract: 'CheckInShamanV2',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('CheckInV2Summoner', {
		contract: 'CheckInV2Summoner',
		from: deployer,
		args: [checkInDeployed.address],
		log: true,
	});

    // console.log(`CheckInShamanV2 singleton deployed to ${checkInDeployed.address}`);
    // console.log(`CheckInV2Summoner deployed to ${CheckInSummoner.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'CheckInShamanV2'];
