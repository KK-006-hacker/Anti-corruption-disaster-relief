// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisasterRelief {
    address public owner;
    mapping(address => uint256) public donations;

    event DonationReceived(address donor, uint256 amount);
    event FundsWithdrawn(address recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        donations[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function withdrawFunds(address payable recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(address(this).balance >= amount, "Insufficient contract balance");
        recipient.transfer(amount);
        emit FundsWithdrawn(recipient, amount);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
