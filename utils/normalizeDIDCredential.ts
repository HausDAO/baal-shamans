import { DocumentStruct, CredentialSubjectStruct, ProofStruct } from "../types";
export interface DIDCredential {
  '@context': string;
  type?: (string)[] | null;
  credentialSubject: CredentialSubject;
  issuer: string;
  issuanceDate: string;
  proof: Proof;
  expirationDate: string;
}
export interface CredentialSubject {
  id: string;
  provider: string;
  hash: string;
}
export interface Proof {
  '@context': string;
  type: string;
  proofPurpose: string;
  proofValue: string;
  verificationMethod: string;
  created: string;
  eip712Domain: Eip712Domain;
}
export interface Eip712Domain {
  domain: Domain;
  primaryType: string;
  types: Types;
}
export interface Domain {
  name: string;
}
export interface Types {
  CredentialSubject?: (CredentialSubjectEntityOrDocumentEntityOrEIP712DomainEntityOrProofEntity)[] | null;
  Document?: (CredentialSubjectEntityOrDocumentEntityOrEIP712DomainEntityOrProofEntity)[] | null;
  EIP712Domain?: (CredentialSubjectEntityOrDocumentEntityOrEIP712DomainEntityOrProofEntity)[] | null;
  Proof?: (CredentialSubjectEntityOrDocumentEntityOrEIP712DomainEntityOrProofEntity)[] | null;
}
export interface CredentialSubjectEntityOrDocumentEntityOrEIP712DomainEntityOrProofEntity {
  name: string;
  type: string;
}


// TODO: This is a temporary solution to get the types for the contract.
export const normalizeDIDCredential = (credential: DIDCredential) => {
  const normalizedCredential = {} as DocumentStruct;
  const normalizedSubject = {} as CredentialSubjectStruct;
  const normalizedProof = {} as ProofStruct;

  normalizedSubject['id'] = credential.credentialSubject.id;
  normalizedSubject['provider'] = credential.credentialSubject.provider;
  normalizedSubject['_hash'] = credential.credentialSubject.hash;

  normalizedProof['_context'] = credential.proof['@context'];
  normalizedProof['created'] = credential.proof.created;
  normalizedProof['proofPurpose'] = credential.proof.proofPurpose;
  normalizedProof['_type'] = credential.proof.type;
  normalizedProof['verificationMethod'] = credential.proof.verificationMethod;

  normalizedCredential['_context'] = credential['@context'];
  normalizedCredential['credentialSubject'] = normalizedSubject;
  normalizedCredential['expirationDate'] = credential.expirationDate;
  normalizedCredential['issuanceDate'] = credential.issuanceDate;
  normalizedCredential['issuer'] = credential.issuer;
  normalizedCredential['proof'] = normalizedProof;

  if (credential.type) {
    normalizedCredential['_type'] = credential.type;
  }
  
  return normalizedCredential;
};