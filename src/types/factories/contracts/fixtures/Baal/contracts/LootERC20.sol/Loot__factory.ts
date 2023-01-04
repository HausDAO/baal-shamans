/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  Loot,
  LootInterface,
} from "../../../../../../contracts/fixtures/Baal/contracts/LootERC20.sol/Loot";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Snapshot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "balanceOfAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentSnapshotId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "totalSupplyAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060601b6080523480156200001857600080fd5b506200002362000029565b620000eb565b600054610100900460ff1615620000965760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e9576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805160601c6128f962000126600039600081816105f20152818161063b015281816107bb015281816107fb015261087301526128f96000f3fe60806040526004361061018d5760003560e01c80635c975abb116100d75780639711715a116100855780639711715a14610411578063981b24d0146104265780639dc29fac14610446578063a457c2d714610466578063a9059cbb14610486578063d505accf146104a6578063dd62ed3e146104c6578063f2fde38b146104e657600080fd5b80635c975abb1461035157806370a0823114610369578063715018a6146103895780637ecebe001461039e5780638456cb59146103be5780638da5cb5b146103d357806395d89b41146103fc57600080fd5b8063395093511161013f578063395093511461027f5780633f4ba83a1461029f57806340c10f19146102b45780634ee2cd7e146102d45780634f1ef286146102f457806352d1902d146103075780635439ad861461031c578063562d190d1461033157600080fd5b806306fdde0314610192578063095ea7b3146101bd57806318160ddd146101ed57806323b872dd1461020c578063313ce5671461022c5780633644e515146102485780633659cfe61461025d575b600080fd5b34801561019e57600080fd5b506101a7610506565b6040516101b4919061263c565b60405180910390f35b3480156101c957600080fd5b506101dd6101d836600461256a565b610598565b60405190151581526020016101b4565b3480156101f957600080fd5b506035545b6040519081526020016101b4565b34801561021857600080fd5b506101dd610227366004612459565b6105b2565b34801561023857600080fd5b50604051601281526020016101b4565b34801561025457600080fd5b506101fe6105d8565b34801561026957600080fd5b5061027d61027836600461240b565b6105e7565b005b34801561028b57600080fd5b506101dd61029a36600461256a565b6106b9565b3480156102ab57600080fd5b5061027d6106db565b3480156102c057600080fd5b5061027d6102cf36600461256a565b6106ed565b3480156102e057600080fd5b506101fe6102ef36600461256a565b610767565b61027d610302366004612508565b6107b0565b34801561031357600080fd5b506101fe610866565b34801561032857600080fd5b506101fe610914565b34801561033d57600080fd5b5061027d61034c3660046125ad565b61091e565b34801561035d57600080fd5b5060fe5460ff166101dd565b34801561037557600080fd5b506101fe61038436600461240b565b610ae0565b34801561039557600080fd5b5061027d610afb565b3480156103aa57600080fd5b506101fe6103b936600461240b565b610b0d565b3480156103ca57600080fd5b5061027d610b2b565b3480156103df57600080fd5b50610130546040516001600160a01b0390911681526020016101b4565b34801561040857600080fd5b506101a7610b3b565b34801561041d57600080fd5b506101fe610b4a565b34801561043257600080fd5b506101fe610441366004612607565b610b5c565b34801561045257600080fd5b5061027d61046136600461256a565b610b87565b34801561047257600080fd5b506101dd61048136600461256a565b610b99565b34801561049257600080fd5b506101dd6104a136600461256a565b610c1f565b3480156104b257600080fd5b5061027d6104c1366004612495565b610c2d565b3480156104d257600080fd5b506101fe6104e1366004612426565b610d91565b3480156104f257600080fd5b5061027d61050136600461240b565b610dbc565b606060368054610515906127cf565b80601f0160208091040260200160405190810160405280929190818152602001828054610541906127cf565b801561058e5780601f106105635761010080835404028352916020019161058e565b820191906000526020600020905b81548152906001019060200180831161057157829003601f168201915b5050505050905090565b6000336105a6818585610e32565b60019150505b92915050565b6000336105c0858285610f56565b6105cb858585610fd0565b60019150505b9392505050565b60006105e2611197565b905090565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156106395760405162461bcd60e51b81526004016106309061266f565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661066b611212565b6001600160a01b0316146106915760405162461bcd60e51b8152600401610630906126bb565b61069a8161122e565b604080516000808252602082019092526106b691839190611236565b50565b6000336105a68185856106cc8383610d91565b6106d69190612752565b610e32565b6106e36113b0565b6106eb61140b565b565b6106f56113b0565b610702600260001961276a565b8161070c60355490565b6107169190612752565b11156107595760405162461bcd60e51b81526020600482015260126024820152711b1bdbdd0e8818d85c08195e18d95959195960721b6044820152606401610630565b610763828261145d565b5050565b6001600160a01b03821660009081526065602052604081208190819061078e908590611536565b91509150816107a5576107a085610ae0565b6107a7565b805b95945050505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107f95760405162461bcd60e51b81526004016106309061266f565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661082b611212565b6001600160a01b0316146108515760405162461bcd60e51b8152600401610630906126bb565b61085a8261122e565b61076382826001611236565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109015760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b6064820152608401610630565b5060008051602061285d83398151915290565b60006105e261162d565b600054610100900460ff161580801561093e5750600054600160ff909116105b806109585750303b158015610958575060005460ff166001145b6109bb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610630565b6000805460ff1916600117905580156109de576000805461ff0019166101001790555b8251610a1f5760405162461bcd60e51b815260206004820152601060248201526f6c6f6f743a206e616d6520656d70747960801b6044820152606401610630565b8151610a625760405162461bcd60e51b81526020600482015260126024820152716c6f6f743a2073796d626f6c20656d70747960701b6044820152606401610630565b610a6c8383611638565b610a7583611669565b610a7d6116b3565b610a856116e2565b610a8d611709565b610a956116e2565b8015610adb576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6001600160a01b031660009081526033602052604090205490565b610b036113b0565b6106eb6000611738565b6001600160a01b038116600090815260cb60205260408120546105ac565b610b336113b0565b6106eb61178b565b606060378054610515906127cf565b6000610b546113b0565b6105e26117c8565b6000806000610b6c846066611536565b9150915081610b7d57603554610b7f565b805b949350505050565b610b8f6113b0565b6107638282611822565b60003381610ba78286610d91565b905083811015610c075760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610630565b610c148286868403610e32565b506001949350505050565b6000336105a6818585610fd0565b83421115610c7d5760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152606401610630565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9888888610cac8c61196a565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610d0782611992565b90506000610d17828787876119e0565b9050896001600160a01b0316816001600160a01b031614610d7a5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152606401610630565b610d858a8a8a610e32565b50505050505050505050565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b610dc46113b0565b6001600160a01b038116610e295760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610630565b6106b681611738565b6001600160a01b038316610e945760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610630565b6001600160a01b038216610ef55760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610630565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610f628484610d91565b90506000198114610fca5781811015610fbd5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610630565b610fca8484848403610e32565b50505050565b6001600160a01b0383166110345760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610630565b6001600160a01b0382166110965760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610630565b6110a1838383611a08565b6001600160a01b038316600090815260336020526040902054818110156111195760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610630565b6001600160a01b03808516600090815260336020526040808220858503905591851681529081208054849290611150908490612752565b92505081905550826001600160a01b0316846001600160a01b03166000805160206128a48339815191528460405161118a91815260200190565b60405180910390a3610fca565b60006105e27f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6111c660975490565b6098546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b60008051602061285d833981519152546001600160a01b031690565b6106b66113b0565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561126957610adb83611a96565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156112a257600080fd5b505afa9250505080156112d2575060408051601f3d908101601f191682019092526112cf91810190612594565b60015b6113355760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610630565b60008051602061285d83398151915281146113a45760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610630565b50610adb838383611b32565b610130546001600160a01b031633146106eb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610630565b611413611b57565b60fe805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b0382166114b35760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610630565b6114bf60008383611a08565b80603560008282546114d19190612752565b90915550506001600160a01b038216600090815260336020526040812080548392906114fe908490612752565b90915550506040518181526001600160a01b038316906000906000805160206128a48339815191529060200160405180910390a35050565b600080600084116115825760405162461bcd60e51b815260206004820152601660248201527504552433230536e617073686f743a20696420697320360541b6044820152606401610630565b61158a61162d565b8411156115d95760405162461bcd60e51b815260206004820152601d60248201527f4552433230536e617073686f743a206e6f6e6578697374656e742069640000006044820152606401610630565b60006115e58486611ba0565b84549091508114156115fe576000809250925050611626565b600184600101828154811061161557611615612830565b906000526020600020015492509250505b9250929050565b60006105e260685490565b600054610100900460ff1661165f5760405162461bcd60e51b815260040161063090612707565b6107638282611c63565b600054610100900460ff166116905760405162461bcd60e51b815260040161063090612707565b6106b681604051806040016040528060018152602001603160f81b815250611cb1565b600054610100900460ff166116da5760405162461bcd60e51b815260040161063090612707565b6106eb611cf2565b600054610100900460ff166106eb5760405162461bcd60e51b815260040161063090612707565b600054610100900460ff166117305760405162461bcd60e51b815260040161063090612707565b6106eb611d25565b61013080546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611793611d55565b60fe805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586114403390565b60006117d8606880546001019055565b60006117e261162d565b90507f8030e83b04d87bef53480e26263266d6ca66863aa8506aca6f2559d18aa1cb678160405161181591815260200190565b60405180910390a1919050565b6001600160a01b0382166118825760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610630565b61188e82600083611a08565b6001600160a01b038216600090815260336020526040902054818110156119025760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610630565b6001600160a01b038316600090815260336020526040812083830390556035805484929061193190849061278c565b90915550506040518281526000906001600160a01b038516906000805160206128a48339815191529060200160405180910390a3505050565b6001600160a01b038116600090815260cb602052604090208054600181018255905b50919050565b60006105ac61199f611197565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006119f187878787611d9b565b915091506119fe81611e7e565b5095945050505050565b611a13838383612034565b6001600160a01b0383161580611a465750610130546001600160a01b031633148015611a4657506001600160a01b038216155b80611a54575060fe5460ff16155b610adb5760405162461bcd60e51b81526020600482015260136024820152726c6f6f743a20217472616e7366657261626c6560681b6044820152606401610630565b6001600160a01b0381163b611b035760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610630565b60008051602061285d83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611b3b8361207c565b600082511180611b485750805b15610adb57610fca83836120bc565b60fe5460ff166106eb5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610630565b8154600090611bb1575060006105ac565b82546000905b80821015611c0d576000611bcb83836121a7565b905084868281548110611be057611be0612830565b90600052602060002001541115611bf957809150611c07565b611c04816001612752565b92505b50611bb7565b600082118015611c4257508385611c2560018561278c565b81548110611c3557611c35612830565b9060005260206000200154145b15611c5b57611c5260018361278c565b925050506105ac565b5090506105ac565b600054610100900460ff16611c8a5760405162461bcd60e51b815260040161063090612707565b8151611c9d9060369060208501906122c5565b508051610adb9060379060208401906122c5565b600054610100900460ff16611cd85760405162461bcd60e51b815260040161063090612707565b815160209283012081519190920120609791909155609855565b600054610100900460ff16611d195760405162461bcd60e51b815260040161063090612707565b60fe805460ff19169055565b600054610100900460ff16611d4c5760405162461bcd60e51b815260040161063090612707565b6106eb33611738565b60fe5460ff16156106eb5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610630565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115611dc85750600090506003611e75565b8460ff16601b14158015611de057508460ff16601c14155b15611df15750600090506004611e75565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611e45573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611e6e57600060019250925050611e75565b9150600090505b94509492505050565b6000816004811115611e9257611e9261281a565b1415611e9b5750565b6001816004811115611eaf57611eaf61281a565b1415611ef85760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b6044820152606401610630565b6002816004811115611f0c57611f0c61281a565b1415611f5a5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610630565b6003816004811115611f6e57611f6e61281a565b1415611fc75760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610630565b6004816004811115611fdb57611fdb61281a565b14156106b65760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610630565b6001600160a01b0383166120535761204b826121c2565b610adb6121ec565b6001600160a01b03821661206a5761204b836121c2565b612073836121c2565b610adb826121c2565b61208581611a96565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6121245760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610630565b600080846001600160a01b03168460405161213f9190612620565b600060405180830381855af49150503d806000811461217a576040519150601f19603f3d011682016040523d82523d6000602084013e61217f565b606091505b50915091506107a7828260405180606001604052806027815260200161287d602791396121fa565b60006121b6600284841861276a565b6105d190848416612752565b6001600160a01b03811660009081526065602052604090206106b6906121e783610ae0565b612233565b6106eb60666121e760355490565b606083156122095750816105d1565b8251156122195782518084602001fd5b8160405162461bcd60e51b8152600401610630919061263c565b600061223d61162d565b9050806122498461227d565b1015610adb578254600180820185556000858152602080822090930193909355938401805494850181558252902090910155565b805460009061228e57506000919050565b8154829061229e9060019061278c565b815481106122ae576122ae612830565b90600052602060002001549050919050565b919050565b8280546122d1906127cf565b90600052602060002090601f0160209004810192826122f35760008555612339565b82601f1061230c57805160ff1916838001178555612339565b82800160010185558215612339579182015b8281111561233957825182559160200191906001019061231e565b50612345929150612349565b5090565b5b80821115612345576000815560010161234a565b600067ffffffffffffffff8084111561237957612379612846565b604051601f8501601f19908116603f011681019082821181831017156123a1576123a1612846565b816040528093508581528686860111156123ba57600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b03811681146122c057600080fd5b600082601f8301126123fc57600080fd5b6105d18383356020850161235e565b60006020828403121561241d57600080fd5b6105d1826123d4565b6000806040838503121561243957600080fd5b612442836123d4565b9150612450602084016123d4565b90509250929050565b60008060006060848603121561246e57600080fd5b612477846123d4565b9250612485602085016123d4565b9150604084013590509250925092565b600080600080600080600060e0888a0312156124b057600080fd5b6124b9886123d4565b96506124c7602089016123d4565b95506040880135945060608801359350608088013560ff811681146124eb57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561251b57600080fd5b612524836123d4565b9150602083013567ffffffffffffffff81111561254057600080fd5b8301601f8101851361255157600080fd5b6125608582356020840161235e565b9150509250929050565b6000806040838503121561257d57600080fd5b612586836123d4565b946020939093013593505050565b6000602082840312156125a657600080fd5b5051919050565b600080604083850312156125c057600080fd5b823567ffffffffffffffff808211156125d857600080fd5b6125e4868387016123eb565b935060208501359150808211156125fa57600080fd5b50612560858286016123eb565b60006020828403121561261957600080fd5b5035919050565b600082516126328184602087016127a3565b9190910192915050565b602081526000825180602084015261265b8160408501602087016127a3565b601f01601f19169190910160400192915050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000821982111561276557612765612804565b500190565b60008261278757634e487b7160e01b600052601260045260246000fd5b500490565b60008282101561279e5761279e612804565b500390565b60005b838110156127be5781810151838201526020016127a6565b83811115610fca5750506000910152565b600181811c908216806127e357607f821691505b6020821081141561198c57634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212206a43a2d13a7d783ac847f6a12ca1fb2ec4de7ad9e779d91ce3ef97b50756de2264736f6c63430008070033";

type LootConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LootConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Loot__factory extends ContractFactory {
  constructor(...args: LootConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Loot> {
    return super.deploy(overrides || {}) as Promise<Loot>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Loot {
    return super.attach(address) as Loot;
  }
  override connect(signer: Signer): Loot__factory {
    return super.connect(signer) as Loot__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LootInterface {
    return new utils.Interface(_abi) as LootInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Loot {
    return new Contract(address, _abi, signerOrProvider) as Loot;
  }
}
