// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@daohaus/baal-contracts/contracts/interfaces/IBaal.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

// Made for use with Baal(Molochv3)
// allows a dao with a subscription model 
// will grant shares in the dao for every payment
// anyone can trigger a payment for a member 
// - if their last payment was longer than the periodLength
// - it will try to pay any missed payments from the last payment
// a member is active if they have payed up to the last triggered payment
// a member can cancel a subscription at anytime
// time periods are based per member on their last payment
contract SubscriptionShaman is ReentrancyGuard, Initializable {
    event Subscription(
        address indexed contributorAddress,
        uint256 amount,
        address baal,
        uint256 lootToGive,
        uint256 lootToPlatform,
        uint256 starDate
    );

    struct Subscriber {
        uint256 id;
        uint256 starDate;
        uint256 lastPaymentDate;
        uint256 streak;
        bool isActive;
    }

    uint256 public priceActivation;
    uint256 public pricePerPeriod;
    uint256 public lootPerPeriod;
    uint256 public periodLength;
    bool public shares;

    address[] public cuts;
    uint256[] public amounts;

    IBaal public baal;
    IERC20 public token;

    uint256 public count = 1;
    Subscriber[] public subscribers;
    mapping(address => uint256) public subscriberIdxs;


    constructor() initializer {}

    function init(
        address _moloch,
        address payable _token,
        uint256 _priceActivation,
        uint256 _pricePer,
        uint256 _lootPerUnit,
        uint256 _periodLength,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) initializer external {
        baal = IBaal(_moloch);
        token = IERC20(_token);
        priceActivation = _priceActivation;
        pricePerPeriod = _pricePer;
        lootPerPeriod = _lootPerUnit;
        periodLength = _periodLength;
        shares = _shares;
        cuts = _cuts;
        amounts = _amounts;
    }

    // Mint tokens to and any extra cuts that are set
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
            _cutReceivers[i] = cuts[i];
        }

        uint256[] memory _cutAmounts = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            _cutAmounts[i] = amounts[i];
        }

        // mint loot to cuts
        baal.mintLoot(_receivers, _amounts);
    }

    // new or subscription or resubscribe
    // must be an inactive member
    // transfers activation price to DAO
    // transfers initial payment to dao
    // mints initial tokens for 1 period
    function subscribe() payable public {
        // token needs token approval

        uint256 idx = subscriberIdxs[msg.sender];
        // 0 if new
        require(idx == 0 || !subscribers[idx].isActive, "already active");

        // send activation fee to dao
        require(priceActivation == msg.value, "wrong activation fee");
        (bool success, ) = baal.target().call{value: priceActivation}("");
        require(success, "Transfer failed");

        // send first payment
        bool success2 = token.transferFrom(msg.sender, baal.target(), pricePerPeriod);
        require(success2, "erc20: Transfer failed");

        if(idx == 0){
            subscriberIdxs[msg.sender] = count;
            subscribers.push(Subscriber(count, block.timestamp, block.timestamp, 1, true));
            count++;
        } else {
            subscribers[idx - 1].isActive = true;
            subscribers[idx - 1].lastPaymentDate = block.timestamp;
            subscribers[idx - 1].streak = 1;
        }
        
        _mintTokens(msg.sender);
    }

    // can cancel at anytime. no refunds for current period though
    function cancel() public {
        uint256 idx = subscriberIdxs[msg.sender] -1 ;
        require(subscribers[idx].isActive == true, "not active");
        subscribers[idx].isActive = false;
        subscribers[idx].streak = 0;
    }

    // trigger a payment for an active subscriber
    // back pay any miseed periods from last payment
    function triggerPayment(address subscriber) public {
        // pay all previous months and start a new payment date

        uint256 idx = subscriberIdxs[subscriber] - 1;
        require(subscribers[idx].isActive, "!active member");
        uint256 timeFromLastPayment = block.timestamp - subscribers[idx].lastPaymentDate;

        if(timeFromLastPayment > periodLength) {
            
            uint256 periodsToCollect = timeFromLastPayment/periodLength;

            // todo: would be better to batch if possible
            // especially on short periods
            for (uint256 i = 0; i < periodsToCollect; i++) {
                bool success = token.transferFrom(
                    subscriber, 
                    baal.target(), 
                    pricePerPeriod);
                if(!success){
                    subscribers[idx].isActive = false;
                    subscribers[idx].streak = 0;
                    break;
                }
                _mintTokens(subscriber);
                subscribers[idx].streak++;
            }
            
            subscribers[idx].lastPaymentDate = block.timestamp; 
        }


    }


}

contract SubscriptionShamanSummoner {
    address payable public template;

    event SummonComplete(
        address indexed baal,
        address subscription
    );

    constructor(address payable _template) {
        template = _template;
    }

    function summonSubscription(
        address _moloch,
        address payable _token,
        uint256 _priceActivation,
        uint256 _pricePer,
        uint256 _lootPerUnit,
        uint256 _periodLength,
        bool _shares,
        address[] memory _cuts,
        uint256[] memory _amounts
    ) public returns (address) {
        SubscriptionShaman subscriptions = SubscriptionShaman(payable(Clones.clone(template)));

        subscriptions.init(
            _moloch,
            _token,
            _priceActivation,
            _pricePer,
            _lootPerUnit,
            _periodLength,
            _shares,
            _cuts,
            _amounts  
        );


        emit SummonComplete(
            _moloch,
            address(subscriptions)
        );

        return address(subscriptions);
    }
}