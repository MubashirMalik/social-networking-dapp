// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract SmartContract {

    struct WorkExperience {
        string designation;
        uint8 fromMonth;
        uint16 fromYear;
        uint8 toMonth;
        uint16 toYear;
        address issuingOrganization;
        bool isVerified;
        bool isPendingVerification;
        bool isRequestRejected;
    }

    struct Certification {
        string name;
        uint8 issueMonth;
        uint16 issueYear;
        uint8 expirationMonth; // 0 if doesn't expire
        uint16 expirationYear; // 0 if doesn't expire
        address issuingOrganization;
        bool isVerified;
        bool isPendingVerification;
        bool isRequestRejected;
    }

    struct Degree {
        string title;
        uint8 fromMonth;
        uint16 fromYear;
        uint8 toMonth;
        uint16 toYear;
        address issuingOrganization;
        bool isVerified;
        bool isPendingVerification;
        bool isRequestRejected;
    }

    struct User {
        string fullName;
        bool isRegistered;
        bool isCompany;
    }

    mapping(address => User) allUsers;
    address[] companyAddresses;
    // Candidate => Degrees
    mapping(address => Degree[]) candidateDegrees;
    // Candidate => Certifications
    mapping(address => Certification[]) candidateCertifications;
    // Candidate => Work Experiences
    mapping(address => WorkExperience[]) candidateWorkExperiences;
    
    // Candidate => Degrees
    mapping(address => Degree[]) companyDegrees;
    // Candidate => Certifications
    mapping(address => Certification[]) companyCertifications;
    // Candidate => Work Experiences
    mapping(address => WorkExperience[]) companyWorkExperiences;


    /** @dev
     * This function is only for demo & should be removed before deployment on mainnet
     */ 
    function boostrap() private {
        string[37] memory names = [
            // 10 Universities Below
            "University of Dubai",
            "American University in Dubai",
            "Zayed University",
            "Dubai Medical College",
            "University of Wollongong in Dubai",
            "Middlesex University Dubai",
            "Manipal University Dubai",
            "Birla Institute of Technology and Science, Pilani - Dubai",
            "Heriot-Watt University Dubai",
            "S P Jain School of Global Management Dubai Campus",
            // 7 Certification Authorities Below
            "Udemy",
            "Coursera",
            "IBM",
            "Microsoft",
            "Google",
            "Bureau Veritas Dubai",
            "TUV SUD Middle East FZE",
            // 30 Job Companies Below
            "Dubai Silicon Oasis Authority",
            "Dubaieye",
            "Dubai Internet City",
            "Tecom Group",
            "Injazat Data Systems",
            "Abu Dhabi Systems and Information Center",
            "Emirates Integrated Telecommunications Company",
            "Du Telecom",
            "Neuways Middle East",
            "Dubai Petroleum",
            "Emirates National Oil Company (ENOC)",
            "Dubai Supply Authority (DUSUP)",
            "Abu Dhabi National Oil Company (ADNOC)",
            "Abu Dhabi Oil Refining Company (TAKREER)",
            "Dubai Natural Gas Company Limited (DUGAS)",
            "Abu Dhabi Gas Industries Limited (GASCO)",
            "Abu Dhabi Gas Liquefaction Company Limited (ADGAS)",
            "Abu Dhabi Oil Refining Company (ADOR)",
            "Dubai Oil Refining Company (DORC)",
            "Emirates Group"
        ];

        address[37] memory addresses = [
            0xbd909b88028445A706eB385FfE86aEd3dc859E63,
            0x720366A18a4aF591710204dC75AD3d67E090a6dB,
            0x579C26abF48abCC4BD12bdEf245CF75264c63cE5,
            0xeD9346917AA7FCA8632162cd8Eabe11090408407,
            0xbA14D5Eb8F38Bf8B69D26328f291d83Bc46a6F92,
            0x498399F29B18aCc904f70B3BD9B49FA3298A43ea,
            0x7eA7F230Fb81a8CBB2cA0acb7B439E0e22C61574,
            0x46fa5aED911ECb05F9b0F0a1097197911E35cedE,
            0xf794E3abFa38A8715C7C73f9aA3fFF9397b2Ab6f,
            0xeBDcC2A8656811D4391E29f38833Eb45aD7435B4,
            0xde630DDA9d8471a6da019Be84aBD67955D4dF737,
            0x6Dd28B0448f52906E54eFCe07e045a2d5235c9dd,
            0xFCcE884577e8141292cf01B6B8151ee58DDF4E89,
            0x27758a77133F3C639b13fCE0E9bfDd761FC63a99,
            0xF2fdBdf4ce705a65499807C06E9b2555b3A246af,
            0x156bb0b8694Bb32613D19213Aa831FA35a7FaED7,
            0xACB971d22bE689af41D3BC951a51d98CfC5f1285,
            0x4dBA88fb1D62434A792b881d1c042260D7560301,
            0xd220Cfe1F00bbeC7D33E7ce3E84a10EA6319DfE8,
            0x74191823CDEc73659852b102EBF3b394361C0400,
            0xd3dD672cb08b363a4418ffACAbb3e296dE51C1fc,
            0xf0B90773e5CE54d5eEd8e466b6b01ca41038e92C,
            0xac708413dc159996C0fd39e6483e339295f7EDdB,
            0x1b37084Eeb880645556034711E04334ccd5e9403,
            0x5DEfb46543fe2ba58299cBb5a7B6caC60eD92598,
            0xF04B734596560878Cb71444b307fb89f24949947,
            0x8740CD5143D3f3CAB4095Bd44901CAB7b6533021,
            0x8828d40bcea1B75cd566c7b4738ece974F202125,
            0x4763aCfD72FB8FeE0AD93c3A1dF5F95B34366Cd1,
            0xeD8c2904d28A41D7ad999E399D0c36E6EcC616cb,
            0xfC0943d3cbfc82b1389e24e1E367f8381c89D4A7,
            0xC1DEd051E5BA5A0D78a97298F7507E3CeE05b5Ef,
            0x1485EfD3069a47c061e8ee4f368d0c281EE5d072,
            0xa13c1497f3A753754eE60D6a8834B4b6a282a702,
            0x0725675C6B734B94b362D48A5374f44985bB6613,
            0x71A519405224F9B4e5798E35aF62F0b7e2862eed,
            0x3DE2bc4E3092eDA25936dBd99B18D765a834a7A6
        ];

        for (uint i = 0; i < 37; i++) {
            companyAddresses.push(addresses[i]);
            allUsers[addresses[i]] = User(names[i], true, true);
        }
    }

    constructor()  { boostrap(); }

    function isRegistered() public view returns (bool) {
        return allUsers[msg.sender].isRegistered;
    }

    // Registers a User with the Smart Contract
    function registerUser(string memory fullName, bool isCompany) public {
        require(
            allUsers[msg.sender].isRegistered == false,
            "Address already registered with an account."
        );

        if(isCompany) {
            companyAddresses.push(msg.sender);
        }
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
            Degree(title, fromMonth, fromYear, toMonth, toYear, issuingOrganization, false, false, false)
        );

        companyDegrees[issuingOrganization].push(
            Degree(title, fromMonth, fromYear, toMonth, toYear, issuingOrganization, false, false, false)
        );
    }

    function addCertification( 
        string memory name,
        uint8 issueMonth,
        uint16 issueYear,
        uint8 expirationMonth,
        uint16 expirationYear,
        address issuingOrganization
    ) public {
        // Only Registered Users Require
        candidateCertifications[msg.sender].push(
            Certification(name, issueMonth, issueYear, expirationMonth, expirationYear, issuingOrganization, false, false, false)
        );

        companyCertifications[issuingOrganization].push(
            Certification(name, issueMonth, issueYear, expirationMonth, expirationYear, issuingOrganization, false, false, false)
        );
    }

    function addWorkExperience( 
        string memory designation,
        uint8 fromMonth,
        uint16 fromYear,
        uint8 toMonth,
        uint16 toYear,
        address issuingOrganization
    ) public {
        // Only Registered Users Require
        candidateWorkExperiences[msg.sender].push(
            WorkExperience(designation, fromMonth, fromYear, toMonth, toYear, issuingOrganization, false, false, false)
        );

        companyWorkExperiences[issuingOrganization].push(
            WorkExperience(designation, fromMonth, fromYear, toMonth, toYear, issuingOrganization, false, false, false)
        );
    }

    function getAllCompanies() public view returns(address[] memory, string[] memory) {
        string[] memory companyNames = new string[](companyAddresses.length);

        for(uint i = 0; i < companyAddresses.length; i++) {
            companyNames[i] = allUsers[companyAddresses[i]].fullName;
        }

        return (companyAddresses, companyNames);
    }

    // Get all data of a user
    function getUserData() public view returns (Degree[] memory, Certification[] memory, WorkExperience[] memory) {
        return (
            candidateDegrees[msg.sender], 
            candidateCertifications[msg.sender], 
            candidateWorkExperiences[msg.sender]
        );
    }

    // Get all data of a company
    function getCompanyData() public view returns (Degree[] memory, Certification[] memory, WorkExperience[] memory) {
        return (
            companyDegrees[msg.sender], 
            companyCertifications[msg.sender], 
            companyWorkExperiences[msg.sender]
        );
    }

    // Request verification from company
    function requestVerification(uint8 id, uint8 tokenType) public { 
        if (tokenType == 1) { // Education

            require(
                candidateDegrees[msg.sender].length > 0,
                "No degrees to verify."
            );

            require(
                candidateDegrees[msg.sender].length > id,
                "Invalid id."
            );

            candidateDegrees[msg.sender][id].isPendingVerification = true;    
        } else if (tokenType == 2) { // Work Experience

            require(
                candidateWorkExperiences[msg.sender].length > 0,
                "No work experiences to verify."
            );

            require(
                candidateWorkExperiences[msg.sender].length > id,
                "Invalid id."
            );

            candidateWorkExperiences[msg.sender][id].isPendingVerification = true;    
        } else { // Certification

            require(
                candidateCertifications[msg.sender].length > 0,
                "No certifications to verify."
            );

            require(
                candidateCertifications[msg.sender].length > id,
                "Invalid id."
            );

            candidateCertifications[msg.sender][id].isPendingVerification = true;    
        }
    }

    function respondToVerificationRequest(uint8 id, uint8 tokenType, bool response) public {
        if (tokenType == 1) { // Education

            require(
                candidateDegrees[msg.sender].length > 0,
                "No degrees to verify."
            );

            require(
                candidateDegrees[msg.sender].length > id,
                "Invalid id."
            );

            candidateDegrees[msg.sender][id].isPendingVerification = false;   
            if (response) { // Update candidate copy
                candidateDegrees[msg.sender][id].isVerified = true;
            } else {
                candidateDegrees[msg.sender][id].isRequestRejected = true; 
                // TODO: Remove from company list 
            }
        } else if (tokenType == 2) { // Work Experience

            require(
                candidateWorkExperiences[msg.sender].length > 0,
                "No work experiences to verify."
            );

            require(
                candidateWorkExperiences[msg.sender].length > id,
                "Invalid id."
            );

            candidateWorkExperiences[msg.sender][id].isPendingVerification = false;
            if (response) {
                candidateWorkExperiences[msg.sender][id].isVerified = true;
            } else {
                candidateWorkExperiences[msg.sender][id].isRequestRejected = true;  
            }    
        } else { // Certification

            require(
                candidateCertifications[msg.sender].length > 0,
                "No certifications to verify."
            );

            require(
                candidateCertifications[msg.sender].length > id,
                "Invalid id."
            );

            candidateCertifications[msg.sender][id].isPendingVerification = false;
            if (response) {
                candidateCertifications[msg.sender][id].isVerified = true;
            } else {
                candidateCertifications[msg.sender][id].isRequestRejected = true;  
            }    
        }
    }
}