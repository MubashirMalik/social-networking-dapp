import React from "react";
import {
	Route,
	Routes
 } from "react-router-dom";

import JobMarketplace from "./components/job-marketplace/JobMarketplace";
import Navbar from "./components/navbar/Navbar";

export default function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<JobMarketplace />} />
				{/* <Route exact path="/edit-profile" element={<EmployeeProfile />} /> */}
				{/* <Route path="*" element={ <PageNotFound />}/> */}
			</Routes>
    	</div>
  )
}
