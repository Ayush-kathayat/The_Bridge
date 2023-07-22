require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_KEY, // Replace with the actual Sepolia testnet RPC URL
      accounts: [process.env.PRIVATE_KEY], // Replace with an array of your account private keys for testing
    },
  },
};
