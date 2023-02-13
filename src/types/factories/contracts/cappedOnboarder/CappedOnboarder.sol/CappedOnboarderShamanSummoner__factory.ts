/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CappedOnboarderShamanSummoner,
  CappedOnboarderShamanSummonerInterface,
} from "../../../../contracts/cappedOnboarder/CappedOnboarder.sol/CappedOnboarderShamanSummoner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_template",
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
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "onboarder",
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
        name: "expiery",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_cuts",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "SummonCappedOnboarder",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_moloch",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expiery",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_multiplier",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_cuts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "_details",
        type: "string",
      },
    ],
    name: "summonOnboarder",
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
  "0x608060405234801561001057600080fd5b506040516106a93803806106a983398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610616806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636f2ddd931461003b5780638d712fb11461006a575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61004e61007836600461032c565b600080548190610090906001600160a01b031661015c565b60405163cbaa54dd60e01b81529091506001600160a01b0382169063cbaa54dd906100cb908e908e908e908e908e908e908e90600401610470565b600060405180830381600087803b1580156100e557600080fd5b505af11580156100f9573d6000803e3d6000fd5b505050508a6001600160a01b03167fbeffb2894028e984dcabf1b89f57109d04d724224eb42f64f4aff94e5c4d0331828c8c8c8c8a8a8e8e604051610146999897969594939291906104cd565b60405180910390a29a9950505050505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166101f85760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b604482015260640160405180910390fd5b919050565b80356101f8816105c8565b600082601f83011261021957600080fd5b8135602061022e6102298361058e565b61055d565b80838252828201915082860187848660051b890101111561024e57600080fd5b60005b85811015610276578135610264816105c8565b84529284019290840190600101610251565b5090979650505050505050565b600082601f83011261029457600080fd5b813560206102a46102298361058e565b80838252828201915082860187848660051b89010111156102c457600080fd5b60005b85811015610276578135845292840192908401906001016102c7565b60008083601f8401126102f557600080fd5b50813567ffffffffffffffff81111561030d57600080fd5b60208301915083602082850101111561032557600080fd5b9250929050565b60008060008060008060008060006101008a8c03121561034b57600080fd5b6103548a6101fd565b985061036260208b016101fd565b975060408a0135965060608a0135955060808a0135945060a08a013567ffffffffffffffff8082111561039457600080fd5b6103a08d838e01610208565b955060c08c01359150808211156103b657600080fd5b6103c28d838e01610283565b945060e08c01359150808211156103d857600080fd5b506103e58c828d016102e3565b915080935050809150509295985092959850929598565b600081518084526020808501945080840160005b838110156104355781516001600160a01b031687529582019590820190600101610410565b509495945050505050565b600081518084526020808501945080840160005b8381101561043557815187529582019590820190600101610454565b600060018060a01b03808a16835280891660208401525086604083015285606083015284608083015260e060a08301526104ad60e08301856103fc565b82810360c08401526104bf8185610440565b9a9950505050505050505050565b6001600160a01b038a811682528916602082015260408101889052606081018790526080810186905261010060a08201819052810184905260006101208587828501376000838701820152601f8601601f19168301838103820160c0850152610538818301876103fc565b91505082810360e084015261054d8185610440565b9c9b505050505050505050505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715610586576105866105b2565b604052919050565b600067ffffffffffffffff8211156105a8576105a86105b2565b5060051b60200190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146105dd57600080fd5b5056fea26469706673582212200b571faca84c2800cd3f669c6677b668dab5d0b106733cf2c6e24442e893c30864736f6c63430008070033";

type CappedOnboarderShamanSummonerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CappedOnboarderShamanSummonerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CappedOnboarderShamanSummoner__factory extends ContractFactory {
  constructor(...args: CappedOnboarderShamanSummonerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CappedOnboarderShamanSummoner> {
    return super.deploy(
      _template,
      overrides || {}
    ) as Promise<CappedOnboarderShamanSummoner>;
  }
  override getDeployTransaction(
    _template: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_template, overrides || {});
  }
  override attach(address: string): CappedOnboarderShamanSummoner {
    return super.attach(address) as CappedOnboarderShamanSummoner;
  }
  override connect(signer: Signer): CappedOnboarderShamanSummoner__factory {
    return super.connect(signer) as CappedOnboarderShamanSummoner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CappedOnboarderShamanSummonerInterface {
    return new utils.Interface(_abi) as CappedOnboarderShamanSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CappedOnboarderShamanSummoner {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CappedOnboarderShamanSummoner;
  }
}
