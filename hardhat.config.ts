import { task, subtask, HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';

import * as fs from 'fs';
import '@typechain/hardhat';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const defaultNetwork = 'localhost';

function mnemonic() {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim();
  } catch (e) {
    if (defaultNetwork !== 'localhost') {
      console.log(
        '☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.'
      );
    }
  }
  return '';
}
function etherscan() {
  try {
    return fs.readFileSync('./etherscan.txt').toString().trim();
  } catch (e) {
    if (defaultNetwork !== 'localhost') {
      console.log('☢️ WARNING: No etherscan file');
    }
  }
  return '';
}

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', //<---- YOUR INFURA ID! (or it won't work)
      gas: 5000000,
      gasPrice: 8000000000,
      gasMultiplier: 2,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', //<---- YOUR INFURA ID! (or it won't work)
      gas: 5000000,
      gasPrice: 8000000000,
      gasMultiplier: 2,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', //<---- YOUR INFURA ID! (or it won't work)
      gas: 5000000,
      gasPrice: 8000000000,
      gasMultiplier: 2,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.gnosischain.com/',
      gas: 5000000,
      gasPrice: 8000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    matic: {
      // url: 'https://rpc-mainnet.maticvigil.com/v1/036f1ba8516f0eee2204a574a960b68437ac8661',
      url: 'https://polygon-mainnet.infura.io/v3/cc7ca25d68f246f393d7630842360c47',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/036f1ba8516f0eee2204a574a960b68437ac8661',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: "61ED96HQAY6PASTEWRXN6AMYQEKM8SYTRY" // etherscan
    apiKey: {
      gnosis: 'SN711KA5TEDG6JRJ2XGD8AITT7Q3VE58XG',
      xdai: 'banana',
      goerli: etherscan(),
      mainnet: etherscan(),
    },
    customChains: [
      // {
      //   network: "gnosis",
      //   chainId: 100,
      //   urls: {
      //     apiURL: "https://api.gnosisscan.io/api",
      //     browserURL: "https://gnosisscan.io/",
      //   }
      // },
      // can only have one chainId 100 at a time
      {
        network: 'xdai',
        chainId: 100,
        urls: {
          apiURL: 'https://blockscout.com/xdai/mainnet/api',
          browserURL: 'https://blockscout.com/xdai/mainnet/',
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    except: ['@gnosis.pm', '@openzeppelin'],
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
};

const DEBUG = true;

task(
  'generate',
  'Create a mnemonic for builder deploys',
  async (_, { ethers }) => {
    const bip39 = require('bip39');
    const hdkey = require('ethereumjs-wallet/hdkey');
    const mnemonic = bip39.generateMnemonic();
    if (DEBUG) console.log('mnemonic', mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (DEBUG) console.log('seed', seed);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    let fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log('fullPath', fullPath);
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    const privateKey = '0x' + wallet._privKey.toString('hex');
    if (DEBUG) console.log('privateKey', privateKey);
    var EthUtil = require('ethereumjs-util');
    const address =
      '0x' + EthUtil.privateToAddress(wallet._privKey).toString('hex');
    console.log(
      '🔐 Account Generated as ' +
        address +
        ' and set as mnemonic in packages/hardhat'
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    fs.writeFileSync('./' + address + '.txt', mnemonic.toString());
    fs.writeFileSync('./mnemonic.txt', mnemonic.toString());
  }
);

export default config;
