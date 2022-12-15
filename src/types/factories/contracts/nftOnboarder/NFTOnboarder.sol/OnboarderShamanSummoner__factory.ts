/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OnboarderShamanSummoner,
  OnboarderShamanSummonerInterface,
} from "../../../../contracts/nftOnboarder/NFTOnboarder.sol/OnboarderShamanSummoner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_template",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nftTemplate",
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
        name: "nft",
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
        name: "pricePerUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lootPerUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiery",
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
        name: "_shares",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_cuts",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "SummonOnbShamanoarderComplete",
    type: "event",
  },
  {
    inputs: [],
    name: "nftTemplate",
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
        internalType: "string",
        name: "_details",
        type: "string",
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
  "0x608060405234801561001057600080fd5b5060405161077638038061077683398101604081905261002f91610060565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b2565b6000806040838503121561007357600080fd5b825161007e8161009a565b602084015190925061008f8161009a565b809150509250929050565b6001600160a01b03811681146100af57600080fd5b50565b6106b5806100c16000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80636f2ddd93146100465780639c67566714610075578063a022170214610088575b600080fd5b600054610059906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b600154610059906001600160a01b031681565b61005961009636600461038c565b6000805481906100ae906001600160a01b03166101ac565b9050806001600160a01b031663942935828d8d600160009054906101000a90046001600160a01b03168e8e8e8c8c8c6040518a63ffffffff1660e01b8152600401610101999897969594939291906104e1565b600060405180830381600087803b15801561011b57600080fd5b505af115801561012f573d6000803e3d6000fd5b505050508b6001600160a01b03167f6d724aa1b98c75b2e622dede028277194b5af109db219252aada0567ac8c9c0d82600160009054906101000a90046001600160a01b03168e8e8e8e8e8e8e8e8e6040516101959b9a99989796959493929190610558565b60405180910390a29b9a5050505050505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166102485760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b803561024881610667565b600082601f83011261026957600080fd5b8135602061027e6102798361062d565b6105fc565b80838252828201915082860187848660051b890101111561029e57600080fd5b60005b858110156102c65781356102b481610667565b845292840192908401906001016102a1565b5090979650505050505050565b600082601f8301126102e457600080fd5b813560206102f46102798361062d565b80838252828201915082860187848660051b890101111561031457600080fd5b60005b858110156102c657813584529284019290840190600101610317565b8035801515811461024857600080fd5b60008083601f84011261035557600080fd5b50813567ffffffffffffffff81111561036d57600080fd5b60208301915083602082850101111561038557600080fd5b9250929050565b6000806000806000806000806000806101208b8d0312156103ac57600080fd5b6103b58b61024d565b99506103c360208c0161024d565b985060408b0135975060608b0135965060808b0135955060a08b013567ffffffffffffffff808211156103f557600080fd5b6104018e838f01610343565b909750955085915061041560c08e01610333565b945060e08d013591508082111561042b57600080fd5b6104378e838f01610258565b93506101008d013591508082111561044e57600080fd5b5061045b8d828e016102d3565b9150509295989b9194979a5092959850565b600081518084526020808501945080840160005b838110156104a65781516001600160a01b031687529582019590820190600101610481565b509495945050505050565b600081518084526020808501945080840160005b838110156104a6578151875295820195908201906001016104c5565b6001600160a01b038a81168252898116602083015288166040820152606081018790526080810186905260a0810185905283151560c082015261012060e082018190526000906105338382018661046d565b905082810361010084015261054881856104b1565b9c9b505050505050505050505050565b6001600160a01b038c811682528b811660208301528a166040820152606081018990526080810188905260a0810187905261014060c0820181905281018590526000610160868882850137600087840182015285151560e0840152601f19601f880116830181848203016101008501526105d48282018761046d565b9150508281036101208401526105ea81856104b1565b9e9d5050505050505050505050505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561062557610625610651565b604052919050565b600067ffffffffffffffff82111561064757610647610651565b5060051b60200190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461067c57600080fd5b5056fea2646970667358221220ce90cb2efc16f302eb4f51274c525fe71540c5c6c2f06ca5b4241cf6b828920b64736f6c63430008070033";

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
    _nftTemplate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OnboarderShamanSummoner> {
    return super.deploy(
      _template,
      _nftTemplate,
      overrides || {}
    ) as Promise<OnboarderShamanSummoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    _nftTemplate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_template, _nftTemplate, overrides || {});
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
