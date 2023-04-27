import React ,{ useContext, useEffect, useState }from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { getUserDataDetails } from "../../services/user.service"
import JobCard from "./JobCard"

const JobCardList = ({ jobList }) => {
   
    const { providerStatus } = useContext(AuthenticationContext)
    const [applicantData, setapplicantData] = useState({})
    const [renderCard, setrenderCard] = useState({})

    useEffect(() => {
        getUserDataDetails(providerStatus.connectedAccount).then(res => {
            setapplicantData(res)
        }).catch(err => {
        })
    }, [providerStatus.connectedAccount,renderCard])
    const displayJobs = jobList.map((job) => <JobCard key={job._id} {...job} applicantData={applicantData} setrenderCard={setrenderCard} renderCard={renderCard}/>)
    return (
        <div className="Job-card-list">
            {displayJobs}
        </div>
    )
}

export default JobCardList;