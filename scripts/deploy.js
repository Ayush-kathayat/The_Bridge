
const hre = require("hardhat");


async function main() {
  // Get the contract factory
  const NFT = await hre.ethers.getContractFactory("Bridge");

  // Deploy the contract
  const nft = await NFT.deploy();

  // Wait for the contract to be deployed
  await nft.deployed();

  // Log the contract address
  console.log("NFT contract deployed to:", nft.address);

  

}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});