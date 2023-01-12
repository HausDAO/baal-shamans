/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PGRegistry,
  PGRegistryInterface,
} from "../../../../contracts/memberRegistry/PGRegistry.sol/PGRegistry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_splitsMain",
        type: "address",
      },
      {
        internalType: "address",
        name: "_split",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "UD60x18",
        name: "x",
        type: "uint256",
      },
    ],
    name: "PRBMathUD60x18__SqrtOverflow",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "activity",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "activityMultiplier",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startDate",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct MemberRegistry.Member",
        name: "member",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "startDate",
        type: "uint32",
      },
    ],
    name: "SetMember",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "date",
        type: "uint32",
      },
    ],
    name: "Update",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "activity",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "activityMultiplier",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startDate",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct MemberRegistry.Member",
        name: "member",
        type: "tuple",
      },
    ],
    name: "UpdateMember",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "activity",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "activityMultiplier",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startDate",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct MemberRegistry.Member",
        name: "member",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newActivity",
        type: "uint32",
      },
    ],
    name: "UpdateMemberActivity",
    type: "event",
  },
  {
    inputs: [],
    name: "PERCENTAGE_SCALE",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_memberAddr",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_amount",
        type: "uint32",
      },
    ],
    name: "_addToActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_split",
        type: "address",
      },
    ],
    name: "acceptControl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_members",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_activityMultipliers",
        type: "uint32[]",
      },
      {
        internalType: "uint32[]",
        name: "_startDates",
        type: "uint32[]",
      },
    ],
    name: "batchNewMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_members",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_activityMultipliers",
        type: "uint32[]",
      },
    ],
    name: "batchUpdateMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_split",
        type: "address",
      },
    ],
    name: "cancelControlTransfer",
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
    inputs: [],
    name: "getMembers",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "activity",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "activityMultiplier",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startDate",
            type: "uint32",
          },
        ],
        internalType: "struct MemberRegistry.Member[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastUpdate",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "memberIdxs",
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
    name: "members",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "activity",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "activityMultiplier",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "startDate",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_activityMultiplier",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_startDate",
        type: "uint32",
      },
    ],
    name: "setNewMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "split",
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
    name: "splitsMain",
    outputs: [
      {
        internalType: "contract ISPLITS",
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
        name: "_split",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newController",
        type: "address",
      },
    ],
    name: "transferControl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_activityMultiplier",
        type: "uint32",
      },
    ],
    name: "updateMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateSecondsActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_sortedList",
        type: "address[]",
      },
    ],
    name: "updateSplits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updater",
    outputs: [
      {
        internalType: "contract IUPDATOR",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260016002553480156200001657600080fd5b50604051620021ed380380620021ed83398101604081905262000039916200015c565b6200004433620000df565b600680546001600160a01b038085166001600160a01b03199283161790925560078054928416929091169190911790556040516000903090620000879062000131565b6001600160a01b039091168152602001604051809103906000f080158015620000b4573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b03929092169190911790555062000194915050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61060f8062001bde83390190565b80516001600160a01b03811681146200015757600080fd5b919050565b600080604083850312156200017057600080fd5b6200017b836200013f565b91506200018b602084016200013f565b90509250929050565b611a3a80620001a46000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063adcda107116100b8578063d0e4b2f41161007c578063d0e4b2f4146102db578063df034cd0146102ee578063e46867fd14610301578063e4a7c60314610314578063f2fde38b1461031c578063f76541761461032f57600080fd5b8063adcda1071461027f578063c046371114610292578063c7de6440146102a2578063c818c70f146102b5578063cf2933c1146102c857600080fd5b8063479d0a0d1161010a578063479d0a0d146101ca578063484194e6146101dd5780635daf08ca14610208578063715018a6146102515780638da5cb5b146102595780639eab52531461026a57600080fd5b806306661abd146101475780630726312a146101635780631267c6da1461017857806334e2fc651461018b5780633f26479e146101ab575b600080fd5b61015060025481565b6040519081526020015b60405180910390f35b6101766101713660046113c4565b610342565b005b61017661018636600461140d565b61035a565b61015061019936600461140d565b60036020526000908152604090205481565b6101b5620f424081565b60405163ffffffff909116815260200161015a565b6101766101d8366004611505565b6103c5565b6006546101f0906001600160a01b031681565b6040516001600160a01b03909116815260200161015a565b61021b610216366004611542565b6108a0565b604080516001600160a01b03909516855263ffffffff93841660208601529183169184019190915216606082015260800161015a565b6101766108ed565b6005546001600160a01b03166101f0565b610272610901565b60405161015a919061155b565b61017661028d3660046115d3565b610998565b6000546101b59063ffffffff1681565b6101766102b036600461140d565b610a63565b6101766102c33660046115d3565b610a9d565b6101766102d636600461166e565b610ab3565b6101766102e93660046116d2565b610b16565b6004546101f0906001600160a01b031681565b61017661030f366004611705565b610b89565b610176610c0b565b61017661032a36600461140d565b610c13565b6007546101f0906001600160a01b031681565b61034a610c8c565b610355838383610ce6565b505050565b610362610c8c565b600654604051630933e36d60e11b81526001600160a01b03838116600483015290911690631267c6da906024015b600060405180830381600087803b1580156103aa57600080fd5b505af11580156103be573d6000803e3d6000fd5b5050505050565b60008060006001805490508451146104135760405162461bcd60e51b815260206004820152600c60248201526b1a5b9d985b1a59081b1a5cdd60a21b60448201526064015b60405180910390fd5b60005b84518110156104ee5760008582815181106104335761043361178d565b60200260200101519050600060036000836001600160a01b03166001600160a01b03168152602001908152602001600020541180156104835750806001600160a01b0316836001600160a01b0316105b6104da5760405162461bcd60e51b815260206004820152602260248201527f6163636f756e74206e6f742061206d656d626572206f72206e6f7420736f7274604482015261195960f21b606482015260840161040a565b9150806104e6816117b9565b915050610416565b5060005b6001548110156105a2576000600182815481106105115761051161178d565b600091825260209091200154600160c01b900463ffffffff161115610590576000610564600183815481106105485761054861178d565b600091825260209091200154600160a01b900463ffffffff1690565b905061057561057282610f20565b90565b61057f90856117d2565b93508461058b816117b9565b955050505b8061059a816117b9565b9150506104f2565b5060008367ffffffffffffffff8111156105be576105be611428565b6040519080825280602002602001820160405280156105e7578160200160208202803683370190505b50905060008467ffffffffffffffff81111561060557610605611428565b60405190808252806020026020018201604052801561062e578160200160208202803683370190505b5090506000808060005b89518110156107da576000600360008c84815181106106595761065961178d565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002054905060006001808361069491906117ea565b815481106106a4576106a461178d565b60009182526020918290206040805160808101825291909201546001600160a01b038116825263ffffffff600160a01b8204811694830194909452600160c01b81048416928201839052600160e01b90049092166060830152909150156107c557806000015188858151811061071c5761071c61178d565b6001600160a01b039092166020928302919091018201528101518a90620f424090610750906105729063ffffffff16610f20565b61075a9190611801565b6107649190611836565b8785815181106107765761077661178d565b602002602001019063ffffffff16908163ffffffff16815250508684815181106107a2576107a261178d565b6020026020010151856107b59190611858565b9450836107c1816117b9565b9450505b505080806107d2906117b9565b915050610638565b5063ffffffff8216620f424014610829576107f882620f4240611880565b8460008151811061080b5761080b61178d565b6020026020010181815161081f9190611858565b63ffffffff169052505b600654600754604051637677856760e11b81526001600160a01b039283169263ecef0ace92610863929116908990899089906004016118a5565b600060405180830381600087803b15801561087d57600080fd5b505af1158015610891573d6000803e3d6000fd5b50505050505050505050505050565b600181815481106108b057600080fd5b6000918252602090912001546001600160a01b038116915063ffffffff600160a01b8204811691600160c01b8104821691600160e01b9091041684565b6108f5610c8c565b6108ff6000610f7d565b565b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561098f57600084815260209081902060408051608081018252918501546001600160a01b038116835263ffffffff600160a01b8204811684860152600160c01b8204811692840192909252600160e01b9004166060820152825260019092019101610925565b50505050905090565b6004546001600160a01b031633146109e05760405162461bcd60e51b815260206004820152600b60248201526a3737ba103ab83230ba32b960a91b604482015260640161040a565b6001600160a01b0382166000908152600360205260409020548190600190610a099082906117ea565b81548110610a1957610a1961178d565b60009182526020909120018054601490610a41908490600160a01b900463ffffffff16611858565b92506101000a81548163ffffffff021916908363ffffffff1602179055505050565b610a6b610c8c565b60065460405163031f799160e61b81526001600160a01b0383811660048301529091169063c7de644090602401610390565b610aa5610c8c565b610aaf8282610fcf565b5050565b610abb610c8c565b60005b60015481101561035557610b04838281518110610add57610add61178d565b6020026020010151838381518110610af757610af761178d565b6020026020010151610fcf565b80610b0e816117b9565b915050610abe565b610b1e610c8c565b6006546040516334392cbd60e21b81526001600160a01b03848116600483015283811660248301529091169063d0e4b2f490604401600060405180830381600087803b158015610b6d57600080fd5b505af1158015610b81573d6000803e3d6000fd5b505050505050565b610b91610c8c565b60005b8351811015610c0557610bf3848281518110610bb257610bb261178d565b6020026020010151848381518110610bcc57610bcc61178d565b6020026020010151848481518110610be657610be661178d565b6020026020010151610ce6565b80610bfd816117b9565b915050610b94565b50505050565b6108ff611163565b610c1b610c8c565b6001600160a01b038116610c805760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161040a565b610c8981610f7d565b50565b6005546001600160a01b031633146108ff5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161040a565b6001600160a01b03831660009081526003602052604090205415610d415760405162461bcd60e51b8152602060048201526012602482015271185b1c9958591e481c9959da5cdd195c995960721b604482015260640161040a565b4263ffffffff168163ffffffff161115610da95760405162461bcd60e51b815260206004820152602360248201527f737461727420646174652063616e206e6f7420626520696e207468652066757460448201526275726560e81b606482015260840161040a565b60648263ffffffff161115610dd05760405162461bcd60e51b815260040161040a9061194c565b604080516080810182526001600160a01b038086168083526000602080850182815263ffffffff8981168789019081528982166060890190815260018054808201825581885299517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6909a0180549551935192518516600160e01b026001600160e01b03938616600160c01b02939093166001600160c01b0394909516600160a01b026001600160c01b03199096169a90991699909917939093171617179093556002549181526003909252928120839055917fbdf3183d692e7f3bb2b00964a73d24b13130b28e917a1874f24767f4799b8e1c9190610ed19082906117ea565b81548110610ee157610ee161178d565b9060005260206000200142604051610efa929190611996565b60405180910390a1600160026000828254610f1591906117d2565b909155505050505050565b6000817812725dd1d243aba0e75fe645cc4873f9e65afe688c928e1f21811115610f6057604051636155b67d60e01b81526004810184905260240161040a565b610f76610572670de0b6b3a7640000830261121e565b9392505050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b03821660009081526003602052604081205490036110275760405162461bcd60e51b815260206004820152600e60248201526d1b9bdd081c9959da5cdd195c995960921b604482015260640161040a565b60648163ffffffff16111561104e5760405162461bcd60e51b815260040161040a9061194c565b6001600160a01b03821660009081526003602052604090205481906001906110779082906117ea565b815481106110875761108761178d565b60009182526020808320909101805463ffffffff94909416600160c01b0263ffffffff60c01b19909416939093179092556001600160a01b0384168152600390915260409020547fea050be4bcbfcde9ad6f27bac00b8c6e51855eadfb116dc7542c267505071fb4906001906110fe9082906117ea565b8154811061110e5761110e61178d565b9060005260206000200160405161115791546001600160a01b038116825260a081901c63ffffffff908116602084015260c082901c16604083015260e01c606082015260800190565b60405180910390a15050565b600480546040805163a2e6204560e01b815290516001600160a01b039092169263a2e6204592828201926020929082900301816000875af11580156111ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111d091906119e7565b6000805463ffffffff191663ffffffff9290921691821790556040519081527f5624889e22dfb82f30d92d6882aecff897f9f67a4a4d224257d424d2420ee8c09060200160405180910390a1565b60008160000361123057506000919050565b50600181600160801b811061124a5760409190911b9060801c5b6801000000000000000081106112655760209190911b9060401c5b640100000000811061127c5760109190911b9060201c5b6201000081106112915760089190911b9060101c5b61010081106112a55760049190911b9060081c5b601081106112b85760029190911b9060041c5b600481106112c857600182901b91505b60018284816112d9576112d9611820565b048301901c915060018284816112f1576112f1611820565b048301901c9150600182848161130957611309611820565b048301901c9150600182848161132157611321611820565b048301901c9150600182848161133957611339611820565b048301901c9150600182848161135157611351611820565b048301901c9150600182848161136957611369611820565b048301901c9150600082848161138157611381611820565b04905080831061138f578092505b5050919050565b80356001600160a01b03811681146113ad57600080fd5b919050565b63ffffffff81168114610c8957600080fd5b6000806000606084860312156113d957600080fd5b6113e284611396565b925060208401356113f2816113b2565b91506040840135611402816113b2565b809150509250925092565b60006020828403121561141f57600080fd5b610f7682611396565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561146757611467611428565b604052919050565b600067ffffffffffffffff82111561148957611489611428565b5060051b60200190565b600082601f8301126114a457600080fd5b813560206114b96114b48361146f565b61143e565b82815260059290921b840181019181810190868411156114d857600080fd5b8286015b848110156114fa576114ed81611396565b83529183019183016114dc565b509695505050505050565b60006020828403121561151757600080fd5b813567ffffffffffffffff81111561152e57600080fd5b61153a84828501611493565b949350505050565b60006020828403121561155457600080fd5b5035919050565b602080825282518282018190526000919060409081850190868401855b828110156115c657815180516001600160a01b031685528681015163ffffffff9081168887015286820151811687870152606091820151169085015260809093019290850190600101611578565b5091979650505050505050565b600080604083850312156115e657600080fd5b6115ef83611396565b915060208301356115ff816113b2565b809150509250929050565b600082601f83011261161b57600080fd5b8135602061162b6114b48361146f565b82815260059290921b8401810191818101908684111561164a57600080fd5b8286015b848110156114fa578035611661816113b2565b835291830191830161164e565b6000806040838503121561168157600080fd5b823567ffffffffffffffff8082111561169957600080fd5b6116a586838701611493565b935060208501359150808211156116bb57600080fd5b506116c88582860161160a565b9150509250929050565b600080604083850312156116e557600080fd5b6116ee83611396565b91506116fc60208401611396565b90509250929050565b60008060006060848603121561171a57600080fd5b833567ffffffffffffffff8082111561173257600080fd5b61173e87838801611493565b9450602086013591508082111561175457600080fd5b6117608783880161160a565b9350604086013591508082111561177657600080fd5b506117838682870161160a565b9150509250925092565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016117cb576117cb6117a3565b5060010190565b600082198211156117e5576117e56117a3565b500190565b6000828210156117fc576117fc6117a3565b500390565b600081600019048311821515161561181b5761181b6117a3565b500290565b634e487b7160e01b600052601260045260246000fd5b60008261185357634e487b7160e01b600052601260045260246000fd5b500490565b600063ffffffff808316818516808303821115611877576118776117a3565b01949350505050565b600063ffffffff8381169083168181101561189d5761189d6117a3565b039392505050565b6001600160a01b0385811682526080602080840182905286519184018290526000928782019290919060a0860190855b818110156118f35785518516835294830194918301916001016118d5565b5050858103604087015287518082529082019350915080870160005b8381101561193157815163ffffffff168552938201939082019060010161190f565b50505063ffffffff8516606085015250905095945050505050565b6020808252602a908201527f696e76616c6964205f61637469766974794d756c7469706c6965722c2062657460408201526907765656e20302d3130360b41b606082015260800190565b60a081016119d48285546001600160a01b038116825260a081901c63ffffffff908116602084015260c082901c16604083015260e01c606090910152565b63ffffffff831660808301529392505050565b6000602082840312156119f957600080fd5b8151610f76816113b256fea26469706673582212200e44ac703671480324e2878c79eab0e028dfac751fb3b339fa74bc5503d8146564736f6c634300080d0033608060405234801561001057600080fd5b5060405161060f38038061060f83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61057c806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637b1039991461003b578063a2e620451461006b575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b610073610088565b60405163ffffffff9091168152602001610062565b6000805460408051639eab525360e01b815290514293926001600160a01b031691639eab52539160048083019286929190829003018183875af11580156100d3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526100fb9190810190610350565b905060005b81518110156102c257600082828151811061011d5761011d61045d565b602002602001015190506000816020015163ffffffff1660000361015157606082015161014a9086610489565b90506101d5565b60008054906101000a90046001600160a01b03166001600160a01b031663c04637116040518163ffffffff1660e01b81526004016020604051808303816000875af11580156101a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101c891906104ae565b6101d29086610489565b90505b600060648360400151836101e991906104d0565b6101f391906104fc565b600054845160405163adcda10760e01b81526001600160a01b03918216600482015263ffffffff84166024820152929350169063adcda10790604401600060405180830381600087803b15801561024957600080fd5b505af115801561025d573d6000803e3d6000fd5b50508451604080516001600160a01b03909216825263ffffffff851660208301527f127246a9cf18b51a37c710bcea364145b954fe53e6957ad9e98a48a2b43adfaf935001905060405180910390a150505080806102ba9061052d565b915050610100565b505090565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715610300576103006102c7565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561032f5761032f6102c7565b604052919050565b805163ffffffff8116811461034b57600080fd5b919050565b6000602080838503121561036357600080fd5b825167ffffffffffffffff8082111561037b57600080fd5b818501915085601f83011261038f57600080fd5b8151818111156103a1576103a16102c7565b6103af848260051b01610306565b818152848101925060079190911b8301840190878211156103cf57600080fd5b928401925b8184101561045257608084890312156103ed5760008081fd5b6103f56102dd565b84516001600160a01b038116811461040d5760008081fd5b815261041a858701610337565b86820152604061042b818701610337565b90820152606061043c868201610337565b90820152835260809390930192918401916103d4565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600063ffffffff838116908316818110156104a6576104a6610473565b039392505050565b6000602082840312156104c057600080fd5b6104c982610337565b9392505050565b600063ffffffff808316818516818304811182151516156104f3576104f3610473565b02949350505050565b600063ffffffff8084168061052157634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b60006001820161053f5761053f610473565b506001019056fea2646970667358221220172a753d04a183bc32a552e0b3634f9b10898d894be6d50f5a2635b7e9ee48c764736f6c634300080d0033";

type PGRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PGRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PGRegistry__factory extends ContractFactory {
  constructor(...args: PGRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _splitsMain: PromiseOrValue<string>,
    _split: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PGRegistry> {
    return super.deploy(
      _splitsMain,
      _split,
      overrides || {}
    ) as Promise<PGRegistry>;
  }
  override getDeployTransaction(
    _splitsMain: PromiseOrValue<string>,
    _split: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_splitsMain, _split, overrides || {});
  }
  override attach(address: string): PGRegistry {
    return super.attach(address) as PGRegistry;
  }
  override connect(signer: Signer): PGRegistry__factory {
    return super.connect(signer) as PGRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PGRegistryInterface {
    return new utils.Interface(_abi) as PGRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PGRegistry {
    return new Contract(address, _abi, signerOrProvider) as PGRegistry;
  }
}
