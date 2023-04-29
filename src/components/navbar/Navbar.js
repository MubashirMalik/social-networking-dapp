import React, {useContext, useEffect, useState} from "react";
import { MdWork } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { addressFormatter } from "../../util";
import { FaUserEdit } from "react-icons/fa";
import { AuthenticationContext } from "../../context/authenticationContext";
import { getUser, isRegistered } from "../../Web3Client";
import RegistrationPopup from "../RegistrationPopup";

import './Navbar.css'
import {Logout} from "tabler-icons-react";

function Navbar() {
    const [isOpenModal, setIsOpenModal] = useState(false);
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

                    isRegistered(accounts[0])
                    .then(isRegistered => {
                        if (isRegistered !== null  && isRegistered === false) {
                            setIsOpenModal(true)
                        } else {
                            getUser(accounts[0])
                            .then(res => {
                                if (res) {

                                    setProviderStatus(prevProviderStatus => ({
                                        ...prevProviderStatus,
                                        userName: res.fullName,
                                        isCompany: res.isCompany
                                    }))
                                    localStorage.setItem("account",accounts[0])
                                    !res.isCompany ? navigate("/profile") : navigate("/company-profile")
                                }
                            }).catch(err=>{
                                console.log(err)
                            })
                        }
                    })
                })
            });

        } else {
            setProviderStatus(prevProviderStatus => ({...prevProviderStatus, message: "No wallet"}))
        }
    }
   console.log(providerStatus)

    return(
        <>
        <RegistrationPopup isOpenModal={isOpenModal} handleClose={() => setIsOpenModal(false)} />
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
                {
                    providerStatus.isCompany &&
                    <button onClick={() => navigate("/job/0")}>
                        Post a Job
                    </button>
                }
                <button onClick={() => navigate("/")}>Jobs<MdWork /></button>
                { providerStatus.connectedAccount === "" ? 
                    <button onClick={connectWallet}>Connect</button> :
                    <>
                        { !providerStatus.isCompany ?
                            <>
                                <button onClick={() => navigate("/account/about")}>Edit Profile <FaUserEdit /></button>
                                <button onClick={() => navigate("/profile")}>View Profile</button>
                                <button onClick={() => {

                                    localStorage.setItem("account","")
                                    setProviderStatus({
                                        message: "Detecting provider",
                                        connectedAccount: "",
                                        badgeColor: "red",
                                        userName: "",
                                        isCompany: false
                                    })
                                    navigate("/")



                                }


                                }><Logout
                                    size={48}
                                    strokeWidth={2}
                                    color={'white'}
                                /></button>

                            </>
                            :
                            <><button onClick={() => navigate("/insight")}>Insight</button>
                                <button onClick={() => navigate("/company-profile")}>View Profile</button>
                                <button onClick={() => navigate("/company-approval")}>Approvals</button>

                                <button onClick={() => {


                                    localStorage.setItem("account","")
                                    setProviderStatus({
                                        message: "Detecting provider",
                                        connectedAccount: "",
                                        badgeColor: "red",
                                        userName: "",
                                        isCompany: false
                                    })
                                    navigate("/")

                                }}><Logout
                                    size={48}
                                    strokeWidth={2}
                                    color={'white'}
                                /></button>
                            </>

                        }
                    </>
                }
            </div>
        </div>
        </>
    )
}

export default Navbar;