import axios from "axios";
const BASE_URL = "http://localhost:3001/user/"
const BASE_URL_RESUME = 'http://127.0.0.1:8000'

export const registerUserToDatabase = async (walletAddress) => {
    try {
        const url = BASE_URL + "register"
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress })
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in registerUser():", err);
    }
}

export const getUserDetails = async (walletAddress) => {
    try {
        const url = BASE_URL + `get-user-details?walletAddress=${walletAddress}`
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getUserDetails():", err);
    }
}

export const updateUserDetails = async (user) => {
    try {
        const url = BASE_URL + "update-user-details"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in updateUserDetails():", err);
    }
}
export const getResumeData = async (payload) => {
    const axiosObject = axios.create({
        baseURL: BASE_URL_RESUME,
        timeout: 20000,
       
        method: "POST"
    });
    return axiosObject.post("/parse", payload);
}
export const postUserPic = async (form,walletAddress) => {
    const axiosObject = axios.create({
        baseURL: BASE_URL+"save-user-pic?walletAddress="+walletAddress,
        timeout: 20000,
        contentType:"multipart/form-data",
        method: "POST"
    });
    return axiosObject.post("", form);
}

export const getUserDataDetails = async (walletAddress) => {
    try {
        const url = BASE_URL + `/get-user-data?walletAddress=${walletAddress}`
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getUserDetails():", err);
    }
}

export const getUserExperienceDetails = async (walletAddress) => {
    try {
        const url = BASE_URL + `/get-user-experience?walletAddress=${walletAddress}`
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getUserDetails():", err);
    }
}

