/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ModuleProxyFactory,
  ModuleProxyFactoryInterface,
} from "../../../../../@gnosis.pm/zodiac/contracts/factory/ModuleProxyFactory";

const _abi = [
  {
    inputs: [],
    name: "FailedInitialization",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "TakenAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "masterCopy",
        type: "address",
      },
    ],
    name: "ModuleProxyCreation",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "masterCopy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
    ],
    name: "deployModule",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103b0806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f1ab873c14610030575b600080fd5b61004361003e36600461023c565b610059565b6040516100509190610350565b60405180910390f35b600061009d84848051906020012084604051602001610082929190918252602082015260400190565b60405160208183030381529060405280519060200120610165565b90506000816001600160a01b0316846040516100b99190610315565b6000604051808303816000865af19150503d80600081146100f6576040519150601f19603f3d011682016040523d82523d6000602084013e6100fb565b606091505b505090508061011d57604051637dabd39960e01b815260040160405180910390fd5b846001600160a01b0316826001600160a01b03167f2150ada912bf189ed721c44211199e270903fc88008c2a1e1e889ef30fe67c5f60405160405180910390a3509392505050565b60006001600160a01b0383166101995782604051633202e20d60e21b81526004016101909190610350565b60405180910390fd5b60405172602d8060093d393df3363d3d373d3d3d363d7360681b60208201526bffffffffffffffffffffffff19606085901b1660338201526e5af43d82803e903d91602b57fd5bf360881b60478201526000906056016040516020818303038152906040529050828151602083016000f591506001600160a01b038216610235578160405163371e9e8960e21b81526004016101909190610350565b5092915050565b60008060006060848603121561025157600080fd5b83356001600160a01b038116811461026857600080fd5b9250602084013567ffffffffffffffff8082111561028557600080fd5b818601915086601f83011261029957600080fd5b8135818111156102ab576102ab610364565b604051601f8201601f19908116603f011681019083821181831017156102d3576102d3610364565b816040528281528960208487010111156102ec57600080fd5b826020860160208301376000602084830101528096505050505050604084013590509250925092565b6000825160005b81811015610336576020818601810151858301520161031c565b81811115610345576000828501525b509190910192915050565b6001600160a01b0391909116815260200190565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220be248b150c8a674cab9486b445f89d7e924a6ae3e03fbdc0a9a1c4c86017952164736f6c63430008070033";

type ModuleProxyFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ModuleProxyFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ModuleProxyFactory__factory extends ContractFactory {
  constructor(...args: ModuleProxyFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ModuleProxyFactory> {
    return super.deploy(overrides || {}) as Promise<ModuleProxyFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ModuleProxyFactory {
    return super.attach(address) as ModuleProxyFactory;
  }
  override connect(signer: Signer): ModuleProxyFactory__factory {
    return super.connect(signer) as ModuleProxyFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ModuleProxyFactoryInterface {
    return new utils.Interface(_abi) as ModuleProxyFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ModuleProxyFactory {
    return new Contract(address, _abi, signerOrProvider) as ModuleProxyFactory;
  }
}
