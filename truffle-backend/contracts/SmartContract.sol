// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartContract {

    struct Degree {
        string title;
        uint8 fromMonth;
        uint16 fromYear;
        uint8 toMonth;
        uint16 toYear;
        address issuingOrganization;
        bool isVerified;
    }

    struct User {
        string fullName;
        bool isRegistered;
        bool isCompany;
    }

    mapping(address => User) allUsers;
    // Candidate => Degrees
    mapping(address => Degree[]) candidateDegrees;

    function isRegistered() public view returns (bool) {
        return allUsers[msg.sender].isRegistered;
    }

    // Registers a User with the Smart Contract
    function registerUser(string memory fullName, bool isCompany) public {
        require(
            allUsers[msg.sender].isRegistered == false,
            "Address already registered with an account."
        );
        allUsers[msg.sender] = User(fullName, true, isCompany);
    }
    
    function getUser() public view returns (User memory) {
        return allUsers[msg.sender];
    }

    function addDegree( 
        string memory title,
        uint8 fromMonth,
        uint16 fromYear,
        uint8 toMonth,
        uint16 toYear,
        address issuingOrganization
    ) public {
        // Only Registered Users Require
        candidateDegrees[msg.sender].push(
            Degree(title, fromMonth, fromYear, toMonth, toYear, issuingOrganization, false)
        );
    }
}