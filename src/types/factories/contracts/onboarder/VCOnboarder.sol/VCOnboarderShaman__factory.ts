/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  VCOnboarderShaman,
  VCOnboarderShamanInterface,
} from "../../../../contracts/onboarder/VCOnboarder.sol/VCOnboarderShaman";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "string",
        name: "iamHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "provider",
        type: "string",
      },
    ],
    name: "AlreadyVouchedCredential",
    type: "error",
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
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tributeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "shares",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGiven",
        type: "uint256",
      },
    ],
    name: "Onboarded",
    type: "event",
  },
  {
    inputs: [],
    name: "amountPerCredential",
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
        internalType: "address",
        name: "_moloch",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vcVerifier",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_shares",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_amountPerCredential",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tributeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minTribute",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minTribute",
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
        name: "_credential",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "onboarder",
    outputs: [],
    stateMutability: "payable",
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
        name: "_credential",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
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
    name: "tributeToken",
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
    inputs: [],
    name: "vcVerifier",
    outputs: [
      {
        internalType: "contract IDIDStampVcVerifier",
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
        name: "",
        type: "string",
      },
    ],
    name: "verifiedStamps",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506001600081905554610100900460ff16158080156200003557506001805460ff16105b8062000064575062000052306200013c60201b62000a3e1760201c565b1580156200006457506001805460ff16145b620000cc5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6001805460ff1916811790558015620000ef576001805461ff0019166101001790555b801562000135576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014b565b6001600160a01b03163b151590565b6118e2806200015b6000396000f3fe6080604052600436106100915760003560e01c80634df407e0116100595780634df407e014610151578063812d044f1461017e578063ca4d20de1461019e578063db3fcf86146101be578063e5a2a2a5146101d457600080fd5b806303314efa14610096578063064f86d1146100cb57806326e9d37c146100e05780632e81c78d146101045780634ce3ae1114610124575b600080fd5b3480156100a257600080fd5b506001546100b69062010000900460ff1681565b60405190151581526020015b60405180910390f35b6100de6100d9366004611100565b6101f4565b005b3480156100ec57600080fd5b506100f660045481565b6040519081526020016100c2565b34801561011057600080fd5b506100de61011f36600461115d565b6104f7565b34801561013057600080fd5b5061014461013f36600461104f565b61082c565b6040516100c2919061149d565b34801561015d57600080fd5b50600654610171906001600160a01b031681565b6040516100c2919061137a565b34801561018a57600080fd5b50600354610171906001600160a01b031681565b3480156101aa57600080fd5b506100de6101b9366004610fc2565b6108d1565b3480156101ca57600080fd5b506100f660025481565b3480156101e057600080fd5b50600554610171906001600160a01b031681565b600260005414156102205760405162461bcd60e51b815260040161021790611585565b60405180910390fd5b60026000556003546001600160a01b0316156102685760405162461bcd60e51b8152602060048201526007602482015266216e617469766560c81b6044820152606401610217565b60045434101561028a5760405162461bcd60e51b81526004016102179061153a565b6005546001600160a01b03166102b25760405162461bcd60e51b81526004016102179061151b565b60055460405163f3ae241560e01b81526001600160a01b039091169063f3ae2415906102e290309060040161137a565b602060405180830381600087803b1580156102fc57600080fd5b505af1158015610310573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103349190611032565b6103795760405162461bcd60e51b815260206004820152601660248201527514da185b585b881b9bdd081dda1a5d195b1a5cdd195960521b6044820152606401610217565b61038584848484610a4d565b6004541561047d5760055460408051636a5c1cc960e11b815290516000926001600160a01b03169163d4b8399291600480830192602092919082900301818787803b1580156103d357600080fd5b505af11580156103e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040b9190610f9e565b6001600160a01b03163460405160006040518083038185875af1925050503d8060008114610455576040519150601f19603f3d011682016040523d82523d6000602084013e61045a565b606091505b505090508061047b5760405162461bcd60e51b8152600401610217906114f2565b505b61048933600254610d60565b6005546003546001546002546040516001600160a01b03948516947fa67d5b920800bf46d5afab426d5b391b00416af46f1978b406eafb22e5fce302946104e49433949190921692349260ff6201000090910416919061138e565b60405180910390a2505060016000555050565b6002600054141561051a5760405162461bcd60e51b815260040161021790611585565b60026000556003546001600160a01b03166105605760405162461bcd60e51b815260206004820152600660248201526510ba37b5b2b760d11b6044820152606401610217565b6004548110156105825760405162461bcd60e51b81526004016102179061153a565b6005546001600160a01b03166105aa5760405162461bcd60e51b81526004016102179061151b565b60055460405163f3ae241560e01b81526001600160a01b039091169063f3ae2415906105da90309060040161137a565b602060405180830381600087803b1580156105f457600080fd5b505af1158015610608573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062c9190611032565b61066d5760405162461bcd60e51b815260206004820152601260248201527129b430b6b0b7103737ba1036b0b730b3b2b960711b6044820152606401610217565b61067985858585610a4d565b600454156107b15760035460055460408051636a5c1cc960e11b815290516001600160a01b03938416936323b872dd93339391169163d4b83992916004808201926020929091908290030181600087803b1580156106d657600080fd5b505af11580156106ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070e9190610f9e565b6040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b15801561075d57600080fd5b505af1158015610771573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107959190611032565b6107b15760405162461bcd60e51b8152600401610217906114f2565b6107bd33600254610d60565b6005546003546001546002546040516001600160a01b03948516947fa67d5b920800bf46d5afab426d5b391b00416af46f1978b406eafb22e5fce302946108189433949190921692889260ff6201000090910416919061138e565b60405180910390a250506001600055505050565b80516020818301810180516007825292820191909301209152805461085090611825565b80601f016020809104026020016040519081016040528092919081815260200182805461087c90611825565b80156108c95780601f1061089e576101008083540402835291602001916108c9565b820191906000526020600020905b8154815290600101906020018083116108ac57829003601f168201915b505050505081565b600154610100900460ff16158080156108ee57506001805460ff16105b8061090e57506108fd30610a3e565b15801561090e57506001805460ff16145b6109715760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610217565b6001805460ff1916811790558015610993576001805461ff0019166101001790555b600580546001600160a01b03199081166001600160a01b038a8116919091179092556006805482168984161790556001805462ff00001916620100008915150217905560028690556003805490911691851691909117905560048290558015610a35576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b6001600160a01b03163b151590565b6006546000906001600160a01b0316633a3f8cdf610a6e6020880188611741565b610a7c9060208101906116f3565b6040518363ffffffff1660e01b8152600401610a99929190611438565b60206040518083038186803b158015610ab157600080fd5b505afa158015610ac5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae99190610f9e565b9050336001600160a01b03821614610b435760405162461bcd60e51b815260206004820152601e60248201527f53656e64657220646f6573206e6f74206f776e2063726564656e7469616c00006044820152606401610217565b60006007610b546020880188611741565b610b5e90806116f3565b604051610b6c92919061136a565b90815260200160405180910390208054610b8590611825565b80601f0160208091040260200160405190810160405280929190818152602001828054610bb190611825565b8015610bfe5780601f10610bd357610100808354040283529160200191610bfe565b820191906000526020600020905b815481529060010190602001808311610be157829003601f168201915b50505050509050600081511115610c7b57610c1c6020870187611741565b610c2a9060208101906116f3565b610c376020890189611741565b610c4190806116f3565b610c4e60208b018b611741565b610c5c9060408101906116f3565b604051630772df2960e31b815260040161021796959493929190611454565b60065460405163a5b0def160e01b81526001600160a01b039091169063a5b0def190610cb19089908990899089906004016115bc565b602060405180830381600087803b158015610ccb57600080fd5b505af1158015610cdf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d039190611032565b50610d116020870187611741565b610d1f9060208101906116f3565b6007610d2e60208a018a611741565b610d3890806116f3565b604051610d4692919061136a565b908152604051908190036020019020610a35929091610ed7565b604080516001808252818301909252600091602080830190803683370190505090508281600081518110610d9657610d9661185a565b6001600160a01b0392909216602092830291909101909101526040805160018082528183019092526000918160200160208202803683370190505090508281600081518110610de757610de761185a565b602090810291909101015260015462010000900460ff1615610e6c57600554604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c90610e3590859085906004016113c1565b600060405180830381600087803b158015610e4f57600080fd5b505af1158015610e63573d6000803e3d6000fd5b50505050610ed1565b6005546040516322936c2360e11b81526001600160a01b0390911690634526d84690610e9e90859085906004016113c1565b600060405180830381600087803b158015610eb857600080fd5b505af1158015610ecc573d6000803e3d6000fd5b505050505b50505050565b828054610ee390611825565b90600052602060002090601f016020900481019282610f055760008555610f4b565b82601f10610f1e5782800160ff19823516178555610f4b565b82800160010185558215610f4b579182015b82811115610f4b578235825591602001919060010190610f30565b50610f57929150610f5b565b5090565b5b80821115610f575760008155600101610f5c565b600060e08284031215610f8257600080fd5b50919050565b803560ff81168114610f9957600080fd5b919050565b600060208284031215610fb057600080fd5b8151610fbb81611886565b9392505050565b60008060008060008060c08789031215610fdb57600080fd5b8635610fe681611886565b95506020870135610ff681611886565b945060408701356110068161189e565b935060608701359250608087013561101d81611886565b8092505060a087013590509295509295509295565b60006020828403121561104457600080fd5b8151610fbb8161189e565b60006020828403121561106157600080fd5b813567ffffffffffffffff8082111561107957600080fd5b818401915084601f83011261108d57600080fd5b81358181111561109f5761109f611870565b604051601f8201601f19908116603f011681019083821181831017156110c7576110c7611870565b816040528281528760208487010111156110e057600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000806000806080858703121561111657600080fd5b843567ffffffffffffffff81111561112d57600080fd5b61113987828801610f70565b94505061114860208601610f88565b93969395505050506040820135916060013590565b600080600080600060a0868803121561117557600080fd5b853567ffffffffffffffff81111561118c57600080fd5b61119888828901610f70565b9550506111a760208701610f88565b94979496505050506040830135926060810135926080909101359150565b60008383855260208086019550808560051b8301018460005b8781101561121857848303601f190189526111f982886117aa565b611204858284611225565b9a86019a94505050908301906001016111de565b5090979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600061125a82836117aa565b6060855261126c606086018284611225565b91505061127c60208401846117aa565b858303602087015261128f838284611225565b925050506112a060408401846117aa565b85830360408701526112b3838284611225565b9695505050505050565b60006112c982836117aa565b60a085526112db60a086018284611225565b9150506112eb60208401846117aa565b85830360208701526112fe838284611225565b9250505061130f60408401846117aa565b8583036040870152611322838284611225565b9250505061133360608401846117aa565b8583036060870152611346838284611225565b9250505061135760808401846117aa565b85830360808701526112b3838284611225565b8183823760009101908152919050565b6001600160a01b0391909116815260200190565b6001600160a01b039586168152939094166020840152604083019190915215156060820152608081019190915260a00190565b604080825283519082018190526000906020906060840190828701845b828110156114035781516001600160a01b0316845292840192908401906001016113de565b5050508381038285015284518082528583019183019060005b818110156112185783518352928401929184019160010161141c565b60208152600061144c602083018486611225565b949350505050565b60608152600061146860608301888a611225565b828103602084015261147b818789611225565b90508281036040840152611490818587611225565b9998505050505050505050565b600060208083528351808285015260005b818110156114ca578581018301518582016040015282016114ae565b818111156114dc576000604083870101525b50601f01601f1916929092016040019392505050565b6020808252600f908201526e151c985b9cd9995c8819985a5b1959608a1b604082015260600190565b602080825260059082015264085a5b9a5d60da1b604082015260600190565b6020808252602b908201527f56616c75652073656e7420646f6573206e6f742066756c66696c6c206d696e6960408201526a6d756d207472696275746560a81b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b6080815260006115cc86876117aa565b60e060808501526115e261016085018284611225565b9150506115f260208801886117f0565b607f19808584030160a0860152611609838361124e565b925061161860408a018a6117aa565b9250818685030160c087015261162f848483611225565b93505061163f60608a018a6117aa565b9250818685030160e0870152611656848483611225565b93505061166660808a018a6117aa565b9250818685030161010087015261167e848483611225565b93505061168e60a08a018a61180f565b915080858403016101208601526116a583836112bd565b92506116b460c08a018a611761565b925081868503016101408701526116cc8484836111c5565b9450505050506116e1602083018660ff169052565b60408201939093526060015292915050565b6000808335601e1984360301811261170a57600080fd5b83018035915067ffffffffffffffff82111561172557600080fd5b60200191503681900382131561173a57600080fd5b9250929050565b60008235605e1983360301811261175757600080fd5b9190910192915050565b6000808335601e1984360301811261177857600080fd5b830160208101925035905067ffffffffffffffff81111561179857600080fd5b8060051b360383131561173a57600080fd5b6000808335601e198436030181126117c157600080fd5b830160208101925035905067ffffffffffffffff8111156117e157600080fd5b80360383131561173a57600080fd5b60008235605e1983360301811261180657600080fd5b90910192915050565b60008235609e1983360301811261180657600080fd5b600181811c9082168061183957607f821691505b60208210811415610f8257634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461189b57600080fd5b50565b801515811461189b57600080fdfea26469706673582212209209f56c6066878a7fe6663b9c8479748ee3cef144ea99a09aba57aff5dde25464736f6c63430008070033";

type VCOnboarderShamanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VCOnboarderShamanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VCOnboarderShaman__factory extends ContractFactory {
  constructor(...args: VCOnboarderShamanConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VCOnboarderShaman> {
    return super.deploy(overrides || {}) as Promise<VCOnboarderShaman>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VCOnboarderShaman {
    return super.attach(address) as VCOnboarderShaman;
  }
  override connect(signer: Signer): VCOnboarderShaman__factory {
    return super.connect(signer) as VCOnboarderShaman__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VCOnboarderShamanInterface {
    return new utils.Interface(_abi) as VCOnboarderShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VCOnboarderShaman {
    return new Contract(address, _abi, signerOrProvider) as VCOnboarderShaman;
  }
}
