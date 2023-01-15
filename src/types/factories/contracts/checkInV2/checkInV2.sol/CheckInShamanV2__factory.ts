/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CheckInShamanV2,
  CheckInShamanV2Interface,
} from "../../../../contracts/checkInV2/checkInV2.sol/CheckInShamanV2";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
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
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmountClaimed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "totalSecondsWorked",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64[]",
        name: "sessionsTime",
        type: "uint64[]",
      },
      {
        indexed: false,
        internalType: "uint8[]",
        name: "sessionsValue",
        type: "uint8[]",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
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
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Mutiny",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "tag",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "Post",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "UpdateInterval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32[5]",
        name: "from",
        type: "uint32[5]",
      },
      {
        indexed: false,
        internalType: "uint32[5]",
        name: "to",
        type: "uint32[5]",
      },
    ],
    name: "UpdatePercs",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "UpdateTokenPerSecond",
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
    name: "checkInInterval",
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
        internalType: "uint64[]",
        name: "_sessionsTime",
        type: "uint64[]",
      },
      {
        internalType: "uint8[]",
        name: "_sessionsValue",
        type: "uint8[]",
      },
      {
        internalType: "string",
        name: "_metadata",
        type: "string",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_teamLead",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_sharesOrLoot",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_tokenPerSecond",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_checkInInterval",
        type: "uint256",
      },
      {
        internalType: "uint32[5]",
        name: "_valueScalePercs",
        type: "uint32[5]",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isLocked",
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
    inputs: [
      {
        internalType: "bool",
        name: "_shouldLock",
        type: "bool",
      },
    ],
    name: "lock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newTeamLead",
        type: "address",
      },
    ],
    name: "mutiny",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sharesOrLoot",
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
    name: "teamLead",
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
        name: "",
        type: "address",
      },
    ],
    name: "timeLedger",
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
    inputs: [],
    name: "tokenPerSecond",
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
        name: "_newCheckInInterval",
        type: "uint256",
      },
    ],
    name: "updateCheckInInterval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newTokenPerSecond",
        type: "uint256",
      },
    ],
    name: "updateTokenPerSecond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[5]",
        name: "_newValueScalePercs",
        type: "uint32[5]",
      },
    ],
    name: "updateValueScalePercs",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "valueScalePercs",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526008805460ff60a01b1916905534801561001d57600080fd5b506001600055611850806100326000396000f3fe608060405234801561001057600080fd5b50600436106100eb5760003560e01c8063bfd25fa511610092578063bfd25fa5146101b3578063c6063fdd146101bc578063ccc4f287146101cf578063cf8090e8146101e2578063d9ba10ec146101f5578063e5a2a2a514610215578063f4f0b4a814610246578063f869d96f14610259578063fc0c546a1461026c57600080fd5b8063081dd4b5146100f05780630ae1b13d146101125780630dd0a0421461012757806353de96e31461013a578063569e91fc1461014d5780635fa7b83f14610175578063a4e2d6341461018c578063bd4fa16e146101a0575b600080fd5b6004546100fd9060ff1681565b60405190151581526020015b60405180910390f35b610125610120366004611382565b61027f565b005b610125610135366004611367565b6102e0565b6101256101483660046111eb565b610372565b61016061015b3660046113d4565b610641565b60405163ffffffff9091168152602001610109565b61017e60065481565b604051908152602001610109565b6008546100fd90600160a01b900460ff1681565b6101256101ae366004611257565b610671565b61017e60055481565b6101256101ca3660046113d4565b610772565b6101256101dd3660046113d4565b610863565b6101256101f0366004611273565b610954565b61017e6102033660046111aa565b60036020526000908152604090205481565b60015461022e906201000090046001600160a01b031681565b6040516001600160a01b039091168152602001610109565b60085461022e906001600160a01b031681565b6101256102673660046111aa565b610d3d565b60025461022e906001600160a01b031681565b838360405161028f92919061146d565b6040518091039020336001600160a01b03167fc2a24b33e52365462e520478af6ac73195f0894f754dfbf7edd62a5879c55df984846040516102d2929190611585565b60405180910390a350505050565b6008546001600160a01b031633146103545760405162461bcd60e51b815260206004820152602c60248201527f4f6e6c79207465616d4c6561642063616e206c6f636b206f7220756e6c6f636b60448201526b103a3434b99039b430b6b0b760a11b60648201526084015b60405180910390fd5b60088054911515600160a01b0260ff60a01b19909216919091179055565b600154610100900460ff161580801561038f57506001805460ff16105b806103a85750303b1580156103a857506001805460ff16145b61040b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161034b565b6001805460ff191681179055801561042d576001805461ff0019166101001790555b6001805462010000600160b01b031916620100006001600160a01b038a811691909102919091179091556004805460ff1916871515908117909155600880546001600160a01b0319169289169290921790915560ff161561053357600160029054906101000a90046001600160a01b03166001600160a01b0316638009ba1f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d657600080fd5b505afa1580156104ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050e91906111ce565b600280546001600160a01b0319166001600160a01b03929092169190911790556105da565b600160029054906101000a90046001600160a01b03166001600160a01b031663f460124d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561058157600080fd5b505afa158015610595573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b991906111ce565b600280546001600160a01b0319166001600160a01b03929092169190911790555b600583815560068590556105f2906007908490610ffd565b508015610638576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b6007816005811061065157600080fd5b60089182820401919006600402915054906101000a900463ffffffff1681565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b1580156106bf57600080fd5b505afa1580156106d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f791906111ce565b6001600160a01b0316336001600160a01b0316146107275760405162461bcd60e51b815260040161034b90611599565b6107346007826005610ffd565b507fc010f4417b5d76f263a6174f26406277e327b65da113c29a98c850520536e3bc600782604051610767929190611501565b60405180910390a150565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b1580156107c057600080fd5b505afa1580156107d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f891906111ce565b6001600160a01b0316336001600160a01b0316146108285760405162461bcd60e51b815260040161034b90611599565b600581905560408051828152602081018390527fd1647a5de758d64bf7bdf5fe0e753dcc35f5a57954f62c675c8ca48125c2520a9101610767565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b1580156108b157600080fd5b505afa1580156108c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e991906111ce565b6001600160a01b0316336001600160a01b0316146109195760405162461bcd60e51b815260040161034b90611599565b600681905560408051828152602081018390527fa43b4f5d4e90014961b678bdb1a185ad831615f22dcf8aad18681fc0eb9dd42b9101610767565b600260005414156109a75760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161034b565b6002600055600854600160a01b900460ff16156109fc5760405162461bcd60e51b815260206004820152601360248201527221b7b73a3930b1ba1034b9903637b1b5b2b21760691b604482015260640161034b565b60055433600090815260036020526040902054610a19904261178e565b101580610a33575033600090815260036020526040902054155b610a8a5760405162461bcd60e51b815260206004820152602260248201527f43616e206f6e6c7920636c61696d20312074696d652070657220696e74657276604482015261185b60f21b606482015260840161034b565b6002546040516370a0823160e01b81523360048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610ace57600080fd5b505afa158015610ae2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0691906113ed565b11610b8a5760405162461bcd60e51b815260206004820152604860248201527f4d656d62657273204f6e6c793a204d75737420686176652044414f20746f6b6560448201527f6e7320696e206f7264657220746f20636c61696d207468726f75676820746869606482015267399039b430b6b0b760c11b608482015260a40161034b565b60008060005b8651811015610c4e57868181518110610bab57610bab6117d6565b602002602001015183610bbe91906116e1565b9250610c30878281518110610bd557610bd56117d6565b60200260200101516006546007898581518110610bf457610bf46117d6565b602002602001015160ff1660058110610c0f57610c0f6117d6565b600891828204019190066004029054906101000a900463ffffffff16610e48565b610c3a90836116c9565b915080610c46816117a5565b915050610b90565b50600554826001600160401b031610610ccf5760405162461bcd60e51b815260206004820152603d60248201527f436c61696d61626c6520776f726b20706572696f64206d757374206265206c6560448201527f7373207468616e2074686520636865636b20696e20696e74657276616c000000606482015260840161034b565b610cd93382610e82565b3360008181526003602052604090819020429081905590517fe0da78ffbe5b22c3b8e0dd25bbb0d09a3bcbe2f7e9efc58913e25b08d892f3eb91610d2891859087908c908c908c908c906115e3565b60405180910390a25050600160005550505050565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b158015610d8b57600080fd5b505afa158015610d9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc391906111ce565b6001600160a01b0316336001600160a01b031614610df35760405162461bcd60e51b815260040161034b90611599565b600880546001600160a01b0319166001600160a01b0383169081179091556040805182815260208101929092527fcf96f3cdbf898a23b1d8d78350a459afe98988c47c870bd8af0c39be262e77389101610767565b6000826064610e5d63ffffffff85168761175f565b610e67919061170c565b6001600160401b0316610e7a9190611740565b949350505050565b604080516001808252818301909252600091602080830190803683370190505090508281600081518110610eb857610eb86117d6565b6001600160a01b0392909216602092830291909101909101526040805160018082528183019092526000918160200160208202803683370190505090508281600081518110610f0957610f096117d6565b602090810291909101015260045460ff1615610f8d57600154604051632c78fd0360e21b8152620100009091046001600160a01b03169063b1e3f40c90610f56908590859060040161147d565b600060405180830381600087803b158015610f7057600080fd5b505af1158015610f84573d6000803e3d6000fd5b50505050610ff7565b6001546040516322936c2360e11b8152620100009091046001600160a01b031690634526d84690610fc4908590859060040161147d565b600060405180830381600087803b158015610fde57600080fd5b505af1158015610ff2573d6000803e3d6000fd5b505050505b50505050565b60018301918390821561108f5791602002820160005b8382111561105d57833563ffffffff1683826101000a81548163ffffffff021916908363ffffffff1602179055509260200192600401602081600301049283019260010302611013565b801561108d5782816101000a81549063ffffffff021916905560040160208160030104928301926001030261105d565b505b5061109b92915061109f565b5090565b5b8082111561109b57600081556001016110a0565b8060a081018310156110c557600080fd5b92915050565b600082601f8301126110dc57600080fd5b813560206110f16110ec836116a6565b611676565b80838252828201915082860187848660051b890101111561111157600080fd5b6000805b8681101561113f57823560ff8116811461112d578283fd5b85529385019391850191600101611115565b509198975050505050505050565b8035801515811461115d57600080fd5b919050565b60008083601f84011261117457600080fd5b5081356001600160401b0381111561118b57600080fd5b6020830191508360208285010111156111a357600080fd5b9250929050565b6000602082840312156111bc57600080fd5b81356111c781611802565b9392505050565b6000602082840312156111e057600080fd5b81516111c781611802565b600080600080600080610140878903121561120557600080fd5b863561121081611802565b9550602087013561122081611802565b945061122e6040880161114d565b9350606087013592506080870135915061124b8860a089016110b4565b90509295509295509295565b600060a0828403121561126957600080fd5b6111c783836110b4565b6000806000806060858703121561128957600080fd5b84356001600160401b03808211156112a057600080fd5b818701915087601f8301126112b457600080fd5b813560206112c46110ec836116a6565b8083825282820191508286018c848660051b89010111156112e457600080fd5b600096505b84871015611315578035868116811461130157600080fd5b8352600196909601959183019183016112e9565b509850508801359250508082111561132c57600080fd5b611338888389016110cb565b9450604087013591508082111561134e57600080fd5b5061135b87828801611162565b95989497509550505050565b60006020828403121561137957600080fd5b6111c78261114d565b6000806000806040858703121561139857600080fd5b84356001600160401b03808211156113af57600080fd5b6113bb88838901611162565b9096509450602087013591508082111561134e57600080fd5b6000602082840312156113e657600080fd5b5035919050565b6000602082840312156113ff57600080fd5b5051919050565b600081518084526020808501945080840160005b8381101561143957815160ff168752958201959082019060010161141a565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b8183823760009101908152919050565b604080825283519082018190526000906020906060840190828701845b828110156114bf5781516001600160a01b03168452928401929084019060010161149a565b5050508381038285015284518082528583019183019060005b818110156114f4578351835292840192918401916001016114d8565b5090979650505050505050565b825463ffffffff8082168352602082811c821681850152604083811c831690850152606083811c831690850152608083811c831690850152610140840192919060a085019250856000805b6005811015611578578235858116808214611565578384fd5b875250948301949183019160010161154c565b5050505050509392505050565b602081526000610e7a602083018486611444565b6020808252602a908201527f546869732063616e206f6e6c792062652063616c6c65642062792061204261616040820152691b08141c9bdc1bdcd85b60b21b606082015260800190565b600060c08201898352602089818501526001600160401b03808a16604086015260c0606086015282895180855260e087019150838b01945060005b8181101561163c57855184168352948401949184019160010161161e565b50508581036080870152611650818a611406565b935050505082810360a0840152611668818587611444565b9a9950505050505050505050565b604051601f8201601f191681016001600160401b038111828210171561169e5761169e6117ec565b604052919050565b60006001600160401b038211156116bf576116bf6117ec565b5060051b60200190565b600082198211156116dc576116dc6117c0565b500190565b60006001600160401b03808316818516808303821115611703576117036117c0565b01949350505050565b60006001600160401b038084168061173457634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b600081600019048311821515161561175a5761175a6117c0565b500290565b60006001600160401b0380831681851681830481118215151615611785576117856117c0565b02949350505050565b6000828210156117a0576117a06117c0565b500390565b60006000198214156117b9576117b96117c0565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461181757600080fd5b5056fea264697066735822122089b8e4fcd646d28ace69952b3f2ce64cc435383a738783098ee4b48e564050bb64736f6c63430008070033";

type CheckInShamanV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CheckInShamanV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CheckInShamanV2__factory extends ContractFactory {
  constructor(...args: CheckInShamanV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CheckInShamanV2> {
    return super.deploy(overrides || {}) as Promise<CheckInShamanV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CheckInShamanV2 {
    return super.attach(address) as CheckInShamanV2;
  }
  override connect(signer: Signer): CheckInShamanV2__factory {
    return super.connect(signer) as CheckInShamanV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CheckInShamanV2Interface {
    return new utils.Interface(_abi) as CheckInShamanV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CheckInShamanV2 {
    return new Contract(address, _abi, signerOrProvider) as CheckInShamanV2;
  }
}