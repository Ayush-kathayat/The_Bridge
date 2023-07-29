const { FXRootContractAbi } = require( "../artifacts/FXRootContractAbi.js");
require("dotenv").config();
const { ethers } = require("hardhat");

const main = async () => {
  const privateKey = process.env.PR_KEY;

  // The URL of the network provider
  const networkAddress = process.env.ALCHEMY_API_KEY_GOERLI;

  // Create a provider using the URL
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet from the private key and provider
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  const contractAddress = "0x56f41fd485e462501Cdf2aB57119da5c6f24f405"; // Replace with deployed contract address

  // Get the contract factory and attach it to the signer
  const BRIDGE = await ethers.getContractFactory("Bridge");
  const contract = BRIDGE.attach(contractAddress);

  // Get FXRoot contract instance
  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const token_ids = [0, 1, 2, 3, 4];

  const approveTx = await contract
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);

  await approveTx.wait();

  console.log("Approval confirmed"); // confirmation for the approval

  // Depoist

  // Deposit the NFTs to the FXRoot contracts
  for (let i = 0; i < token_ids.length; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(contract.address, wallet.address, token_ids[i], "0x6566");

    // Wait for the deposit to be confirmed
    await depositTx.wait();
  }

  console.log("Approved and deposited"); // confirmation in the console
};

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
