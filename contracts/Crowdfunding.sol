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
        string mongooseId; 
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignIDCounter;

    event CampaignCreated(uint256 indexed id, address indexed creator, string title, uint256 goalAmount, uint256 deadline, string mongooseId); 
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

    function createCampaign(string memory _title, string memory _description, uint256 _goalAmount, uint256 _durationInDays, string memory _mongooseId) public {
        require(_goalAmount > 0, "Goal amount must be greater than zero.");
        require(_durationInDays > 0, "Duration must be greater than zero.");

        uint256 deadlineTimestamp = block.timestamp + (_durationInDays * 1 days); 
        campaignIDCounter++; 

        Campaign storage newCampaign = campaigns[campaignIDCounter];
        newCampaign.creator = payable(msg.sender);
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.goalAmount = _goalAmount;
        newCampaign.deadline = deadlineTimestamp;
        newCampaign.exists = true;
        newCampaign.mongooseId = _mongooseId;

        emit CampaignCreated(campaignIDCounter, msg.sender, _title, _goalAmount, deadlineTimestamp, _mongooseId);
    }

    function contribute(uint256 _id) public payable campaignExists(_id) beforeDeadline(_id) {
        require(msg.value > 0, "Contribution must be greater than zero.");
        Campaign storage campaign = campaigns[_id];
        require(!campaign.goalAchievedAndWithdrawn, "Campaign funds already withdrawn by creator.");

        campaign.contributions[msg.sender] += msg.value;
        campaign.totalRaised += msg.value;

        emit ContributionMade(_id, msg.sender, msg.value);
    }


    function withdrawFunds(uint256 _id) public campaignExists(_id) onlyCampaignCreator(_id) {
        Campaign storage campaign = campaigns[_id];
        require(!campaign.goalAchievedAndWithdrawn, "Funds already withdrawn.");

        campaign.goalAchievedAndWithdrawn = true;
        uint256 amountToWithdraw = campaign.totalRaised;

        (bool success, ) = campaign.creator.call{value: amountToWithdraw}(""); 
        require(success, "Failed to send Ether to creator.");

        emit FundsWithdrawn(_id, msg.sender, amountToWithdraw);
    }

    function getCampaignDetails(uint256 _id) public view campaignExists(_id)
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 goalAmount,
            uint256 deadline,
            uint256 totalRaised,
            bool isWithdrawn,
            string memory mongooseId 
        ) {
        Campaign storage c = campaigns[_id];
        return (c.creator, c.title, c.description, c.goalAmount, c.deadline, c.totalRaised, c.goalAchievedAndWithdrawn, c.mongooseId);
    }

    function getContribution(uint256 _id, address _contributor) public view campaignExists(_id) returns (uint256) {
        return campaigns[_id].contributions[_contributor];
    }
}