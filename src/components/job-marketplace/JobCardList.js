import React, { useState, useEffect } from "react"
import { getJobs } from "../../services/job.service"
import JobCard from "./JobCard"

const JobCardList = () => {
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        getJobs()
        .then(res => {
            if (!res){
                console.log("Something went wrong")
            } else{
                setJobList(res);
            }
        });
    }, [])

    const displayJobs = jobList.map((job) => <JobCard key={job._id} {...job} />)

    return (
        <div className="Job-card-list">
            {displayJobs}
        </div>
    )
}

export default JobCardList;