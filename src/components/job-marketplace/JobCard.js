import React from "react"
import { Link } from "react-router-dom"
import { FiEdit } from "react-icons/fi"
import './JobCard.css'
import axios from "axios"
import { showNotification } from "@mantine/notifications"



const JobCard = (props) => {
    const { _id, title, mode, location, engagement, type, posterAddress, applicantData } = props
    const handleApplicantion = () => {
        const data = { 
            jobId:_id,
            posterAddress:posterAddress,
            applicantAddress:applicantData.walletAddress,
            applicantId:applicantData._id,
            status:"Pending"
         }
        console.log(data)
        axios.post('http://localhost:3001/job/create-application', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Appliction successfully!');
                    console.log('Appliction:', response.data);
                    showNotification({
                        color:"green",
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
                    color:"red",
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
                <div className="Job-description">
                    <ul>
                        <li>Leadership Role</li>
                        <li>Attractive Salary & Benefits</li>
                        <li>Opportunity within a company with a solid track record of performance</li>
                    </ul>
                </div>
            </div>
            <div className="Right">
                <div className="Job-match">
                    <div style={{ marginBottom: "5px" }}><b>Skill Match:</b> 90%</div>
                    <Link to={`/job/${_id}`}><FiEdit /> Edit Job</Link>
                </div>
                <button onClick={handleApplicantion}>Apply</button>
            </div>
        </div>
    )
}


export default JobCard;