/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IManagerShaman,
  IManagerShamanInterface,
} from "../../../../../../contracts/fixtures/Baal/contracts/interfaces/IManagerShaman";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "from",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amount",
        type: "uint256[]",
      },
    ],
    name: "burnLoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "from",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amount",
        type: "uint256[]",
      },
    ],
    name: "burnShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "shaman",
        type: "address",
      },
    ],
    name: "isManager",
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
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amount",
        type: "uint256[]",
      },
    ],
    name: "mintLoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amount",
        type: "uint256[]",
      },
    ],
    name: "mintShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IManagerShaman__factory {
  static readonly abi = _abi;
  static createInterface(): IManagerShamanInterface {
    return new utils.Interface(_abi) as IManagerShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IManagerShaman {
    return new Contract(address, _abi, signerOrProvider) as IManagerShaman;
  }
}
