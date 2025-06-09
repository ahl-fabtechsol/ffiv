// Import the hardhat library
import hardhat from "hardhat";

// ethers is available in the global scope, but it's good practice to get it from hardhat
const { ethers } = hardhat;

async function main() {
  // 1. Get the deployer's account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // 2. Get the Contract Factory for "SimpleCrowdfund" (the correct name)
  const SimpleCrowdfund = await ethers.getContractFactory("SimpleCrowdfund");

  // 3. Deploy the contract
  const simpleCrowdfund = await SimpleCrowdfund.deploy();

  // 4. Wait for the deployment to be confirmed on the network
  await simpleCrowdfund.waitForDeployment();

  // 5. Log the address of the deployed contract
  console.log(
    "SimpleCrowdfund Contract deployed at:",
    await simpleCrowdfund.getAddress()
  );
}

// Standard pattern to run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
