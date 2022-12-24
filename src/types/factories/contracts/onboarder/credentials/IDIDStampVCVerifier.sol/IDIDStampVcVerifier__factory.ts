/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDIDStampVcVerifier,
  IDIDStampVcVerifierInterface,
} from "../../../../../contracts/onboarder/credentials/IDIDStampVCVerifier.sol/IDIDStampVcVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "verifier",
        type: "string",
      },
    ],
    name: "pseudoResolve",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_context",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_hash",
                type: "string",
              },
              {
                internalType: "string",
                name: "id",
                type: "string",
              },
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
            ],
            internalType: "struct CredentialSubject",
            name: "credentialSubject",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "expirationDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuanceDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "_context",
                type: "string",
              },
              {
                internalType: "string",
                name: "created",
                type: "string",
              },
              {
                internalType: "string",
                name: "proofPurpose",
                type: "string",
              },
              {
                internalType: "string",
                name: "_type",
                type: "string",
              },
              {
                internalType: "string",
                name: "verificationMethod",
                type: "string",
              },
            ],
            internalType: "struct Proof",
            name: "proof",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "_type",
            type: "string[]",
          },
        ],
        internalType: "struct Document",
        name: "document",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "verifyStampVc",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IDIDStampVcVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): IDIDStampVcVerifierInterface {
    return new utils.Interface(_abi) as IDIDStampVcVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDIDStampVcVerifier {
    return new Contract(address, _abi, signerOrProvider) as IDIDStampVcVerifier;
  }
}
