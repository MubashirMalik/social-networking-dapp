import Web3 from "web3"
import SmartContractBuild from "./truffle-backend/build/contracts/SmartContract.json"

var web3 = null

let smartContract = null;

export const initWeb3Client = async () => {
    try {
        web3 = new Web3(window.ethereum)
        console.log(web3.eth.net.getId())
        const networkId = await web3.eth.net.getId()
        console.log(networkId)
        smartContract = new web3.eth.Contract(
            SmartContractBuild.abi,
            SmartContractBuild.networks[networkId].address
        )
        console.log(smartContract)
    } catch (e) {
        console.log("Error initializing network: ", e)
    }
}

export const isRegistered =async  (connectedAccount)  => {
    console.log(connectedAccount)
    try {
        console.log(smartContract)
        const res = await smartContract.methods
            .isRegistered()
            .call({ from: connectedAccount })
        console.log(res)
        return res;
    } catch (e) {
        console.log("[Solidity] isRegistered(): ", e)
        return null;
    }
}

export const registerUser = async (fullName, accountType, connectedAccount) => {
    try {
        let isCompany = true
        if (accountType === "Candidate") {
            isCompany = false
        }
        const res = await smartContract.methods
            .registerUser(fullName, isCompany)
            .send({ from: connectedAccount })
        return await res;
    } catch (e) {
        console.log("[Solidity] registerUser(): ", e)
        return null;
    }
}

export const getUser = async (connectedAccount) => {
    if (smartContract === null) {
        return null
    }
    

    try {
        
        const res = await smartContract.methods
            .getUser()
            .call({ from: connectedAccount })
        return  res;
    } catch (e) {
        console.log("[Solidity] getUser(): ", e)
        return null;
    }
}

export const addDegree = async (connectedAccount, formData) => {
    if (smartContract === null) {
        return null
    }

    try {
        const { title, fromMonth, fromYear, toMonth, toYear, issuingOrganization } = formData
        const res = await smartContract.methods
            .addDegree(title, fromMonth, fromYear, toMonth, toYear, issuingOrganization)
            .send({ from: connectedAccount })
        return await res;
    } catch (e) {
        console.log("[Solidity] addDegree(): ", e)
        return null;
    }
}

export const addCertification = async (connectedAccount, formData) => {
    if (smartContract === null) {
        return null
    }

    try {
        let { name, issueMonth, issueYear, expirationMonth, expirationYear, issuingOrganization, hasExpirationDate } = formData

        if (hasExpirationDate) {
            expirationMonth = 0
            expirationYear = 0
        }

        const res = await smartContract.methods
            .addCertification(name, issueMonth, issueYear, expirationMonth, expirationYear, issuingOrganization)
            .send({ from: connectedAccount })
        return await res;
    } catch (e) {
        console.log("[Solidity] addCertification(): ", e)
        return null;
    }
}

export const addWorkExperience = async (connectedAccount, formData) => {
    if (smartContract === null) {
        return null
    }

    try {
        let { designation, fromMonth, fromYear, toMonth, toYear, issuingOrganization, isCurrentJob } = formData

        if (isCurrentJob) {
            toMonth = 0
            toYear = 0
        }

        const res = await smartContract.methods
            .addWorkExperience(designation, fromMonth, fromYear, toMonth, toYear, issuingOrganization)
            .send({ from: connectedAccount })
        return await res;
    } catch (e) {
        console.log("[Solidity] addWorkExperience(): ", e)
        return null;
    }
}

export const getAllCompanies = async () => {

    if (smartContract === null) {
        return null
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const res = await smartContract.methods
            .getAllCompanies()
            .call({ from: accounts[0] })
        return await res;
    } catch (e) {
        console.log("[Solidity] getAllCompanies(): ", e)
        return null;
    }
}

export const getUserData = async (connectedAccount) => {
    if (smartContract === null) {
        return null
    }

    try {
        const res = await smartContract.methods
            .getUserData()
            .call({ from: connectedAccount })
        return await res;
    } catch (e) {
        console.log("[Solidity] getUserData(): ", e)
        return null;
    }
}
