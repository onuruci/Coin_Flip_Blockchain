// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFlip is Ownable {
    uint public houseEdge;
    uint public houseBalance;
    address payable public houseHolder;
    mapping (address => uint) public balance;

    event balanceChanged(address sender, uint newBalance);

    constructor() {
        houseEdge = 5;
        houseHolder = payable(msg.sender);
    }

    // Functions for balance handling and viewing
    // Lets user to add balance into their account

    function addBalance() public payable {
        require(msg.value >= 0.1 ether, "You should send at least 0.1 ether");
        balance[msg.sender] += (msg.value * (100 - houseEdge)) / 100;
        houseBalance += (msg.value * houseEdge) / 100;
        emit balanceChanged(msg.sender, balance[msg.sender]);
    }

    // Returns all the value stored in contract

    function getContractBalance() public onlyOwner view returns (uint) {
        return address(this).balance;
    }

    // Returns player balance

    function getPlayerBalance() public view returns(uint) {
        return balance[msg.sender];
    }

    // CHanges House Holder

    function changeHouseHolder(address payable _newHolder) public onlyOwner {
        houseHolder = _newHolder;
    }



    //Changes House Edge

    function changeHouseEdge(uint _newEdge) public onlyOwner {
        require(_newEdge < 90);
        houseEdge = _newEdge;
    }



    //Gameplay functionality

    function play(uint _guess, uint _amount) public returns(uint) {
        require(_guess == 1 || _guess == 0, "Your guess should be 0 or 1");
        require(balance[msg.sender] >= 10 ** 13, "You dont have enough ether to play");
        require(_amount >= 100000000000000000, "You should at least play with 0.1 ether");
        require(balance[msg.sender] >= _amount, "You dont have this much of ether");

        //Generates a random value this is poorly coded
        uint _res = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, [0,1]))) % 2;
        
        //Checks if player's guess is true
        //Handles the logic based on the result
        if(_res == _guess){
            balance[msg.sender] += _amount;
        } else {
            houseBalance += _amount;
            balance[msg.sender] -= _amount;
        }

        //Sends new balance
        emit balanceChanged(msg.sender, balance[msg.sender]);
        return _res;
    }




    // Withdrawal functions

    function withdrawPlayerBalance(bool _all, uint _amount) public payable {
        require(balance[msg.sender] > 0);
        if(_all){
            require(address(this).balance - houseBalance >= balance[msg.sender], "We don't have enough ether to pay you back :). This will be fixed in short time.");
            payable(address(msg.sender)).transfer(balance[msg.sender]);
            balance[msg.sender] = 0;
        } else {
            require(balance[msg.sender] >= _amount, "You dont have this much of ether on you balance");
            payable(address(msg.sender)).transfer(_amount);
            balance[msg.sender] = balance[msg.sender] - _amount;
        }
        emit balanceChanged(msg.sender, balance[msg.sender]);
    }


    function withdrawHouseBalance() public onlyOwner payable {
        houseHolder.transfer(houseBalance);
        houseBalance = 0;
    }
}
