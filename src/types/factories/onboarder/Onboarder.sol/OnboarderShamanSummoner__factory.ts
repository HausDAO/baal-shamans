/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OnboarderShamanSummoner,
  OnboarderShamanSummonerInterface,
} from "../../../onboarder/Onboarder.sol/OnboarderShamanSummoner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_template",
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
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "onboarder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wrapper",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePerUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_onlyERC20",
        type: "bool",
      },
    ],
    name: "SummonOnbShamanoarderComplete",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_baal",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pricePerUnit",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_details",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_onlyERC20",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_platformFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lootPerUnit",
        type: "uint256",
      },
    ],
    name: "summonOnboarder",
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
  {
    inputs: [],
    name: "template",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161042638038061042683398101604081905261002f9161009f565b600080546001600160a01b0319166001600160a01b0383169081178255604080516346ae4a7160e11b815290518493638d5c94e2926004808201939182900301818387803b15801561008057600080fd5b505af1158015610094573d6000803e3d6000fd5b5050505050506100cf565b6000602082840312156100b157600080fd5b81516001600160a01b03811681146100c857600080fd5b9392505050565b610348806100de6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634d6643451461003b5780636f2ddd931461006a575b600080fd5b61004e6100493660046101d8565b61007d565b6040516001600160a01b03909116815260200160405180910390f35b60005461004e906001600160a01b031681565b600080548190610095906001600160a01b0316610171565b60405163cbfec99b60e01b81526001600160a01b038c811660048301528b81166024830152604482018b905287151560648301526084820187905260a482018690529192509082169063cbfec99b9060c401600060405180830381600087803b15801561010157600080fd5b505af1158015610115573d6000803e3d6000fd5b50505050896001600160a01b03167f4c340660e208152764af09d6946bb5dea26c889bcf32e0fe90c4db57c8d45d87828b8b8b8b8b60405161015c9695949392919061029d565b60405180910390a29998505050505050505050565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b803580151581146101d357600080fd5b919050565b60008060008060008060008060e0898b0312156101f457600080fd5b88356101ff816102fa565b9750602089013561020f816102fa565b965060408901359550606089013567ffffffffffffffff8082111561023357600080fd5b818b0191508b601f83011261024757600080fd5b81358181111561025657600080fd5b8c602082850101111561026857600080fd5b60208301975080965050505061028060808a016101c3565b925060a0890135915060c089013590509295985092959890939650565b6001600160a01b038781168252861660208201526040810185905260a06060820181905281018390526000838560c0840137600060c0858401015260c0601f19601f86011683010190508215156080830152979650505050505050565b6001600160a01b038116811461030f57600080fd5b5056fea26469706673582212201f42da9404cb623f403298a182fb1e2d3e2b0bcd81d97716b412328c07c5e38664736f6c63430008070033";

type OnboarderShamanSummonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OnboarderShamanSummonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OnboarderShamanSummoner__factory extends ContractFactory {
  constructor(...args: OnboarderShamanSummonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OnboarderShamanSummoner> {
    return super.deploy(
      _template,
      overrides || {}
    ) as Promise<OnboarderShamanSummoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_template, overrides || {});
  }
  override attach(address: string): OnboarderShamanSummoner {
    return super.attach(address) as OnboarderShamanSummoner;
  }
  override connect(signer: Signer): OnboarderShamanSummoner__factory {
    return super.connect(signer) as OnboarderShamanSummoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OnboarderShamanSummonerInterface {
    return new utils.Interface(_abi) as OnboarderShamanSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OnboarderShamanSummoner {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OnboarderShamanSummoner;
  }
}
