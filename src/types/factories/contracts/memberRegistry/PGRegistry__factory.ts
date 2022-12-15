/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PGRegistry,
  PGRegistryInterface,
} from "../../../contracts/memberRegistry/PGRegistry";

const _abi = [
  {
    inputs: [],
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
    inputs: [],
    name: "_updateSecondsActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
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
];

const _bytecode =
  "0x6080604052600160025534801561001557600080fd5b5061001f33610024565b610076565b600480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610bd4806100856000396000f3fe608060405234801561001057600080fd5b50600436106100bf5760003560e01c8063715018a61161007c578063715018a6146101895780637fec8d38146101915780638da5cb5b14610199578063c0463711146101b4578063c818c70f146101c4578063e6609111146101d7578063f2fde38b146101df57600080fd5b806306661abd146100c45780630726312a146100e057806334e2fc65146100f55780634e71d92d146101155780635daf08ca1461011d5780636ff603011461015c575b600080fd5b6100cd60025481565b6040519081526020015b60405180910390f35b6100f36100ee3660046109e4565b6101f2565b005b6100cd610103366004610996565b60036020526000908152604090205481565b6100f361020a565b61013061012b366004610a27565b610275565b604080516001600160a01b03909416845263ffffffff92831660208501529116908201526060016100d7565b60005461017490640100000000900463ffffffff1681565b60405163ffffffff90911681526020016100d7565b6100f36102b7565b6100f36102cb565b6004546040516001600160a01b0390911681526020016100d7565b6000546101749063ffffffff1681565b6100f36101d23660046109b1565b6103ec565b6100f3610402565b6100f36101ed366004610996565b6104f4565b6101fa61056d565b6102058383836105c7565b505050565b3360009081526003602052604090205461023f5760405162461bcd60e51b815260040161023690610a40565b60405180910390fd5b6040513381527f0c7ef932d3b91976772937f18d5ef9b39a9930bef486b576c374f047c4b512dc906020015b60405180910390a1565b6001818154811061028557600080fd5b6000918252602090912001546001600160a01b038116915063ffffffff600160a01b8204811691600160c01b90041683565b6102bf61056d565b6102c96000610786565b565b60015460009067ffffffffffffffff8111156102e9576102e9610b88565b604051908082528060200260200182016040528015610312578160200160208202803683370190505b50905060005b600154811015610381576103526001828154811061033857610338610b72565b6000918252602090912001546001600160a01b03166107d8565b82828151811061036457610364610b72565b60209081029190910101528061037981610b41565b915050610318565b5061038b816107eb565b506000805467ffffffff0000000019166401000000004263ffffffff9081168202929092179283905560405192041681527f1020408d3477db49d8e75ad900fc71f6048f4a38140cbfef8eefdd3354527c7c9060200160405180910390a150565b6103f461056d565b6103fe8282610813565b5050565b60005b6001548110156104ab5760006001828154811061042457610424610b72565b600091825260208220018054915490925063ffffffff600160c01b909204821691610450911642610b1c565b61045a9190610ad9565b81548290601490610479908490600160a01b900463ffffffff16610ab1565b92506101000a81548163ffffffff021916908363ffffffff1602179055505080806104a390610b41565b915050610405565b506000805463ffffffff19164263ffffffff169081179091556040519081527f5624889e22dfb82f30d92d6882aecff897f9f67a4a4d224257d424d2420ee8c09060200161026b565b6104fc61056d565b6001600160a01b0381166105615760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610236565b61056a81610786565b50565b6004546001600160a01b031633146102c95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610236565b6001600160a01b038316600090815260036020526040902054156106225760405162461bcd60e51b8152602060048201526012602482015271185b1c9958591e481c9959da5cdd195c995960721b6044820152606401610236565b6040518060600160405280846001600160a01b0316815260200182426106489190610b1c565b63ffffffff1681526020018363ffffffff1681525060018060025461066d9190610b05565b8154811061067d5761067d610b72565b60009182526020918290208351910180549284015160409094015163ffffffff908116600160c01b0263ffffffff60c01b1991909516600160a01b026001600160c01b03199094166001600160a01b039093169290921792909217169190911790556002546106ee90600190610b05565b6001600160a01b0384166000908152600360205260409020556002547fa3cc42152b03c8a35a2a3a265e518849ce561bf8e8c54a64e8e717b525822a9d9060019061073a908290610b05565b8154811061074a5761074a610b72565b906000526020600020016040516107619190610a68565b60405180910390a160016002600082825461077c9190610a99565b9091555050505050565b600480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000806107e483610915565b9392505050565b6000805b825181101561080a578061080281610b41565b9150506107ef565b50600192915050565b6001600160a01b0382166000908152600360205260409020546108485760405162461bcd60e51b815260040161023690610a40565b6001600160a01b03821660009081526003602052604090205460018054839290811061087657610876610b72565b60009182526020808320909101805463ffffffff94909416600160c01b0263ffffffff60c01b19909416939093179092556001600160a01b038416815260039091526040902054600180547f81c1b03431a1124fc87b333dc423af1d77aac1e453917a2e0629add7457be6af929081106108f2576108f2610b72565b906000526020600020016040516109099190610a68565b60405180910390a15050565b6001600160a01b038116600090815260036020526040812054600180548391908390811061094557610945610b72565b600091825260209091200154600160a01b900463ffffffff16949350505050565b80356001600160a01b038116811461097d57600080fd5b919050565b803563ffffffff8116811461097d57600080fd5b6000602082840312156109a857600080fd5b6107e482610966565b600080604083850312156109c457600080fd5b6109cd83610966565b91506109db60208401610982565b90509250929050565b6000806000606084860312156109f957600080fd5b610a0284610966565b9250610a1060208501610982565b9150610a1e60408501610982565b90509250925092565b600060208284031215610a3957600080fd5b5035919050565b6020808252600e908201526d1b9bdd081c9959da5cdd195c995960921b604082015260600190565b90546001600160a01b038116825263ffffffff60a082901c8116602084015260c09190911c16604082015260600190565b60008219821115610aac57610aac610b5c565b500190565b600063ffffffff808316818516808303821115610ad057610ad0610b5c565b01949350505050565b600063ffffffff80831681851681830481118215151615610afc57610afc610b5c565b02949350505050565b600082821015610b1757610b17610b5c565b500390565b600063ffffffff83811690831681811015610b3957610b39610b5c565b039392505050565b6000600019821415610b5557610b55610b5c565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220dfb12157c48e5cf14992f928f77cca7e082948a1c1f25bf5673766da548a479464736f6c63430008070033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PGRegistry> {
    return super.deploy(overrides || {}) as Promise<PGRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
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
