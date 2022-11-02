require("@nomiclabs/hardhat-waffle");


require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

//const { API_URL, PRIVATE_KEY } = process.env;
API_URL = "";
PRIVATE_KEY ="";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};