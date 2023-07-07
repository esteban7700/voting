// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

     event Vote(address sender, uint option);

    uint public timeStart;
    uint public timeEnd;

    uint public numOptions;
    mapping(uint => uint) private options;
    mapping(address => Voter) private voters;

    struct Voter {
       bool voted;
       uint vote;
    }

    constructor(uint _timeStart, uint _timeEnd) {
        require(
            block.timestamp < _timeEnd,
            "timeEnd time should be in the future"
        );
        timeStart = _timeStart;
        timeEnd = _timeEnd;
        
        numOptions=3;
    }

    function vote(uint _option) public {

        require(block.timestamp >= timeStart && block.timestamp <= timeEnd, "You can't vote at this time");
        require(!voters[msg.sender].voted, "You have already voted");
        require(_option < numOptions, "Invalid option vote");
        
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _option;

        options[_option]+=1;
        
        emit Vote(msg.sender, _option);
    }

    function getResult(uint _option) public view returns(uint){

        require(block.timestamp >= timeEnd, "Voting is not finished yet");

        return options[_option];
    }

    function getVote(address _address) public view onlyOwner returns(uint) {

        require(voters[_address].voted, "The account haven't voted yet");

        return voters[_address].vote;
    }

    function setTimeEnd(uint _timeEnd) public onlyOwner {

        timeEnd = _timeEnd;
    }
}
