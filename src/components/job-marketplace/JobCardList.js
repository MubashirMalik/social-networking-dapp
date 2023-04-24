import React ,{ useContext, useEffect, useState }from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { getUserDataDetails } from "../../services/user.service"
import JobCard from "./JobCard"

const JobCardList = ({ jobList }) => {
   
    const { providerStatus } = useContext(AuthenticationContext)
    console.log(providerStatus)
    const [applicantData, setapplicantData] = useState({})
    const [renderCard, setrenderCard] = useState({})

    useEffect(() => {
        getUserDataDetails(providerStatus.connectedAccount).then(res => {
            console.log(res)
            console.log("WE want data")
            setapplicantData(res)
        }).catch(err => {
            console.log(err)
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