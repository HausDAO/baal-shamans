import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// NOTICE: You should change these params to fit your needs
const DOMAIN = 'Passport';
const ISSUER = '0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;

	const { deployer } = await getNamedAccounts();

    const { deploy } = deployments;

	const verifierDeployed = await deploy('DIDStampVcVerifier', {
		contract: 'DIDStampVcVerifier',
		from: deployer,
		args: [DOMAIN, ISSUER],
		log: true,
	});

    // console.log(`DIDStampVcVerifier singleton deployed to ${verifierDeployed.address}`);
}

export default deployFn;
deployFn.tags = ['DIDStampVcVerifier'];
