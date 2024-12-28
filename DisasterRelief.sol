// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisasterRelief {
    address public owner;
    uint public totalFunds;
    mapping(address => uint) public donations;

    event DonationReceived(address indexed donor, uint amount);
    event FundsWithdrawn(address indexed recipient, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _; // Ensures the function proceeds after the modifier logic
    }

    constructor() {
        owner = msg.sender;  // Setting the owner to the address that deploys the contract
    }

    // Function to donate to the platform
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;
        totalFunds += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    // Function to withdraw funds for relief efforts
    function withdraw(address payable recipient, uint amount) public onlyOwner {
        require(amount <= totalFunds, "Insufficient funds");
        
        // Using 'call' instead of 'transfer' for better gas handling
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");

        totalFunds -= amount;  // Update the total funds after withdrawal
        emit FundsWithdrawn(recipient, amount);
    }

    // Function to check the balance of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
