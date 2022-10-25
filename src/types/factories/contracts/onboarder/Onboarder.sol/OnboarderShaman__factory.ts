/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OnboarderShaman,
  OnboarderShamanInterface,
} from "../../../../contracts/onboarder/Onboarder.sol/OnboarderShaman";

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
        name: "contributorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lootToGive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lootToPlatform",
        type: "uint256",
      },
    ],
    name: "YeetReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "amounts",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cuts",
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
    inputs: [],
    name: "expiery",
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
        name: "_pricePer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unitPerUnit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiery",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_shares",
        type: "bool",
      },
      {
        internalType: "address[]",
        name: "_cuts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lootPerUnit",
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
    name: "onboarder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "onboarder20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pricePerUnit",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506001600081905554610100900460ff16158080156200003557506001805460ff16105b8062000064575062000052306200013c60201b62000efd1760201c565b1580156200006457506001805460ff16145b620000cc5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6001805460ff1916811790558015620000ef576001805461ff0019166101001790555b801562000135576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014b565b6001600160a01b03163b151590565b611606806200015b6000396000f3fe6080604052600436106100a05760003560e01c8063b73fe9db11610064578063b73fe9db1461015c578063c7271f9a14610172578063e5a2a2a514610192578063e66825c3146101b2578063f8c4a9f3146101c8578063fc0c546a146101e857600080fd5b806303314efa146100b457806345f0a44f146100e35780634c5911b6146101115780637867385f14610127578063b27fb3111461012f57600080fd5b366100af576100ad610208565b005b600080fd5b3480156100c057600080fd5b506005546100ce9060ff1681565b60405190151581526020015b60405180910390f35b3480156100ef57600080fd5b506101036100fe366004611306565b6107e6565b6040519081526020016100da565b34801561011d57600080fd5b5061010360045481565b6100ad610208565b34801561013b57600080fd5b5061014f61014a366004611306565b610807565b6040516100da919061131f565b34801561016857600080fd5b5061010360035481565b34801561017e57600080fd5b506100ad61018d366004611306565b610831565b34801561019e57600080fd5b5060085461014f906001600160a01b031681565b3480156101be57600080fd5b5061010360025481565b3480156101d457600080fd5b506100ad6101e33660046111c8565b610d74565b3480156101f457600080fd5b5060095461014f906001600160a01b031681565b600260005414156102345760405162461bcd60e51b815260040161022b90611413565b60405180910390fd5b60026000556009546001600160a01b03161561027c5760405162461bcd60e51b8152602060048201526007602482015266216e617469766560c81b604482015260640161022b565b426004541161029d5760405162461bcd60e51b815260040161022b906113d3565b6008546001600160a01b03166102c55760405162461bcd60e51b815260040161022b906113f4565b6002543410156103035760405162461bcd60e51b81526020600482015260096024820152683c206d696e696d756d60b81b604482015260640161022b565b60085460405163f3ae241560e01b81526001600160a01b039091169063f3ae24159061033390309060040161131f565b602060405180830381600087803b15801561034d57600080fd5b505af1158015610361573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038591906112e9565b6103ca5760405162461bcd60e51b815260206004820152601660248201527514da185b585b881b9bdd081dda1a5d195b1a5cdd195960521b604482015260640161022b565b6000600254346103da91906114d9565b90506000600254826103ec91906114ed565b90506000600860009054906101000a90046001600160a01b03166001600160a01b031663d4b839926040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561044057600080fd5b505af1158015610454573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047891906111a4565b6001600160a01b03168260405160006040518083038185875af1925050503d80600081146104c2576040519150601f19603f3d011682016040523d82523d6000602084013e6104c7565b606091505b50509050806104e85760405162461bcd60e51b815260040161022b906113aa565b81341115610561576000336104fd843461150c565b604051600081818185875af1925050503d8060008114610539576040519150601f19603f3d011682016040523d82523d6000602084013e61053e565b606091505b505090508061055f5760405162461bcd60e51b815260040161022b906113aa565b505b60006003548461057191906114ed565b905061057d3382610f0c565b6006546000906001600160401b0381111561059a5761059a611594565b6040519080825280602002602001820160405280156105c3578160200160208202803683370190505b50905060005b60065481101561064057600681815481106105e6576105e661157e565b9060005260206000200160009054906101000a90046001600160a01b03168282815181106106165761061661157e565b6001600160a01b03909216602092830291909101909101528061063881611523565b9150506105c9565b5060075460009081906001600160401b0381111561066057610660611594565b604051908082528060200260200182016040528015610689578160200160208202803683370190505b50905060005b6007548110156107265787600782815481106106ad576106ad61157e565b90600052602060002001546106c291906114ed565b6106cc90846114c1565b925087600782815481106106e2576106e261157e565b90600052602060002001546106f791906114ed565b8282815181106107095761070961157e565b60209081029190910101528061071e81611523565b91505061068f565b506008546040516322936c2360e11b81526001600160a01b0390911690634526d846906107599086908590600401611333565b600060405180830381600087803b15801561077357600080fd5b505af1158015610787573d6000803e3d6000fd5b50506008546040513393507f0487ee333111913d82fd6ce450b3477d3ccd8873334e8a6bfbcedc5789e798bf92506107d0918a916001600160a01b03909116908990889061144a565b60405180910390a2505060016000555050505050565b600781815481106107f657600080fd5b600091825260209091200154905081565b6006818154811061081757600080fd5b6000918252602090912001546001600160a01b0316905081565b600260005414156108545760405162461bcd60e51b815260040161022b90611413565b60026000556008546001600160a01b03166108815760405162461bcd60e51b815260040161022b906113f4565b42600454116108a25760405162461bcd60e51b815260040161022b906113d3565b60085460405163f3ae241560e01b81526001600160a01b039091169063f3ae2415906108d290309060040161131f565b602060405180830381600087803b1580156108ec57600080fd5b505af1158015610900573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092491906112e9565b6109655760405162461bcd60e51b815260206004820152601260248201527129b430b6b0b7103737ba1036b0b730b3b2b960711b604482015260640161022b565b600254610972908261153e565b156109af5760405162461bcd60e51b815260206004820152600d60248201526c085d985b1a5908185b5bdd5b9d609a1b604482015260640161022b565b6000600254826109bf91906114d9565b60095460085460408051636a5c1cc960e11b815290519394506001600160a01b03928316936323b872dd933393169163d4b839929160048083019260209291908290030181600087803b158015610a1557600080fd5b505af1158015610a29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4d91906111a4565b6040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101859052606401602060405180830381600087803b158015610a9c57600080fd5b505af1158015610ab0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad491906112e9565b610af05760405162461bcd60e51b815260040161022b906113aa565b600060035482610b0091906114ed565b9050610b0c3382610f0c565b6006546000906001600160401b03811115610b2957610b29611594565b604051908082528060200260200182016040528015610b52578160200160208202803683370190505b50905060005b600654811015610bcf5760068181548110610b7557610b7561157e565b9060005260206000200160009054906101000a90046001600160a01b0316828281518110610ba557610ba561157e565b6001600160a01b039092166020928302919091019091015280610bc781611523565b915050610b58565b5060075460009081906001600160401b03811115610bef57610bef611594565b604051908082528060200260200182016040528015610c18578160200160208202803683370190505b50905060005b600754811015610cb5578560078281548110610c3c57610c3c61157e565b9060005260206000200154610c5191906114ed565b610c5b90846114c1565b92508560078281548110610c7157610c7161157e565b9060005260206000200154610c8691906114ed565b828281518110610c9857610c9861157e565b602090810291909101015280610cad81611523565b915050610c1e565b506008546040516322936c2360e11b81526001600160a01b0390911690634526d84690610ce89086908590600401611333565b600060405180830381600087803b158015610d0257600080fd5b505af1158015610d16573d6000803e3d6000fd5b50506008546040513393507f0487ee333111913d82fd6ce450b3477d3ccd8873334e8a6bfbcedc5789e798bf9250610d5f918a916001600160a01b03909116908990889061144a565b60405180910390a25050600160005550505050565b600154610100900460ff1615808015610d9157506001805460ff16105b80610db15750610da030610efd565b158015610db157506001805460ff16145b610e145760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161022b565b6001805460ff1916811790558015610e36576001805461ff0019166101001790555b600880546001600160a01b03808c166001600160a01b03199283161790925560098054928b16929091169190911790556002879055600386905560048590556005805485151560ff199091161790558251610e9890600690602086019061107d565b508151610eac9060079060208501906110e2565b508015610ef2576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050505050565b6001600160a01b03163b151590565b604080516001808252818301909252600091602080830190803683370190505090508281600081518110610f4257610f4261157e565b6001600160a01b0392909216602092830291909101909101526040805160018082528183019092526000918160200160208202803683370190505090508281600081518110610f9357610f9361157e565b602090810291909101015260055460ff161561101257600854604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c90610fdb9085908590600401611333565b600060405180830381600087803b158015610ff557600080fd5b505af1158015611009573d6000803e3d6000fd5b50505050611077565b6008546040516322936c2360e11b81526001600160a01b0390911690634526d846906110449085908590600401611333565b600060405180830381600087803b15801561105e57600080fd5b505af1158015611072573d6000803e3d6000fd5b505050505b50505050565b8280548282559060005260206000209081019282156110d2579160200282015b828111156110d257825182546001600160a01b0319166001600160a01b0390911617825560209092019160019091019061109d565b506110de92915061111d565b5090565b8280548282559060005260206000209081019282156110d2579160200282015b828111156110d2578251825591602001919060010190611102565b5b808211156110de576000815560010161111e565b600082601f83011261114357600080fd5b813560206111586111538361149e565b61146e565b80838252828201915082860187848660051b890101111561117857600080fd5b60005b858110156111975781358452928401929084019060010161117b565b5090979650505050505050565b6000602082840312156111b657600080fd5b81516111c1816115aa565b9392505050565b600080600080600080600080610100898b0312156111e557600080fd5b88356111f0816115aa565b97506020890135611200816115aa565b965060408901359550606089013594506080890135935060a0890135611225816115c2565b925060c08901356001600160401b038082111561124157600080fd5b818b0191508b601f83011261125557600080fd5b81356112636111538261149e565b80828252602082019150602085018f60208560051b880101111561128657600080fd5b600095505b838610156112b357803561129e816115aa565b8352600195909501946020928301920161128b565b509550505060e08b01359150808211156112cc57600080fd5b506112d98b828c01611132565b9150509295985092959890939650565b6000602082840312156112fb57600080fd5b81516111c1816115c2565b60006020828403121561131857600080fd5b5035919050565b6001600160a01b0391909116815260200190565b604080825283519082018190526000906020906060840190828701845b828110156113755781516001600160a01b031684529284019290840190600101611350565b5050508381038285015284518082528583019183019060005b818110156111975783518352928401929184019160010161138e565b6020808252600f908201526e151c985b9cd9995c8819985a5b1959608a1b604082015260600190565b6020808252600790820152666578706965727960c81b604082015260600190565b602080825260059082015264085a5b9a5d60da1b604082015260600190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b9384526001600160a01b039290921660208401526040830152606082015260800190565b604051601f8201601f191681016001600160401b038111828210171561149657611496611594565b604052919050565b60006001600160401b038211156114b7576114b7611594565b5060051b60200190565b600082198211156114d4576114d4611552565b500190565b6000826114e8576114e8611568565b500490565b600081600019048311821515161561150757611507611552565b500290565b60008282101561151e5761151e611552565b500390565b600060001982141561153757611537611552565b5060010190565b60008261154d5761154d611568565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146115bf57600080fd5b50565b80151581146115bf57600080fdfea2646970667358221220b45a7892ee4c74037154c3ea174aacb258ce5943746da6f59c82ec9e6d5de76b64736f6c63430008070033";

type OnboarderShamanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OnboarderShamanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OnboarderShaman__factory extends ContractFactory {
  constructor(...args: OnboarderShamanConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OnboarderShaman> {
    return super.deploy(overrides || {}) as Promise<OnboarderShaman>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OnboarderShaman {
    return super.attach(address) as OnboarderShaman;
  }
  override connect(signer: Signer): OnboarderShaman__factory {
    return super.connect(signer) as OnboarderShaman__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OnboarderShamanInterface {
    return new utils.Interface(_abi) as OnboarderShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OnboarderShaman {
    return new Contract(address, _abi, signerOrProvider) as OnboarderShaman;
  }
}
