
# Baal Shamans

This is a Hardhat project with some Shaman examples to get you started developing tooling contracts for the [MolochV3](https://github.com/HausDAO/baal) a.k.a Baal

You can learn more about What & Why of Shamans [here](https://moloch.daohaus.fun/tools/shaman).

## Setup Environment

`yarn install` - to install all of the components for the project

## Building

This project uses the [hardhat](https://hardhat.org/) ethereum tools for solidity compiling and running a virtual ethereum environment for testing.

It uses [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) to easily deploy + test your shaman integration with Baal infrastructure.

`yarn build` - will compile the solidity code and generate your contract full artifacts, ABIs (under abi/) and generate all of the necessary contract types.

## (Local) Development

`yarn deploy` to deploy Safe + Baal infrastructure locally or any public testnet.

`yarn deploy --tags Shaman` to deploy all Shaman contracts, otherwise specify a shaman specific tag.

## Shaman Deployment

Copy `.env.sample` file and specify the required environment variables.

`yarn deploy --tags Shaman[,<other_tags>] --network <YOUR_NETWORK> [<deploy_script.ts>]` will deploy contracts on the specified chain. See scripts under `./deploy` for `<other_tags>` available tags.

## Contributing

Development best practices can be found [here](https://moloch.daohaus.fun/features/shamanBestPractice).

Before sending any PR, add your contract typings on both `./src/types` and `tsconfig.build.json`

If you have implemented a new Shaman contract that can be useful for the community, write a corresponding deployment script under `./deploy` folder.

## Shaman Modules

* **OnboarderShaman**: yeeter-style shaman
* **SimpleOnboarderShaman**: convert tokens 1:1 shares or loot
* **EthOnboarderShaman**: tribute eth for loot or shares
* **VCOnboarderShaman**: a sibling-resistant DAO onboarder using BrightID and on-chain verifiable credentials
* **NFTClaimerShaman**: manager shaman where any account can claim some amount of shares if they hold an nft
* **NFTOnboarderShaman**: *TBD*
* **CheckInShaman**: manager shaman where any account can claim some amount of shares or loot per checkInInterval. There's also a V2 of the contract
* **SubscriptionShaman**: allows a DAO with a subscription model

### Other Modules that integrates with Baal

* **DhSignalTCR**: signal with a snapshot of current loot and shares on a MolochV3 DAO naive TCR implementation
* **PGRegistry**: *TBD*

## LICENSE

[GNU GPLv3](LICENSE)
