// Load dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("Voting contract", function () {

  // Set Up

  let owner, voter1, voter2, voter3;
  let voting;
  this.beforeAll(async function () {
    [owner, voter1, voter2, voter3] = await ethers.getSigners();
    voting = await ethers.deployContract("Voting", [getTimestamp(2023, 7, 1),  getTimestamp(2023, 7, 14)]);
  });


  // Tests
  
  it("Initialize contract endTime before now", async function () {

    await expect(ethers.deployContract("Voting", [getTimestamp(2023, 7, 1), getTimestamp(2023, 7, 1)])).to.be.revertedWith(
      "timeEnd time should be in the future"
    );
  });

  it("Vote out of time error", async function () {

    votingFuture = await ethers.deployContract("Voting", [getTimestamp(2024, 7, 1),  getTimestamp(2024, 7, 14)]);

    await expect(votingFuture.connect(voter1).vote(1)).to.be.revertedWith(
      "You can't vote at this time"
    );
  });

  it("Vote twice error", async function () {
    
    await voting.connect(voter1).vote(1);
    await waitNextBlock();
    await expect(voting.connect(voter1).vote(2)).to.be.revertedWith(
      "You have already voted"
    );
  });

  it("Vote invalid option", async function () {
    
    await expect(voting.connect(voter2).vote(10)).to.be.revertedWith(
      "Invalid option vote"
    );
  });

  it("Results", async function () {
    
    await voting.connect(voter2).vote(1);
    await voting.connect(voter3).vote(2);
    voting.setTimeEnd(getTimestamp(2023, 7, 3));
    expect(await voting.getResult(1)).to.equal(2);
  });

  it("Vote By Address", async function () {
    
    await expect(voting.connect(voter2).getVote(voter3.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
    expect(await voting.getVote(voter2.address)).to.equal(1);
  });
});

async function waitNextBlock() {
  return helpers.mine();
};


function getTimestamp(y, m, d) {
  return Math.floor(new Date(y,m-1,d,0,0,0) / 1000);
};