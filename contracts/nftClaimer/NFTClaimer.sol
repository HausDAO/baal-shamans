// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "../interfaces/IBAAL.sol";

// Made for use with Baal(Molochv3)
// Example use of Manager shamans
// Any account can claim some amount of shares if they hold an nft
// this shaman must be set as a manager role in the dao
contract NFTClaimerShaman is Initializable {
    IBAAL public baal;
    IERC20 public token;
    IERC721 public nft;

    mapping(uint256 => uint256) public claims;
    bool public isShares;
    uint256 public perNft; // amount of loot or shares to mint

    // event SetMember(address account);
    // event Claim(address account, uint256 tokenId, uint256 timestamp);

    function init(address _moloch, address _nftAddress, bool _isShares, uint256 _perNft) initializer external {
        baal = IBAAL(_moloch);
        nft = IERC721(_nftAddress);
        isShares = _isShares;
        // get shares or loot token address from dao based on 'shares' flag
        if (_isShares) {
            token = IERC20(baal.sharesToken());
        } else {
            token = IERC20(baal.lootToken());
        }
        perNft = _perNft;
    }

    // Mint share or loot tokens
    function _mintTokens(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

        if (isShares) {
            baal.mintShares(_receivers, _amounts); // interface to mint shares
        } else {
            baal.mintLoot(_receivers, _amounts); // interface to mint loot
        }
    }

    // can be called by any account to claim per period tokens
    function claim(uint256 _tokenId) public {
        require(nft.ownerOf(_tokenId) == msg.sender, "must be owner");
        require(claims[_tokenId] == 0, "tokenId has already been claimed");

        uint256 amount = calculate();
        _mintTokens(msg.sender, amount);
        claims[_tokenId] = block.timestamp;
        // emit Claim(msg.sender, _tokenId, block.timestamp);
    }

    function batchClaim(uint256[] memory _tokenIds) external {
        for (uint256 i=0;i<_tokenIds.length;i++ ) {
            claim(_tokenIds[i]);
        }
    }

    function calculate() internal view returns (uint256 total) {
        total = perNft;
    }

}


contract NFTClaimerShamanSummoner {
    address public template;

    event SummonComplete(
        address indexed baal,
        address claimer
    );

    constructor(address _template) {
        template = _template;
    }

    function summonNFTClaimer(
        address _moloch, 
        address _nftAddress, 
        bool _isShares, 
        uint256 _perNft
    ) public returns (address) {

       NFTClaimerShaman nftClaimer = NFTClaimerShaman(Clones.clone(template));

        nftClaimer.init(
            _moloch,
            _nftAddress,
            _isShares,
            _perNft
        );


        emit SummonComplete(
            _moloch,
            address(nftClaimer)
        );

        return address(nftClaimer);

    }
}
