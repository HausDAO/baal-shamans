/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  MockBaal,
  MockBaalInterface,
} from "../../../../../../contracts/fixtures/Baal/contracts/mock/MockBaal";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_lootSingleton",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burnLoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lootPaused",
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
    name: "lootToken",
    outputs: [
      {
        internalType: "contract IBaalToken",
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
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mintLoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "setLootPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516108d03803806108d083398101604081905261002f91610244565b6100428361010c60201b6103ac1760201c565b60008054610100600160a81b0319166101006001600160a01b039384168102919091179182905560405191049091169063562d190d906100869085906020016102f2565b604051602081830303815290604052836040516020016100a6919061031b565b6040516020818303038152906040526040518363ffffffff1660e01b81526004016100d2929190610344565b600060405180830381600087803b1580156100ec57600080fd5b505af1158015610100573d6000803e3d6000fd5b505050505050506103b8565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166101b85760405162461bcd60e51b815260206004820152601660248201527f455243313136373a20637265617465206661696c656400000000000000000000604482015260640160405180910390fd5b919050565b600082601f8301126101ce57600080fd5b81516001600160401b03808211156101e8576101e86103a2565b604051601f8301601f19908116603f01168101908282118183101715610210576102106103a2565b8160405283815286602085880101111561022957600080fd5b61023a846020830160208901610372565b9695505050505050565b60008060006060848603121561025957600080fd5b83516001600160a01b038116811461027057600080fd5b60208501519093506001600160401b038082111561028d57600080fd5b610299878388016101bd565b935060408601519150808211156102af57600080fd5b506102bc868287016101bd565b9150509250925092565b600081518084526102de816020860160208601610372565b601f01601f19169290920160200192915050565b60008251610304818460208701610372565b64081313d3d560da1b920191825250600501919050565b6000825161032d818460208701610372565b640b5313d3d560da1b920191825250600501919050565b60408152600061035760408301856102c6565b828103602084015261036981856102c6565b95945050505050565b60005b8381101561038d578181015183820152602001610375565b8381111561039c576000848401525b50505050565b634e487b7160e01b600052604160045260246000fd5b610509806103c76000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630ac419b21461005c5780632cdc48fc1461007e57806359cb2f06146100935780639bceb7f1146100a6578063f460124d146100b9575b600080fd5b6000546100699060ff1681565b60405190151581526020015b60405180910390f35b61009161008c366004610485565b6100e9565b005b6100916100a136600461044d565b6102fc565b6100916100b436600461044d565b61036d565b6000546100d19061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610075565b600060019054906101000a90046001600160a01b03166001600160a01b0316635c975abb6040518163ffffffff1660e01b815260040160206040518083038186803b15801561013757600080fd5b505afa15801561014b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016f91906104a9565b1580156101795750805b156101eb57600060019054906101000a90046001600160a01b03166001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156101ce57600080fd5b505af11580156101e2573d6000803e3d6000fd5b505050506102e9565b600060019054906101000a90046001600160a01b03166001600160a01b0316635c975abb6040518163ffffffff1660e01b815260040160206040518083038186803b15801561023957600080fd5b505afa15801561024d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027191906104a9565b801561027b575080155b156102e957600060019054906101000a90046001600160a01b03166001600160a01b0316633f4ba83a6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156102d057600080fd5b505af11580156102e4573d6000803e3d6000fd5b505050505b6000805460ff1916911515919091179055565b6000546040516340c10f1960e01b81526001600160a01b03848116600483015260248201849052610100909204909116906340c10f19906044015b600060405180830381600087803b15801561035157600080fd5b505af1158015610365573d6000803e3d6000fd5b505050505050565b600054604051632770a7eb60e21b81526001600160a01b0384811660048301526024820184905261010090920490911690639dc29fac90604401610337565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166104485760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b6000806040838503121561046057600080fd5b82356001600160a01b038116811461047757600080fd5b946020939093013593505050565b60006020828403121561049757600080fd5b81356104a2816104c2565b9392505050565b6000602082840312156104bb57600080fd5b81516104a2815b80151581146104d057600080fd5b5056fea26469706673582212206cc5f7e0852f8b987c4054b40c20fe3b8428777456e2c8701afe8ad27775817e64736f6c63430008070033";

type MockBaalConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockBaalConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockBaal__factory extends ContractFactory {
  constructor(...args: MockBaalConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _lootSingleton: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockBaal> {
    return super.deploy(
      _lootSingleton,
      _name,
      _symbol,
      overrides || {}
    ) as Promise<MockBaal>;
  }
  override getDeployTransaction(
    _lootSingleton: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _lootSingleton,
      _name,
      _symbol,
      overrides || {}
    );
  }
  override attach(address: string): MockBaal {
    return super.attach(address) as MockBaal;
  }
  override connect(signer: Signer): MockBaal__factory {
    return super.connect(signer) as MockBaal__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockBaalInterface {
    return new utils.Interface(_abi) as MockBaalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockBaal {
    return new Contract(address, _abi, signerOrProvider) as MockBaal;
  }
}
