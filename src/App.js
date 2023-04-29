import React, {useContext, useEffect, useState} from "react";
import {
	Route,
	Routes, useNavigate
} from "react-router-dom";

import CandidateProfile from "./components/candidate-profile/CandidateProfile";
import JobMarketplace from "./components/job-marketplace/JobMarketplace";
import Navbar from "./components/navbar/Navbar";
import PostJob from "./components/job-marketplace/PostJob"
import {getUser, initWeb3Client, isRegistered} from "./Web3Client";
import { NotificationContainer } from "react-notifications";
import Profile from "./components/profile/Profile";
import { CompanyProfile } from "./components/company-profile/CompanyProfile";
import {ModalsProvider} from "@mantine/modals";
import {MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import Insight from "./components/Insights/Insight";
import Approval from "./components/Approvals/Approval";
import {AuthenticationContext} from "./context/authenticationContext";
import {addressFormatter} from "./util";


export default function App() {
	const  { providerStatus, setProviderStatus } = useContext(AuthenticationContext)
	const navigate = useNavigate();
	const [render,setRender]=useState(true)
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
						connectedAccount: localStorage.getItem("account"),
						message: "Connected wallet: " + addressFormatter(localStorage.getItem("account")),
						badgeColor: "green"
					}))

					isRegistered(localStorage.getItem("account"))
						.then(isRegistered => {

								getUser(localStorage.getItem("account"))
									.then(res => {
										console.log(res)
										if (res) {

											setProviderStatus(prevProviderStatus => ({
												...prevProviderStatus,
												userName: res.fullName,
												isCompany: res.isCompany
											}))

											!res.isCompany ? navigate("/profile") : navigate("/company-profile")
										}
									}).catch(err=>{
									console.log(err)
								})

						})
				})
			});

		} else {
			setProviderStatus(prevProviderStatus => ({...prevProviderStatus, message: "No wallet"}))
		}
	}
	useEffect(() => {

		initWeb3Client().then(()=>{
			if(localStorage.getItem("account")){
				console.log((localStorage.getItem("account")))
				connectWallet()
			}else{

			}
		})

	}, [])






	return (
		<div>

			<MantineProvider withGlobalStyles withNormalizeCSS>
				<ModalsProvider>
					<NotificationsProvider>

							<Navbar />
							<Routes>
								<Route exact path="/account/*" element={<CandidateProfile />} />
								<Route exact path="/" element={<JobMarketplace />} />
								<Route exact path="/job/:jobId" element={<PostJob />} />
								<Route exact path="/profile" element={<Profile />} />
								<Route exact path="/insight" element={<Insight />} />
								<Route exact path="/company-approval" element={<Approval />} />

								{/* <Route path="*" element={ <PageNotFound />}/> */}
								<Route exact path="/company-profile" element={<CompanyProfile />} />
							</Routes>

						<NotificationContainer />
					</NotificationsProvider>
				</ModalsProvider>
			</MantineProvider>

		</div>
	)
}
