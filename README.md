
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

## LICENSE

[GNU GPLv3](LICENSE)
