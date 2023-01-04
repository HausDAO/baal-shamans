/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type {
  BaalLessShares,
  BaalLessSharesInterface,
} from "../../../../../../../contracts/fixtures/Baal/contracts/mock/BaalLessToken.sol/BaalLessShares";

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
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
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
    inputs: [],
    name: "baal",
    outputs: [
      {
        internalType: "contract IBaal",
        name: "",
        type: "address",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "fromTimePoint",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
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
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "delegates",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "delegationNonces",
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
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nCheckpoints",
        type: "uint256",
      },
    ],
    name: "getCheckpoint",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "fromTimePoint",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
        ],
        internalType: "struct BaalVotes.Checkpoint",
        name: "",
        type: "tuple",
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
        name: "timePoint",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "votes",
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
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "votes",
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
    name: "now",
    outputs: [
      {
        internalType: "uint256",
        name: "timePoint",
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
        name: "",
        type: "address",
      },
    ],
    name: "numCheckpoints",
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
        internalType: "uint8",
        name: "_version",
        type: "uint8",
      },
    ],
    name: "setUp",
    outputs: [],
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
  {
    inputs: [],
    name: "version",
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
];

const _bytecode =
  "0x60a06040523060601b6080523480156200001857600080fd5b506200002362000029565b620000eb565b600054610100900460ff1615620000965760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e9576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805160601c61288562000126600039600081816107a0015281816107e901528181610a5101528181610a910152610b0901526128856000f3fe6080604052600436106101c45760003560e01c80635c19a95c116100f85780639dc29fac116100905780639dc29fac14610593578063a457c2d7146105b3578063a9059cbb146105d3578063c3cda520146105f3578063d505accf14610613578063dd62ed3e14610633578063e258a72e14610653578063e5a2a2a514610673578063f2fde38b1461069457600080fd5b80635c19a95c146104895780636fcfff45146104a957806370a08231146104d7578063715018a6146104f75780637ecebe001461050c5780638abe09f21461052c5780638da5cb5b1461053f57806395d89b411461055e5780639ab24eb01461057357600080fd5b80633659cfe61161016b5780633659cfe61461032d578063395093511461034f5780633a46b1a81461036f57806340c10f191461038f57806347f761f5146103af5780634f1ef286146103f057806352d1902d1461040357806354fd4d5014610418578063587cde1e1461043a57600080fd5b806303c8a3c6146101c957806306fdde031461020a578063095ea7b31461022c5780630cdfebfa1461025c57806318160ddd146102c157806323b872dd146102d6578063313ce567146102f65780633644e51514610318575b600080fd5b3480156101d557600080fd5b506101f76101e43660046123a8565b6101036020526000908152604090205481565b6040519081526020015b60405180910390f35b34801561021657600080fd5b5061021f6106b4565b6040516102019190612630565b34801561023857600080fd5b5061024c61024736600461255e565b610746565b6040519015158152602001610201565b34801561026857600080fd5b506102a561027736600461255e565b6101006020908152600092835260408084209091529082529020805460019091015463ffffffff9091169082565b6040805163ffffffff9093168352602083019190915201610201565b3480156102cd57600080fd5b506035546101f7565b3480156102e257600080fd5b5061024c6102f13660046123f6565b610760565b34801561030257600080fd5b5060125b60405160ff9091168152602001610201565b34801561032457600080fd5b506101f7610786565b34801561033957600080fd5b5061034d6103483660046123a8565b610795565b005b34801561035b57600080fd5b5061024c61036a36600461255e565b610867565b34801561037b57600080fd5b506101f761038a36600461255e565b610889565b34801561039b57600080fd5b5061034d6103aa36600461255e565b6109ca565b3480156103bb57600080fd5b506103cf6103ca36600461255e565b6109f3565b60408051825163ffffffff1681526020928301519281019290925201610201565b61034d6103fe36600461249c565b610a46565b34801561040f57600080fd5b506101f7610afc565b34801561042457600080fd5b506101365461030690600160a01b900460ff1681565b34801561044657600080fd5b506104716104553660046123a8565b610102602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610201565b34801561049557600080fd5b5061034d6104a43660046123a8565b610baa565b3480156104b557600080fd5b506101f76104c43660046123a8565b6101016020526000908152604090205481565b3480156104e357600080fd5b506101f76104f23660046123a8565b610bb4565b34801561050357600080fd5b5061034d610bcf565b34801561051857600080fd5b506101f76105273660046123a8565b610be3565b34801561053857600080fd5b50426101f7565b34801561054b57600080fd5b50610104546001600160a01b0316610471565b34801561056a57600080fd5b5061021f610c01565b34801561057f57600080fd5b506101f761058e3660046123a8565b610c10565b34801561059f57600080fd5b5061034d6105ae36600461255e565b610c4e565b3480156105bf57600080fd5b5061024c6105ce36600461255e565b610c60565b3480156105df57600080fd5b5061024c6105ee36600461255e565b610ce6565b3480156105ff57600080fd5b5061034d61060e366004612588565b610cf4565b34801561061f57600080fd5b5061034d61062e366004612432565b610ee6565b34801561063f57600080fd5b506101f761064e3660046123c3565b61104a565b34801561065f57600080fd5b5061034d61066e3660046125f9565b611075565b34801561067f57600080fd5b5061013654610471906001600160a01b031681565b3480156106a057600080fd5b5061034d6106af3660046123a8565b611170565b6060603680546106c390612756565b80601f01602080910402602001604051908101604052809291908181526020018280546106ef90612756565b801561073c5780601f106107115761010080835404028352916020019161073c565b820191906000526020600020905b81548152906001019060200180831161071f57829003601f168201915b5050505050905090565b6000336107548185856111e6565b60019150505b92915050565b60003361076e85828561130a565b610779858585611384565b60019150505b9392505050565b600061079061154b565b905090565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107e75760405162461bcd60e51b81526004016107de90612663565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610819611582565b6001600160a01b03161461083f5760405162461bcd60e51b81526004016107de906126af565b6108488161159e565b60408051600080825260208201909252610864918391906115a6565b50565b60003361075481858561087a838361104a565b61088491906126fb565b6111e6565b60004282106108c85760405162461bcd60e51b815260206004820152600b60248201526a0859195d195c9b5a5b995960aa1b60448201526064016107de565b6001600160a01b03831660009081526101016020526040902054806108f157600091505061075a565b826108ff85600184036109f3565b5163ffffffff16116109245761091884600183036109f3565b6020015191505061075a565b826109308560006109f3565b5163ffffffff16111561094757600091505061075a565b600060001982015b818111156109b2576002828203048103600061096b88836109f3565b805190915063ffffffff1687141561098d5760200151945061075a9350505050565b805163ffffffff168711156109a4578193506109ab565b6001820392505b505061094f565b6109bc86836109f3565b602001519695505050505050565b6109d2611725565b6035546001600160ff1b03908201116109ef576109ef8282611780565b5050565b604080518082018252600080825260209182018190526001600160a01b039490941684526101008152818420928452918252918290208251808401909352805463ffffffff168352600101549082015290565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610a8f5760405162461bcd60e51b81526004016107de90612663565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610ac1611582565b6001600160a01b031614610ae75760405162461bcd60e51b81526004016107de906126af565b610af08261159e565b6109ef828260016115a6565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610b975760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b60648201526084016107de565b506000805160206127e983398151915290565b6108643382611859565b6001600160a01b031660009081526033602052604090205490565b610bd7611725565b610be1600061192c565b565b6001600160a01b03811660009081526099602052604081205461075a565b6060603780546106c390612756565b6001600160a01b0381166000908152610101602052604081205480610c3657600061077f565b610c4383600183036109f3565b602001519392505050565b610c56611725565b6109ef828261197f565b60003381610c6e828661104a565b905083811015610cce5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016107de565b610cdb82868684036111e6565b506001949350505050565b600033610754818585611384565b83421115610d445760405162461bcd60e51b815260206004820152601d60248201527f4552433230566f7465733a207369676e6174757265206578706972656400000060448201526064016107de565b6000610ded610de57f0e3bc21ca2be03aeeee0e614bfe98f970c96a05a768f627c50ab81764cb50268610d756106b4565b604051602001610d859190612614565b60408051601f198184030181528282528051602091820120908301939093528101919091526001600160a01b038a1660608201526080810189905260a0810188905260c00160405160208183030381529060405280519060200120611ac7565b858585611b15565b90506001600160a01b038116610e455760405162461bcd60e51b815260206004820181905260248201527f4552433230566f7465733a20696e76616c6964207369676e657220283078302960448201526064016107de565b6001600160a01b038116600090815261010360205260409020548614610ea95760405162461bcd60e51b81526020600482015260196024820152784552433230566f7465733a20696e76616c6964206e6f6e636560381b60448201526064016107de565b6001600160a01b038116600090815261010360205260408120805491610ece8361278b565b9190505550610edd8188611859565b50505050505050565b83421115610f365760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016107de565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9888888610f658c611b3d565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610fc082611b65565b90506000610fd082878787611b15565b9050896001600160a01b0316816001600160a01b0316146110335760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016107de565b61103e8a8a8a6111e6565b50505050505050505050565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6000548190610100900460ff16158015611096575060005460ff8083169116105b6110f95760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016107de565b60008054610136805460ff868116600160a01b026001600160a81b03199092169190911790915561ffff199091169083169081176101001761ff0019169091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b611178611725565b6001600160a01b0381166111dd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016107de565b6108648161192c565b6001600160a01b0383166112485760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016107de565b6001600160a01b0382166112a95760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016107de565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000611316848461104a565b9050600019811461137e57818110156113715760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016107de565b61137e84848484036111e6565b50505050565b6001600160a01b0383166113e85760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016107de565b6001600160a01b03821661144a5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016107de565b611455838383611b72565b6001600160a01b038316600090815260336020526040902054818110156114cd5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016107de565b6001600160a01b038085166000908152603360205260408082208585039055918516815290812080548492906115049084906126fb565b92505081905550826001600160a01b0316846001600160a01b03166000805160206128308339815191528460405161153e91815260200190565b60405180910390a361137e565b60006107907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61157a60655490565b606654611b7d565b6000805160206127e9833981519152546001600160a01b031690565b610864611725565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156115de576115d983611bc6565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561161757600080fd5b505afa925050508015611647575060408051601f3d908101601f19168201909252611644918101906125e0565b60015b6116aa5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016107de565b6000805160206127e983398151915281146117195760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016107de565b506115d9838383611c62565b610104546001600160a01b03163314610be15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107de565b6001600160a01b0382166117d65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107de565b6117e260008383611b72565b80603560008282546117f491906126fb565b90915550506001600160a01b038216600090815260336020526040812080548392906118219084906126fb565b90915550506040518181526001600160a01b038316906000906000805160206128308339815191529060200160405180910390a35050565b600061186483610bb4565b1161189b5760405162461bcd60e51b81526020600482015260076024820152662173686172657360c81b60448201526064016107de565b6001600160a01b0380831660009081526101026020526040902080548383166001600160a01b0319821617909155166118dd81836118d886610bb4565b611c87565b816001600160a01b0316816001600160a01b0316846001600160a01b03167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a4505050565b61010480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166119df5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016107de565b6119eb82600083611b72565b6001600160a01b03821660009081526033602052604090205481811015611a5f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016107de565b6001600160a01b0383166000908152603360205260408120838303905560358054849290611a8e908490612713565b90915550506040518281526000906001600160a01b038516906000805160206128308339815191529060200160405180910390a3505050565b600061075a611ad4611d6b565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611b2687878787611da2565b91509150611b3381611e85565b5095945050505050565b6001600160a01b03811660009081526099602052604090208054600181018255905b50919050565b600061075a611ad461154b565b6115d983838361203b565b6040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6001600160a01b0381163b611c335760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016107de565b6000805160206127e983398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611c6b836120d7565b600082511180611c785750805b156115d95761137e8383612117565b816001600160a01b0316836001600160a01b031614158015611ca857508015155b156115d9576001600160a01b03831615611d0a576001600160a01b038316600090815261010160205260408120549081611ce3576000611cf5565b611cf085600184036109f3565b602001515b9050828103611d068684848461213c565b5050505b6001600160a01b038216156115d9576001600160a01b038216600090815261010160205260408120549081611d40576000611d52565b611d4d84600184036109f3565b602001515b9050828101611d638584848461213c565b505050505050565b60006107907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f611d9a60cc5490565b60cd54611b7d565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115611dcf5750600090506003611e7c565b8460ff16601b14158015611de757508460ff16601c14155b15611df85750600090506004611e7c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611e4c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611e7557600060019250925050611e7c565b9150600090505b94509492505050565b6000816004811115611e9957611e996127bc565b1415611ea25750565b6001816004811115611eb657611eb66127bc565b1415611eff5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b60448201526064016107de565b6002816004811115611f1357611f136127bc565b1415611f615760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016107de565b6003816004811115611f7557611f756127bc565b1415611fce5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016107de565b6004816004811115611fe257611fe26127bc565b14156108645760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016107de565b61204482610bb4565b15801561206857506001600160a01b03821660009081526101016020526040902054155b80156120745750600081115b156120a4576001600160a01b03821660008181526101026020526040902080546001600160a01b03191690911790555b6001600160a01b03808416600090815261010260205260408082205485841683529120546115d992918216911683611c87565b6120e081611bc6565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606061077f838360405180606001604052806027815260200161280960279139612265565b42831580159061217c57506001600160a01b0385166000908152610100602090815260408083206000198801845290915290205463ffffffff8281169116145b156121b4576001600160a01b03851660009081526101006020908152604080832060001988018452909152902060010182905561221a565b60408051808201825263ffffffff838116825260208083018681526001600160a01b038a16600081815261010084528681208b825284528681209551865463ffffffff191695169490941785559051600194850155825261010190529190912090850190555b60408051848152602081018490526001600160a01b038716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a25050505050565b60606001600160a01b0384163b6122cd5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016107de565b600080856001600160a01b0316856040516122e89190612614565b600060405180830381855af49150503d8060008114612323576040519150601f19603f3d011682016040523d82523d6000602084013e612328565b606091505b5091509150612338828286612342565b9695505050505050565b6060831561235157508161077f565b8251156123615782518084602001fd5b8160405162461bcd60e51b81526004016107de9190612630565b80356001600160a01b038116811461239257600080fd5b919050565b803560ff8116811461239257600080fd5b6000602082840312156123ba57600080fd5b61077f8261237b565b600080604083850312156123d657600080fd5b6123df8361237b565b91506123ed6020840161237b565b90509250929050565b60008060006060848603121561240b57600080fd5b6124148461237b565b92506124226020850161237b565b9150604084013590509250925092565b600080600080600080600060e0888a03121561244d57600080fd5b6124568861237b565b96506124646020890161237b565b9550604088013594506060880135935061248060808901612397565b925060a0880135915060c0880135905092959891949750929550565b600080604083850312156124af57600080fd5b6124b88361237b565b9150602083013567ffffffffffffffff808211156124d557600080fd5b818501915085601f8301126124e957600080fd5b8135818111156124fb576124fb6127d2565b604051601f8201601f19908116603f01168101908382118183101715612523576125236127d2565b8160405282815288602084870101111561253c57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000806040838503121561257157600080fd5b61257a8361237b565b946020939093013593505050565b60008060008060008060c087890312156125a157600080fd5b6125aa8761237b565b955060208701359450604087013593506125c660608801612397565b92506080870135915060a087013590509295509295509295565b6000602082840312156125f257600080fd5b5051919050565b60006020828403121561260b57600080fd5b61077f82612397565b6000825161262681846020870161272a565b9190910192915050565b602081526000825180602084015261264f81604085016020870161272a565b601f01601f19169190910160400192915050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000821982111561270e5761270e6127a6565b500190565b600082821015612725576127256127a6565b500390565b60005b8381101561274557818101518382015260200161272d565b8381111561137e5750506000910152565b600181811c9082168061276a57607f821691505b60208210811415611b5f57634e487b7160e01b600052602260045260246000fd5b600060001982141561279f5761279f6127a6565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052604160045260246000fdfe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220cba0881c950086bf9419ce2418c20b5c8451678d0d9cd4f5454cb8c9765e3bfb64736f6c63430008070033";

type BaalLessSharesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaalLessSharesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaalLessShares__factory extends ContractFactory {
  constructor(...args: BaalLessSharesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BaalLessShares> {
    return super.deploy(overrides || {}) as Promise<BaalLessShares>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BaalLessShares {
    return super.attach(address) as BaalLessShares;
  }
  override connect(signer: Signer): BaalLessShares__factory {
    return super.connect(signer) as BaalLessShares__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaalLessSharesInterface {
    return new utils.Interface(_abi) as BaalLessSharesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaalLessShares {
    return new Contract(address, _abi, signerOrProvider) as BaalLessShares;
  }
}
