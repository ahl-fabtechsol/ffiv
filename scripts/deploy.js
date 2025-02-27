import hardhat from "hardhat";

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy();

  // Use waitForDeployment() instead of deployed()
  await crowdfunding.waitForDeployment();

  console.log(
    "Crowdfunding Contract deployed at:",
    await crowdfunding.getAddress()
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
