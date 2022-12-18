/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  BaalSummoner,
  BaalSummonerInterface,
} from "../../../../../contracts/fixtures/Baal/contracts/BaalSummoner";

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
        name: "_gnosisSingleton",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gnosisFallbackLibrary",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gnosisMultisendLibrary",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gnosisSafeProxyFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_moduleProxyFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lootSingleton",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sharesSingleton",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FailedInitialization",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "TakenAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "daoHadExistingSafe",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "daoAddress",
        type: "address",
      },
    ],
    name: "DaoReferral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "masterCopy",
        type: "address",
      },
    ],
    name: "ModuleProxyCreation",
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
        indexed: true,
        internalType: "address",
        name: "loot",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "shares",
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
        internalType: "bool",
        name: "existingSafe",
        type: "bool",
      },
    ],
    name: "SummonBaal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "masterCopy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
    ],
    name: "deployModule",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_calls",
        type: "bytes[]",
      },
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
    ],
    name: "encodeMultisend",
    outputs: [
      {
        internalType: "bytes",
        name: "encodedMultisend",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "gnosisFallbackLibrary",
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
    name: "gnosisMultisendLibrary",
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
    name: "gnosisSingleton",
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
    name: "lootSingleton",
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
    name: "sharesSingleton",
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
        internalType: "bytes",
        name: "initializationParams",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "initializationActions",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "_saltNonce",
        type: "uint256",
      },
    ],
    name: "summonBaal",
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
    inputs: [
      {
        internalType: "bytes",
        name: "initializationParams",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "initializationActions",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "_saltNonce",
        type: "uint256",
      },
    ],
    name: "summonBaalAndSafe",
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
    inputs: [
      {
        internalType: "bytes",
        name: "initializationParams",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "initializationActions",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "_saltNonce",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "existingSafe",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "summonBaalFromReferrer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
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
  "0x6101406040523480156200001257600080fd5b5060405162002832380380620028328339810160408190526200003591620002e5565b6001600160a01b038216620000825760405162461bcd60e51b815260206004820152600e60248201526d10b637b7ba29b4b733b632ba37b760911b60448201526064015b60405180910390fd5b6001600160a01b038116620000cd5760405162461bcd60e51b815260206004820152601060248201526f10b9b430b932b9a9b4b733b632ba37b760811b604482015260640162000079565b6001600160a01b038716620001185760405162461bcd60e51b815260206004820152601060248201526f10b3b737b9b4b9a9b4b733b632ba37b760811b604482015260640162000079565b6001600160a01b038616620001705760405162461bcd60e51b815260206004820152601660248201527f21676e6f73697346616c6c6261636b4c69627261727900000000000000000000604482015260640162000079565b6001600160a01b038516620001c85760405162461bcd60e51b815260206004820152601760248201527f21676e6f7369734d756c746973656e644c696272617279000000000000000000604482015260640162000079565b6001600160a01b038416620002205760405162461bcd60e51b815260206004820152601760248201527f21676e6f7369735361666550726f7879466163746f7279000000000000000000604482015260640162000079565b6001600160a01b038316620002785760405162461bcd60e51b815260206004820152601360248201527f216d6f64756c6550726f7879466163746f727900000000000000000000000000604482015260640162000079565b6001600160601b0319606098891b811660805296881b871660a05294871b861660c05292861b851660e052600080546001600160a01b039384166001600160a01b03199182161790915560018054929093169116179055831b82166101005290911b1661012052620003bf565b600080600080600080600080610100898b0312156200030357600080fd5b88516200031081620003a6565b60208a01519098506200032381620003a6565b60408a01519097506200033681620003a6565b60608a01519096506200034981620003a6565b60808a01519095506200035c81620003a6565b60a08a01519094506200036f81620003a6565b60c08a01519093506200038281620003a6565b60e08a01519092506200039581620003a6565b809150509295985092959890939650565b6001600160a01b0381168114620003bc57600080fd5b50565b60805160601c60a05160601c60c05160601c60e05160601c6101005160601c6101205160601c6123d36200045f600039600081816101bd015261106901526000818161024c0152610f7f015260008181610187015281816107fa01528181610c960152611305015260008181610282015261132901526000818160c2015261115d015260008181610151015281816105dc0152610a6801526123d36000f3fe608060405260043610620000a95760003560e01c8063a2346618116200006c578063a234661814620001a9578063ad9d9a1214620001df578063d61f27ae1462000204578063d9118ce71462000238578063f0fa28b9146200026e578063f1ab873c14620002a457600080fd5b806321d56a4314620000ae57806343493f5214620001015780634a8b0b3214620001185780636f2ddd93146200013d578063881e4ea41462000173575b600080fd5b348015620000bb57600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b620000e462000112366004620016b7565b620002c9565b3480156200012557600080fd5b50620000e4620001373660046200163c565b62000351565b3480156200014a57600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b3480156200018057600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b348015620001b657600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b348015620001ec57600080fd5b50620000e4620001fe3660046200163c565b6200036c565b3480156200021157600080fd5b506200022962000223366004620015cf565b6200037d565b604051620000f8919062001b50565b3480156200024557600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b3480156200027b57600080fd5b50620000e47f000000000000000000000000000000000000000000000000000000000000000081565b348015620002b157600080fd5b50620000e4620002c336600462001570565b62000452565b6000808315620002ea57620002e2898989898962000566565b9050620002fc565b620002f98989898989620009f6565b90505b6040805184815285151560208201526001600160a01b0383168183015290517f7f4a5cc7a72aacd66fb4bd089e2ca31c264522bc0a39eb8d6fcd0f05eb7c1e829181900360600190a198975050505050505050565b600062000362868686868662000566565b9695505050505050565b6000620003628686868686620009f6565b60608060005b84518110156200040c57816000856000888581518110620003a857620003a862001c37565b602002602001015151898681518110620003c657620003c662001c37565b6020026020010151604051602001620003e596959493929190620018bc565b60405160208183030381529060405291508080620004039062001c0d565b91505062000383565b508060405160240162000420919062001b50565b60408051601f198184030181529190526020810180516001600160e01b03166346c07f8560e11b179052949350505050565b600062000499848480519060200120846040516020016200047d929190918252602082015260400190565b6040516020818303038152906040528051906020012062000e92565b90506000816001600160a01b031684604051620004b791906200189e565b6000604051808303816000865af19150503d8060008114620004f6576040519150601f19603f3d011682016040523d82523d6000602084013e620004fb565b606091505b50509050806200051e57604051637dabd39960e01b815260040160405180910390fd5b846001600160a01b0316826001600160a01b03167f2150ada912bf189ed721c44211199e270903fc88008c2a1e1e889ef30fe67c5f60405160405180910390a3509392505050565b6000808080806200057a898b018b620017dc565b6040805160048082526024820183526020820180516001600160e01b0316632d77bef360e11b1790526001549251633c6ae1cf60e21b8152969a5094985092965090945090926000926001600160a01b039092169163f1ab873c9162000607917f00000000000000000000000000000000000000000000000000000000000000009187918e9101620019d8565b602060405180830381600087803b1580156200062257600080fd5b505af115801562000637573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200065d919062001549565b90506000806200066e888862000f7a565b91509150816001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b158015620006ae57600080fd5b505af1158015620006c3573d6000803e3d6000fd5b50505050806001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156200070357600080fd5b505af115801562000718573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b0386811660048301528516925063f2fde38b9150602401600060405180830381600087803b1580156200076057600080fd5b505af115801562000775573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b0386811660048301528416925063f2fde38b9150602401600060405180830381600087803b158015620007bd57600080fd5b505af1158015620007d2573d6000803e3d6000fd5b505050506000620007f28d8d90620007eb919062001bcb565b856200037d565b9050600083837f00000000000000000000000000000000000000000000000000000000000000008a8a86604051602001620008339695949392919062001a0e565b60408051601f198184030181529082905263a4f9edbf60e01b825291506001600160a01b0386169063a4f9edbf906200087190849060040162001b50565b600060405180830381600087803b1580156200088c57600080fd5b505af1158015620008a1573d6000803e3d6000fd5b50505050846001600160a01b0316638009ba1f6040518163ffffffff1660e01b815260040160206040518083038186803b158015620008df57600080fd5b505afa158015620008f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200091a919062001549565b6001600160a01b0316856001600160a01b031663f460124d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200095d57600080fd5b505afa15801562000972573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000998919062001549565b604080516001600160a01b038c8116825260016020830152928316928916917f211ecb4ba40076c0ce1a21fd90fea438543486baf1b8741ec26cba8138aee0d9910160405180910390a450929e9d5050505050505050505050505050565b600080808062000a09888a018a6200175b565b6040805160048082526024820183526020820180516001600160e01b0316632d77bef360e11b1790526001549251633c6ae1cf60e21b815295985093965091945090926000926001600160a01b039092169163f1ab873c9162000a93917f00000000000000000000000000000000000000000000000000000000000000009187918d9101620019d8565b602060405180830381600087803b15801562000aae57600080fd5b505af115801562000ac3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000ae9919062001549565b9050600062000af9828962001118565b905060008062000b0a888862000f7a565b91509150816001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b15801562000b4a57600080fd5b505af115801562000b5f573d6000803e3d6000fd5b50505050806001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b15801562000b9f57600080fd5b505af115801562000bb4573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b0387811660048301528516925063f2fde38b9150602401600060405180830381600087803b15801562000bfc57600080fd5b505af115801562000c11573d6000803e3d6000fd5b505060405163f2fde38b60e01b81526001600160a01b0387811660048301528416925063f2fde38b9150602401600060405180830381600087803b15801562000c5957600080fd5b505af115801562000c6e573d6000803e3d6000fd5b50505050600062000c8e8d8d9062000c87919062001bcb565b866200037d565b9050600083837f0000000000000000000000000000000000000000000000000000000000000000878b8660405160200162000ccf9695949392919062001a0e565b60408051601f198184030181529082905263a4f9edbf60e01b825291506001600160a01b0387169063a4f9edbf9062000d0d90849060040162001b50565b600060405180830381600087803b15801562000d2857600080fd5b505af115801562000d3d573d6000803e3d6000fd5b50505050856001600160a01b0316638009ba1f6040518163ffffffff1660e01b815260040160206040518083038186803b15801562000d7b57600080fd5b505afa15801562000d90573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000db6919062001549565b6001600160a01b0316866001600160a01b031663f460124d6040518163ffffffff1660e01b815260040160206040518083038186803b15801562000df957600080fd5b505afa15801562000e0e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000e34919062001549565b604080516001600160a01b03898116825260006020830152928316928a16917f211ecb4ba40076c0ce1a21fd90fea438543486baf1b8741ec26cba8138aee0d9910160405180910390a450939e9d5050505050505050505050505050565b60006001600160a01b03831662000ecc57604051633202e20d60e21b81526001600160a01b03841660048201526024015b60405180910390fd5b60405172602d8060093d393df3363d3d373d3d3d363d7360681b60208201526bffffffffffffffffffffffff19606085901b1660338201526e5af43d82803e903d91602b57fd5bf360881b60478201526000906056016040516020818303038152906040529050828151602083016000f591506001600160a01b03821662000f735760405163371e9e8960e21b81526001600160a01b038316600482015260240162000ec3565b5092915050565b6000807f000000000000000000000000000000000000000000000000000000000000000063562d190d60e01b8560405160200162000fb991906200192a565b6040516020818303038152906040528560405160200162000fdb919062001955565b60408051601f198184030181529082905262000ffb929160240162001b65565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516200103a9062001399565b6200104792919062001a60565b604051809103906000f08015801562001064573d6000803e3d6000fd5b5091507f000000000000000000000000000000000000000000000000000000000000000063562d190d60e01b8585604051602401620010a592919062001b65565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051620010e49062001399565b620010f192919062001a60565b604051809103906000f0801580156200110e573d6000803e3d6000fd5b5090509250929050565b6000805460408051602080820186905282518083039091018152818301928390526361b69abd60e01b90925283926001600160a01b0316916361b69abd9162001186917f00000000000000000000000000000000000000000000000000000000000000009160440162001a60565b602060405180830381600087803b158015620011a157600080fd5b505af1158015620011b6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620011dc919062001549565b6040516001600160a01b038616602482015290915060009060440160408051601f19818403018152918152602080830180516001600160e01b031663610b592560e01b1790528251915192935060009262001241928492879284929188910162001980565b604051602081830303815290604052905060008160405160240162001267919062001b50565b60408051601f19818403018152918152602080830180516001600160e01b03166346c07f8560e11b17905281516001808252818401909352929350600092919082810190803683370190505090508781600081518110620012cc57620012cc62001c37565b6001600160a01b03928316602091820292909201015260405163b63e800d60e01b81529086169063b63e800d90620013599084906001907f00000000000000000000000000000000000000000000000000000000000000009088907f0000000000000000000000000000000000000000000000000000000000000000906000908190819060040162001a8e565b600060405180830381600087803b1580156200137457600080fd5b505af115801562001389573d6000803e3d6000fd5b50969a9950505050505050505050565b6107218062001c7d83390190565b600067ffffffffffffffff80841115620013c557620013c562001c4d565b8360051b6020620013d881830162001b97565b868152935080840185838101891015620013f157600080fd5b60009350835b8881101562001431578135868111156200140f578586fd5b6200141d8b828b01620014d2565b8452509183019190830190600101620013f7565b5050505050509392505050565b60008083601f8401126200145157600080fd5b50813567ffffffffffffffff8111156200146a57600080fd5b6020830191508360208260051b85010111156200148657600080fd5b9250929050565b60008083601f840112620014a057600080fd5b50813567ffffffffffffffff811115620014b957600080fd5b6020830191508360208285010111156200148657600080fd5b600082601f830112620014e457600080fd5b813567ffffffffffffffff81111562001501576200150162001c4d565b62001516601f8201601f191660200162001b97565b8181528460208386010111156200152c57600080fd5b816020850160208301376000918101602001919091529392505050565b6000602082840312156200155c57600080fd5b8151620015698162001c63565b9392505050565b6000806000606084860312156200158657600080fd5b8335620015938162001c63565b9250602084013567ffffffffffffffff811115620015b057600080fd5b620015be86828701620014d2565b925050604084013590509250925092565b60008060408385031215620015e357600080fd5b823567ffffffffffffffff811115620015fb57600080fd5b8301601f810185136200160d57600080fd5b6200161e85823560208401620013a7565b9250506020830135620016318162001c63565b809150509250929050565b6000806000806000606086880312156200165557600080fd5b853567ffffffffffffffff808211156200166e57600080fd5b6200167c89838a016200148d565b909750955060208801359150808211156200169657600080fd5b50620016a5888289016200143e565b96999598509660400135949350505050565b600080600080600080600060a0888a031215620016d357600080fd5b873567ffffffffffffffff80821115620016ec57600080fd5b620016fa8b838c016200148d565b909950975060208a01359150808211156200171457600080fd5b50620017238a828b016200143e565b90965094505060408801359250606088013580151581146200174457600080fd5b809250506080880135905092959891949750929550565b6000806000606084860312156200177157600080fd5b833567ffffffffffffffff808211156200178a57600080fd5b6200179887838801620014d2565b94506020860135915080821115620017af57600080fd5b50620017be86828701620014d2565b9250506040840135620017d18162001c63565b809150509250925092565b60008060008060808587031215620017f357600080fd5b843567ffffffffffffffff808211156200180c57600080fd5b6200181a88838901620014d2565b955060208701359150808211156200183157600080fd5b506200184087828801620014d2565b9350506040850135620018538162001c63565b91506060850135620018658162001c63565b939692955090935050565b600081518084526200188a81602086016020860162001bda565b601f01601f19169290920160200192915050565b60008251620018b281846020870162001bda565b9190910192915050565b60008751620018d0818460208c0162001bda565b808301905060ff60f81b8860f81b1681526bffffffffffffffffffffffff198760601b16600182015285601582015284603582015283516200191a81605584016020880162001bda565b0160550198975050505050505050565b600082516200193e81846020870162001bda565b64081313d3d560da1b920191825250600501919050565b600082516200196981846020870162001bda565b640b5313d3d560da1b920191825250600501919050565b60ff60f81b8660f81b1681526bffffffffffffffffffffffff198560601b16600182015283601582015282603582015260008251620019c781605585016020870162001bda565b919091016055019695505050505050565b6001600160a01b0384168152606060208201819052600090620019fe9083018562001870565b9050826040830152949350505050565b6001600160a01b0387811682528681166020830152858116604083015284811660608301528316608082015260c060a0820181905260009062001a549083018462001870565b98975050505050505050565b6001600160a01b038316815260406020820181905260009062001a869083018462001870565b949350505050565b6101008082528951908201819052600090610120830190602090818d01845b8281101562001ad45781516001600160a01b03168552938301939083019060010162001aad565b50505083018a90526001600160a01b0389166040840152828103606084015262001aff818962001870565b91505062001b1860808301876001600160a01b03169052565b6001600160a01b03851660a08301528360c083015262001b4360e08301846001600160a01b03169052565b9998505050505050505050565b60208152600062001569602083018462001870565b60408152600062001b7a604083018562001870565b828103602084015262001b8e818562001870565b95945050505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171562001bc35762001bc362001c4d565b604052919050565b600062001569368484620013a7565b60005b8381101562001bf757818101518382015260200162001bdd565b8381111562001c07576000848401525b50505050565b600060001982141562001c3057634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811462001c7957600080fd5b5056fe6080604052604051610721380380610721833981016040819052610022916102d2565b61002e82826000610035565b5050610431565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d083836040518060600160405280602781526020016106fa602791396101a9565b9392505050565b6100ea8161028760201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61029660201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b6102115760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610148565b600080856001600160a01b03168560405161022c91906103a0565b600060405180830381855af49150503d8060008114610267576040519150601f19603f3d011682016040523d82523d6000602084013e61026c565b606091505b50909250905061027d828286610299565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a85750816100d0565b8251156102b85782518084602001fd5b8160405162461bcd60e51b815260040161014891906103bc565b600080604083850312156102e557600080fd5b82516001600160a01b03811681146102fc57600080fd5b60208401519092506001600160401b038082111561031957600080fd5b818501915085601f83011261032d57600080fd5b81518181111561033f5761033f61041b565b604051601f8201601f19908116603f011681019083821181831017156103675761036761041b565b8160405282815288602084870101111561038057600080fd5b6103918360208301602088016103ef565b80955050505050509250929050565b600082516103b28184602087016103ef565b9190910192915050565b60208152600082518060208401526103db8160408501602087016103ef565b601f01601f19169190910160400192915050565b60005b8381101561040a5781810151838201526020016103f2565b838111156100645750506000910152565b634e487b7160e01b600052604160045260246000fd5b6102ba806104406000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61009f565b565b606061004e838360405180606001604052806027815260200161025e602791396100c3565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e8080156100be573d6000f35b3d6000fd5b60606001600160a01b0384163b6101305760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b03168560405161014b91906101de565b600060405180830381855af49150503d8060008114610186576040519150601f19603f3d011682016040523d82523d6000602084013e61018b565b606091505b509150915061019b8282866101a5565b9695505050505050565b606083156101b457508161004e565b8251156101c45782518084602001fd5b8160405162461bcd60e51b815260040161012791906101fa565b600082516101f081846020870161022d565b9190910192915050565b602081526000825180602084015261021981604085016020870161022d565b601f01601f19169190910160400192915050565b60005b83811015610248578181015183820152602001610230565b83811115610257576000848401525b5050505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220762160a1916a8d16b78b8e8163a68695bc44c92010166879a696a6fd4c84ce2d64736f6c63430008070033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200b5564aee9d1d7f6299fcf2de21e277c58cfb2655c8a82b5497bd1e5a9cc2cd964736f6c63430008070033";

type BaalSummonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaalSummonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaalSummoner__factory extends ContractFactory {
  constructor(...args: BaalSummonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _template: PromiseOrValue<string>,
    _gnosisSingleton: PromiseOrValue<string>,
    _gnosisFallbackLibrary: PromiseOrValue<string>,
    _gnosisMultisendLibrary: PromiseOrValue<string>,
    _gnosisSafeProxyFactory: PromiseOrValue<string>,
    _moduleProxyFactory: PromiseOrValue<string>,
    _lootSingleton: PromiseOrValue<string>,
    _sharesSingleton: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BaalSummoner> {
    return super.deploy(
      _template,
      _gnosisSingleton,
      _gnosisFallbackLibrary,
      _gnosisMultisendLibrary,
      _gnosisSafeProxyFactory,
      _moduleProxyFactory,
      _lootSingleton,
      _sharesSingleton,
      overrides || {}
    ) as Promise<BaalSummoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    _gnosisSingleton: PromiseOrValue<string>,
    _gnosisFallbackLibrary: PromiseOrValue<string>,
    _gnosisMultisendLibrary: PromiseOrValue<string>,
    _gnosisSafeProxyFactory: PromiseOrValue<string>,
    _moduleProxyFactory: PromiseOrValue<string>,
    _lootSingleton: PromiseOrValue<string>,
    _sharesSingleton: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _template,
      _gnosisSingleton,
      _gnosisFallbackLibrary,
      _gnosisMultisendLibrary,
      _gnosisSafeProxyFactory,
      _moduleProxyFactory,
      _lootSingleton,
      _sharesSingleton,
      overrides || {}
    );
  }
  override attach(address: string): BaalSummoner {
    return super.attach(address) as BaalSummoner;
  }
  override connect(signer: Signer): BaalSummoner__factory {
    return super.connect(signer) as BaalSummoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaalSummonerInterface {
    return new utils.Interface(_abi) as BaalSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaalSummoner {
    return new Contract(address, _abi, signerOrProvider) as BaalSummoner;
  }
}
