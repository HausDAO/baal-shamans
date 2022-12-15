/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  MemberRegistry,
  MemberRegistryInterface,
} from "../../../contracts/memberRegistry/MemberRegistry";

const _abi = [
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
    name: "trigger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class MemberRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): MemberRegistryInterface {
    return new utils.Interface(_abi) as MemberRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MemberRegistry {
    return new Contract(address, _abi, signerOrProvider) as MemberRegistry;
  }
}