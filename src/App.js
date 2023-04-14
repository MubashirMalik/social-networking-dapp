import React, { useEffect } from "react";
import {
	Route,
	Routes
} from "react-router-dom";

import CandidateProfile from "./components/candidate-profile/CandidateProfile";
import JobMarketplace from "./components/job-marketplace/JobMarketplace";
import Navbar from "./components/navbar/Navbar";
import PostJob from "./components/job-marketplace/PostJob"
import { initWeb3Client } from "./Web3Client";
import { NotificationContainer } from "react-notifications";
import Profile from "./components/profile/Profile";
import { CompanyProfile } from "./components/company-profile/CompanyProfile";

export default function App() {
	useEffect(() => {
		void initWeb3Client()
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
