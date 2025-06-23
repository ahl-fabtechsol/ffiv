import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const SimpleCrowdfund = await ethers.getContractFactory("SimpleCrowdfund");
  const simpleCrowdfund = await SimpleCrowdfund.deploy();

  await simpleCrowdfund.waitForDeployment();

  console.log(
    "SimpleCrowdfund Contract deployed at:",
    await simpleCrowdfund.getAddress()
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
