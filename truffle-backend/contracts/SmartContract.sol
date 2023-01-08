// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartContract {

    struct User {
        string fullName;
        bool isRegistered;
    }

    mapping(address => User) allUsers;

    
    function isRegistered() public view returns (bool) {
        return allUsers[msg.sender].isRegistered;
    }

    // Registers a User with the Smart Contract
    function registerUser(string memory fullName) public {
        require(
            allUsers[msg.sender].isRegistered == false,
            "Address already registered with an account."
        );
        allUsers[msg.sender] = User(fullName, true);
    }
}