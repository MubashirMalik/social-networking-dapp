import React from "react"
import JobCard from "./JobCard"

const JobCardList = ({jobList}) => {
    const displayJobs = jobList.map((job) => <JobCard key={job._id} {...job} />)

    return (
        <div className="Job-card-list">
            {displayJobs}
        </div>
    )
}

export default JobCardList;