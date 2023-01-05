/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  DhSignalTCRSumoner,
  DhSignalTCRSumonerInterface,
} from "../../../../contracts/tcr/SignalTCR.sol/DhSignalTCRSumoner";

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
        name: "signal",
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
        internalType: "uint256",
        name: "date",
        type: "uint256",
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
  "0x60a060405234801561001057600080fd5b506040516103a33803806103a383398101604081905261002f91610044565b60601b6001600160601b031916608052610074565b60006020828403121561005657600080fd5b81516001600160a01b038116811461006d57600080fd5b9392505050565b60805160601c61030c61009760003960008181604001526094015261030c6000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636fe6fabb1461003b578063c727665e1461007e575b600080fd5b6100627f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b61006261008c36600461020f565b6000806100b87f000000000000000000000000000000000000000000000000000000000000000061016e565b604051633f2601ef60e01b81526001600160a01b03878116600483015291925090821690633f2601ef90602401600060405180830381600087803b1580156100ff57600080fd5b505af1158015610113573d6000803e3d6000fd5b50505050846001600160a01b0316816001600160a01b03167fa0b69345123cff4022fbf15875d2ea2af9d38996ba6600e92d73730e3e5eed7e42878760405161015e939291906102a0565b60405180910390a3949350505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b03811661020a5760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b60008060006040848603121561022457600080fd5b83356001600160a01b038116811461023b57600080fd5b9250602084013567ffffffffffffffff8082111561025857600080fd5b818601915086601f83011261026c57600080fd5b81358181111561027b57600080fd5b87602082850101111561028d57600080fd5b6020830194508093505050509250925092565b83815260406020820152816040820152818360608301376000818301606090810191909152601f909201601f191601019291505056fea2646970667358221220b62413de2464a1f42cd262e09126ccdf1168784365b9c921dcce2154d351de8264736f6c63430008070033";

type DhSignalTCRSumonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DhSignalTCRSumonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DhSignalTCRSumoner__factory extends ContractFactory {
  constructor(...args: DhSignalTCRSumonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DhSignalTCRSumoner> {
    return super.deploy(
      template,
      overrides || {}
    ) as Promise<DhSignalTCRSumoner>;
  }
  override getDeployTransaction(
    template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(template, overrides || {});
  }
  override attach(address: string): DhSignalTCRSumoner {
    return super.attach(address) as DhSignalTCRSumoner;
  }
  override connect(signer: Signer): DhSignalTCRSumoner__factory {
    return super.connect(signer) as DhSignalTCRSumoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DhSignalTCRSumonerInterface {
    return new utils.Interface(_abi) as DhSignalTCRSumonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DhSignalTCRSumoner {
    return new Contract(address, _abi, signerOrProvider) as DhSignalTCRSumoner;
  }
}