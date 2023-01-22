import React, { useState, useEffect } from 'react';
import { addressFormatter } from "../util";

const AuthenticationContext = React.createContext() 

function AuthenticationContextProvider(props) {
    const [providerStatus, setProviderStatus] = useState({
        message: "Detecting provider",
        connectedAccount: "",
        badgeColor: "red"
    })

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum._metamask.isUnlocked().then(isUnlocked => {
                if (isUnlocked === false) {
                    setProviderStatus(prevProviderStatus => ({
                        ...prevProviderStatus, 
                        message: "Locked account",
                        badgeColor: "yellow"
                    }))
                } else if (isUnlocked === true) {
                    // window.ethereum.request({
                    //     method: 'eth_requestAccounts'
                    // }).then(accounts => {
                    //     console.log("Account connected:", accounts)
                    //     setProviderStatus(prevProviderStatus => ({
                    //         ...prevProviderStatus, 
                    //         connectedAccount: accounts[0],
                    //         message: "Connected wallet: " + addressFormatter(accounts[0]),
                    //         badgeColor: "green" 
                    //     }))
                    // })
                }
                console.log("Account Unlocked:", isUnlocked)
            });

        } else {
            setProviderStatus(prevProviderStatus => ({...prevProviderStatus, message: "No wallet"}))
        }
    }, [])

    return (
        <AuthenticationContext.Provider value={{ providerStatus, setProviderStatus }}>
            { props.children }
        </AuthenticationContext.Provider>
    )
}

export { AuthenticationContext, AuthenticationContextProvider}