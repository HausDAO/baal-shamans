# DhQuadTCR

The DhQuadTCR contract is a Signal Quadratic Contract based on the Moloch V3 DAO. It is a naive TCR implementation where a DAO deploys and initializes this contract after taking a snapshot of shares/loot. Choice IDs can map to an off-chain database or on-chain DHDB.

## Functions
### setUp(address _baalAddress)

Initializer function which sets up the contract. It takes the address of the DAO staking BAAL token contract as an argument.

### currentTimestamp() external view returns (uint256)

Returns the current timestamp.

### claim(address account) public returns (uint256)

Allows users to claim their balance at a snapshot. Returns the snapshot total balance.

### areTokensLocked(uint56 _voteId) external view returns (bool)

Checks whether the tokens are locked or not. Returns the status of the tokens.

### getVotesForAddress(address _voter) external view returns (Vote[] memory)

Returns the vote struct for a particular user id.

### _vote(uint48 _choiceId, uint152 _amount) internal

Stake and get voting rights function. Takes the choice id and amount of tokens to lock as arguments.

### vote(BatchVoteParam[] calldata _batch) external

Stake and get voting rights in batch. Takes an array of struct to stake into multiple choices as an argument.

### claimAndVote(BatchVoteParam[] calldata _batch) external

Sender claim and stake in batch. Takes an array of struct to stake into multiple choices as an argument.

### calculateQuadraticAmount(uint152 _votes) internal pure returns (uint152)

Calculates the quadratic cost of voting based on the desired number of votes.

### releaseTokens(uint256[] calldata _voteIds) external

Release tokens and give up votes function. Takes an array of vote ids in order to release tokens as an argument.

## Events

### VoteCasted(uint56 voteId, address indexed voter, uint152 amount, uint48 choiceId)

Emits when a user casts their vote.

### TokensReleased(uint56 voteId, address indexed voter, uint152 amount, uint48 choiceId)

Emits when tokens are released by the voter.

### ClaimTokens(address indexed voter, uint256 amount)

Emits when a user claims their tokens.

### Init(uint256 sharesSnapshotId, uint256 lootSnapshotId)

Emits the shares and loot snapshot ids.

## Custom Errors
### INVALID_AMOUNT()

Thrown when the amount is invalid.

### NOT_OWNER()

Thrown when the caller is not the owner.

### TOKENS_ALREADY_RELAEASED()

Thrown when the tokens are already released.

### TOKENS_ALREADY_CLAIMED()

Thrown when the tokens are already claimed.

## Dependencies

    hardhat/console.sol
    @openzeppelin/contracts/proxy/utils/Initializable.sol
    @openzeppelin/contracts/proxy/Clones.sol
