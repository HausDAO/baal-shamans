import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const nftClaimerDeployed = await deploy('NFTClaimerShaman', {
		contract: 'NFTClaimerShaman',
		from: deployer,
		args: [],
		log: true,
	});

    const summonerDeployed = await deploy('NFTClaimerShamanSummoner', {
		contract: 'NFTClaimerShamanSummoner',
		from: deployer,
		args: [nftClaimerDeployed.address],
		log: true,
	});

    // console.log(`NFTClaimerShaman singleton deployed to ${nftClaimerDeployed.address}`);
    // console.log(`NFTClaimerShamanSummoner deployed to ${summonerDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['Shaman', 'NFTClaimer'];
