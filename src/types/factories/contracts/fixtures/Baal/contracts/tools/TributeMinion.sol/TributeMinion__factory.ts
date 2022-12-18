/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type {
  TributeMinion,
  TributeMinionInterface,
} from "../../../../../../../contracts/fixtures/Baal/contracts/tools/TributeMinion.sol/TributeMinion";

const _abi = [
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
        internalType: "uint32",
        name: "proposalId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EscrowReleased",
    type: "event",
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
        name: "token",
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
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "TributeProposal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "loot",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "proposalId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "escrow",
        type: "address",
      },
    ],
    name: "encodeTributeProposal",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "released",
        type: "bool",
      },
      {
        internalType: "address",
        name: "safe",
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
        name: "_baal",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_proposalId",
        type: "uint32",
      },
    ],
    name: "releaseEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Baal",
        name: "baal",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "loot",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "expiration",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "baalgas",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "submitTributeProposal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610f10806100206000396000f3fe60806040526004361061003f5760003560e01c806304a54aa7146100445780633336c279146100e0578063610ac73d146101025780636bd4afe714610115575b600080fd5b34801561005057600080fd5b506100a561005f366004610980565b600060208181529281526040808220909352908152208054600182015460028301546003909301546001600160a01b03928316939183169260ff82169161010090041685565b604080516001600160a01b039687168152948616602086015284019290925215156060830152909116608082015260a0015b60405180910390f35b3480156100ec57600080fd5b506101006100fb366004610a1c565b610142565b005b610100610110366004610afe565b6103de565b34801561012157600080fd5b506101356101303660046109ac565b61069d565b6040516100d79190610d98565b6001600160a01b03821660009081526020818152604080832063ffffffff851684529091529020600381015483919060ff16156101b95760405162461bcd60e51b815260206004820152601060248201526f105b1c9958591e481c995b19585cd95960821b60448201526064015b60405180910390fd5b60405163118c2bff60e21b815263ffffffff841660048201526000906001600160a01b03841690634630affc9060240160806040518083038186803b15801561020157600080fd5b505afa158015610215573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102399190610a55565b604081015190915061027a5760405162461bcd60e51b815260206004820152600a602482015269139bdd081c185cdcd95960b21b60448201526064016101b0565b60038201805460ff191660019081179182905583549084015460028501546040805163ffffffff8a1681526001600160a01b039384166020820152610100909504831690850152606084015290811691908716907f637fb12bbeb9000df3de89d3f54dba04a8940ff0b762f16937aa1bc12dfc26779060800160405180910390a26001830154600384015460028501546040516323b872dd60e01b81526001600160a01b039384166004820152610100909204831660248301526044820152908216906323b872dd90606401602060405180830381600087803b15801561036057600080fd5b505af1158015610374573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103989190610ae3565b6103d65760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b60448201526064016101b0565b505050505050565b6000886001600160a01b031663da35c6646040518163ffffffff1660e01b815260040160206040518083038186803b15801561041957600080fd5b505afa15801561042d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104519190610c0b565b61045c906001610e1e565b9050600061046e8a888833863061069d565b90506040518060a001604052808a6001600160a01b03168152602001336001600160a01b031681526020018981526020016000151581526020018b6001600160a01b031663d4b839926040518163ffffffff1660e01b815260040160206040518083038186803b1580156104e157600080fd5b505afa1580156104f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610519919061095c565b6001600160a01b039081169091528b811660008181526020818152604080832063ffffffff89168452825291829020855181549086166001600160a01b031991821617825591860151600182018054918716919093161790915584820151600282015560608501516003909101805460809096015190941661010002610100600160a81b0319911515919091166001600160a81b0319909516949094179390931790915590516307505ff960e31b8152633a82ffc89034906105e59085908a908a908a90600401610dab565b6020604051808303818588803b1580156105fe57600080fd5b505af1158015610612573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906106379190610bf2565b50604080516001600160a01b038b81168252602082018b9052338284015263ffffffff851660608301529151918c16917f1deb8b1e22941ec32a7ed14b2d25bdb44593ab343156feb1c735ec06696221399181900360800190a250505050505050505050565b604080516001808252818301909252606091600091906020808301908036833701905050905084816000815181106106d7576106d7610e84565b6001600160a01b039283166020918202929092010152604051908916602482015263ffffffff8516604482015260009060640160408051601f19818403018152918152602080830180516001600160e01b0316633336c27960e01b179052825191519293506000926107529284928992849291889101610cbe565b60408051601f198184030181529190529050881561082f576040805160018082528183019092526000916020808301908036833701905050905089816000815181106107a0576107a0610e84565b602002602001018181525050600084826040516024016107c1929190610d14565b604051602081830303815290604052632c78fd0360e21b6001600160e01b0319166020820180516001600160e01b03838183161783525050505090508260008d600084518560405160200161081b96959493929190610c54565b604051602081830303815290604052925050505b87156108fa5760408051600180825281830190925260009160208083019080368337019050509050888160008151811061086b5761086b610e84565b6020026020010181815250506000848260405160240161088c929190610d14565b6040516020818303038152906040526322936c2360e11b6001600160e01b0319166020820180516001600160e01b03838183161783525050505090508260008d60008451856040516020016108e696959493929190610c54565b604051602081830303815290604052925050505b60008160405160240161090d9190610d98565b60408051601f198184030181529190526020810180516001600160e01b03166346c07f8560e11b1790529450505050509695505050505050565b8051801515811461095757600080fd5b919050565b60006020828403121561096e57600080fd5b815161097981610eb0565b9392505050565b6000806040838503121561099357600080fd5b823561099e81610eb0565b946020939093013593505050565b60008060008060008060c087890312156109c557600080fd5b86356109d081610eb0565b9550602087013594506040870135935060608701356109ee81610eb0565b925060808701356109fe81610ec8565b915060a0870135610a0e81610eb0565b809150509295509295509295565b60008060408385031215610a2f57600080fd5b8235610a3a81610eb0565b91506020830135610a4a81610ec8565b809150509250929050565b600060808284031215610a6757600080fd5b82601f830112610a7657600080fd5b6040516080810181811067ffffffffffffffff82111715610a9957610a99610e9a565b604052808360808101861015610aae57600080fd5b60005b6004811015610ad857610ac382610947565b83526020928301929190910190600101610ab1565b509195945050505050565b600060208284031215610af557600080fd5b61097982610947565b600080600080600080600080610100898b031215610b1b57600080fd5b8835610b2681610eb0565b9750602089810135610b3781610eb0565b975060408a0135965060608a0135955060808a0135945060a08a0135610b5c81610ec8565b935060c08a0135925060e08a013567ffffffffffffffff80821115610b8057600080fd5b818c0191508c601f830112610b9457600080fd5b813581811115610ba657610ba6610e9a565b610bb8601f8201601f19168501610ded565b91508082528d84828501011115610bce57600080fd5b80848401858401376000848284010152508093505050509295985092959890939650565b600060208284031215610c0457600080fd5b5051919050565b600060208284031215610c1d57600080fd5b815161097981610ec8565b60008151808452610c40816020860160208601610e54565b601f01601f19169290920160200192915050565b60008751610c66818460208c01610e54565b808301905060ff60f81b8860f81b1681526bffffffffffffffffffffffff198760601b1660018201528560158201528460358201528351610cae816055840160208801610e54565b0160550198975050505050505050565b60ff60f81b8660f81b1681526bffffffffffffffffffffffff198560601b16600182015283601582015282603582015260008251610d03816055850160208701610e54565b919091016055019695505050505050565b604080825283519082018190526000906020906060840190828701845b82811015610d565781516001600160a01b031684529284019290840190600101610d31565b5050508381038285015284518082528583019183019060005b81811015610d8b57835183529284019291840191600101610d6f565b5090979650505050505050565b6020815260006109796020830184610c28565b608081526000610dbe6080830187610c28565b63ffffffff861660208401528460408401528281036060840152610de28185610c28565b979650505050505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715610e1657610e16610e9a565b604052919050565b600063ffffffff808316818516808303821115610e4b57634e487b7160e01b600052601160045260246000fd5b01949350505050565b60005b83811015610e6f578181015183820152602001610e57565b83811115610e7e576000848401525b50505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610ec557600080fd5b50565b63ffffffff81168114610ec557600080fdfea2646970667358221220c6b1b2db812c83358442ae15f6455e1cf4f49375dc569e0567b8e8f26e6ae86c64736f6c63430008070033";

type TributeMinionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TributeMinionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TributeMinion__factory extends ContractFactory {
  constructor(...args: TributeMinionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TributeMinion> {
    return super.deploy(overrides || {}) as Promise<TributeMinion>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TributeMinion {
    return super.attach(address) as TributeMinion;
  }
  override connect(signer: Signer): TributeMinion__factory {
    return super.connect(signer) as TributeMinion__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TributeMinionInterface {
    return new utils.Interface(_abi) as TributeMinionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TributeMinion {
    return new Contract(address, _abi, signerOrProvider) as TributeMinion;
  }
}
