// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "../interfaces/IBAAL.sol";

// Made for use with Baal(Molochv3)
// Example use of Manager shamans
// Any account can claim some amount of shares or loot per checkInInterval
// this shaman must be set as a manager role in the dao
contract CheckInShaman is ReentrancyGuard, Initializable {
    IBAAL public baal;
    IERC20 public token;

    mapping(address => uint256) public timeLedger;
    bool public sharesOrLoot;
    uint256 public checkInInterval; // length of checkInInterval in seconds
    uint256 public sharesPerSecond; // Amount of shares awarded per second of work

    event Claim(
        address account,
        uint256 timestamp,
        uint256 tokenAmountClaimed,
        uint16 minutesWorked
    );

    constructor() initializer {}

    function init(
        address _baal,
        bool _sharesOrLoot,
        uint256 _sharesPerSecond,
        uint256 _checkInInterval
    ) external initializer {
        baal = IBAAL(_baal);
        sharesOrLoot = _sharesOrLoot;
        // get shares or loot token address from dao based on 'shares' flag
        if (sharesOrLoot) {
            token = IERC20(baal.sharesToken());
        } else {
            token = IERC20(baal.lootToken());
        }
        checkInInterval = _checkInInterval;
        sharesPerSecond = _sharesPerSecond;
    }

    // Mint share or loot tokens
    function _mintTokens(address to, uint256 amount) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

        if (sharesOrLoot) {
            baal.mintShares(_receivers, _amounts); // interface to mint shares
        } else {
            baal.mintLoot(_receivers, _amounts); // interface to mint loot
        }
    }

    // can be called by any account to claim per checkInInterval tokens
    function claim(uint16 _secondsWorked) public {
        require(
            _secondsWorked < checkInInterval,
            "Claimable work period must be less than the check in interval"
        );

        require(
            block.timestamp - timeLedger[msg.sender] >= checkInInterval ||
                timeLedger[msg.sender] == 0,
            "Can only claim 1 time per interval"
        );

        require(
            token.balanceOf(msg.sender) > 0,
            "Members Only: Must have DAO tokens in order to claim through this shaman"
        );

        uint256 amount = calculate(_secondsWorked, sharesPerSecond);
        _mintTokens(msg.sender, amount);
        timeLedger[msg.sender] = block.timestamp;

        emit Claim(msg.sender, block.timestamp, amount, _secondsWorked);
    }

    function calculate(uint16 _secondsWorked, uint256 _sharesPerSecond)
        internal
        pure
        returns (uint256 total)
    {
        total = _secondsWorked * _sharesPerSecond;
    }
}

contract CheckInSummoner {
    address payable public template;

    event CheckInSummonComplete(
        address indexed baal,
        address shamanAddress,
        bool sharesOrLoot,
        uint256 sharesPerSecond,
        uint256 checkInInterval
    );

    constructor(address payable _template) {
        template = _template;
    }

    function summon(
        address _baal,
        bool _sharesOrLoot,
        uint256 _sharesPerSecond,
        uint256 _checkInInterval
    ) public returns (address) {
        CheckInShaman checkInShaman = CheckInShaman(
            payable(Clones.clone(template))
        );
        checkInShaman.init(
            _baal,
            _sharesOrLoot,
            _sharesPerSecond,
            _checkInInterval
        );

        emit CheckInSummonComplete(
            _baal,
            address(checkInShaman),
            _sharesOrLoot,
            _sharesPerSecond,
            _checkInInterval
        );

        return address(checkInShaman);
    }
}
