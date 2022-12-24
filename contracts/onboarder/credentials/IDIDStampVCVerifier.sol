// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import { IDIDpkhAdapter } from "./DIDpkhAdapter.sol";

struct CredentialSubject {
    // underscored since hash is a reserved keyword
    string _hash;
    string id;
    string provider;
}

struct Proof {
    // underscored since @ is not valid for struct member
    string _context;
    string created;
    string proofPurpose;
    // underscored since typoe is a reserved keyword
    string _type;
    string verificationMethod;
}

struct Document {
    // underscored since @ is not valid for struct member
    string _context;
    CredentialSubject credentialSubject;
    string expirationDate;
    string issuanceDate;
    string issuer;
    Proof proof;
    // underscored since @ is not valid for struct member
    string[] _type;
}

interface IDIDStampVcVerifier is IDIDpkhAdapter {

    function verifyStampVc(
        Document calldata document,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (bool);
}
