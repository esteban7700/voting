require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    local: {
      url: "http://localhost:8545",
      chainId: 777,
      accounts: [
        "f72766fa3e221366bfd835fb99ce4379c9d3666f45222740227e26095b6eeb2b",
        "984315aabaf4e9bbfaee101516209323d5cadd51b4d9bed7c55fb136d4bed550",
      ],
    },
  },
};
