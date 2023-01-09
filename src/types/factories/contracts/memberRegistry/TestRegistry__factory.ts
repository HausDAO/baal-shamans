/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestRegistry,
  TestRegistryInterface,
} from "../../../contracts/memberRegistry/TestRegistry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_moloch",
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
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Claim",
    type: "event",
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
            name: "secondsActive",
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
    name: "SetMember",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "Trigger",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "",
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
            name: "secondsActive",
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
    name: "lastTrigger",
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
        name: "secondsActive",
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
    name: "moloch",
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
    name: "shares",
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
    inputs: [],
    name: "trigger",
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
];

const _bytecode =
  "0x6080604052600160025534801561001557600080fd5b5060405161131638038061131683398101604081905261003491610147565b61003d336100f5565b600580546001600160a01b0319166001600160a01b03831690811790915560408051638009ba1f60e01b81529051638009ba1f916004808201926020929091908290030181865afa158015610096573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ba9190610147565b600680546001600160a01b0319166001600160a01b0392909216919091179055506000805463ffffffff19164263ffffffff16179055610177565b600480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006020828403121561015957600080fd5b81516001600160a01b038116811461017057600080fd5b9392505050565b611190806101866000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80637fec8d3811610097578063cf2933c111610066578063cf2933c11461024e578063e46867fd14610261578063e4a7c60314610274578063f2fde38b1461027c57600080fd5b80637fec8d38146102125780638da5cb5b1461021a578063c04637111461022b578063c818c70f1461023b57600080fd5b80635daf08ca116100d35780635daf08ca14610181578063623d9ac9146101ca5780636ff60301146101dd578063715018a61461020a57600080fd5b806303314efa1461010557806306661abd146101355780630726312a1461014c57806334e2fc6514610161575b600080fd5b600654610118906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61013e60025481565b60405190815260200161012c565b61015f61015a366004610c8c565b61028f565b005b61013e61016f366004610ccf565b60036020526000908152604090205481565b61019461018f366004610cea565b6102a7565b604080516001600160a01b03909516855263ffffffff93841660208601529183169184019190915216606082015260800161012c565b600554610118906001600160a01b031681565b6000546101f590640100000000900463ffffffff1681565b60405163ffffffff909116815260200161012c565b61015f6102f4565b61015f610308565b6004546001600160a01b0316610118565b6000546101f59063ffffffff1681565b61015f610249366004610d03565b61042a565b61015f61025c366004610e75565b610440565b61015f61026f366004610ed9565b6104a3565b61015f610525565b61015f61028a366004610ccf565b61062b565b6102976106a9565b6102a2838383610703565b505050565b600181815481106102b757600080fd5b6000918252602090912001546001600160a01b038116915063ffffffff600160a01b8204811691600160c01b8104821691600160e01b9091041684565b6102fc6106a9565b61030660006108ab565b565b60015460009067ffffffffffffffff81111561032657610326610d36565b60405190808252806020026020018201604052801561034f578160200160208202803683370190505b50905060005b6001548110156103be5761038f6001828154811061037557610375610f61565b6000918252602090912001546001600160a01b03166108fd565b8282815181106103a1576103a1610f61565b6020908102919091010152806103b681610f8d565b915050610355565b506103c881610924565b506000805467ffffffff0000000019166401000000004263ffffffff9081168202929092179283905560405192041681527f1020408d3477db49d8e75ad900fc71f6048f4a38140cbfef8eefdd3354527c7c906020015b60405180910390a150565b6104326106a9565b61043c8282610a56565b5050565b6104486106a9565b60005b6001548110156102a25761049183828151811061046a5761046a610f61565b602002602001015183838151811061048457610484610f61565b6020026020010151610a56565b8061049b81610f8d565b91505061044b565b6104ab6106a9565b60005b835181101561051f5761050d8482815181106104cc576104cc610f61565b60200260200101518483815181106104e6576104e6610f61565b602002602001015184848151811061050057610500610f61565b6020026020010151610703565b8061051781610f8d565b9150506104ae565b50505050565b600080546105399063ffffffff1642610fa6565b905060005b6001548110156105e25760006001828154811061055d5761055d610f61565b6000918252602090912001805490915060649061058790600160c01b900463ffffffff1685610fcb565b6105919190610ff7565b815482906014906105b0908490600160a01b900463ffffffff16611028565b92506101000a81548163ffffffff021916908363ffffffff1602179055505080806105da90610f8d565b91505061053e565b506000805463ffffffff19164263ffffffff169081179091556040519081527f5624889e22dfb82f30d92d6882aecff897f9f67a4a4d224257d424d2420ee8c09060200161041f565b6106336106a9565b6001600160a01b03811661069d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6106a6816108ab565b50565b6004546001600160a01b031633146103065760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610694565b6001600160a01b0383166000908152600360205260409020541561075e5760405162461bcd60e51b8152602060048201526012602482015271185b1c9958591e481c9959da5cdd195c995960721b6044820152606401610694565b60016040518060800160405280856001600160a01b0316815260200183426107869190610fa6565b63ffffffff9081168252858116602080840191909152858216604093840152845460018181018755600096875282872086519201805487850151888801516060909901518716600160e01b026001600160e01b03998816600160c01b02999099166001600160c01b0391909716600160a01b026001600160c01b03199092166001600160a01b03958616179190911716949094179590951790925560025491881685526003905292208290557f96147d24d04685de4d5a739b930bf396ec59482c3903f8a924d2afe9c5fda9509161085f908290611050565b8154811061086f5761086f610f61565b906000526020600020016040516108869190611067565b60405180910390a16001600260008282546108a1919061109f565b9091555050505050565b600480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008061090983610be8565b905061091d81670de0b6b3a76400006110b7565b9392505050565b600080825167ffffffffffffffff81111561094157610941610d36565b60405190808252806020026020018201604052801561096a578160200160208202803683370190505b50905060005b83518110156109e85760006001828154811061098e5761098e610f61565b60009182526020909120015483516001600160a01b03909116915081908490849081106109bd576109bd610f61565b6001600160a01b039092166020928302919091019091015250806109e081610f8d565b915050610970565b50600554604051632c78fd0360e21b81526001600160a01b039091169063b1e3f40c90610a1b90849087906004016110d6565b600060405180830381600087803b158015610a3557600080fd5b505af1158015610a49573d6000803e3d6000fd5b5060019695505050505050565b6001600160a01b0382166000908152600360205260408120549003610aae5760405162461bcd60e51b815260206004820152600e60248201526d1b9bdd081c9959da5cdd195c995960921b6044820152606401610694565b60648163ffffffff161115610b055760405162461bcd60e51b815260206004820152601b60248201527f696e76616c6964205f61637469766974794d756c7469706c69657200000000006044820152606401610694565b6001600160a01b0382166000908152600360205260409020548190600190610b2e908290611050565b81548110610b3e57610b3e610f61565b60009182526020808320909101805463ffffffff94909416600160c01b0263ffffffff60c01b19909416939093179092556001600160a01b0384168152600390915260409020547fea050be4bcbfcde9ad6f27bac00b8c6e51855eadfb116dc7542c267505071fb490600190610bb5908290611050565b81548110610bc557610bc5610f61565b90600052602060002001604051610bdc9190611067565b60405180910390a15050565b6001600160a01b038116600090815260036020526040812054816001610c0e8184611050565b81548110610c1e57610c1e610f61565b60009182526020909120018054909150610c4e9063ffffffff600160c01b8204811691600160a01b900416610fcb565b63ffffffff16949350505050565b80356001600160a01b0381168114610c7357600080fd5b919050565b803563ffffffff81168114610c7357600080fd5b600080600060608486031215610ca157600080fd5b610caa84610c5c565b9250610cb860208501610c78565b9150610cc660408501610c78565b90509250925092565b600060208284031215610ce157600080fd5b61091d82610c5c565b600060208284031215610cfc57600080fd5b5035919050565b60008060408385031215610d1657600080fd5b610d1f83610c5c565b9150610d2d60208401610c78565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610d7557610d75610d36565b604052919050565b600067ffffffffffffffff821115610d9757610d97610d36565b5060051b60200190565b600082601f830112610db257600080fd5b81356020610dc7610dc283610d7d565b610d4c565b82815260059290921b84018101918181019086841115610de657600080fd5b8286015b84811015610e0857610dfb81610c5c565b8352918301918301610dea565b509695505050505050565b600082601f830112610e2457600080fd5b81356020610e34610dc283610d7d565b82815260059290921b84018101918181019086841115610e5357600080fd5b8286015b84811015610e0857610e6881610c78565b8352918301918301610e57565b60008060408385031215610e8857600080fd5b823567ffffffffffffffff80821115610ea057600080fd5b610eac86838701610da1565b93506020850135915080821115610ec257600080fd5b50610ecf85828601610e13565b9150509250929050565b600080600060608486031215610eee57600080fd5b833567ffffffffffffffff80821115610f0657600080fd5b610f1287838801610da1565b94506020860135915080821115610f2857600080fd5b610f3487838801610e13565b93506040860135915080821115610f4a57600080fd5b50610f5786828701610e13565b9150509250925092565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610f9f57610f9f610f77565b5060010190565b600063ffffffff83811690831681811015610fc357610fc3610f77565b039392505050565b600063ffffffff80831681851681830481118215151615610fee57610fee610f77565b02949350505050565b600063ffffffff8084168061101c57634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b600063ffffffff80831681851680830382111561104757611047610f77565b01949350505050565b60008282101561106257611062610f77565b500390565b90546001600160a01b038116825263ffffffff60a082901c8116602084015260c082901c16604083015260e01c606082015260800190565b600082198211156110b2576110b2610f77565b500190565b60008160001904831182151516156110d1576110d1610f77565b500290565b604080825283519082018190526000906020906060840190828701845b828110156111185781516001600160a01b0316845292840192908401906001016110f3565b5050508381038285015284518082528583019183019060005b8181101561114d57835183529284019291840191600101611131565b509097965050505050505056fea26469706673582212204bfb0ff9dab537b6cad543dabdf24e7b3e788211bc5a6161f1e264e1085c202264736f6c634300080d0033";

type TestRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestRegistry__factory extends ContractFactory {
  constructor(...args: TestRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _moloch: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestRegistry> {
    return super.deploy(_moloch, overrides || {}) as Promise<TestRegistry>;
  }
  override getDeployTransaction(
    _moloch: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_moloch, overrides || {});
  }
  override attach(address: string): TestRegistry {
    return super.attach(address) as TestRegistry;
  }
  override connect(signer: Signer): TestRegistry__factory {
    return super.connect(signer) as TestRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestRegistryInterface {
    return new utils.Interface(_abi) as TestRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestRegistry {
    return new Contract(address, _abi, signerOrProvider) as TestRegistry;
  }
}