// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../interfaces/IBAAL.sol";
import "../interfaces/IBAALToken.sol";

contract ERC721Delegate is Initializable, ERC721Upgradeable, PausableUpgradeable, OwnableUpgradeable {

    constructor() {
        _disableInitializers();
    }
    function setUp(address _to, string memory name_, string memory symbol_)
        external
        initializer
    {
        require(bytes(name_).length != 0, "shares: name empty");
        require(bytes(symbol_).length != 0, "shares: symbol empty");

        __ERC721_init(name_, symbol_);
        __Pausable_init();
        __Ownable_init();

        _safeMint(_to, 1);

        // tokenUri = "test/image.png";

    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721Upgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // baal interface

    function vote(address _moloch, uint32 id, bool approved) public {
        IBAAL moloch = IBAAL(_moloch);
        moloch.submitVote(id, approved);
    }

    function delegate(address _moloch, address delegatee) public {
        IBAAL moloch = IBAAL(_moloch);
        IBAALToken shares = IBAALToken(moloch.sharesToken());
        shares.delegate(delegatee);
    }

    function ragequit(
        address _moloch, 
        address to,
        uint256 sharesToBurn,
        uint256 lootToBurn,
        address[] calldata tokens
    ) public {
        IBAAL moloch = IBAAL(_moloch);
        moloch.ragequit(to, sharesToBurn, lootToBurn, tokens);
    }
}