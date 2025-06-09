// CORRECT WAY TO IMPORT IN AN ES MODULE PROJECT
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

// The rest of the test code is exactly the same
describe("SimpleCrowdfund", function () {
  async function deployCrowdfundFixture() {
    const [owner, contributor1, contributor2] = await ethers.getSigners();
    const SimpleCrowdfund = await ethers.getContractFactory("SimpleCrowdfund");
    const crowdfund = await SimpleCrowdfund.deploy();

    const campaignId = 1;
    const title = "My Test Campaign";
    const description = "A campaign for testing purposes";

    // --- FIX APPLIED HERE --- (removed .utils)
    const goalAmount = ethers.parseEther("10"); // 10 ETH goal

    const durationInDays = 5;
    const deadline = (await time.latest()) + durationInDays * 24 * 60 * 60;

    return {
      crowdfund,
      owner,
      contributor1,
      contributor2,
      campaignId,
      title,
      description,
      goalAmount,
      durationInDays,
      deadline,
    };
  }

  describe("Deployment", function () {
    it("Should set the campaignIDCounter to 0 initially", async function () {
      const { crowdfund } = await loadFixture(deployCrowdfundFixture);
      // This test has a bug in the provided contract. campaignIDCounter is not initialized to 0 in a readable way before the first creation.
      // Let's check that it exists, which is a good starting point. Hardhat initializes uints to 0 by default.
      expect(await crowdfund.campaignIDCounter()).to.equal(0);
    });
  });

  describe("Campaign Creation", function () {
    // There is a bug in the provided smart contract code.
    // The line `Campaign storage newCampaign = campaigns;` should be `Campaign storage newCampaign = campaigns[campaignIDCounter];`
    // And there are other issues like using the same storage slot.
    // The tests below will fail until the contract is fixed. I will provide the fixed contract code after this.
    // For now, let's assume the contract is fixed for the purpose of testing.
    it("Should allow a user to create a campaign and emit an event", async function () {
      const {
        crowdfund,
        owner,
        title,
        description,
        goalAmount,
        durationInDays,
      } = await loadFixture(deployCrowdfundFixture);

      // Get the timestamp BEFORE the transaction is sent
      const timestampBefore = await time.latest();
      const expectedDeadline =
        timestampBefore + durationInDays * 24 * 60 * 60 + 1;

      await expect(
        crowdfund.createCampaign(title, description, goalAmount, durationInDays)
      )
        .to.emit(crowdfund, "CampaignCreated")
        .withArgs(
          1,
          owner.address,
          title,
          goalAmount,
          // Instead of an exact value, we use a function to validate the deadline
          (actualDeadline) => {
            // Check that the actual deadline is very close to our expected deadline.
            // We allow a small difference (e.g., 5 seconds) to account for block timing.
            expect(actualDeadline).to.be.closeTo(expectedDeadline, 5);
            return true; // The validator must return true for the test to pass
          }
        );
    });

    it("Should correctly store campaign details", async function () {
      const {
        crowdfund,
        owner,
        title,
        description,
        goalAmount,
        durationInDays,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );

      const details = await crowdfund.getCampaignDetails(1);
      expect(details.creator).to.equal(owner.address);
      expect(details.title).to.equal(title);
      expect(details.goalAmount).to.equal(goalAmount);
      expect(details.totalRaised).to.equal(0);
      expect(details.isWithdrawn).to.be.false;
    });

    it("Should revert if the goal amount is zero", async function () {
      const { crowdfund, title, description, durationInDays } =
        await loadFixture(deployCrowdfundFixture);
      await expect(
        crowdfund.createCampaign(title, description, 0, durationInDays)
      ).to.be.revertedWith("Goal amount must be greater than zero.");
    });
  });

  describe("Contributions", function () {
    it("Should allow a user to contribute and update campaign total", async function () {
      const {
        crowdfund,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );

      // --- FIX APPLIED HERE --- (removed .utils)
      const contribution = ethers.parseEther("1.0");
      await crowdfund
        .connect(contributor1)
        .contribute(campaignId, { value: contribution });

      const details = await crowdfund.getCampaignDetails(campaignId);
      expect(details.totalRaised).to.equal(contribution);

      const contributorBalance = await crowdfund.getContribution(
        campaignId,
        contributor1.address
      );
      expect(contributorBalance).to.equal(contribution);
    });

    it("Should revert if trying to contribute after the deadline", async function () {
      const {
        crowdfund,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
        deadline,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );

      await time.increaseTo(deadline + 1);

      // --- FIX APPLIED HERE --- (removed .utils)
      const contribution = ethers.parseEther("1.0");
      await expect(
        crowdfund
          .connect(contributor1)
          .contribute(campaignId, { value: contribution })
      ).to.be.revertedWith("Deadline has passed.");
    });

    it("Should revert if trying to contribute to a non-existent campaign", async function () {
      const { crowdfund, contributor1 } = await loadFixture(
        deployCrowdfundFixture
      );
      const nonExistentCampaignId = 999;

      // --- FIX APPLIED HERE --- (removed .utils)
      const contribution = ethers.parseEther("1.0");

      await expect(
        crowdfund
          .connect(contributor1)
          .contribute(nonExistentCampaignId, { value: contribution })
      ).to.be.revertedWith("Campaign does not exist.");
    });
  });

  describe("Withdrawals", function () {
    it("Should allow the creator to withdraw funds if goal is met and deadline passed", async function () {
      const {
        crowdfund,
        owner,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
        deadline,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );

      await crowdfund
        .connect(contributor1)
        .contribute(campaignId, { value: goalAmount });

      await time.increaseTo(deadline + 1);

      await expect(crowdfund.withdrawFunds(campaignId)).to.changeEtherBalances(
        [owner, crowdfund],
        [goalAmount, `-${goalAmount}`]
      );
    });

    it("Should revert withdrawal if the funding goal is not reached", async function () {
      const {
        crowdfund,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
        deadline,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );

      // --- FIX APPLIED HERE --- (removed .utils)
      const contribution = ethers.parseEther("1.0");
      await crowdfund
        .connect(contributor1)
        .contribute(campaignId, { value: contribution });

      await time.increaseTo(deadline + 1);

      await expect(crowdfund.withdrawFunds(campaignId)).to.be.revertedWith(
        "Funding goal not reached."
      );
    });

    it("Should revert withdrawal if the deadline has not passed", async function () {
      const {
        crowdfund,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );
      await crowdfund
        .connect(contributor1)
        .contribute(campaignId, { value: goalAmount });

      await expect(crowdfund.withdrawFunds(campaignId)).to.be.revertedWith(
        "Deadline not yet passed."
      );
    });

    it("Should revert withdrawal if called by a non-creator", async function () {
      const {
        crowdfund,
        contributor1,
        campaignId,
        title,
        description,
        goalAmount,
        durationInDays,
        deadline,
      } = await loadFixture(deployCrowdfundFixture);
      await crowdfund.createCampaign(
        title,
        description,
        goalAmount,
        durationInDays
      );
      await crowdfund
        .connect(contributor1)
        .contribute(campaignId, { value: goalAmount });
      await time.increaseTo(deadline + 1);

      await expect(
        crowdfund.connect(contributor1).withdrawFunds(campaignId)
      ).to.be.revertedWith("Only campaign creator can call this.");
    });
  });
});
