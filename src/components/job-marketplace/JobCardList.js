import React from "react"
import JobCard from "./JobCard"

const JobCardList = () => {

    const data = [
        {
            title: "Frontend Engineer - Blockchain",
            location: {
                country: "Singapore"
            },
            type:"PERMANENT",
            engagement: "FULL-TIME",
            mode: "REMOTE"
        },
        {
            title: "Associate Software Engineer",
            location: {
                country: "Islamabad/Lahore, Pakistan"
            },
            type:"CONTRACT",
            engagement: "PART-TIME",
            mode: "HYBRID"
        },
        {
            title: "Associate Software Engineer",
            location: {
                country: "Islamabad/Lahore, Pakistan"
            },
            type:"CONTRACT",
            engagement: "PART-TIME",
            mode: "HYBRID"
        }
    ]

    const displayJobs = data.map((job) => {
        return (
            <JobCard 
                title={job.title}
                mode={job.mode}
                location={job.location}
                engagement={job.engagement}
                type={job.type}
                description={job.description}
            />
        )
    })


    return (
        <div className="Job-card-list">
            {displayJobs}
        </div>
    )
}

export default JobCardList;