// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import { Document, IDIDStampVcVerifier } from "./credentials/IDIDStampVCVerifier.sol";
import "../interfaces/IBAAL.sol";

// import "hardhat/console.sol";

contract VCOnboarderShaman is ReentrancyGuard, Initializable {
    
    bool public shares;
    uint256 public amountPerCredential;

    IERC20 public tributeToken;
    uint256 public minTribute;

    IBAAL public baal;
    IDIDStampVcVerifier public vcVerifier;

    mapping(string => string) public verifiedStamps;

    event Onboarded(address indexed baal, address sender, address tributeToken, uint256 value, bool shares, uint256 amountGiven);

    error AlreadyVouchedCredential(string id, string iamHash, string provider);

    constructor() initializer {}

    function init(
        address _moloch,
        address _vcVerifier,
        bool _shares,
        uint256 _amountPerCredential,
        address _tributeToken,
        uint256 _minTribute
    ) initializer external {
        baal = IBAAL(_moloch);
        vcVerifier = IDIDStampVcVerifier(_vcVerifier);
        shares = _shares;
        amountPerCredential = _amountPerCredential;
        tributeToken = IERC20(_tributeToken);
        minTribute = _minTribute;
    }

    function _mintTokens(address to, uint256 amountToGive) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amountToGive;

        if (shares) {
            baal.mintShares(_receivers, _amounts);
        } else {
            baal.mintLoot(_receivers, _amounts);
        }
    }

    function _verifyCredential(
        Document calldata _credential,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) private {
        address verifier = vcVerifier.pseudoResolve(_credential.credentialSubject.id);
        require(msg.sender == verifier, "Sender does not own credential");
        // Here we could check the issuer's address against an on-chain registry.
        // We could provide a verifying contract address when signing the credential which could correspond to this contract
        string memory stamp = verifiedStamps[_credential.credentialSubject._hash];
        if (bytes(stamp).length > 0) {
            revert AlreadyVouchedCredential(
                _credential.credentialSubject.id,
                _credential.credentialSubject._hash,
                _credential.credentialSubject.provider
            );
        }

        vcVerifier.verifyStampVc(_credential, _v, _r, _s);

        verifiedStamps[_credential.credentialSubject._hash] = _credential.credentialSubject.id;
    }

    function onboarder20(
        Document calldata _credential,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint256 _value
    ) public nonReentrant {
        require(address(tributeToken) != address(0), "!token");
        require(_value >= minTribute, "Value sent does not fulfill minimum tribute");
        require(address(baal) != address(0), "!init");
        require(baal.isManager(address(this)), "Shaman not manager");

        _verifyCredential(_credential, _v, _r, _s);

        if (minTribute > 0) {
            require(tributeToken.transferFrom(msg.sender, baal.target(), _value), "Transfer failed");
        }

        _mintTokens(msg.sender, amountPerCredential);

        emit Onboarded(
            address(baal),
            msg.sender,
            address(tributeToken),
            _value,
            shares,
            amountPerCredential
        );
    }

    function onboarder(
        Document calldata _credential,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public payable nonReentrant {
        require(address(tributeToken) == address(0), "!native");
        require(msg.value >= minTribute, "Value sent does not fulfill minimum tribute");
        require(address(baal) != address(0), "!init");
        require(baal.isManager(address(this)), "Shaman not whitelisted");

        _verifyCredential(_credential, _v, _r, _s);

        if (minTribute > 0) {
            // send to dao
            (bool success, ) = baal.target().call{value: msg.value}("");
            require(success, "Transfer failed");
        }

        _mintTokens(msg.sender, amountPerCredential);

        emit Onboarded(
            address(baal),
            msg.sender,
            address(tributeToken),
            msg.value,
            shares,
            amountPerCredential
        );
    }
}

contract VCOnboarderShamanSummoner {
    address payable public template;

    event SummonVCOnboarderShaman(
        address indexed baal,
        address indexed vcVerifier,
        address onboarder,
        string details,
        bool shares,
        uint256 amountPerCredential,
        address tributeToken,
        uint256 minTribute
    );

    constructor(address payable _template) {
        template = _template;
    }

    function summonOnboarder(
        address _moloch,
        address _vcVerifier,
        string calldata _details,
        bool _shares,
        uint256 _amountPerCredential,
        address _tributeToken,
        uint256 _minTribute
    ) public returns (address) {
        VCOnboarderShaman onboarder = VCOnboarderShaman(payable(Clones.clone(template)));

        onboarder.init(
            _moloch,
            _vcVerifier,
            _shares,
            _amountPerCredential,
            _tributeToken,
            _minTribute
        );

        emit SummonVCOnboarderShaman(
            _moloch,
            _vcVerifier,
            address(onboarder),
            _details,
            _shares,
            _amountPerCredential,
            _tributeToken,
            _minTribute
        );

        return address(onboarder);
    }

}
