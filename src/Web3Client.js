import Web3 from "web3"
import SmartContractBuild from "contracts/SmartContract.json"

const web3 = new Web3(window.ethereum)

let smartContract = null;

export const initWeb3Client = async () => {
    try {
        const networkId = await web3.eth.net.getId()
        smartContract = await new web3.eth.Contract(
            SmartContractBuild.abi, 
            SmartContractBuild.networks[networkId].address
        )
    } catch (e) {
        console.log("Error initializing network: ", e)
    }
}

export const isRegistered = async (connectedAccount) => {
    try {
        const res = await smartContract.methods
        .isRegistered()
        .call({ from: connectedAccount })
        return await res;
    }  catch (e) {
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
    }  catch (e) {
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
        return await res;
    }  catch (e) {
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
    }  catch (e) {
        console.log("[Solidity] addDegree(): ", e)
        return null;
    }
}