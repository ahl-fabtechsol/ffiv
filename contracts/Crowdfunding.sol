// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleCrowdfund {
    struct Campaign {
        address payable creator;        // The address of the person who created the campaign
        string title;                   // Title of the campaign
        string description;             // Detailed description of the campaign
        uint256 goalAmount;             // The target amount to be raised, in wei
        uint256 deadline;               // Unix timestamp representing the funding deadline
        uint256 totalRaised;            // The total amount of Ether raised so far
        mapping(address => uint256) contributions; // Tracks Ether contributed by each address
        bool goalAchievedAndWithdrawn;  // True if the goal was met and funds withdrawn by creator
        bool exists;                    // True if a campaign with this ID has been created
    }

    mapping(uint256 => Campaign) public campaigns; // Stores all campaigns by their ID
    uint256 public campaignIDCounter; // A counter to generate unique campaign IDs

    // Events to notify off-chain applications of important actions
    event CampaignCreated(uint256 indexed id, address indexed creator, string title, uint256 goalAmount, uint256 deadline);
    event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount);
    // Optional: event FundsReclaimed(uint256 indexed campaignId, address indexed contributor, uint256 amount);

    // Modifiers to enforce conditions on function execution
    modifier campaignExists(uint256 _id) {
        require(campaigns[_id].exists, "Campaign does not exist.");
        _;
    }

    modifier onlyCampaignCreator(uint256 _id) {
        require(campaigns[_id].creator == msg.sender, "Only campaign creator can call this.");
        _;
    }

    modifier beforeDeadline(uint256 _id) {
        require(block.timestamp < campaigns[_id].deadline, "Deadline has passed.");
        _;
    }

     modifier afterDeadline(uint256 _id) {
        require(block.timestamp >= campaigns[_id].deadline, "Deadline not yet passed.");
        _;
    }

    /**
     * @dev Creates a new crowdfunding campaign.
     * @param _title The title of the campaign.
     * @param _description A description of the campaign.
     * @param _goalAmount The funding goal in wei.
     * @param _durationInDays The duration of the campaign in days.
     */
    function createCampaign(string memory _title, string memory _description, uint256 _goalAmount, uint256 _durationInDays) public {
        require(_goalAmount > 0, "Goal amount must be greater than zero.");
        require(_durationInDays > 0, "Duration must be greater than zero.");

        uint256 deadlineTimestamp = block.timestamp + (_durationInDays * 1 days); // Solidity time units
        campaignIDCounter++; // Increment for a new unique ID
        
        Campaign storage newCampaign = campaigns[campaignIDCounter];
        newCampaign.creator = payable(msg.sender); // The caller is the creator
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.goalAmount = _goalAmount;
        newCampaign.deadline = deadlineTimestamp;
        newCampaign.exists = true; // Mark this campaign ID as existing

        emit CampaignCreated(campaignIDCounter, msg.sender, _title, _goalAmount, deadlineTimestamp);
    }

    /**
     * @dev Allows users to contribute Ether to a campaign.
     * @param _id The ID of the campaign to contribute to.
     */
    function contribute(uint256 _id) public payable campaignExists(_id) beforeDeadline(_id) {
        require(msg.value > 0, "Contribution must be greater than zero."); // msg.value is the Ether sent
        Campaign storage campaign = campaigns[_id];
        require(!campaign.goalAchievedAndWithdrawn, "Campaign funds already withdrawn by creator.");

        campaign.contributions[msg.sender] += msg.value;
        campaign.totalRaised += msg.value;

        emit ContributionMade(_id, msg.sender, msg.value);
    }

    /**
     * @dev Allows the campaign creator to withdraw funds if the goal is met and the deadline has passed.
     * @param _id The ID of the campaign from which to withdraw funds.
     */
    function withdrawFunds(uint256 _id) public campaignExists(_id) onlyCampaignCreator(_id) afterDeadline(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.totalRaised >= campaign.goalAmount, "Funding goal not reached.");
        require(!campaign.goalAchievedAndWithdrawn, "Funds already withdrawn.");

        campaign.goalAchievedAndWithdrawn = true; // Mark as withdrawn (Checks-Effects-Interactions pattern)
        uint256 amountToWithdraw = campaign.totalRaised;
        
        // Transfer funds to the creator
        (bool success, ) = campaign.creator.call{value: amountToWithdraw}(""); // Low-level call to send Ether
        require(success, "Failed to send Ether to creator.");

        emit FundsWithdrawn(_id, msg.sender, amountToWithdraw);
    }

    /*
    // Optional: Function for contributors to reclaim funds if goal not met after deadline.
    // This adds complexity and is suitable as an extension if time permits.
    function reclaimContribution(uint256 _id) public campaignExists(_id) afterDeadline(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.totalRaised < campaign.goalAmount, "Funding goal was reached, cannot reclaim.");
        require(campaign.contributions[msg.sender] > 0, "No contribution to reclaim or already reclaimed.");

        uint256 amountToReclaim = campaign.contributions[msg.sender];
        campaign.contributions[msg.sender] = 0; // Prevent re-entrancy and double reclaim

        (bool success, ) = payable(msg.sender).call{value: amountToReclaim}("");
        require(success, "Failed to send Ether back to contributor.");
        
        emit FundsReclaimed(_id, msg.sender, amountToReclaim);
    }
    */

    /**
     * @dev Retrieves details of a specific campaign.
     * @param _id The ID of the campaign.
     * @return creator The address of the campaign creator.
     * @return title The title of the campaign.
     * @return description The description of the campaign.
     * @return goalAmount The funding goal.
     * @return deadline The campaign deadline.
     * @return totalRaised The total amount raised.
     * @return isWithdrawn Whether funds have been withdrawn.
     */
    function getCampaignDetails(uint256 _id) public view campaignExists(_id) 
        returns (
            address creator, 
            string memory title, 
            string memory description, 
            uint256 goalAmount, 
            uint256 deadline, 
            uint256 totalRaised, 
            bool isWithdrawn
        ) {
        Campaign storage c = campaigns[_id];
        return (c.creator, c.title, c.description, c.goalAmount, c.deadline, c.totalRaised, c.goalAchievedAndWithdrawn);
    }

    /**
     * @dev Retrieves the amount contributed by a specific address to a campaign.
     * @param _id The ID of the campaign.
     * @param _contributor The address of the contributor.
     * @return The amount contributed by the _contributor to campaign _id.
     */
    function getContribution(uint256 _id, address _contributor) public view campaignExists(_id) returns (uint256) {
        return campaigns[_id].contributions[_contributor];
    }
}