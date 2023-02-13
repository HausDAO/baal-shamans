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

    mapping(address => uint256) public claimedShares;

    address[] public cuts;
    uint256[] public amounts;

    IBAAL public baal;
    IERC20 public token;

    event ObReceived(
        address indexed contributorAddress,
        uint256 amount,
        address baal,
        uint256 lootToCuts
    );

    event Tribute(uint256 amount, address token);

    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token,
        uint256 _expiery,
        uint256 _cap, // share cap
        uint256 _multiplier,
        address[] memory _cuts,
        uint256[] memory _amounts // 1% = 10000
    ) external initializer {
        baal = IBAAL(_moloch);
        token = IERC20(_token);
        expiery = _expiery;
        cap = _cap; // cap on shares issed to an account, any over is loot
        multiplier = _multiplier;
        cuts = _cuts;
        amounts = _amounts;
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

    // extra shares that will be split between cut addresses
    function splits(uint256 _value) internal returns (uint256 totalSplits) {
        address[] memory _receivers = new address[](cuts.length);
        for (uint256 i = 0; i < cuts.length; i++) {
            _receivers[i] = cuts[i];
        }

        // loop to fill amount per cut
        uint256[] memory _amounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            uint256 cut = (_value / PERC_POINTS) * amounts[i];
            totalSplits = totalSplits + cut;
            _amounts[i] = cut;
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);
    }

    // tribute is user defined % of staked that will go as loot to ecosystem fund
    function tribute(uint256 _value, uint256 _tribute)
        internal
        returns (uint256 _cut)
    {
        address[] memory _receivers = new address[](1);
        _receivers[0] = 0x4A9a27d614a74Ee5524909cA27bdBcBB7eD3b315; // eco.daohaus.eth
        uint256[] memory _amounts = new uint256[](1);
        _cut = (_value / PERC_POINTS) * _tribute;
        _amounts[0] = _cut;
        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);
    }

    function onboarder(uint256 _value, uint256 _tribute) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(_value > PERC_POINTS, "min stake PERC_POINTS");
        require(expiery > block.timestamp, "expiery");
        require(baal.isManager(address(this)), "Shaman not manager");
        require(_tribute <= PERC_POINTS, ">1e6, 1% = 10000");
        // send to dao
        require(
            token.transferFrom(msg.sender, baal.target(), _value),
            "Transfer failed"
        );

        uint256 mulVal = _value * multiplier;
        uint256 tribVal = _tribute > 0 ? tribute(mulVal, _tribute) : 0;
        uint256 stakeVal = mulVal - tribVal;

        if (claimedShares[msg.sender] + mulVal > cap) {
            uint256 _shares = cap - claimedShares[msg.sender]; // remainning shares before cap
            uint256 _loot = stakeVal - _shares; // remaining after shares filled
            _mintTokens(msg.sender, _loot, _shares);
            claimedShares[msg.sender] = cap;
        } else {
            _mintTokens(msg.sender, 0, stakeVal); // shares
            claimedShares[msg.sender] += stakeVal;
        }

        emit ObReceived(
            msg.sender,
            _value,
            address(baal),
            cuts.length > 0 ? splits(mulVal) : 0
        );

        emit Tribute(tribVal, address(token));
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
        string details,
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
        uint256 _cap,
        uint256 _multiplier,
        address[] memory _cuts,
        uint256[] memory _amounts,
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
            _multiplier,
            _cuts,
            _amounts
        );

        emit SummonCappedOnboarder(
            _moloch,
            address(onboarder),
            _token,
            _expiery,
            _cap,
            _multiplier,
            _details,
            _cuts,
            _amounts
        );

        return address(onboarder);
    }
}
