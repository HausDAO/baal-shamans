import { PromiseOrValue } from "../../../../src/types/common";

export * from "./eip712Types";

export type ExampleDocument = {
  "@context": string[];
  type: string[];
  credentialSubject: {
    id: string;
    iamHash: string;
    provider: string;
  };
};

export type ProofStruct = {
  _context: PromiseOrValue<string>;
  created: PromiseOrValue<string>;
  proofPurpose: PromiseOrValue<string>;
  _type: PromiseOrValue<string>;
  verificationMethod: PromiseOrValue<string>;
};

export type CredentialSubjectStruct = {
  _hash: PromiseOrValue<string>;
  id: PromiseOrValue<string>;
  provider: PromiseOrValue<string>;
};

export type DocumentStruct = {
  _context: PromiseOrValue<string>;
  credentialSubject: CredentialSubjectStruct;
  expirationDate: PromiseOrValue<string>;
  issuanceDate: PromiseOrValue<string>;
  issuer: PromiseOrValue<string>;
  proof: ProofStruct;
  _type: PromiseOrValue<string>[];
};
