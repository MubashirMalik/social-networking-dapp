import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { addressFormatter } from "../../util";
import { FaUserEdit } from "react-icons/fa";
import './Navbar.css'

function Navbar() {
    const [providerStatus, setProviderStatus] = useState({
        message: "",
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
                }

                console.log("Account locked:", isUnlocked)

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
    }, [])

    return(
        <div className="Navbar">
            <div className="Navbar-start">
                <div className="Logo-text">Indeed</div>
                <div className="Provider-status">
                    <div 
                        className="badge" 
                        style={{ 
                            backgroundColor: `var(--badge-light-${providerStatus.badgeColor})`,
                            boxShadow: `inset 0 0 0 0.2rem var(--badge-${providerStatus.badgeColor})` 
                        }}
                    >
                    </div>
                    <div className="message">{ providerStatus.message }</div>
                </div>
            </div>
            <div className="Navbar-end">
                <ul >
                    <li><Link to="/">Jobs</Link></li>
                    <li>Another Link</li>
                    <li style={{display: "flex", marginLeft: "30px", alignItems: "center", columnGap: "5px"}}> 
                        <Link to="/account">Account <FaUserEdit /></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;