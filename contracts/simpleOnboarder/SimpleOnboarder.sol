// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "hardhat/console.sol";

// Convert tokens 1:1 shares or loot
contract SimpleOnboarderShaman is ReentrancyGuard, Initializable {
    event ObReceived(
        address indexed contributorAddress,
        uint256 amount,
        address baal,
        uint256 lootToCuts
    );

    uint256 public expiery;
    bool public shares;

    address[] public cuts;
    uint256[] public amounts;

    IBaal public baal;
    IERC20 public token;

    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token, 
        uint256 _expiery,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) initializer external {
        baal = IBaal(_moloch);
        token = IERC20(_token);
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

    function onboarder(uint256 _value) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(expiery > block.timestamp, "expiery");
        require(baal.isManager(address(this)), "Shaman not manager");

        // uint256 units = (_value * 1e18)  / price; 

        // send to dao
        require(token.transferFrom(msg.sender, baal.target(), _value), "Transfer failed");
        _mintTokens(msg.sender, _value);
        
        address[] memory _receivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        // loop to fill amount per cut
        uint256 lootToCuts = 0;
        uint256[] memory _amounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            lootToCuts = lootToCuts + (amounts[i] * _value);
            _amounts[i] = amounts[i] * _value;
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);

        // amount of loot? fees?
        emit ObReceived(
            msg.sender,
            _value,
            address(baal),
            lootToCuts
        );
    }

}

contract SimpleOnboarderShamanSummoner {
    address payable public template;

    event SummonSimpleOnboarder(
        address indexed baal,
        address onboarder,
        address token,
        uint256 expiery,
        string details,
        bool _shares,
        address[] _cuts,
        uint256[] _amounts
    );

    constructor(address payable _template) {
        template = _template;
    }

    function summonOnboarder(
        address _moloch,
        address payable _token,
        uint256 _expiery,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts,
        string calldata _details
    ) public returns (address) {
        SimpleOnboarderShaman onboarder = SimpleOnboarderShaman(payable(Clones.clone(template)));

        onboarder.init(
            _moloch,
            _token,
            _expiery,
            _shares,
            _cuts,
            _amounts    
        );


        emit SummonSimpleOnboarder(
            _moloch,
            address(onboarder),
            _token,
            _expiery,
            _details,
            _shares,
            _cuts,
            _amounts 
        );

        return address(onboarder);
    }

}