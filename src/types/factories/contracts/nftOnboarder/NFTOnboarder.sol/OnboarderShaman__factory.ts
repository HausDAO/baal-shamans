/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OnboarderShaman,
  OnboarderShamanInterface,
} from "../../../../contracts/nftOnboarder/NFTOnboarder.sol/OnboarderShaman";

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
        internalType: "address",
        name: "_nftTemplate",
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
  "0x60806040523480156200001157600080fd5b506001600081905554610100900460ff16158080156200003557506001805460ff16105b8062000064575062000052306200013c60201b62000f6a1760201c565b1580156200006457506001805460ff16145b620000cc5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6001805460ff1916811790558015620000ef576001805461ff0019166101001790555b801562000135576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014b565b6001600160a01b03163b151590565b61171d806200015b6000396000f3fe6080604052600436106100a05760003560e01c8063b27fb31111610064578063b27fb3111461014f578063b73fe9db1461017c578063c7271f9a14610192578063e5a2a2a5146101b2578063e66825c3146101d2578063fc0c546a146101e857600080fd5b806303314efa146100b457806345f0a44f146100e35780634c5911b6146101115780637867385f14610127578063942935821461012f57600080fd5b366100af576100ad610208565b005b600080fd5b3480156100c057600080fd5b506005546100ce9060ff1681565b60405190151581526020015b60405180910390f35b3480156100ef57600080fd5b506101036100fe366004611435565b6107bb565b6040519081526020016100da565b34801561011d57600080fd5b5061010360045481565b6100ad610208565b34801561013b57600080fd5b506100ad61014a366004611351565b6107dc565b34801561015b57600080fd5b5061016f61016a366004611435565b610972565b6040516100da919061144e565b34801561018857600080fd5b5061010360035481565b34801561019e57600080fd5b506100ad6101ad366004611435565b61099c565b3480156101be57600080fd5b5060085461016f906001600160a01b031681565b3480156101de57600080fd5b5061010360025481565b3480156101f457600080fd5b5060095461016f906001600160a01b031681565b600260005414156102345760405162461bcd60e51b815260040161022b9061159e565b60405180910390fd5b60026000556009546001600160a01b03161561027c5760405162461bcd60e51b8152602060048201526007602482015266216e617469766560c81b604482015260640161022b565b426004541161029d5760405162461bcd60e51b815260040161022b9061155e565b6008546001600160a01b03166102c55760405162461bcd60e51b815260040161022b9061157f565b60025434146103025760405162461bcd60e51b81526020600482015260096024820152683c206d696e696d756d60b81b604482015260640161022b565b60085460405163f3ae241560e01b81526001600160a01b039091169063f3ae24159061033290309060040161144e565b602060405180830381600087803b15801561034c57600080fd5b505af1158015610360573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103849190611418565b6103c95760405162461bcd60e51b815260206004820152601660248201527514da185b585b881b9bdd081dda1a5d195b1a5cdd195960521b604482015260640161022b565b60085460408051636a5c1cc960e11b815290516000926001600160a01b03169163d4b8399291600480830192602092919082900301818787803b15801561040f57600080fd5b505af1158015610423573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610447919061132d565b6001600160a01b031660025460405160006040518083038185875af1925050503d8060008114610493576040519150601f19603f3d011682016040523d82523d6000602084013e610498565b606091505b50509050806104b95760405162461bcd60e51b815260040161022b90611535565b600a546000906104d1906001600160a01b0316610f79565b600854604051634d91d7d960e01b81529192506001600160a01b0380841692634d91d7d992610507923392911690600401611462565b600060405180830381600087803b15801561052157600080fd5b505af1158015610535573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b038416925063f2fde38b915061056590339060040161144e565b600060405180830381600087803b15801561057f57600080fd5b505af1158015610593573d6000803e3d6000fd5b505050506105a333600354611016565b6006546000906001600160401b038111156105c0576105c06116ab565b6040519080825280602002602001820160405280156105e9578160200160208202803683370190505b50905060005b600654811015610666576006818154811061060c5761060c611695565b9060005260206000200160009054906101000a90046001600160a01b031682828151811061063c5761063c611695565b6001600160a01b03909216602092830291909101909101528061065e81611664565b9150506105ef565b5060075460009081906001600160401b03811115610686576106866116ab565b6040519080825280602002602001820160405280156106af578160200160208202803683370190505b50905060005b6007548110156106fc57600781815481106106d2576106d2611695565b9060005260206000200154836106e8919061164c565b9250806106f481611664565b9150506106b5565b506008546040516322936c2360e11b81526001600160a01b0390911690634526d8469061072f90869085906004016114be565b600060405180830381600087803b15801561074957600080fd5b505af115801561075d573d6000803e3d6000fd5b50506008546003546040513394507f0487ee333111913d82fd6ce450b3477d3ccd8873334e8a6bfbcedc5789e798bf93506107a79234926001600160a01b039091169188906115d5565b60405180910390a250506001600055505050565b600781815481106107cb57600080fd5b600091825260209091200154905081565b600154610100900460ff16158080156107f957506001805460ff16105b80610819575061080830610f6a565b15801561081957506001805460ff16145b61087c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161022b565b6001805460ff191681179055801561089e576001805461ff0019166101001790555b600880546001600160a01b03199081166001600160a01b038d8116919091179092556009805482168c8416179055600a8054909116918a169190911790556002879055600386905560048590556005805460ff1916851515179055825161090c906006906020860190611187565b5081516109209060079060208501906111ec565b508015610966576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050505050565b6006818154811061098257600080fd5b6000918252602090912001546001600160a01b0316905081565b600260005414156109bf5760405162461bcd60e51b815260040161022b9061159e565b60026000556008546001600160a01b03166109ec5760405162461bcd60e51b815260040161022b9061157f565b4260045411610a0d5760405162461bcd60e51b815260040161022b9061155e565b60085460405163f3ae241560e01b81526001600160a01b039091169063f3ae241590610a3d90309060040161144e565b602060405180830381600087803b158015610a5757600080fd5b505af1158015610a6b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8f9190611418565b610ad05760405162461bcd60e51b815260206004820152601260248201527129b430b6b0b7103737ba1036b0b730b3b2b960711b604482015260640161022b565b6002548114610b115760405162461bcd60e51b815260206004820152600d60248201526c085d985b1a5908185b5bdd5b9d609a1b604482015260640161022b565b60095460085460408051636a5c1cc960e11b815290516001600160a01b03938416936323b872dd93339391169163d4b83992916004808201926020929091908290030181600087803b158015610b6657600080fd5b505af1158015610b7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9e919061132d565b6040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b158015610bed57600080fd5b505af1158015610c01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c259190611418565b610c415760405162461bcd60e51b815260040161022b90611535565b600a54600090610c59906001600160a01b0316610f79565b600854604051634d91d7d960e01b81529192506001600160a01b0380841692634d91d7d992610c8f923392911690600401611462565b600060405180830381600087803b158015610ca957600080fd5b505af1158015610cbd573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b038416925063f2fde38b9150610ced90339060040161144e565b600060405180830381600087803b158015610d0757600080fd5b505af1158015610d1b573d6000803e3d6000fd5b50505050610d2b33600354611016565b6006546000906001600160401b03811115610d4857610d486116ab565b604051908082528060200260200182016040528015610d71578160200160208202803683370190505b50905060005b600654811015610dee5760068181548110610d9457610d94611695565b9060005260206000200160009054906101000a90046001600160a01b0316828281518110610dc457610dc4611695565b6001600160a01b039092166020928302919091019091015280610de681611664565b915050610d77565b5060075460009081906001600160401b03811115610e0e57610e0e6116ab565b604051908082528060200260200182016040528015610e37578160200160208202803683370190505b50905060005b600754811015610ebf5760078181548110610e5a57610e5a611695565b906000526020600020015483610e70919061164c565b925060078181548110610e8557610e85611695565b9060005260206000200154828281518110610ea257610ea2611695565b602090810291909101015280610eb781611664565b915050610e3d565b506008546040516322936c2360e11b81526001600160a01b0390911690634526d84690610ef290869085906004016114be565b600060405180830381600087803b158015610f0c57600080fd5b505af1158015610f20573d6000803e3d6000fd5b50506008546003546040513394507f0487ee333111913d82fd6ce450b3477d3ccd8873334e8a6bfbcedc5789e798bf93506107a7928a926001600160a01b039091169188906115d5565b6001600160a01b03163b151590565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166110115760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640161022b565b919050565b60408051600180825281830190925260009160208083019080368337019050509050828160008151811061104c5761104c611695565b6001600160a01b039290921660209283029190910190910152604080516001808252818301909252600091816020016020820280368337019050509050828160008151811061109d5761109d611695565b602090810291909101015260055460ff161561111c57600854604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c906110e590859085906004016114be565b600060405180830381600087803b1580156110ff57600080fd5b505af1158015611113573d6000803e3d6000fd5b50505050611181565b6008546040516322936c2360e11b81526001600160a01b0390911690634526d8469061114e90859085906004016114be565b600060405180830381600087803b15801561116857600080fd5b505af115801561117c573d6000803e3d6000fd5b505050505b50505050565b8280548282559060005260206000209081019282156111dc579160200282015b828111156111dc57825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906111a7565b506111e8929150611227565b5090565b8280548282559060005260206000209081019282156111dc579160200282015b828111156111dc57825182559160200191906001019061120c565b5b808211156111e85760008155600101611228565b8035611011816116c1565b600082601f83011261125857600080fd5b8135602061126d61126883611629565b6115f9565b80838252828201915082860187848660051b890101111561128d57600080fd5b60005b858110156112b55781356112a3816116c1565b84529284019290840190600101611290565b5090979650505050505050565b600082601f8301126112d357600080fd5b813560206112e361126883611629565b80838252828201915082860187848660051b890101111561130357600080fd5b60005b858110156112b557813584529284019290840190600101611306565b8035611011816116d9565b60006020828403121561133f57600080fd5b815161134a816116c1565b9392505050565b60008060008060008060008060006101208a8c03121561137057600080fd5b893561137b816116c1565b985060208a013561138b816116c1565b975061139960408b0161123c565b965060608a0135955060808a0135945060a08a013593506113bc60c08b01611322565b925060e08a01356001600160401b03808211156113d857600080fd5b6113e48d838e01611247565b93506101008c01359150808211156113fb57600080fd5b506114088c828d016112c2565b9150509295985092959850929598565b60006020828403121561142a57600080fd5b815161134a816116d9565b60006020828403121561144757600080fd5b5035919050565b6001600160a01b0391909116815260200190565b6001600160a01b03928316815291166020820152608060408201819052600e908201526d2232b632b3b0ba32902a37b5b2b760911b60a082015260c0606082018190526003908201526211115360ea1b60e08201526101000190565b604080825283519082018190526000906020906060840190828701845b828110156115005781516001600160a01b0316845292840192908401906001016114db565b5050508381038285015284518082528583019183019060005b818110156112b557835183529284019291840191600101611519565b6020808252600f908201526e151c985b9cd9995c8819985a5b1959608a1b604082015260600190565b6020808252600790820152666578706965727960c81b604082015260600190565b602080825260059082015264085a5b9a5d60da1b604082015260600190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b9384526001600160a01b039290921660208401526040830152606082015260800190565b604051601f8201601f191681016001600160401b0381118282101715611621576116216116ab565b604052919050565b60006001600160401b03821115611642576116426116ab565b5060051b60200190565b6000821982111561165f5761165f61167f565b500190565b60006000198214156116785761167861167f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146116d657600080fd5b50565b80151581146116d657600080fdfea26469706673582212207164525948a807d0d8e4f567f22b73c70b1fffaabd7f266e210279dc05946cbc64736f6c63430008070033";

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