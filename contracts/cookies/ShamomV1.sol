// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../interfaces/IBAAL.sol";

// Made for use with Baal(Molochv3)
// Example use of Manager shamans
// Any account can claim some amount of shares or loot per period
// this shaman must be set as a manager role in the dao
contract ShamomV1 is Initializable, AccessControlUpgradeable {
    struct Claim {
        uint256 timestamp;
        uint256 amount;
    }

    /// @notice User role required in order to claim cookies
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");
    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    /// @notice Current version of the contract
    uint16 internal _version;

    IBAAL public baal;
    IERC20 public token;

    mapping(address => Claim[]) public claims;
    uint256 public cookieTokenValue;
    uint256 public period; // length of period in seconds
    uint256 public maxCookiesPerPeriod; // maximum amount of cookies claimable per address per period

    /*******************
     * EVENTS
     ******************/

    event SetMember(address account);
    event CookiesClaimed(address account, uint256 timestamp, uint256 amount);

    /*******************
     * DEPLOY
     ******************/

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Contract initialization logic
    function initialize(
        address _moloch,
        IERC20 _token,
        uint256 _cookieTokenValue,
        uint256 _maxCookiesPerPeriod,
        uint256 _period
    ) public initializer {
        __AccessControl_init();

        baal = IBAAL(_moloch);
        token = IERC20(_token);
        cookieTokenValue = _cookieTokenValue;
        period = _period;
        maxCookiesPerPeriod = _maxCookiesPerPeriod;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function grantMembership(
        address applicant
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MEMBER_ROLE, applicant);
    }

    // can be called by any account to claim per period tokens
    function claimCookies(
        uint256 amount
    ) public payable virtual onlyRole(MEMBER_ROLE) {
        require(
            amount < remainingAllowance(),
            "Amount greater than remaining allowance"
        );

        claims[msg.sender].push(Claim(block.timestamp, amount));

        token.transferFrom(
            address(this),
            msg.sender,
            amount * cookieTokenValue
        );

        emit CookiesClaimed(msg.sender, block.timestamp, amount);
    }

    function deposit(uint amount) public payable {
        token.transferFrom(msg.sender, address(this), amount);
    }

    function getTokenBalance()
        public
        view
        onlyRole(MEMBER_ROLE)
        returns (uint)
    {
        return token.balanceOf(address(this));
    }

    function getCookieBalance()
        public
        view
        onlyRole(MEMBER_ROLE)
        returns (uint)
    {
        return getTokenBalance() / cookieTokenValue;
    }

    function totalCookiesThisPeriod() public virtual returns (uint256 total) {
        Claim[] storage claimed = claims[msg.sender];
        for (uint i = 0; i < claimed.length; i++) {
            Claim memory claim = claimed[i];
            if (block.timestamp - claim.timestamp < period) {
                total += claim.amount;
            } else {
                // remove old claim
                for (uint j = i; j < claimed.length - 1; j++) {
                    claimed[j] = claimed[j + 1];
                }
                claimed.pop();
            }
        }
    }

    function remainingAllowance() public virtual returns (uint256) {
        uint256 totalClaimed = totalCookiesThisPeriod();

        return maxCookiesPerPeriod - totalClaimed;
    }

    /// @notice gets the current version of the contract
    function version() public view virtual returns (uint256) {
        return _version;
    }

    /// @notice Update the contract version number
    /// @notice Only allowed for member of UPGRADER_ROLE
    function updateVersion() external onlyRole(UPGRADER_ROLE) {
        _version += 1;
    }

    /*******************
     * INTERNAL
     ******************/
}
