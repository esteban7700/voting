// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const Voting = await hre.ethers.getContractFactory("Voting");

  const votting = await Voting.deploy(getTimestamp(2023, 7, 1),  getTimestamp(2023, 7, 14));

  await votting.deployed();

  console.log(
    `Voting deployed to ${votting.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function getTimestamp(y, m, d) {
  return Math.floor(new Date(y,m-1,d,0,0,0) / 1000);
};