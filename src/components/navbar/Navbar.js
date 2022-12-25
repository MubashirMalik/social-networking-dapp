import React, { useContext } from "react";
import { MdWork } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { addressFormatter } from "../../util";
import { FaUserEdit } from "react-icons/fa";
import { AuthenticationContext } from "../../context/authenticationContext";

import './Navbar.css'

function Navbar() {
    const navigate = useNavigate();
    const  { providerStatus, setProviderStatus } = useContext(AuthenticationContext)

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum._metamask.isUnlocked().then(isUnlocked => {
                if (isUnlocked === false) {
                    setProviderStatus(prevProviderStatus => ({
                        ...prevProviderStatus, 
                        message: "Locked account",
                        badgeColor: "yellow"
                    }))
                }

                console.log("Account Unlocked:", isUnlocked)

                window.ethereum.request({
                    method: 'eth_requestAccounts'
                }).then(accounts => {
                    console.log("Account connected:", accounts)
                    setProviderStatus(prevProviderStatus => ({
                        ...prevProviderStatus, 
                        connectedAccount: accounts[0],
                        message: "Connected wallet: " + addressFormatter(accounts[0]),
                        badgeColor: "green" 
                    }))
                })
            });

        } else {
            setProviderStatus(prevProviderStatus => ({...prevProviderStatus, message: "No wallet"}))
        }
    }

    return(
        <div className="Navbar">
            <div className="Navbar-start">
                <div className="Logo-text">{"{app_name}"}</div>
                <div className="Provider-status">
                    <div 
                        className="badge" 
                        style={{ 
                            backgroundColor: `var(--badge-light-${providerStatus.badgeColor})`,
                            boxShadow: `inset 0 0 0 2px var(--badge-${providerStatus.badgeColor})` 
                        }}
                    >
                    </div>
                    <div className="Provider-message">{ providerStatus.message }</div>
                </div>
            </div>
            <div className="Navbar-end">
                <button onClick={() => navigate("/job/0")}>
                    Post a Job
                </button>
                <button onClick={() => navigate("/")}>Jobs<MdWork /></button>
                { providerStatus.connectedAccount === "" ? 
                    <button onClick={connectWallet}>Connect</button> :
                    <button onClick={() => navigate("/account/about")}>Account <FaUserEdit /></button>
                }
            </div>
        </div>
    )
}

export default Navbar;