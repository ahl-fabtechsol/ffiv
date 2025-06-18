// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleCrowdfund {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        uint256 goalAmount;
        uint256 deadline;
        uint256 totalRaised;
        mapping(address => uint256) contributions;
        bool goalAchievedAndWithdrawn;
        bool exists;
        string mongooseId; // New field to store the Mongoose ID as a string
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignIDCounter;

    event CampaignCreated(uint256 indexed id, address indexed creator, string title, uint256 goalAmount, uint256 deadline, string mongooseId); // Added mongooseId to event
    event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount);

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

    // Modified createCampaign to accept a string for Mongoose ID
    function createCampaign(string memory _title, string memory _description, uint256 _goalAmount, uint256 _durationInDays, string memory _mongooseId) public {
        require(_goalAmount > 0, "Goal amount must be greater than zero.");
        require(_durationInDays > 0, "Duration must be greater than zero.");
        // Optional: You might want to add a check here to ensure _mongooseId is not empty,
        // though Solidity strings don't have a simple way to check for emptiness directly.
        // You could check if keccak256(abi.encodePacked(_mongooseId)) != keccak256(abi.encodePacked(""))

        uint256 deadlineTimestamp = block.timestamp + (_durationInDays * 1 days); // Solidity time units
        campaignIDCounter++; // Increment for a new unique ID

        Campaign storage newCampaign = campaigns[campaignIDCounter];
        newCampaign.creator = payable(msg.sender); // The caller is the creator
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.goalAmount = _goalAmount;
        newCampaign.deadline = deadlineTimestamp;
        newCampaign.exists = true; // Mark this campaign ID as existing
        newCampaign.mongooseId = _mongooseId; // Store the Mongoose ID

        emit CampaignCreated(campaignIDCounter, msg.sender, _title, _goalAmount, deadlineTimestamp, _mongooseId); // Emit Mongoose ID
    }

    function contribute(uint256 _id) public payable campaignExists(_id) beforeDeadline(_id) {
        require(msg.value > 0, "Contribution must be greater than zero."); // msg.value is the Ether sent
        Campaign storage campaign = campaigns[_id];
        require(!campaign.goalAchievedAndWithdrawn, "Campaign funds already withdrawn by creator.");

        campaign.contributions[msg.sender] += msg.value;
        campaign.totalRaised += msg.value;

        emit ContributionMade(_id, msg.sender, msg.value);
    }


    function withdrawFunds(uint256 _id) public campaignExists(_id) onlyCampaignCreator(_id) {
        Campaign storage campaign = campaigns[_id];
        // require(campaign.totalRaised >= campaign.goalAmount, "Funding goal not reached.");
        require(!campaign.goalAchievedAndWithdrawn, "Funds already withdrawn.");

        campaign.goalAchievedAndWithdrawn = true;
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


    function getCampaignDetails(uint256 _id) public view campaignExists(_id)
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 goalAmount,
            uint256 deadline,
            uint256 totalRaised,
            bool isWithdrawn,
            string memory mongooseId // Added mongooseId to return
        ) {
        Campaign storage c = campaigns[_id];
        return (c.creator, c.title, c.description, c.goalAmount, c.deadline, c.totalRaised, c.goalAchievedAndWithdrawn, c.mongooseId);
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