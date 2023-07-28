require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_KEY, // Replace with the actual Sepolia testnet RPC URL
      accounts: [process.env.PR_KEY], // Replace with an array of your account private keys for testing
    },
    mumbai : {
      url : 'https://rpc-mumbai.maticvigil.com',
      accounts : [process.env.PR_KEY],
    },
    goerli : {
      url : process.env.ALCHEMY_API_KEY_GOERLI,
      accounts : [process.env.PR_KEY],

    },
  },
};
