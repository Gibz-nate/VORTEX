// https://eth-sepolia.g.alchemy.com/v2/fwWfxO89aNrjn7eINDcNJWMAAyDpUn2J


/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 1000000,
         gasPrice: 200000000,
      }
   },
   etherscan: {
      apiKey: "jDOCVF9GhI8wL566-J0sZI4LevjA53dQ",
    },
};
