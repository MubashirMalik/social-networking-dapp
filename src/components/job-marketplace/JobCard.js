import React from "react"
import { Link } from "react-router-dom"
import { FiEdit } from "react-icons/fi"
import './JobCard.css'
import axios from "axios"
import { showNotification } from "@mantine/notifications"
import { useContext } from "react"
import { ResumeContext } from "../../context/resumeContext"
import {Button, Tooltip} from "@mantine/core";
import {AuthenticationContext} from "../../context/authenticationContext";



const JobCard = (props) => {
    const { _id, title, mode, location, description, engagement, type, posterAddress, applicantData } = props
    const context = useContext(ResumeContext)
    const { providerStatus } = useContext(AuthenticationContext)
    const handleApplication = () => {
        const data = {
            jobId: _id,
            posterAddress: posterAddress,
            applicantAddress: applicantData.walletAddress,
            applicantId: applicantData._id,
            status: "Pending"
        }
        console.log(data)

        var ranking = 0

        if (context.resumeRankingKeywords.length === 0) {
            showNotification({
                color: "Red",
                title: 'Resume Not Found',
                message: "Kindly Upload resume in Edit Profile to Rank your Application",
            })
        } else {
            context.resumeRankingKeywords.map(keyword => {
                if (keyword) {
                    const regex = new RegExp(`\\b${keyword?.toLowerCase()}\\b`, "gi"); // create a regular expression to match whole words only
                    const found = description.toLowerCase().match(regex);

                    if (found) {
                        ranking = ranking + 0.5
                    }

                }


            })
        }

        const rankingPayload = {
            "walletAddress": { "walletAddress": applicantData.walletAddress },
            "updateValue": { "ranking": ranking }
        }

        axios.put("http://localhost:3001/user/update-user", rankingPayload).then((response) => {

            showNotification({
                color: "green",
                title: 'Appliction Ranking',
                message: "Appliction Ranked Successfully",
            })
        }).catch((err) => {
            showNotification({
                color: "red",
                title: 'Appliction Ranking',
                message: "Appliction Ranked Unsuccessfully",
            })
        })


        axios.post('http://localhost:3001/job/create-application', data)
            .then(response => {



                if (response.status === 200) {






                    showNotification({
                        color: "green",
                        title: 'Appliction Submission',
                        message: "Appliction Submitted Successfully",
                    })

                } else {
                    console.error('Failed to create Application:', response.statusText);
                }
            })
            .catch(error => {
                console.log(error)
                showNotification({
                    color: "red",
                    title: 'Application Submission not Successfull',
                    message: JSON.stringify(error.response.data),
                })
                console.error('Error Submitting Application:', error);
            });
    }
    return (
        <div className="Job-card">
            <div className="Left">
                <div className="Job-details-row">
                    <div className="Job-mode Tiny-label" style={{ backgroundColor: `var(--job-mode-${mode.toLowerCase()})` }}>{mode.toUpperCase()}</div>
                    <div className="Job-location">
                        {location.city + ", " + location.country}</div>
                </div>
                <h2 className="Job-title">{title}</h2>
                <div className="Job-details-row">
                    <div className="Job-engagement Tiny-label">{engagement.toUpperCase()}</div>
                    <div className="Job-type Tiny-label">
                        {type.toUpperCase()}
                    </div>
                </div>
                <div className="Job-description"
                    style={{ textAlign: 'justify', marginTop: '10px' }}
                >
                    {description}
                </div>
            </div>
            <div className="Right">
                <div className="Job-match">
                    <div style={{ marginBottom: "5px" }}><b>Skill Match:</b> 90%</div>
                    <Link to={`/job/${_id}`}><FiEdit /> Edit Job</Link>
                </div>

                    <Button
                        disabled={providerStatus.isCompany?true:false}
                        style={{backgroundColor:providerStatus.isCompany?null:"#1cc7d0"}} onClick={handleApplication}>Apply</Button>


            </div>
        </div>
    )
}


export default JobCard;