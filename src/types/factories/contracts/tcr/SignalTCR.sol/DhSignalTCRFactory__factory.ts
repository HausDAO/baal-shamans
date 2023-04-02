/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  DhSignalTCRFactory,
  DhSignalTCRFactoryInterface,
} from "../../../../contracts/tcr/SignalTCR.sol/DhSignalTCRFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "template",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "SummonDaoStake",
    type: "event",
  },
  {
    inputs: [],
    name: "_template",
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
        name: "baal",
        type: "address",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "summonSignalTCR",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161034b38038061034b83398101604081905261002f91610044565b60601b6001600160601b031916608052610074565b60006020828403121561005657600080fd5b81516001600160a01b038116811461006d57600080fd5b9392505050565b60805160601c6102b46100976000396000818160400152609401526102b46000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636fe6fabb1461003b578063c727665e1461007e575b600080fd5b6100627f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b61006261008c3660046101be565b6000806100b87f000000000000000000000000000000000000000000000000000000000000000061016c565b604051633f2601ef60e01b81526001600160a01b03878116600483015291925090821690633f2601ef90602401600060405180830381600087803b1580156100ff57600080fd5b505af1158015610113573d6000803e3d6000fd5b50505050846001600160a01b0316816001600160a01b03167f751a2c1891f8b2256004c93b0b9eb3ce72ae4e7cd3a1bfe1644c7ccd08083b37868660405161015c92919061024f565b60405180910390a3949350505050565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b6000806000604084860312156101d357600080fd5b83356001600160a01b03811681146101ea57600080fd5b9250602084013567ffffffffffffffff8082111561020757600080fd5b818601915086601f83011261021b57600080fd5b81358181111561022a57600080fd5b87602082850101111561023c57600080fd5b6020830194508093505050509250925092565b60208152816020820152818360408301376000818301604090810191909152601f909201601f1916010191905056fea26469706673582212205b45cbbb6bee9153031e903392bb4bb399fa1808bc0e4a5651e294d0435058cb64736f6c63430008070033";

type DhSignalTCRFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DhSignalTCRFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DhSignalTCRFactory__factory extends ContractFactory {
  constructor(...args: DhSignalTCRFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DhSignalTCRFactory> {
    return super.deploy(
      template,
      overrides || {}
    ) as Promise<DhSignalTCRFactory>;
  }
  override getDeployTransaction(
    template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(template, overrides || {});
  }
  override attach(address: string): DhSignalTCRFactory {
    return super.attach(address) as DhSignalTCRFactory;
  }
  override connect(signer: Signer): DhSignalTCRFactory__factory {
    return super.connect(signer) as DhSignalTCRFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DhSignalTCRFactoryInterface {
    return new utils.Interface(_abi) as DhSignalTCRFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DhSignalTCRFactory {
    return new Contract(address, _abi, signerOrProvider) as DhSignalTCRFactory;
  }
}