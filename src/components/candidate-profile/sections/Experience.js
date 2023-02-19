import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../../../context/authenticationContext'
import { ContractCompaniesContext } from '../../../context/contractCompaniesContext'
import { Title, FlexRow, SelectGroup, InputGroup, Error } from "../../styles/Section.styled"
import ToggleSwitch from '../../ToggleSwitch'
import Select from 'react-select'
import MonthSelect from '../../MonthSelect'
import { NotificationManager } from 'react-notifications'
import { addWorkExperience } from '../../../Web3Client'

function Experience() {
    const { providerStatus } = useContext(AuthenticationContext)
    const { companiesList } = useContext(ContractCompaniesContext)
    const [formData, setFormData] = useState({
        issuingOrganization: "",
        designation: "",
        fromMonth: 1,
        fromYear: 2018,
        toMonth: 7,
        toYear: 2022,
        isCurrentJob: false
    })
    const [error, setError] = useState("")

    const handleChange = (event) => {
        const { type } = event.target
        setFormData(
            prevFormData => ({
                ...prevFormData, [event.target.name]: type === "checkbox" ? event.target.checked : event.target.value
            })
        )
    }

    const validateFormData = () => {
        if (formData.issuingOrganization === "") {
            setError("Please select an institution")
            return false
        } else if (formData.designation === "") {
            setError("Please provide a job title")
            return false
        } else if (formData.fromYear > formData.toYear || (formData.fromYear === formData.toYear && formData.fromMonth > formData.toMonth)) {
            setError("Please provide valid starting and ending dates.")
            return false
        }

        setError("")
        return true
    }

    const handleSubmit = () => {
        if (validateFormData()) {
            addWorkExperience(providerStatus.connectedAccount, formData)
            .then(res => {
                if (!res){
                    NotificationManager.error("Something went wrong", "Transaction failed")
                } else {
                    NotificationManager.success("Work Experience added to Blockchain", "Transaction successful");
                }
            });
        }
    }

    return (
        <div>
            <Title>Professional Experience</Title>
                <Error>
                    { error ? error : null }
                </Error>
                <FlexRow>
                    <InputGroup>
                        <label>Company / Organization (Name - Address)<sup>*</sup></label>
                        <Select 
                            options={companiesList} 
                            onChange={({ value }) => setFormData(prevFormData => ({
                                ...prevFormData, issuingOrganization: value
                            }))}
                        />
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <InputGroup>
                        <label>Designation / Job Title<sup>*</sup></label>
                        <input 
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <InputGroup>
                        <label>From Month<sup>*</sup></label>
                        <MonthSelect 
                            name="fromMonth"
                            handleChange={handleChange}
                            selectedMonth={formData.fromMonth}
                        /> 
                    </InputGroup>
                    <InputGroup>
                        <label>From Year<sup>*</sup></label>
                        <input 
                            type="text"
                            name="fromYear"
                            onChange={handleChange}
                            value={formData.fromYear}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>To Month<sup>*</sup></label>
                        <MonthSelect 
                            name="toMonth"
                            handleChange={handleChange}
                            selectedMonth={formData.toMonth}
                        /> 
                    </InputGroup>
                    <InputGroup>
                        <label>To Year<sup>*</sup></label>
                        <input 
                            type="text"
                            name="toYear"
                            onChange={handleChange}
                            value={formData.toYear}
                        />
                    </InputGroup>
                </FlexRow>
                <FlexRow style={{alignItems: "center", justifyContent: "flex-end"}}>
                <label>Currently working here</label>
                <ToggleSwitch 
                    name="isCurrentJob" 
                    checked={formData.isCurrentJob} 
                    handleChange={handleChange}
                    />
                </FlexRow>
                <FlexRow>
                    <InputGroup>
                        <label>Country<sup>*</sup></label>
                        <input 
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>City<sup>*</sup></label>
                        <input 
                            type="text"
                        />
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <InputGroup>
                        <label>Responsibilities<sup>*</sup></label>
                        <textarea rows="7"></textarea>
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <button type="button" onClick={handleSubmit}>Add</button>
                </FlexRow>
        </div>
    )
}

export default Experience