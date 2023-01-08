import Web3 from "web3"
import SmartContractBuild from "contracts/SmartContract.json"

const web3 = new Web3(window.ethereum)

let smartContract;

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