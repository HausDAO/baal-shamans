import * as DIDKit from "@spruceid/didkit-wasm-node";
import { ethers } from "ethers";

const JWK =
  '{"kty":"EC","crv":"secp256k1","x":"PdB2nS-knyAxc6KPuxBr65vRpW-duAXwpeXlwGJ03eU","y":"MwoGZ08hF5uv-_UEC9BKsYdJVSbJNHcFhR1BZWer5RQ","d":"z9VrSNNZXf9ywUx3v_8cLDhSw8-pvAT9qu_WZmqqfWM"}';
const did = DIDKit.keyToDID("ethr", JWK);

const credentialInput = {
  type: ["VerifiableCredential"],
  issuer: did,
  "@context": "https://www.w3.org/2018/credentials/v1",
  issuanceDate: "2022-07-19T10:42:24.883Z",
  expirationDate: "2022-10-17T10:42:24.883Z",
  credentialSubject: {
    id: "did:pkh:eip155:1:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    hash: "v0.0.0:AjcRjxx7Hp3PKPSNwPeBJjR21pLyA14CVeQ1XijzxUc=",
    provider: "Brigthid",
  },
};

const options = {
  type: "EthereumEip712Signature2021",
  eip712Domain: {
    domain: {
      name: "Passport",
    },
    types: {
      Document: [
        {
          type: "string",
          name: "@context",
        },
        {
          type: "CredentialSubject",
          name: "credentialSubject",
        },
        {
          type: "string",
          name: "expirationDate",
        },
        {
          type: "string",
          name: "issuanceDate",
        },
        {
          type: "string",
          name: "issuer",
        },
        {
          type: "Proof",
          name: "proof",
        },
        {
          type: "string[]",
          name: "type",
        },
      ],
      Proof: [
        {
          type: "string",
          name: "@context",
        },
        {
          type: "string",
          name: "created",
        },
        {
          type: "string",
          name: "proofPurpose",
        },
        {
          type: "string",
          name: "type",
        },
        {
          type: "string",
          name: "verificationMethod",
        },
      ],
      CredentialSubject: [
        {
          type: "string",
          name: "hash",
        },
        {
          type: "string",
          name: "id",
        },
        {
          type: "string",
          name: "provider",
        },
      ],
    },
    primaryType: "Document",
  },
};

async function verifyCredential(prep: any, signed: any) {
  // domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, any>, signature: SignatureLike
  const preparedCredential = JSON.parse(prep);
  const signedCredential = JSON.parse(signed);

  const standardizedTypes = preparedCredential.signingInput.types;
  delete standardizedTypes.EIP712Domain;

  const signerAddress = ethers.utils.verifyTypedData(
    preparedCredential.proof.eip712Domain.domain,
    standardizedTypes,
    signedCredential,
    signedCredential.proof.proofValue,
  );

  const signerIssuedCredential = signerAddress.toLowerCase() === signedCredential.issuer.split(":").pop();

  if (signerIssuedCredential) {
    console.log("===============");
    console.log("This credential was signed by the issuer!!!!  ", signerAddress);
    console.log("===============");


    const splitSignature = ethers.utils.splitSignature(signedCredential.proof.proofValue);
    return splitSignature;
  }
}

export async function createCredential() {
  const preparedCredential = await DIDKit.prepareIssueCredential(
    JSON.stringify(credentialInput, undefined, 2),
    JSON.stringify(options, undefined, 2),
    JWK,
  );

  console.log("PREPARE ISSUE CREDENTIAL");
  console.log("===============");
  console.log(preparedCredential);
  console.log("===============");

  const issuedCredential = await DIDKit.issueCredential(
    JSON.stringify(credentialInput, undefined, 2),
    JSON.stringify(options, undefined, 2),
    JWK,
  );

  console.log("CREDENTIAL");
  console.log("===============");
  console.log(issuedCredential);
  console.log("!!!!!!=============== sending to verify");
  const splitSignature = await verifyCredential(preparedCredential, issuedCredential);

  return {
    splitSignature,
    issuedCredential: JSON.parse(issuedCredential),
    preparedCredential: JSON.parse(preparedCredential),
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
createCredential();
