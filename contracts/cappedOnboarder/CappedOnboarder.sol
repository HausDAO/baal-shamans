// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "../interfaces/IBAAL.sol";

import "hardhat/console.sol";

// Convert tokens 1:<multiplier> shares or loot
contract CappedOnboarderShaman is ReentrancyGuard, Initializable {
    uint256 public immutable PERC_POINTS = 1e6;

    uint256 public expiery;
    uint256 public cap;
    uint256 public multiplier;

    address[] public cuts;
    uint256[] public amounts;

    IBAAL public baal;
    IERC20 public token;

    event ObReceived(
        address indexed contributorAddress,
        uint256 amount,
        address baal
    );

    event Tribute(uint256 amount, address token);

    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token,
        uint256 _expiery,
        uint256 _cap, // share cap
        uint256 _multiplier
    ) external initializer {
        baal = IBAAL(_moloch);
        token = IERC20(_token);
        expiery = _expiery;
        cap = _cap; // cap on shares issed to an account, any over is loot
        multiplier = _multiplier;
    }

    function _mintTokens(
        address to,
        uint256 loot,
        uint256 shares
    ) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        if (shares > 0) {
            uint256[] memory _amountShares = new uint256[](1);
            _amountShares[0] = shares;
            baal.mintShares(_receivers, _amountShares);
        }
        if (loot > 0) {
            uint256[] memory _amountLoot = new uint256[](1);
            _amountLoot[0] = loot;
            baal.mintLoot(_receivers, _amountLoot);
        }
    }

    function onboarder(uint256 _value) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(_value > PERC_POINTS, "min stake PERC_POINTS");
        require(expiery > block.timestamp, "expiery");
        require(baal.isManager(address(this)), "Shaman not manager");
        // send to dao
        require(
            token.transferFrom(msg.sender, baal.target(), _value),
            "Transfer failed"
        );

        uint256 mulVal = _value * multiplier;

        IERC20 _sharesToken = IERC20(baal.sharesToken());
        uint256 _daoMemberShares = _sharesToken.balanceOf(msg.sender);

        if (_daoMemberShares + mulVal > cap) {
            uint256 _shares = cap - _daoMemberShares; // remainning shares before cap
            uint256 _loot = mulVal - _shares; // remaining after shares filled
            _mintTokens(msg.sender, _loot, _shares);
        } else {
            _mintTokens(msg.sender, 0, mulVal); // shares
        }

        emit ObReceived(
            msg.sender,
            _value,
            address(baal)
        );

    }
}

contract CappedOnboarderShamanSummoner {
    address payable public template;

    event SummonCappedOnboarder(
        address indexed baal,
        address onboarder,
        address token,
        uint256 expiery,
        uint256 cap,
        uint256 multiplier,
        string details
    );

    constructor(address payable _template) {
        template = _template;
    }

    function summonOnboarder(
        address _moloch,
        address payable _token,
        uint256 _expiery,
        uint256 _cap,
        uint256 _multiplier,
        string calldata _details
    ) public returns (address) {
        CappedOnboarderShaman onboarder = CappedOnboarderShaman(
            payable(Clones.clone(template))
        );

        onboarder.init(
            _moloch,
            _token,
            _expiery,
            _cap,
            _multiplier
        );

        emit SummonCappedOnboarder(
            _moloch,
            address(onboarder),
            _token,
            _expiery,
            _cap,
            _multiplier,
            _details
        );

        return address(onboarder);
    }
}
