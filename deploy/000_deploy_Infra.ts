import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    
    await deployments.run(['Infra', 'BaalSummoner']); // Deploy Safe Infrastructure & Baal Summoner
    console.log('Safe + BaalSummoner contracts deployed!\n');
    
}

export default deployFn;
deployFn.tags = ['Local'];
