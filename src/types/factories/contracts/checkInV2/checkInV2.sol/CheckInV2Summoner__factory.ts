/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CheckInV2Summoner,
  CheckInV2SummonerInterface,
} from "../../../../contracts/checkInV2/checkInV2.sol/CheckInV2Summoner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
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
        name: "summoner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "shamanAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamLead",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sharesOrLoot",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPerSecond",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "checkInInterval",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32[5]",
        name: "valueScalePercs",
        type: "uint32[5]",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectMetadata",
        type: "string",
      },
    ],
    name: "CheckInSummonComplete",
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
        internalType: "address",
        name: "_teamLead",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_sharesOrLoot",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_tokenPerSecond",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_checkInInterval",
        type: "uint256",
      },
      {
        internalType: "uint32[5]",
        name: "_valueScalePercs",
        type: "uint32[5]",
      },
      {
        internalType: "string",
        name: "_projectMetadata",
        type: "string",
      },
    ],
    name: "summon",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161052238038061052283398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61048f806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636f2ddd931461003b578063d29234d61461006a575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61004e610078366004610220565b600080548190610090906001600160a01b0316610168565b6040516353de96e360e01b81529091506001600160a01b038216906353de96e3906100c9908c908c908c908c908c908c90600401610374565b600060405180830381600087803b1580156100e357600080fd5b505af11580156100f7573d6000803e3d6000fd5b50505050806001600160a01b0316336001600160a01b03168a6001600160a01b03167f8ec5d2dc2e255c3fd944cbd5ef9fdabf370ece784c28e4ced75e6c6b9bb0d0a68b8b8b8b8b8b604051610152969594939291906103b0565b60405180910390a490505b979650505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166102045760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b80356001600160a01b038116811461020457600080fd5b6000806000806000806000610160888a03121561023c57600080fd5b61024588610209565b965061025360208901610209565b95506040880135801515811461026857600080fd5b9450606088013593506080880135925061014088018981111561028a57600080fd5b60a0890192503567ffffffffffffffff808211156102a757600080fd5b818a0191508a601f8301126102bb57600080fd5b8135818111156102cd576102cd610443565b604051601f8201601f19908116603f011681019083821181831017156102f5576102f5610443565b816040528281528d602084870101111561030e57600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b806000805b600581101561036d57823563ffffffff8116808214610357578384fd5b865250602094850194929092019160010161033a565b5050505050565b6001600160a01b0387811682528616602082015284151560408201526060810184905260808101839052610140810161015d60a0830184610335565b600061014060018060a01b03891683526020881515818501528760408501528660608501526103e26080850187610335565b8161012085015284518083860152600092505b80831015610414578583018201518584016101600152918101916103f5565b8083111561042757600061016082870101525b601f01601f191693909301610160019998505050505050505050565b634e487b7160e01b600052604160045260246000fdfea264697066735822122083218b421630415631bea7ade620d405087863aa91bfdf2019703181959f900a64736f6c63430008070033";

type CheckInV2SummonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CheckInV2SummonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CheckInV2Summoner__factory extends ContractFactory {
  constructor(...args: CheckInV2SummonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CheckInV2Summoner> {
    return super.deploy(
      _template,
      overrides || {}
    ) as Promise<CheckInV2Summoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_template, overrides || {});
  }
  override attach(address: string): CheckInV2Summoner {
    return super.attach(address) as CheckInV2Summoner;
  }
  override connect(signer: Signer): CheckInV2Summoner__factory {
    return super.connect(signer) as CheckInV2Summoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CheckInV2SummonerInterface {
    return new utils.Interface(_abi) as CheckInV2SummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CheckInV2Summoner {
    return new Contract(address, _abi, signerOrProvider) as CheckInV2Summoner;
  }
}
