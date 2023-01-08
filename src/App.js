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

export default function App() {
    useEffect(() => {
        initWeb3Client()
    }, [])

	return (
		<div>
			<Navbar />
			<Routes>
				<Route exact path="/account/*" element={<CandidateProfile />} />
				<Route exact path="/" element={<JobMarketplace />} />
                <Route exact path="/job/:jobId" element={<PostJob /> } />
				{/* <Route path="*" element={ <PageNotFound />}/> */}
			</Routes>
    	</div>
  )
}
