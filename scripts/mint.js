// Import required libraries
const { ethers } = require("hardhat");
require("dotenv").config();

const privateKey = process.env.PR_KEY;

// The URL of the network provider
const networkAddress = process.env.ALCHEMY_API_KEY_GOERLI;

// Create a provider using the URL
const provider = new ethers.providers.JsonRpcProvider(networkAddress);

// Create a signer from the private key and provider
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x56f41fd485e462501Cdf2aB57119da5c6f24f405"; // Replace with your contract's address


//  main mint function

const main = async () => {
  // Get the contract factory and attach it to the signer
  const BRIDGE = await ethers.getContractFactory("Bridge", wallet);
  const contract = BRIDGE.attach(contractAddress);
  const tx = await contract.mint(5);
  await tx.wait();
  console.log(` 5 NFT minted successfully`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
