/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISPLITS,
  ISPLITSInterface,
} from "../../../../contracts/memberRegistry/PGRegistry.sol/ISPLITS";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
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
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "cancelControlTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorsFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "createSplit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        internalType: "address",
        name: "newController",
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
        name: "split",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorsFee",
        type: "uint32",
      },
    ],
    name: "updateSplit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ISPLITS__factory {
  static readonly abi = _abi;
  static createInterface(): ISPLITSInterface {
    return new utils.Interface(_abi) as ISPLITSInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISPLITS {
    return new Contract(address, _abi, signerOrProvider) as ISPLITS;
  }
}