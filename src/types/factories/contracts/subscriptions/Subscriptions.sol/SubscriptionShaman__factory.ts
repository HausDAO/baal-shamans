/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  SubscriptionShaman,
  SubscriptionShamanInterface,
} from "../../../../contracts/subscriptions/Subscriptions.sol/SubscriptionShaman";

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
      {
        indexed: false,
        internalType: "uint256",
        name: "starDate",
        type: "uint256",
      },
    ],
    name: "Subscription",
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
    inputs: [],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
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
        name: "_priceActivation",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pricePer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lootPerUnit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_periodLength",
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
    name: "lootPerPeriod",
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
    name: "periodLength",
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
    name: "priceActivation",
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
    name: "pricePerPeriod",
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
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
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
    name: "subscriberIdxs",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "subscribers",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "starDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPaymentDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "streak",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
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
    inputs: [
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    name: "triggerPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526001600b553480156200001657600080fd5b506001600081905554610100900460ff16158080156200003a57506001805460ff16105b8062000069575062000057306200014160201b62000def1760201c565b1580156200006957506001805460ff16145b620000d15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6001805460ff1916811790558015620000f4576001805461ff0019166101001790555b80156200013a576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5062000150565b6001600160a01b03163b151590565b6115d580620001606000396000f3fe6080604052600436106100f35760003560e01c80638f449a051161008a578063e5a2a2a511610059578063e5a2a2a51461029c578063ea8a1af0146102bc578063f972ed45146102d1578063fc0c546a146102f157600080fd5b80638f449a0514610230578063a4fe8a1814610238578063b27fb3111461024e578063d2ca21151461028657600080fd5b806345f0a44f116100c657806345f0a44f1461019a57806359221a68146101ba57806383651ef3146102045780638d31d3b71461021a57600080fd5b806303314efa146100f857806306661abd1461012757806309e411351461014b57806324be106314610178575b600080fd5b34801561010457600080fd5b506006546101129060ff1681565b60405190151581526020015b60405180910390f35b34801561013357600080fd5b5061013d600b5481565b60405190815260200161011e565b34801561015757600080fd5b5061013d61016636600461120d565b600d6020526000908152604090205481565b34801561018457600080fd5b50610198610193366004611389565b610311565b005b3480156101a657600080fd5b5061013d6101b536600461144a565b61049e565b3480156101c657600080fd5b506101da6101d536600461144a565b6104bf565b6040805195865260208601949094529284019190915260608301521515608082015260a00161011e565b34801561021057600080fd5b5061013d60045481565b34801561022657600080fd5b5061013d60025481565b610198610503565b34801561024457600080fd5b5061013d60035481565b34801561025a57600080fd5b5061026e61026936600461144a565b610a05565b6040516001600160a01b03909116815260200161011e565b34801561029257600080fd5b5061013d60055481565b3480156102a857600080fd5b5060095461026e906001600160a01b031681565b3480156102c857600080fd5b50610198610a2f565b3480156102dd57600080fd5b506101986102ec36600461120d565b610b19565b3480156102fd57600080fd5b50600a5461026e906001600160a01b031681565b600154610100900460ff161580801561032e57506001805460ff16105b806103475750303b15801561034757506001805460ff16145b6103af5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6001805460ff19168117905580156103d1576001805461ff0019166101001790555b600980546001600160a01b03808d166001600160a01b031992831617909255600a8054928c169290911691909117905560028890556003879055600486905560058590556006805485151560ff199091161790558251610438906007906020860190611140565b50815161044c9060089060208501906111a5565b508015610492576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050505050565b600881815481106104ae57600080fd5b600091825260209091200154905081565b600c81815481106104cf57600080fd5b6000918252602090912060059091020180546001820154600283015460038401546004909401549294509092909160ff1685565b336000908152600d60205260409020548015806105475750600c818154811061052e5761052e611463565b600091825260209091206004600590920201015460ff16155b6105845760405162461bcd60e51b815260206004820152600e60248201526d616c72656164792061637469766560901b60448201526064016103a6565b34600254146105cc5760405162461bcd60e51b815260206004820152601460248201527377726f6e672061637469766174696f6e2066656560601b60448201526064016103a6565b60095460408051636a5c1cc960e11b815290516000926001600160a01b03169163d4b83992916004808301926020929190829003018187875af1158015610617573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063b9190611479565b6001600160a01b031660025460405160006040518083038185875af1925050503d8060008114610687576040519150601f19603f3d011682016040523d82523d6000602084013e61068c565b606091505b50509050806106cf5760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b60448201526064016103a6565b600a5460095460408051636a5c1cc960e11b815290516000936001600160a01b03908116936323b872dd933393919092169163d4b8399291600480830192602092919082900301818a875af115801561072c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107509190611479565b6003546040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064016020604051808303816000875af11580156107a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107cb9190611496565b9050806108135760405162461bcd60e51b8152602060048201526016602482015275195c98cc8c0e88151c985b9cd9995c8819985a5b195960521b60448201526064016103a6565b8260000361095157600b8054336000908152600d60209081526040808320849055805160a0810182529384524291840182815290840191825260016060850181815260808601828152600c80549384018155865295517fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c760059093029283015591517fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c882015591517fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c9830155517fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8ca82015591517fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cb909201805460ff19169215159290921790915581549190610947836114c9565b91905055506109f7565b6001600c61095f82866114e2565b8154811061096f5761096f611463565b60009182526020909120600590910201600401805460ff191691151591909117905542600c61099f6001866114e2565b815481106109af576109af611463565b60009182526020909120600260059092020101556001600c6109d182866114e2565b815481106109e1576109e1611463565b9060005260206000209060050201600301819055505b610a0033610dfe565b505050565b60078181548110610a1557600080fd5b6000918252602090912001546001600160a01b0316905081565b336000908152600d6020526040812054610a4b906001906114e2565b9050600c8181548110610a6057610a60611463565b600091825260209091206004600590920201015460ff161515600114610ab55760405162461bcd60e51b815260206004820152600a6024820152696e6f742061637469766560b01b60448201526064016103a6565b6000600c8281548110610aca57610aca611463565b60009182526020822060059190910201600401805460ff191692151592909217909155600c805483908110610b0157610b01611463565b90600052602060002090600502016003018190555050565b6001600160a01b0381166000908152600d6020526040812054610b3e906001906114e2565b9050600c8181548110610b5357610b53611463565b600091825260209091206004600590920201015460ff16610ba75760405162461bcd60e51b815260206004820152600e60248201526d10b0b1ba34bb329036b2b6b132b960911b60448201526064016103a6565b6000600c8281548110610bbc57610bbc611463565b90600052602060002090600502016002015442610bd991906114e2565b9050600554811115610a0057600060055482610bf591906114f9565b905060005b81811015610dbf57600a5460095460408051636a5c1cc960e11b815290516000936001600160a01b03908116936323b872dd938b93919092169163d4b8399291600480830192602092919082900301818a875af1158015610c5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c839190611479565b6003546040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064016020604051808303816000875af1158015610cda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfe9190611496565b905080610d6c576000600c8681548110610d1a57610d1a611463565b60009182526020822060059190910201600401805460ff191692151592909217909155600c805487908110610d5157610d51611463565b90600052602060002090600502016003018190555050610dbf565b610d7586610dfe565b600c8581548110610d8857610d88611463565b600091825260208220600360059092020101805491610da6836114c9565b9190505550508080610db7906114c9565b915050610bfa565b5042600c8481548110610dd457610dd4611463565b90600052602060002090600502016002018190555050505050565b6001600160a01b03163b151590565b604080516001808252818301909252600091602080830190803683370190505090508181600081518110610e3457610e34611463565b6001600160a01b03929092166020928302919091019091015260408051600180825281830190925260009181602001602082028036833701905050905060045481600081518110610e8757610e87611463565b602090810291909101015260065460ff1615610f0657600954604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c90610ecf908590859060040161151b565b600060405180830381600087803b158015610ee957600080fd5b505af1158015610efd573d6000803e3d6000fd5b50505050610f6b565b6009546040516322936c2360e11b81526001600160a01b0390911690634526d84690610f38908590859060040161151b565b600060405180830381600087803b158015610f5257600080fd5b505af1158015610f66573d6000803e3d6000fd5b505050505b60075460009067ffffffffffffffff811115610f8957610f8961124f565b604051908082528060200260200182016040528015610fb2578160200160208202803683370190505b50905060005b60075481101561102f5760078181548110610fd557610fd5611463565b9060005260206000200160009054906101000a90046001600160a01b031682828151811061100557611005611463565b6001600160a01b039092166020928302919091019091015280611027816114c9565b915050610fb8565b5060085460009067ffffffffffffffff81111561104e5761104e61124f565b604051908082528060200260200182016040528015611077578160200160208202803683370190505b50905060005b6008548110156110d4576008818154811061109a5761109a611463565b90600052602060002001548282815181106110b7576110b7611463565b6020908102919091010152806110cc816114c9565b91505061107d565b506009546040516322936c2360e11b81526001600160a01b0390911690634526d84690611107908790879060040161151b565b600060405180830381600087803b15801561112157600080fd5b505af1158015611135573d6000803e3d6000fd5b505050505050505050565b828054828255906000526020600020908101928215611195579160200282015b8281111561119557825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190611160565b506111a19291506111e0565b5090565b828054828255906000526020600020908101928215611195579160200282015b828111156111955782518255916020019190600101906111c5565b5b808211156111a157600081556001016111e1565b6001600160a01b038116811461120a57600080fd5b50565b60006020828403121561121f57600080fd5b813561122a816111f5565b9392505050565b801515811461120a57600080fd5b803561124a81611231565b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561128e5761128e61124f565b604052919050565b600067ffffffffffffffff8211156112b0576112b061124f565b5060051b60200190565b600082601f8301126112cb57600080fd5b813560206112e06112db83611296565b611265565b82815260059290921b840181019181810190868411156112ff57600080fd5b8286015b84811015611323578035611316816111f5565b8352918301918301611303565b509695505050505050565b600082601f83011261133f57600080fd5b8135602061134f6112db83611296565b82815260059290921b8401810191818101908684111561136e57600080fd5b8286015b848110156113235780358352918301918301611372565b60008060008060008060008060006101208a8c0312156113a857600080fd5b89356113b3816111f5565b985060208a01356113c3816111f5565b975060408a0135965060608a0135955060808a0135945060a08a013593506113ed60c08b0161123f565b925060e08a013567ffffffffffffffff8082111561140a57600080fd5b6114168d838e016112ba565b93506101008c013591508082111561142d57600080fd5b5061143a8c828d0161132e565b9150509295985092959850929598565b60006020828403121561145c57600080fd5b5035919050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561148b57600080fd5b815161122a816111f5565b6000602082840312156114a857600080fd5b815161122a81611231565b634e487b7160e01b600052601160045260246000fd5b6000600182016114db576114db6114b3565b5060010190565b6000828210156114f4576114f46114b3565b500390565b60008261151657634e487b7160e01b600052601260045260246000fd5b500490565b604080825283519082018190526000906020906060840190828701845b8281101561155d5781516001600160a01b031684529284019290840190600101611538565b5050508381038285015284518082528583019183019060005b8181101561159257835183529284019291840191600101611576565b509097965050505050505056fea2646970667358221220fe1c5e65d5d8f547a670c5e51b252544062511cf8fe26846f2ee11a04f075d5264736f6c634300080d0033";

type SubscriptionShamanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SubscriptionShamanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SubscriptionShaman__factory extends ContractFactory {
  constructor(...args: SubscriptionShamanConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SubscriptionShaman> {
    return super.deploy(overrides || {}) as Promise<SubscriptionShaman>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SubscriptionShaman {
    return super.attach(address) as SubscriptionShaman;
  }
  override connect(signer: Signer): SubscriptionShaman__factory {
    return super.connect(signer) as SubscriptionShaman__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SubscriptionShamanInterface {
    return new utils.Interface(_abi) as SubscriptionShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SubscriptionShaman {
    return new Contract(address, _abi, signerOrProvider) as SubscriptionShaman;
  }
}
