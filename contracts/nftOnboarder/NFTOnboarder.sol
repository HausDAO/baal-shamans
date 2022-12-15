// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "../interfaces/IBAAL.sol";

// import "hardhat/console.sol";

interface INFTDelegate {
    function init(address, address, string memory, string memory) external;
    function transferOwnership(address) external;
    function safeMint(address) external;
}

contract OnboarderShaman is ReentrancyGuard, Initializable {
    event YeetReceived(
        address indexed contributorAddress,
        uint256 amount,
        address baal,
        uint256 lootToGive,
        uint256 lootToPlatform
    );

    uint256 public pricePerUnit;
    uint256 public lootPerUnit;
    uint256 public expiery;
    bool public shares;

    address[] public cuts;
    uint256[] public amounts;

    IBAAL public baal;
    IERC20 public token;

    address nftTemplate;

    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token, // use 0 address if token only 
        address _nftTemplate,
        uint256 _pricePer,
        uint256 _unitPerUnit,
        uint256 _expiery,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) initializer external {
        baal = IBAAL(_moloch);
        token = IERC20(_token);
        nftTemplate = _nftTemplate;
        pricePerUnit = _pricePer;
        lootPerUnit = _unitPerUnit;
        expiery = _expiery;
        shares = _shares;
        cuts = _cuts;
        amounts = _amounts;
    }

    function _mintTokens(address to, uint256 lootToGive) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = lootToGive;

        if (shares) {
            baal.mintShares(_receivers, _amounts);
        } else {
            baal.mintLoot(_receivers, _amounts);
        }
    }

    function onboarder20(uint256 _value) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(expiery > block.timestamp, "expiery");

        require(baal.isManager(address(this)), "Shaman not manager");

        require(_value == pricePerUnit, "!valid amount"); // require value as multiple of units

        // send to dao
        require(token.transferFrom(msg.sender, baal.target(), _value), "Transfer failed");

        INFTDelegate _nft = INFTDelegate(Clones.clone(nftTemplate));
        _nft.init(msg.sender, address(baal), "Delegate Token", "DEL");
        _nft.transferOwnership(msg.sender);

        _mintTokens(msg.sender, lootPerUnit);
        
        address[] memory _receivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        // loop to fill amount per cut
        uint256 lootToCuts = 0;
        uint256[] memory _amounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            lootToCuts = lootToCuts + (amounts[i]);
            _amounts[i] = amounts[i];
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);

        // amount of loot? fees?
        emit YeetReceived(
            msg.sender,
            _value,
            address(baal),
            lootPerUnit,
            lootToCuts
        );
    }

    function onboarder() public payable nonReentrant {
        require(address(token) == address(0), "!native");
        require(expiery > block.timestamp, "expiery");
        require(address(baal) != address(0), "!init");
        require(msg.value == pricePerUnit, "< minimum");
        require(baal.isManager(address(this)), "Shaman not whitelisted");

        // send to dao
        (bool success, ) = baal.target().call{value: pricePerUnit}("");
        require(success, "Transfer failed");

        INFTDelegate _nft = INFTDelegate(Clones.clone(nftTemplate));
        _nft.init(msg.sender, address(baal), "Delegate Token", "DEL");
        _nft.transferOwnership(msg.sender);
        _mintTokens(msg.sender, lootPerUnit);
        
        address[] memory _receivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        // loop to fill amount per cut
        uint256 lootToCuts = 0;
        uint256[] memory _amounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            lootToCuts = lootToCuts + amounts[i];
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);

        // amount of loot? fees?
        emit YeetReceived(
            msg.sender,
            msg.value,
            address(baal),
            lootPerUnit,
            lootToCuts
        );
    }

    receive() external payable {
        onboarder();
    }
}

contract OnboarderShamanSummoner {
    address payable public template;
    address public nftTemplate;

    event SummonOnbShamanoarderComplete(
        address indexed baal,
        address onboarder,
        address nft,
        address token,
        uint256 pricePerUnit,
        uint256 lootPerUnit,
        uint256 expiery,
        string details,
        bool _shares,
        address[] _cuts,
        uint256[] _amounts
    );

    constructor(address payable _template, address _nftTemplate) {
        template = _template;
        nftTemplate = _nftTemplate;
    }

    function summonOnboarder(
        address _moloch,
        address payable _token,
        uint256 _pricePer,
        uint256 _unitPerUnit,
        uint256 _expiery,
        string calldata _details,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) public returns (address) {
        OnboarderShaman onboarder = OnboarderShaman(payable(Clones.clone(template)));

        onboarder.init(
            _moloch,
            _token,
            nftTemplate,
            _pricePer,
            _unitPerUnit,
            _expiery,
            _shares,
            _cuts,
            _amounts    
        );


        emit SummonOnbShamanoarderComplete(
            _moloch,
            address(onboarder),
            nftTemplate,
            _token,
            _pricePer,
            _unitPerUnit,
            _expiery,
            _details,
            _shares,
            _cuts,
            _amounts 
        );

        return address(onboarder);
    }

}