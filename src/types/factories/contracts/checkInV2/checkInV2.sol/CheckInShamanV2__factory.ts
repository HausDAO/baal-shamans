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
  "0x60806040526008805460ff60a01b1916905534801561001d57600080fd5b5060016000556118af806100326000396000f3fe608060405234801561001057600080fd5b50600436106100eb5760003560e01c8063bfd25fa511610092578063bfd25fa5146101b3578063c6063fdd146101bc578063ccc4f287146101cf578063cf8090e8146101e2578063d9ba10ec146101f5578063e5a2a2a514610215578063f4f0b4a814610246578063f869d96f14610259578063fc0c546a1461026c57600080fd5b8063081dd4b5146100f05780630ae1b13d146101125780630dd0a0421461012757806353de96e31461013a578063569e91fc1461014d5780635fa7b83f14610175578063a4e2d6341461018c578063bd4fa16e146101a0575b600080fd5b6004546100fd9060ff1681565b60405190151581526020015b60405180910390f35b6101256101203660046113ed565b61027f565b005b6101256101353660046113d2565b6102e0565b610125610148366004611256565b610372565b61016061015b36600461143f565b610641565b60405163ffffffff9091168152602001610109565b61017e60065481565b604051908152602001610109565b6008546100fd90600160a01b900460ff1681565b6101256101ae3660046112c2565b610671565b61017e60055481565b6101256101ca36600461143f565b6107d2565b6101256101dd36600461143f565b6108c6565b6101256101f03660046112de565b6109ba565b61017e610203366004611215565b60036020526000908152604090205481565b60015461022e906201000090046001600160a01b031681565b6040516001600160a01b039091168152602001610109565b60085461022e906001600160a01b031681565b610125610267366004611215565b610da3565b60025461022e906001600160a01b031681565b838360405161028f9291906114d8565b6040518091039020336001600160a01b03167fc2a24b33e52365462e520478af6ac73195f0894f754dfbf7edd62a5879c55df984846040516102d29291906115e4565b60405180910390a350505050565b6008546001600160a01b031633146103545760405162461bcd60e51b815260206004820152602c60248201527f4f6e6c79207465616d4c6561642063616e206c6f636b206f7220756e6c6f636b60448201526b103a3434b99039b430b6b0b760a11b60648201526084015b60405180910390fd5b60088054911515600160a01b0260ff60a01b19909216919091179055565b600154610100900460ff161580801561038f57506001805460ff16105b806103a85750303b1580156103a857506001805460ff16145b61040b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161034b565b6001805460ff191681179055801561042d576001805461ff0019166101001790555b6001805462010000600160b01b031916620100006001600160a01b038a811691909102919091179091556004805460ff1916871515908117909155600880546001600160a01b0319169289169290921790915560ff161561053357600160029054906101000a90046001600160a01b03166001600160a01b0316638009ba1f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d657600080fd5b505afa1580156104ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050e9190611239565b600280546001600160a01b0319166001600160a01b03929092169190911790556105da565b600160029054906101000a90046001600160a01b03166001600160a01b031663f460124d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561058157600080fd5b505afa158015610595573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b99190611239565b600280546001600160a01b0319166001600160a01b03929092169190911790555b600583815560068590556105f2906007908490611068565b508015610638576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b6007816005811061065157600080fd5b60089182820401919006600402915054906101000a900463ffffffff1681565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b1580156106bf57600080fd5b505afa1580156106d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f79190611239565b6001600160a01b0316336001600160a01b0316146107275760405162461bcd60e51b815260040161034b906115f8565b6040805160a08101918290526000916007906005908285855b82829054906101000a900463ffffffff1663ffffffff168152602001906004019060208260030104928301926001038202915080841161074057905050505050509050816007906005610794929190611068565b507fc010f4417b5d76f263a6174f26406277e327b65da113c29a98c850520536e3bc81836040516107c692919061156c565b60405180910390a15050565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b15801561082057600080fd5b505afa158015610834573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108589190611239565b6001600160a01b0316336001600160a01b0316146108885760405162461bcd60e51b815260040161034b906115f8565b600580549082905560408051828152602081018490527fd1647a5de758d64bf7bdf5fe0e753dcc35f5a57954f62c675c8ca48125c2520a91016107c6565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b15801561091457600080fd5b505afa158015610928573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094c9190611239565b6001600160a01b0316336001600160a01b03161461097c5760405162461bcd60e51b815260040161034b906115f8565b600680549082905560408051828152602081018490527fa43b4f5d4e90014961b678bdb1a185ad831615f22dcf8aad18681fc0eb9dd42b91016107c6565b60026000541415610a0d5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161034b565b6002600055600854600160a01b900460ff1615610a625760405162461bcd60e51b815260206004820152601360248201527221b7b73a3930b1ba1034b9903637b1b5b2b21760691b604482015260640161034b565b60055433600090815260036020526040902054610a7f90426117ed565b101580610a99575033600090815260036020526040902054155b610af05760405162461bcd60e51b815260206004820152602260248201527f43616e206f6e6c7920636c61696d20312074696d652070657220696e74657276604482015261185b60f21b606482015260840161034b565b6002546040516370a0823160e01b81523360048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610b3457600080fd5b505afa158015610b48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6c9190611458565b11610bf05760405162461bcd60e51b815260206004820152604860248201527f4d656d62657273204f6e6c793a204d75737420686176652044414f20746f6b6560448201527f6e7320696e206f7264657220746f20636c61696d207468726f75676820746869606482015267399039b430b6b0b760c11b608482015260a40161034b565b60008060005b8651811015610cb457868181518110610c1157610c11611835565b602002602001015183610c249190611740565b9250610c96878281518110610c3b57610c3b611835565b60200260200101516006546007898581518110610c5a57610c5a611835565b602002602001015160ff1660058110610c7557610c75611835565b600891828204019190066004029054906101000a900463ffffffff16610eb3565b610ca09083611728565b915080610cac81611804565b915050610bf6565b50600554826001600160401b031610610d355760405162461bcd60e51b815260206004820152603d60248201527f436c61696d61626c6520776f726b20706572696f64206d757374206265206c6560448201527f7373207468616e2074686520636865636b20696e20696e74657276616c000000606482015260840161034b565b610d3f3382610eed565b3360008181526003602052604090819020429081905590517fe0da78ffbe5b22c3b8e0dd25bbb0d09a3bcbe2f7e9efc58913e25b08d892f3eb91610d8e91859087908c908c908c908c90611642565b60405180910390a25050600160005550505050565b600160029054906101000a90046001600160a01b03166001600160a01b0316635aef7de66040518163ffffffff1660e01b815260040160206040518083038186803b158015610df157600080fd5b505afa158015610e05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e299190611239565b6001600160a01b0316336001600160a01b031614610e595760405162461bcd60e51b815260040161034b906115f8565b600880546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527fcf96f3cdbf898a23b1d8d78350a459afe98988c47c870bd8af0c39be262e773891016107c6565b6000826064610ec863ffffffff8516876117be565b610ed2919061176b565b6001600160401b0316610ee5919061179f565b949350505050565b604080516001808252818301909252600091602080830190803683370190505090508281600081518110610f2357610f23611835565b6001600160a01b0392909216602092830291909101909101526040805160018082528183019092526000918160200160208202803683370190505090508281600081518110610f7457610f74611835565b602090810291909101015260045460ff1615610ff857600154604051632c78fd0360e21b8152620100009091046001600160a01b03169063b1e3f40c90610fc190859085906004016114e8565b600060405180830381600087803b158015610fdb57600080fd5b505af1158015610fef573d6000803e3d6000fd5b50505050611062565b6001546040516322936c2360e11b8152620100009091046001600160a01b031690634526d8469061102f90859085906004016114e8565b600060405180830381600087803b15801561104957600080fd5b505af115801561105d573d6000803e3d6000fd5b505050505b50505050565b6001830191839082156110fa5791602002820160005b838211156110c857833563ffffffff1683826101000a81548163ffffffff021916908363ffffffff160217905550926020019260040160208160030104928301926001030261107e565b80156110f85782816101000a81549063ffffffff02191690556004016020816003010492830192600103026110c8565b505b5061110692915061110a565b5090565b5b80821115611106576000815560010161110b565b8060a0810183101561113057600080fd5b92915050565b600082601f83011261114757600080fd5b8135602061115c61115783611705565b6116d5565b80838252828201915082860187848660051b890101111561117c57600080fd5b6000805b868110156111aa57823560ff81168114611198578283fd5b85529385019391850191600101611180565b509198975050505050505050565b803580151581146111c857600080fd5b919050565b60008083601f8401126111df57600080fd5b5081356001600160401b038111156111f657600080fd5b60208301915083602082850101111561120e57600080fd5b9250929050565b60006020828403121561122757600080fd5b813561123281611861565b9392505050565b60006020828403121561124b57600080fd5b815161123281611861565b600080600080600080610140878903121561127057600080fd5b863561127b81611861565b9550602087013561128b81611861565b9450611299604088016111b8565b935060608701359250608087013591506112b68860a0890161111f565b90509295509295509295565b600060a082840312156112d457600080fd5b611232838361111f565b600080600080606085870312156112f457600080fd5b84356001600160401b038082111561130b57600080fd5b818701915087601f83011261131f57600080fd5b8135602061132f61115783611705565b8083825282820191508286018c848660051b890101111561134f57600080fd5b600096505b84871015611380578035868116811461136c57600080fd5b835260019690960195918301918301611354565b509850508801359250508082111561139757600080fd5b6113a388838901611136565b945060408701359150808211156113b957600080fd5b506113c6878288016111cd565b95989497509550505050565b6000602082840312156113e457600080fd5b611232826111b8565b6000806000806040858703121561140357600080fd5b84356001600160401b038082111561141a57600080fd5b611426888389016111cd565b909650945060208701359150808211156113b957600080fd5b60006020828403121561145157600080fd5b5035919050565b60006020828403121561146a57600080fd5b5051919050565b600081518084526020808501945080840160005b838110156114a457815160ff1687529582019590820190600101611485565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b8183823760009101908152919050565b604080825283519082018190526000906020906060840190828701845b8281101561152a5781516001600160a01b031684529284019290840190600101611505565b5050508381038285015284518082528583019183019060005b8181101561155f57835183529284019291840191600101611543565b5090979650505050505050565b6101408101818460005b600581101561159b57815163ffffffff16835260209283019290910190600101611576565b50505060a082018360005b60058110156115da57813563ffffffff81168082146115c457600080fd5b84525060209283019291909101906001016115a6565b5050509392505050565b602081526000610ee56020830184866114af565b6020808252602a908201527f546869732063616e206f6e6c792062652063616c6c65642062792061204261616040820152691b08141c9bdc1bdcd85b60b21b606082015260800190565b600060c08201898352602089818501526001600160401b03808a16604086015260c0606086015282895180855260e087019150838b01945060005b8181101561169b57855184168352948401949184019160010161167d565b505085810360808701526116af818a611471565b935050505082810360a08401526116c78185876114af565b9a9950505050505050505050565b604051601f8201601f191681016001600160401b03811182821017156116fd576116fd61184b565b604052919050565b60006001600160401b0382111561171e5761171e61184b565b5060051b60200190565b6000821982111561173b5761173b61181f565b500190565b60006001600160401b038083168185168083038211156117625761176261181f565b01949350505050565b60006001600160401b038084168061179357634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b60008160001904831182151516156117b9576117b961181f565b500290565b60006001600160401b03808316818516818304811182151516156117e4576117e461181f565b02949350505050565b6000828210156117ff576117ff61181f565b500390565b60006000198214156118185761181861181f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461187657600080fd5b5056fea2646970667358221220313ac6d1a98ae03944619e16330da6f8122f1f3a006827d3fd578ca8eea70aea64736f6c63430008070033";

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
