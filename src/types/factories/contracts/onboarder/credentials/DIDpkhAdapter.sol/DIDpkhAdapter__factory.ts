/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DIDpkhAdapter,
  DIDpkhAdapterInterface,
} from "../../../../../contracts/onboarder/credentials/DIDpkhAdapter.sol/DIDpkhAdapter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "verifier",
        type: "string",
      },
    ],
    name: "pseudoResolve",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "issuer",
        type: "string",
      },
    ],
    name: "pseudoResolveDidIssuer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "substring",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506106d6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80631dcd9b55146100465780633a3f8cdf1461006f57806385b96bf51461009a575b600080fd5b610059610054366004610479565b6100ad565b604051610066919061053d565b60405180910390f35b61008261007d366004610407565b61017a565b6040516001600160a01b039091168152602001610066565b6100826100a8366004610407565b6101d0565b60608360006100bc858561062c565b67ffffffffffffffff8111156100d4576100d461068a565b6040519080825280601f01601f1916602001820160405280156100fe576020820181803683370190505b509050845b848110156101705782818151811061011d5761011d610674565b01602001516001600160f81b03191682610137888461062c565b8151811061014757610147610674565b60200101906001600160f81b031916908160001a9053508061016881610643565b915050610103565b5095945050505050565b60006101c96101c484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525060119250603b91506100ad9050565b61021a565b9392505050565b60006101c96101c484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525060099250603391506100ad9050565b60008181808060025b602a8110156103fc57610238610100856105d5565b935084818151811061024c5761024c610674565b016020015160f81c9250846102628260016105bd565b8151811061027257610272610674565b016020015160f81c915060616001600160a01b038416108015906102a057506066836001600160a01b031611155b156102b7576102b0605784610604565b9250610322565b6041836001600160a01b0316101580156102db57506046836001600160a01b031611155b156102eb576102b0603784610604565b6030836001600160a01b03161015801561030f57506039836001600160a01b031611155b156103225761031f603084610604565b92505b6061826001600160a01b03161015801561034657506066826001600160a01b031611155b1561035d57610356605783610604565b91506103c8565b6041826001600160a01b03161015801561038157506046826001600160a01b031611155b1561039157610356603783610604565b6030826001600160a01b0316101580156103b557506039826001600160a01b031611155b156103c8576103c5603083610604565b91505b816103d48460106105d5565b6103de9190610592565b6103e89085610592565b93506103f56002826105bd565b9050610223565b509195945050505050565b6000806020838503121561041a57600080fd5b823567ffffffffffffffff8082111561043257600080fd5b818501915085601f83011261044657600080fd5b81358181111561045557600080fd5b86602082850101111561046757600080fd5b60209290920196919550909350505050565b60008060006060848603121561048e57600080fd5b833567ffffffffffffffff808211156104a657600080fd5b818601915086601f8301126104ba57600080fd5b8135818111156104cc576104cc61068a565b604051601f8201601f19908116603f011681019083821181831017156104f4576104f461068a565b8160405282815289602084870101111561050d57600080fd5b82602086016020830137600060208483010152809750505050505060208401359150604084013590509250925092565b600060208083528351808285015260005b8181101561056a5785810183015185820160400152820161054e565b8181111561057c576000604083870101525b50601f01601f1916929092016040019392505050565b60006001600160a01b038281168482168083038211156105b4576105b461065e565b01949350505050565b600082198211156105d0576105d061065e565b500190565b60006001600160a01b03828116848216811515828404821116156105fb576105fb61065e565b02949350505050565b60006001600160a01b03838116908316818110156106245761062461065e565b039392505050565b60008282101561063e5761063e61065e565b500390565b60006000198214156106575761065761065e565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220fdc23f1ec92e7fb7bd83b596bc5f3c49dbe281269cac184f46360efd752b208164736f6c63430008070033";

type DIDpkhAdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DIDpkhAdapterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DIDpkhAdapter__factory extends ContractFactory {
  constructor(...args: DIDpkhAdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DIDpkhAdapter> {
    return super.deploy(overrides || {}) as Promise<DIDpkhAdapter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DIDpkhAdapter {
    return super.attach(address) as DIDpkhAdapter;
  }
  override connect(signer: Signer): DIDpkhAdapter__factory {
    return super.connect(signer) as DIDpkhAdapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DIDpkhAdapterInterface {
    return new utils.Interface(_abi) as DIDpkhAdapterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DIDpkhAdapter {
    return new Contract(address, _abi, signerOrProvider) as DIDpkhAdapter;
  }
}
