// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

// import "hardhat/console.sol";

/// @title MultiplyOnboarderShaman
/// @notice Convert tokens 1:multiplier shares or loot
/// @dev is ReentrancyGuard, Initializable
contract MultiplyOnboarderShaman is ReentrancyGuard, Initializable {
    event ObReceived(
        address indexed contributorAddress,
        uint256 amountStaked,
        uint256 amountMinted,
        address baal
    );

    uint256 public expiery;
    uint256 public multiplier;
    bool public isShares;

    IBaal public baal;
    IERC20 public token;

    constructor() initializer {}

    /// @notice Initialize the contract
    /// @param _moloch the parent moloch contract
    /// @param _token the token to convert
    /// @param _expiery the expiery
    /// @param _multiplier the multiplier
    /// @param _isShares is shares or loot
    function init(
        address _moloch,
        address payable _token, 
        uint256 _expiery,
        uint256 _multiplier,
        bool _isShares
    ) initializer external {
        require(_moloch != address(0), "!moloch");
        require(_multiplier != 0, "!multiplier");
        require(_expiery > block.timestamp, "expiery");
        baal = IBaal(_moloch);
        token = IERC20(_token);
        expiery = _expiery;
        multiplier = _multiplier;
        isShares = _isShares;
    }

    /// @notice Mint shares or loot tokens
    /// @param to who to mint to
    /// @param amount how much to mint
    function _mintTokens(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

        if (isShares) {
            baal.mintShares(_receivers, _amounts);
        } else {
            baal.mintLoot(_receivers, _amounts);
        }
    }

    /// @notice Main function to convert tokens to shares or loot
    /// @param _value how much to convert
    function onboarder(uint256 _value) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(expiery > block.timestamp, "expiery");
        require(baal.isManager(address(this)), "Shaman not manager");
        require(_value > 0, "!value");
        // send to dao
        require(token.transferFrom(msg.sender, baal.target(), _value), "Transfer failed");
        uint256 amountMultiplied = _value * multiplier;
        _mintTokens(msg.sender, amountMultiplied);

        // amount of loot? fees?
        emit ObReceived(
            msg.sender,
            _value,
            amountMultiplied,
            address(baal)
        );
    }

}

contract MultiplyOnboarderShamanSummoner {
    address payable public template;

    event SummonOnboarder(
        address indexed baal,
        address indexed onboarder,
        address token,
        uint256 expiery,
        uint256 multiplier,
        string details,
        bool _isShares
    );

    constructor(address payable _template) {
        template = _template;
    }

    /// @notice Deploy a new MultiplyOnboarderShaman
    /// @param _moloch the parent moloch contract
    /// @param _token the token to convert
    /// @param _expiery the expiery
    /// @param _multiplier the multiplier
    /// @param _isShares is shares or loot
    /// @param _details details
    /// @return address of the new MultiplyOnboarderShaman
    function summonOnboarder(
        address _moloch,
        address payable _token,
        uint256 _expiery,
        uint256 _multiplier,
        bool _isShares,
        string calldata _details
    ) public returns (address) {
        MultiplyOnboarderShaman onboarder = MultiplyOnboarderShaman(payable(Clones.clone(template)));

        onboarder.init(
            _moloch,
            _token,
            _expiery,
            _multiplier,
            _isShares   
        );


        emit SummonOnboarder(
            _moloch,
            address(onboarder),
            _token,
            _expiery,
            _multiplier,
            _details,
            _isShares
        );

        return address(onboarder);
    }

}