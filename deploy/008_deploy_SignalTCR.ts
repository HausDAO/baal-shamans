import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const signalTCRDeployed = await deploy('DhSignalTCR', {
		contract: 'DhSignalTCR',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('DhSignalTCRSummoner', {
		contract: 'DhSignalTCRSummoner',
		from: deployer,
		args: [signalTCRDeployed.address],
		log: true,
	});

    // console.log(`DhSignalTCR singleton deployed to ${signalTCRDeployed.address}`);
    // console.log(`DhSignalTCRSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['DhSignalTCR'];
