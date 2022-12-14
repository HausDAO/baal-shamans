/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ExampleManagerShaman,
  ExampleManagerShamanInterface,
} from "../../../../contracts/example/Example.sol/ExampleManagerShaman";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_moloch",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_shares",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_perPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_period",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Claim",
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
    name: "SetMember",
    type: "event",
  },
  {
    inputs: [],
    name: "baal",
    outputs: [
      {
        internalType: "contract IBAAL",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
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
    name: "claims",
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
    name: "perPeriod",
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
    name: "period",
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
    name: "shares",
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
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516106f53803806106f583398101604081905261002f916101fd565b600080546001600160a01b0319166001600160a01b0386161790556003805460ff191684151590811790915560ff161561010c5760008054906101000a90046001600160a01b03166001600160a01b0316638009ba1f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156100af57600080fd5b505afa1580156100c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e791906101db565b600180546001600160a01b0319166001600160a01b03929092169190911790556101b1565b60008054906101000a90046001600160a01b03166001600160a01b031663f460124d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561015857600080fd5b505afa15801561016c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019091906101db565b600180546001600160a01b0319166001600160a01b03929092169190911790555b600455600555506102479050565b80516001600160a01b03811681146101d657600080fd5b919050565b6000602082840312156101ed57600080fd5b6101f6826101bf565b9392505050565b6000806000806080858703121561021357600080fd5b61021c856101bf565b93506020850151801515811461023157600080fd5b6040860151606090960151949790965092505050565b61049f806102566000396000f3fe608060405234801561001057600080fd5b506004361061006d5760003560e01c806303314efa146100725780634e71d92d14610094578063c6788bdd1461009e578063e5a2a2a5146100cc578063e852b129146100f7578063ef78d4fd14610100578063fc0c546a14610109575b600080fd5b60035461007f9060ff1681565b60405190151581526020015b60405180910390f35b61009c61011c565b005b6100be6100ac36600461037a565b60026020526000908152604090205481565b60405190815260200161008b565b6000546100df906001600160a01b031681565b6040516001600160a01b03909116815260200161008b565b6100be60055481565b6100be60045481565b6001546100df906001600160a01b031681565b60045433600090815260026020526040902054610139904261042e565b101580610153575033600090815260026020526040902054155b6101a35760405162461bcd60e51b815260206004820181905260248201527f43616e206f6e6c7920636c61696d20312074696d652070657220706572696f64604482015260640160405180910390fd5b60006101ae60055490565b90506101ba3382610209565b3360008181526002602090815260409182902042908190558251938452908301527f47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4910160405180910390a150565b60408051600180825281830190925260009160208083019080368337019050509050828160008151811061023f5761023f610453565b6001600160a01b039290921660209283029190910190910152604080516001808252818301909252600091816020016020820280368337019050509050828160008151811061029057610290610453565b602090810291909101015260035460ff161561030f57600054604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c906102d890859085906004016103aa565b600060405180830381600087803b1580156102f257600080fd5b505af1158015610306573d6000803e3d6000fd5b50505050610374565b6000546040516322936c2360e11b81526001600160a01b0390911690634526d8469061034190859085906004016103aa565b600060405180830381600087803b15801561035b57600080fd5b505af115801561036f573d6000803e3d6000fd5b505050505b50505050565b60006020828403121561038c57600080fd5b81356001600160a01b03811681146103a357600080fd5b9392505050565b604080825283519082018190526000906020906060840190828701845b828110156103ec5781516001600160a01b0316845292840192908401906001016103c7565b5050508381038285015284518082528583019183019060005b8181101561042157835183529284019291840191600101610405565b5090979650505050505050565b60008282101561044e57634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fdfea26469706673582212204ec299171c89d06f2aea0bdb81b0e07c50b970cfa7fdb8073859b6fe8d5d744264736f6c63430008070033";

type ExampleManagerShamanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExampleManagerShamanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExampleManagerShaman__factory extends ContractFactory {
  constructor(...args: ExampleManagerShamanConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _moloch: PromiseOrValue<string>,
    _shares: PromiseOrValue<boolean>,
    _perPeriod: PromiseOrValue<BigNumberish>,
    _period: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ExampleManagerShaman> {
    return super.deploy(
      _moloch,
      _shares,
      _perPeriod,
      _period,
      overrides || {}
    ) as Promise<ExampleManagerShaman>;
  }
  override getDeployTransaction(
    _moloch: PromiseOrValue<string>,
    _shares: PromiseOrValue<boolean>,
    _perPeriod: PromiseOrValue<BigNumberish>,
    _period: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _moloch,
      _shares,
      _perPeriod,
      _period,
      overrides || {}
    );
  }
  override attach(address: string): ExampleManagerShaman {
    return super.attach(address) as ExampleManagerShaman;
  }
  override connect(signer: Signer): ExampleManagerShaman__factory {
    return super.connect(signer) as ExampleManagerShaman__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExampleManagerShamanInterface {
    return new utils.Interface(_abi) as ExampleManagerShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExampleManagerShaman {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ExampleManagerShaman;
  }
}
