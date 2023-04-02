# Changes from original TCR contract.

The original contract was modified to support quadratic voting by calculating the quadratic cost of voting based on the desired number of votes. This was done by introducing a new internal function calculateQuadraticAmount() which returns the quadratic cost, and by updating the _vote() function to check if the user has enough balance for the quadratic cost of their desired votes. The function _vote() now also deducts the quadratic cost from the voter's balance and uses the amount squared as the actual amount voted.

The changes made to the original contract to support quadratic voting are as follows:

- The new internal function calculateQuadraticAmount(uint152 _votes) internal pure returns (uint152) was added to calculate the quadratic cost of voting based on the desired number of votes.
- The _vote(uint48 _choiceId, uint152 _amount) internal function was updated to calculate the quadratic cost of the desired number of votes using calculateQuadraticAmount() and to deduct the quadratic cost from the voter's balance. The amount squared is used as the actual amount voted.
- The vote(BatchVoteParam[] calldata _batch) external function was modified to use _vote() for each element in the batch.
- The claimAndVote(BatchVoteParam[] calldata _batch) external function was modified to call the claim(address account) public returns (uint256) function to claim the voter's balance at the snapshot before staking and getting voting rights.

These changes enable the contract to support quadratic voting by calculating the quadratic cost of voting based on the desired number of votes.
