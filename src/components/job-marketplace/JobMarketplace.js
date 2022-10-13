import React from "react"
import JobCardList from "./JobCardList";
import SearchAccordion from "./SearchAccordion"
import './JobMarketplace.css'

const JobMarketplace = () => {

    return(
        <div className="Job-marketplace">
            <SearchAccordion />
            <JobCardList />
        </div>
    )
}



export default JobMarketplace;