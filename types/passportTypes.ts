export const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const vcbaseType = [
  {
    name: "_context",
    type: "string[]",
  },
  {
    name: "_type",
    type: "string[]",
  },
  {
    name: "issuer",
    type: "string",
  },
  {
    name: "issuanceDate",
    type: "string",
  },
  {
    name: "expirationDate",
    type: "string",
  },
];

export const primaryType = "StampVc";

const stampType = [
  { name: "id", type: "string" },
  { name: "iamHash", type: "string" },
  { name: "provider", type: "string" },
];

const exampleCredentialSubjectType = [
  {
    name: "credentialSubject",
    type: "Stamp",
  },
];

export const stampVCTypes = {
  [primaryType]: [...vcbaseType, ...exampleCredentialSubjectType],
  Stamp: stampType,
};
