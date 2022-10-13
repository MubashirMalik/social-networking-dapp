import React from "react";
import {
	Route,
	Routes
 } from "react-router-dom";
import CandidateProfile from "./components/candidate-profile/CandidateProfile";
import JobMarketplace from "./components/job-marketplace/JobMarketplace";
import Navbar from "./components/navbar/Navbar";

export default function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route exact path="/account" element={<CandidateProfile />} />
				<Route exact path="/" element={<JobMarketplace />} />
				{/* <Route path="*" element={ <PageNotFound />}/> */}
			</Routes>
    	</div>
  )
}
