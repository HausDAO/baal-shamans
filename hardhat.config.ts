import dotenv from "dotenv";
import * as fs from "fs";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-deploy";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const defaultNetwork = "localhost";

const infuraKey = () => {
  return process.env.INFURA_API_KEY || '' // <---- YOUR INFURA ID! (or it won't work)
};

const mnemonic = () => {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

const explorerApiKey = (networkName: string) => {
  const fromEnv = () => {
    switch (networkName) {
      case "ethereum":
        return process.env.ETHERSCAN_API_KEY;
      case "gnosis":
        return process.env.GNOSISSCAN_API_KEY;
      case "polygon":
        return process.env.POLYGONSCAN_API_KEY;
      case "optimism":
        return process.env.OPTIMISTICSCAN_API_KEY;
      case "arbitrumOne":
        return process.env.ARBISCAN_API_KEY;
      default:
        break;
    }
  }
  return fromEnv() || '';
}

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey()}`,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('ethereum'),
        },
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraKey()}`,
      gas: 5000000,
      gasPrice: 8000000000,
      gasMultiplier: 2,
      accounts: process.env.ACCOUNT_PK
        ? [process.env.ACCOUNT_PK]
        : {
          mnemonic: mnemonic(),
        },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('ethereum'),
        },
      },
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      gas: 5000000,
      gasPrice: 8000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('gnosis'),
        },
      },
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraKey()}`,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('polygon'),
        },
      },
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraKey()}`,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('polygon'),
        },
      },
    },
    arbitrumOne: {
      url: `https://arbitrum-mainnet.infura.io/v3/${infuraKey()}`,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('arbitrumOne'),
        },
      },
    },
    optimisticEthereum: {
      url: `https://optimism-mainnet.infura.io/v3/${infuraKey()}`,
      accounts: {
        mnemonic: mnemonic(),
      },
      verify: {
        etherscan: {
          apiKey: explorerApiKey('optimism'),
        },
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: "61ED96HQAY6PASTEWRXN6AMYQEKM8SYTRY" // etherscan
    apiKey: {
      gnosis: explorerApiKey('gnosis'),
      xdai: explorerApiKey('gnosis'),
      goerli: explorerApiKey('ethereum'),
      mainnet: explorerApiKey('ethereum'),
      polygon: explorerApiKey('polygon'),
      polygonMumbai: explorerApiKey('polygon'),
      arbitrumOne: explorerApiKey('arbitrumOne'),
      optimisticEthereum: explorerApiKey('optimism'),
    },
    customChains: [
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://gnosisscan.io/",
        },
      },
    ]
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      }
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    except: ['@gnosis.pm', '@openzeppelin'],
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS === 'true',
    excludeContracts: [],
    src: "./contracts",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  external: {
    contracts: [
      {
        artifacts: 'node_modules/@daohaus/baal-contracts/export/artifacts',
        deploy: 'node_modules/@daohaus/baal-contracts/export/deploy'
      }
    ]
  },
};

export default config;
