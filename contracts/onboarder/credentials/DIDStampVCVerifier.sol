// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { VcVerifier } from "./VCVerifier.sol";
import { DIDpkhAdapter } from "./DIDpkhAdapter.sol";
import { CredentialSubject, Proof, Document, IDIDStampVcVerifier } from "./IDIDStampVCVerifier.sol";

contract DIDStampVcVerifier is VcVerifier, DIDpkhAdapter, IDIDStampVcVerifier {

    bytes32 private constant PROOF_TYPE_HASH = keccak256("Proof(string @context,string created,string proofPurpose,string type,string verificationMethod)");

    bytes32 private constant CREDENTIAL_SUBJECT_TYPEHASH = keccak256("CredentialSubject(string hash,string id,string provider)");
    
    bytes32 private constant DOCUMENT_TYPEHASH = keccak256("Document(string @context,CredentialSubject credentialSubject,string expirationDate,string issuanceDate,string issuer,Proof proof,string[] type)CredentialSubject(string hash,string id,string provider)Proof(string @context,string created,string proofPurpose,string type,string verificationMethod)");

    address public issuer;

    event Verified(string indexed id, string iamHash, string provider);

    constructor(string memory _domainName, address _issuer) VcVerifier(_domainName) {
        issuer = _issuer;
    }

    function hashCredentialSubject(CredentialSubject calldata subject) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    CREDENTIAL_SUBJECT_TYPEHASH,
                    keccak256(bytes(subject._hash)),
                    keccak256(bytes(subject.id)),
                    keccak256(bytes(subject.provider))
                )
            );
    }

    function hashCredentialProof(Proof calldata proof) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PROOF_TYPE_HASH,
                    keccak256(bytes(proof._context)),
                    keccak256(bytes(proof.created)),
                    keccak256(bytes(proof.proofPurpose)),
                    keccak256(bytes(proof._type)),
                    keccak256(bytes(proof.verificationMethod))
                )
            );
    }

    function hashDocument(Document calldata document) public pure returns (bytes32) {
        bytes32 credentialSubjectHash = hashCredentialSubject(document.credentialSubject);
        bytes32 proofHash = hashCredentialProof(document.proof);

        return
            keccak256(
                abi.encode(
                    DOCUMENT_TYPEHASH,
                    keccak256(bytes(document._context)),
                    credentialSubjectHash,
                    keccak256(bytes(document.expirationDate)),
                    keccak256(bytes(document.issuanceDate)),
                    keccak256(bytes(document.issuer)),
                    proofHash,
                    _hashArray(document._type)
                )
            );
    }

    function verifyStampVc(
        Document calldata document,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public override returns (bool) {
        bytes32 vcHash = hashDocument(document);
        bytes32 digest = ECDSA.toTypedDataHash(DOMAIN_SEPARATOR, vcHash);

        address issuerAddress = DIDpkhAdapter.pseudoResolveDidIssuer(document.issuer);

        require(issuerAddress == issuer, "Credential issuer does not match");

        address recoveredAddress = ECDSA.recover(digest, v, r, s);

        require(recoveredAddress == issuerAddress, "VC verification failed issuer does not match signature");

        emit Verified(
            document.credentialSubject.id,
            document.credentialSubject._hash,
            document.credentialSubject.provider
        );
        return true;
    }
}
