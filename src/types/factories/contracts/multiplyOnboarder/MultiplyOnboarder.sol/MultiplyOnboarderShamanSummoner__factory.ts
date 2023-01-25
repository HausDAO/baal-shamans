/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  MultiplyOnboarderShamanSummoner,
  MultiplyOnboarderShamanSummonerInterface,
} from "../../../../contracts/multiplyOnboarder/MultiplyOnboarder.sol/MultiplyOnboarderShamanSummoner";

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
        indexed: true,
        internalType: "address",
        name: "onboarder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiery",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "multiplier",
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
        name: "_isShares",
        type: "bool",
      },
    ],
    name: "SummonOnboarder",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_moloch",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expiery",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_multiplier",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isShares",
        type: "bool",
      },
      {
        internalType: "string",
        name: "_details",
        type: "string",
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
  "0x608060405234801561001057600080fd5b5060405161040e38038061040e83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61037b806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630dd71cf71461003b5780636f2ddd931461006a575b600080fd5b61004e610049366004610214565b61007d565b6040516001600160a01b03909116815260200160405180910390f35b60005461004e906001600160a01b031681565b600080548190610095906001600160a01b0316610173565b60405163010f09a560e21b81526001600160a01b038b811660048301528a81166024830152604482018a90526064820189905287151560848301529192509082169063043c26949060a401600060405180830381600087803b1580156100fa57600080fd5b505af115801561010e573d6000803e3d6000fd5b50505050806001600160a01b0316896001600160a01b03167f6080d8ce30f9ed345cf5fae894d4fa6145654a248b8122da862bda3c4f526cc38a8a8a89898c60405161015f969594939291906102d7565b60405180910390a398975050505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b03811661020f5760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b600080600080600080600060c0888a03121561022f57600080fd5b873561023a8161032d565b9650602088013561024a8161032d565b955060408801359450606088013593506080880135801515811461026d57600080fd5b925060a088013567ffffffffffffffff8082111561028a57600080fd5b818a0191508a601f83011261029e57600080fd5b8135818111156102ad57600080fd5b8b60208285010111156102bf57600080fd5b60208301945080935050505092959891949750929550565b60018060a01b038716815285602082015284604082015260a060608201528260a0820152828460c0830137600081840160c0908101919091529115156080820152601f909201601f191690910101949350505050565b6001600160a01b038116811461034257600080fd5b5056fea2646970667358221220404c283e15721c2da3bad2a58645ea69dfb8e5342d0efae7b25291e5e8c5ccc064736f6c63430008070033";

type MultiplyOnboarderShamanSummonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiplyOnboarderShamanSummonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiplyOnboarderShamanSummoner__factory extends ContractFactory {
  constructor(...args: MultiplyOnboarderShamanSummonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MultiplyOnboarderShamanSummoner> {
    return super.deploy(
      _template,
      overrides || {}
    ) as Promise<MultiplyOnboarderShamanSummoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_template, overrides || {});
  }
  override attach(address: string): MultiplyOnboarderShamanSummoner {
    return super.attach(address) as MultiplyOnboarderShamanSummoner;
  }
  override connect(signer: Signer): MultiplyOnboarderShamanSummoner__factory {
    return super.connect(signer) as MultiplyOnboarderShamanSummoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiplyOnboarderShamanSummonerInterface {
    return new utils.Interface(
      _abi
    ) as MultiplyOnboarderShamanSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiplyOnboarderShamanSummoner {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as MultiplyOnboarderShamanSummoner;
  }
}
