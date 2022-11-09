// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "../interfaces/IBAAL.sol";

// import "hardhat/console.sol";

contract SubscriptionShaman is ReentrancyGuard, Initializable {
    event SubscriptionReceived(
        address indexed contributorAddress,
        uint256 amount,
        address baal,
        uint256 lootToGive,
        uint256 lootToPlatform
    );

    uint256 public pricePerPeriod;
    uint256 public lootPerPeriod;
    uint256 public expiery;
    bool public shares;

    address[] public cuts;
    uint256[] public amounts;

    IBAAL public baal;
    IERC20 public token;

    uint256 count;
    mapping(uint256 => address) public subscribers;
    mapping(address => bool) public isActive;


    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token, // use 0 address if token only 
        uint256 _pricePer,
        uint256 _lootPerUnit,
        uint256 _expiery,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) initializer external {
        baal = IBAAL(_moloch);
        token = IERC20(_token);
        pricePerPeriod = _pricePer;
        lootPerPeriod = _lootPerUnit;
        expiery = _expiery;
        shares = _shares;
        cuts = _cuts;
        amounts = _amounts;
    }

    function _mintTokens(address to) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = lootPerPeriod;

        if (shares) {
            baal.mintShares(_receivers, _amounts);
        } else {
            baal.mintLoot(_receivers, _amounts);
        }

        address[] memory _cutReceivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        uint256[] memory _cutAmounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            _amounts[i] = amounts[i];
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);
    }

    function subscribe() public {
        // token needs unlimited approval
        token.transferFrom(msg.sender, baal.target(), pricePerPeriod);
        subscribers[count++] = msg.sender;
        _mintTokens(msg.sender);
        isActive[msg.sender] = true;
    }

    function cancel() public {
        isActive[msg.sender] = false;
    }

    function triggerPayment(address subscriber) public {
        // single sub
        // reward
    }

    function onboarder20(uint256 _value) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(expiery > block.timestamp, "expiery");

        require(baal.isManager(address(this)), "Shaman not manager");

        require(_value % pricePerUnit == 0, "!valid amount"); // require value as multiple of units

        uint256 numUnits = _value / pricePerUnit;

        // send to dao
        require(token.transferFrom(msg.sender, baal.target(), _value), "Transfer failed");

        uint256 lootToGive = (numUnits * lootPerUnit);

        _mintTokens(msg.sender, lootToGive);
        
        address[] memory _receivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        // loop to fill amount per cut
        uint256 lootToCuts = 0;
        uint256[] memory _amounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            lootToCuts = lootToCuts + (amounts[i] * numUnits);
            _amounts[i] = amounts[i] * numUnits;
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);

        // amount of loot? fees?
        emit SubscriptionReceived(
            msg.sender,
            _value,
            address(baal),
            lootToGive,
            lootToCuts
        );
    }

}

contract OnboarderShamanSummoner {
    address payable public template;

    event SummonOnbShamanoarderComplete(
        address indexed baal,
        address onboarder,
        address token,
        uint256 pricePerUnit,
        uint256 lootPerUnit,
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