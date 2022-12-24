/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DIDStampVcVerifier,
  DIDStampVcVerifierInterface,
} from "../../../../../contracts/onboarder/credentials/DIDStampVCVerifier.sol/DIDStampVcVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_domainName",
        type: "string",
      },
      {
        internalType: "address",
        name: "_issuer",
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
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "iamHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "provider",
        type: "string",
      },
    ],
    name: "Verified",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_context",
            type: "string",
          },
          {
            internalType: "string",
            name: "created",
            type: "string",
          },
          {
            internalType: "string",
            name: "proofPurpose",
            type: "string",
          },
          {
            internalType: "string",
            name: "_type",
            type: "string",
          },
          {
            internalType: "string",
            name: "verificationMethod",
            type: "string",
          },
        ],
        internalType: "struct Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "hashCredentialProof",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_hash",
            type: "string",
          },
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "provider",
            type: "string",
          },
        ],
        internalType: "struct CredentialSubject",
        name: "subject",
        type: "tuple",
      },
    ],
    name: "hashCredentialSubject",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_context",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_hash",
                type: "string",
              },
              {
                internalType: "string",
                name: "id",
                type: "string",
              },
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
            ],
            internalType: "struct CredentialSubject",
            name: "credentialSubject",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "expirationDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuanceDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_context",
                type: "string",
              },
              {
                internalType: "string",
                name: "created",
                type: "string",
              },
              {
                internalType: "string",
                name: "proofPurpose",
                type: "string",
              },
              {
                internalType: "string",
                name: "_type",
                type: "string",
              },
              {
                internalType: "string",
                name: "verificationMethod",
                type: "string",
              },
            ],
            internalType: "struct Proof",
            name: "proof",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "_type",
            type: "string[]",
          },
        ],
        internalType: "struct Document",
        name: "document",
        type: "tuple",
      },
    ],
    name: "hashDocument",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "issuer",
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
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_context",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_hash",
                type: "string",
              },
              {
                internalType: "string",
                name: "id",
                type: "string",
              },
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
            ],
            internalType: "struct CredentialSubject",
            name: "credentialSubject",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "expirationDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuanceDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_context",
                type: "string",
              },
              {
                internalType: "string",
                name: "created",
                type: "string",
              },
              {
                internalType: "string",
                name: "proofPurpose",
                type: "string",
              },
              {
                internalType: "string",
                name: "_type",
                type: "string",
              },
              {
                internalType: "string",
                name: "verificationMethod",
                type: "string",
              },
            ],
            internalType: "struct Proof",
            name: "proof",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "_type",
            type: "string[]",
          },
        ],
        internalType: "struct Document",
        name: "document",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "verifyStampVc",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001511380380620015118339810160408190526200003491620000e3565b60408051602080820183528482528451818601209251859362000082927fb2178a58fb1eefb359ecfdd57bb19c0bdd0f4e6eed8547f46600e500ed111af39201918252602082015260400190565b60408051808303601f1901815291905280516020909101206000555050600180546001600160a01b0319166001600160a01b039290921691909117905550620001ea565b80516001600160a01b0381168114620000de57600080fd5b919050565b60008060408385031215620000f757600080fd5b82516001600160401b03808211156200010f57600080fd5b818501915085601f8301126200012457600080fd5b815181811115620001395762000139620001d4565b604051601f8201601f19908116603f01168101908382118183101715620001645762000164620001d4565b816040528281526020935088848487010111156200018157600080fd5b600091505b82821015620001a5578482018401518183018501529083019062000186565b82821115620001b75760008484830101525b9550620001c9915050858201620000c6565b925050509250929050565b634e487b7160e01b600052604160045260246000fd5b61131780620001fa6000396000f3fe608060405234801561001057600080fd5b50600436106100835760003560e01c806312b5823d146100885780631cd142e9146100ae5780631d143848146100c15780631dcd9b55146100ec5780633644e5151461010c5780633a3f8cdf1461011557806385b96bf514610128578063a5b0def11461013b578063affdd4671461015e575b600080fd5b61009b610096366004610ee7565b610171565b6040519081526020015b60405180910390f35b61009b6100bc366004610fc1565b610241565b6001546100d4906001600160a01b031681565b6040516001600160a01b0390911681526020016100a5565b6100ff6100fa366004610e24565b610348565b6040516100a5919061109c565b61009b60005481565b6100d4610123366004610db3565b610414565b6100d4610136366004610db3565b61046a565b61014e610149366004610f5d565b6104b4565b60405190151581526020016100a5565b61009b61016c366004610f21565b6106c0565b60007fc9e2778990b8a879288b5982ca5d3ef3e85d6471d477097a8d20bdff230cddb561019e8380611141565b6040516101ac92919061105a565b6040519081900390206101c26020850185611141565b6040516101d092919061105a565b60405180910390208480604001906101e89190611141565b6040516101f692919061105a565b6040519081900381206102249493929160200193845260208401929092526040830152606082015260800190565b604051602081830303815290604052805190602001209050919050565b60007f062600880a98d2fafdcf0047dedfa691d564b49c2b8714c91a35ae80fcae46f561026e8380611141565b60405161027c92919061105a565b6040519081900390206102926020850185611141565b6040516102a092919061105a565b60405180910390208480604001906102b89190611141565b6040516102c692919061105a565b6040519081900390206102dc6060870187611141565b6040516102ea92919061105a565b6040519081900390206103006080880188611141565b60405161030e92919061105a565b6040805191829003822060208301979097528101949094526060840192909252608083015260a082015260c081019190915260e001610224565b60608360006103578585611257565b6001600160401b0381111561036e5761036e6112cb565b6040519080825280601f01601f191660200182016040528015610398576020820181803683370190505b509050845b8481101561040a578281815181106103b7576103b76112b5565b01602001516001600160f81b031916826103d18884611257565b815181106103e1576103e16112b5565b60200101906001600160f81b031916908160001a905350806104028161126e565b91505061039d565b5095945050505050565b600061046361045e84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525060119250603b91506103489050565b61080a565b9392505050565b600061046361045e84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525060099250603391506103489050565b6000806104c0866106c0565b9050600061050b6000548360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b9050600061051f61013660808a018a611141565b6001549091506001600160a01b038083169116146105845760405162461bcd60e51b815260206004820181905260248201527f43726564656e7469616c2069737375657220646f6573206e6f74206d6174636860448201526064015b60405180910390fd5b6000610592838989896109f7565b9050816001600160a01b0316816001600160a01b0316146106145760405162461bcd60e51b815260206004820152603660248201527f564320766572696669636174696f6e206661696c65642069737375657220646f6044820152756573206e6f74206d61746368207369676e617475726560501b606482015260840161057b565b61062160208a018a611187565b61062f906020810190611141565b60405161063d92919061105a565b6040519081900390207f69fafcb50a258dc59aedb3d6debfc73ef35e3de7ede11486ed184f1de180366161067460208c018c611187565b61067e9080611141565b61068b60208e018e611187565b610699906040810190611141565b6040516106a9949392919061106a565b60405180910390a250600198975050505050505050565b6000806106d36100966020850185611187565b905060006106e76100bc60a08601866111a7565b90507f2c63e2b157290a4374c79a1daf821e1c1e1163cb26db2b690572062df965641e6107148580611141565b60405161072292919061105a565b60405180910390208386806040019061073b9190611141565b60405161074992919061105a565b60405190819003902061075f6060890189611141565b60405161076d92919061105a565b60405190819003902061078360808a018a611141565b60405161079192919061105a565b604051908190039020866107b06107ab60c08d018d6110f1565b610a15565b6040805160208101999099528801969096526060870194909452608086019290925260a085015260c084015260e0830152610100820152610120016040516020818303038152906040528051906020012092505050919050565b60008181808060025b602a8110156109ec5761082861010085611200565b935084818151811061083c5761083c6112b5565b016020015160f81c9250846108528260016111e8565b81518110610862576108626112b5565b016020015160f81c915060616001600160a01b0384161080159061089057506066836001600160a01b031611155b156108a7576108a060578461122f565b9250610912565b6041836001600160a01b0316101580156108cb57506046836001600160a01b031611155b156108db576108a060378461122f565b6030836001600160a01b0316101580156108ff57506039836001600160a01b031611155b156109125761090f60308461122f565b92505b6061826001600160a01b03161015801561093657506066826001600160a01b031611155b1561094d5761094660578361122f565b91506109b8565b6041826001600160a01b03161015801561097157506046826001600160a01b031611155b156109815761094660378361122f565b6030826001600160a01b0316101580156109a557506039826001600160a01b031611155b156109b8576109b560308361122f565b91505b816109c4846010611200565b6109ce91906111bd565b6109d890856111bd565b93506109e56002826111e8565b9050610813565b509195945050505050565b6000806000610a0887878787610aff565b9150915061040a81610be2565b600080826001600160401b03811115610a3057610a306112cb565b604051908082528060200260200182016040528015610a59578160200160208202803683370190505b50905060005b83811015610ace57848482818110610a7957610a796112b5565b9050602002810190610a8b9190611141565b604051610a9992919061105a565b6040518091039020828281518110610ab357610ab36112b5565b6020908102919091010152610ac78161126e565b9050610a5f565b5080604051602001610ae09190611024565b6040516020818303038152906040528051906020012091505092915050565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115610b2c5750600090506003610bd9565b8460ff16601b14158015610b4457508460ff16601c14155b15610b555750600090506004610bd9565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610ba9573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610bd257600060019250925050610bd9565b9150600090505b94509492505050565b6000816004811115610bf657610bf661129f565b1415610bff5750565b6001816004811115610c1357610c1361129f565b1415610c5c5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b604482015260640161057b565b6002816004811115610c7057610c7061129f565b1415610cbe5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161057b565b6003816004811115610cd257610cd261129f565b1415610d2b5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161057b565b6004816004811115610d3f57610d3f61129f565b1415610d985760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161057b565b50565b600060e08284031215610dad57600080fd5b50919050565b60008060208385031215610dc657600080fd5b82356001600160401b0380821115610ddd57600080fd5b818501915085601f830112610df157600080fd5b813581811115610e0057600080fd5b866020828501011115610e1257600080fd5b60209290920196919550909350505050565b600080600060608486031215610e3957600080fd5b83356001600160401b0380821115610e5057600080fd5b818601915086601f830112610e6457600080fd5b813581811115610e7657610e766112cb565b604051601f8201601f19908116603f01168101908382118183101715610e9e57610e9e6112cb565b81604052828152896020848701011115610eb757600080fd5b82602086016020830137600060208483010152809750505050505060208401359150604084013590509250925092565b600060208284031215610ef957600080fd5b81356001600160401b03811115610f0f57600080fd5b82016060818503121561046357600080fd5b600060208284031215610f3357600080fd5b81356001600160401b03811115610f4957600080fd5b610f5584828501610d9b565b949350505050565b60008060008060808587031215610f7357600080fd5b84356001600160401b03811115610f8957600080fd5b610f9587828801610d9b565b945050602085013560ff81168114610fac57600080fd5b93969395505050506040820135916060013590565b600060208284031215610fd357600080fd5b81356001600160401b03811115610fe957600080fd5b820160a0818503121561046357600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b815160009082906020808601845b8381101561104e57815185529382019390820190600101611032565b50929695505050505050565b8183823760009101908152919050565b60408152600061107e604083018688610ffb565b8281036020840152611091818587610ffb565b979650505050505050565b600060208083528351808285015260005b818110156110c9578581018301518582016040015282016110ad565b818111156110db576000604083870101525b50601f01601f1916929092016040019392505050565b6000808335601e1984360301811261110857600080fd5b8301803591506001600160401b0382111561112257600080fd5b6020019150600581901b360382131561113a57600080fd5b9250929050565b6000808335601e1984360301811261115857600080fd5b8301803591506001600160401b0382111561117257600080fd5b60200191503681900382131561113a57600080fd5b60008235605e1983360301811261119d57600080fd5b9190910192915050565b60008235609e1983360301811261119d57600080fd5b60006001600160a01b038281168482168083038211156111df576111df611289565b01949350505050565b600082198211156111fb576111fb611289565b500190565b60006001600160a01b038281168482168115158284048211161561122657611226611289565b02949350505050565b60006001600160a01b038381169083168181101561124f5761124f611289565b039392505050565b60008282101561126957611269611289565b500390565b600060001982141561128257611282611289565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220944e9beac0187d070e126ca0f10d984096f7159e70f93acaa684f2bd10ca963f64736f6c63430008070033";

type DIDStampVcVerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DIDStampVcVerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DIDStampVcVerifier__factory extends ContractFactory {
  constructor(...args: DIDStampVcVerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _domainName: PromiseOrValue<string>,
    _issuer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DIDStampVcVerifier> {
    return super.deploy(
      _domainName,
      _issuer,
      overrides || {}
    ) as Promise<DIDStampVcVerifier>;
  }
  override getDeployTransaction(
    _domainName: PromiseOrValue<string>,
    _issuer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_domainName, _issuer, overrides || {});
  }
  override attach(address: string): DIDStampVcVerifier {
    return super.attach(address) as DIDStampVcVerifier;
  }
  override connect(signer: Signer): DIDStampVcVerifier__factory {
    return super.connect(signer) as DIDStampVcVerifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DIDStampVcVerifierInterface {
    return new utils.Interface(_abi) as DIDStampVcVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DIDStampVcVerifier {
    return new Contract(address, _abi, signerOrProvider) as DIDStampVcVerifier;
  }
}
