/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  TestAvatar,
  TestAvatarInterface,
} from "../../../../../../contracts/fixtures/Baal/contracts/mock/TestAvatar";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "disableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "enableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "execTransactionFromModule",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "execTransactionFromModuleReturnData",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "returnData",
        type: "bytes",
      },
    ],
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
        name: "pageSize",
        type: "uint256",
      },
    ],
    name: "getModulesPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "array",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "next",
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
        name: "_module",
        type: "address",
      },
    ],
    name: "isModuleEnabled",
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
    inputs: [],
    name: "module",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610761806100206000396000f3fe6080604052600436106100745760003560e01c8063610b59251161004e578063610b592514610103578063b86d529814610142578063cc2f84521461017a578063e009cfde146101a857600080fd5b80632d9ad53d14610080578063468721a7146100b55780635229073f146100d557600080fd5b3661007b57005b600080fd5b34801561008c57600080fd5b506100a061009b3660046104e8565b6101d7565b60405190151581526020015b60405180910390f35b3480156100c157600080fd5b506100a06100d036600461050c565b6101fe565b3480156100e157600080fd5b506100f56100f036600461050c565b61032c565b6040516100ac929190610688565b34801561010f57600080fd5b5061014061011e3660046104e8565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b005b34801561014e57600080fd5b50600054610162906001600160a01b031681565b6040516001600160a01b0390911681526020016100ac565b34801561018657600080fd5b5061019a6101953660046105ef565b61045a565b6040516100ac92919061062b565b3480156101b457600080fd5b506101406101c33660046105b6565b5050600080546001600160a01b0319169055565b600080546001600160a01b03838116911614156101f657506001919050565b506000919050565b600080546001600160a01b0316331461024f5760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b60448201526064015b60405180910390fd5b8160ff16600114156102c057856001600160a01b0316848460405161027592919061061b565b600060405180830381855af49150503d80600081146102b0576040519150601f19603f3d011682016040523d82523d6000602084013e6102b5565b606091505b505080915050610323565b856001600160a01b03168585856040516102db92919061061b565b60006040518083038185875af1925050503d8060008114610318576040519150601f19603f3d011682016040523d82523d6000602084013e61031d565b606091505b50909150505b95945050505050565b600080546060906001600160a01b0316331461037b5760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b6044820152606401610246565b8260ff16600114156103ec57866001600160a01b031685856040516103a192919061061b565b600060405180830381855af49150503d80600081146103dc576040519150601f19603f3d011682016040523d82523d6000602084013e6103e1565b606091505b505080925050610450565b866001600160a01b031686868660405161040792919061061b565b60006040518083038185875af1925050503d8060008114610444576040519150601f19603f3d011682016040523d82523d6000602084013e610449565b606091505b5090925090505b9550959350505050565b606060008267ffffffffffffffff811115610477576104776106fd565b6040519080825280602002602001820160405280156104a0578160200160208202803683370190505b506000805482519294506001600160a01b0316918491906104c3576104c36106e7565b6001600160a01b03928316602091820292909201015260005492959216935090915050565b6000602082840312156104fa57600080fd5b813561050581610713565b9392505050565b60008060008060006080868803121561052457600080fd5b853561052f81610713565b945060208601359350604086013567ffffffffffffffff8082111561055357600080fd5b818801915088601f83011261056757600080fd5b81358181111561057657600080fd5b89602082850101111561058857600080fd5b602083019550809450505050606086013560ff811681146105a857600080fd5b809150509295509295909350565b600080604083850312156105c957600080fd5b82356105d481610713565b915060208301356105e481610713565b809150509250929050565b6000806040838503121561060257600080fd5b823561060d81610713565b946020939093013593505050565b8183823760009101908152919050565b604080825283519082018190526000906020906060840190828701845b8281101561066d5781516001600160a01b031684529284019290840190600101610648565b5050506001600160a01b039490941692019190915250919050565b821515815260006020604081840152835180604085015260005b818110156106be578581018301518582016060015282016106a2565b818111156106d0576000606083870101525b50601f01601f191692909201606001949350505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461072857600080fd5b5056fea264697066735822122013b3ae80bdb79b16a5f14f8b233eb239739c8128c91ff744ffd1e3f2d0826ae864736f6c63430008070033";

type TestAvatarConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestAvatarConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestAvatar__factory extends ContractFactory {
  constructor(...args: TestAvatarConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestAvatar> {
    return super.deploy(overrides || {}) as Promise<TestAvatar>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestAvatar {
    return super.attach(address) as TestAvatar;
  }
  override connect(signer: Signer): TestAvatar__factory {
    return super.connect(signer) as TestAvatar__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestAvatarInterface {
    return new utils.Interface(_abi) as TestAvatarInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestAvatar {
    return new Contract(address, _abi, signerOrProvider) as TestAvatar;
  }
}
