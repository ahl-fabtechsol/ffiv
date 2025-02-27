// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfunding {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        string image; 
        string video; 
        uint256 goal;
        uint256 deadline;
        uint256 fundsRaised;
        bool withdrawn;
        mapping(address => uint256) donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        string title,
        uint256 goal,
        uint256 deadline
    );
    event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount);

    modifier onlyCreator(uint256 _campaignId) {
        require(msg.sender == campaigns[_campaignId].creator, "Not campaign creator");
        _;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _video,
        uint256 _goal,
        uint256 _duration
    ) external {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = payable(msg.sender);
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.image = _image;
        newCampaign.video = _video;
        newCampaign.goal = _goal;
        newCampaign.deadline = block.timestamp + _duration;
        newCampaign.fundsRaised = 0;
        newCampaign.withdrawn = false;

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal, newCampaign.deadline);
    }

    function donate(uint256 _campaignId) external payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Donation must be greater than 0");

        campaign.fundsRaised += msg.value;
        campaign.donations[msg.sender] += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) external onlyCreator(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp > campaign.deadline, "Campaign is still active");
        require(campaign.fundsRaised >= campaign.goal, "Funding goal not reached");
        require(!campaign.withdrawn, "Funds already withdrawn");

        uint256 amount = campaign.fundsRaised;
        campaign.withdrawn = true;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(_campaignId, msg.sender, amount);
    }

    function getCampaign(uint256 _campaignId)
        external
        view
        returns (
            address creator,
            string memory title,
            string memory description,
            string memory image,
            string memory video,
            uint256 goal,
            uint256 deadline,
            uint256 fundsRaised,
            bool withdrawn
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.image,
            campaign.video,
            campaign.goal,
            campaign.deadline,
            campaign.fundsRaised,
            campaign.withdrawn
        );
    }
}
