import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import * as fs from 'fs';

// const _addresses = {
//   gnosisSingleton: '0xd9db270c1b5e3bd161e8c8503c55ceabee709552',
//   gnosisFallbackLibrary: '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4',
//   gnosisMultisendLibrary: '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
//   poster: '0x000000000000cd17345801aa8147b8D3950260FF',
//   posterKovan: '0x37A2080f275E26fFEfB6E68F3005826368156C5C',
// };

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

    fs.writeFileSync('../' + address + '.txt', mnemonic.toString());
    fs.writeFileSync('../mnemonic.txt', mnemonic.toString());
  }
);
