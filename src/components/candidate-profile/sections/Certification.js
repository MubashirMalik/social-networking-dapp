import React, { useContext, useState } from 'react'
import { ContractCompaniesContext } from '../../../context/contractCompaniesContext'
import MonthSelect from '../../MonthSelect'
import { Title, FlexRow, InputGroup, Error } from '../../styles/Section.styled'
import ToggleSwitch from "../../ToggleSwitch"
import Select from 'react-select'
import { addCertification } from '../../../Web3Client'
import { NotificationManager } from 'react-notifications'
import { AuthenticationContext } from '../../../context/authenticationContext'

function Certification() {
    const { providerStatus } = useContext(AuthenticationContext)
    const { companiesList } = useContext(ContractCompaniesContext)
    const [formData, setFormData] = useState({
        issuingOrganization: "",
        name: "",
        issueMonth: 1,
        issueYear: 2018,
        expirationMonth: 7,
        expirationYear: 2022,
        hasExpirationDate: false
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
        } else if (formData.name === "") {
            setError("Please provide a name")
            return false
        } else if (formData.issueYear > formData.expirationYear || (formData.issueYear === formData.expirationYear && formData.issueMonth > formData.expirationMonth)) {
            setError("Please provide valid starting and ending dates.")
            return false
        } 

        setError("")
        return true
    }

    const handleSubmit = () => {
        if (validateFormData()) {
            addCertification(providerStatus.connectedAccount, formData)
            .then(res => {
                if (!res){
                    NotificationManager.error("Something went wrong", "Transaction failed")
                } else {
                    NotificationManager.success("Certification added to Blockchain", "Transaction successful");
                }
            });
        }
    }

  	return (
		<div>
			<Title>Licenses & Certifications</Title>
            <Error>
                { error ? error : null }
            </Error>
            <FlexRow>
                <InputGroup>
                    <label>Issuing Organization (Name - Address)<sup>*</sup></label>
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
                    <label>Name<sup>*</sup></label>
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Issue Month<sup>*</sup></label>
                    <MonthSelect 
                        name="issueMonth"
                        handleChange={handleChange}
                        selectedMonth={formData.issueMonth}
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>Issue Year<sup>*</sup></label>
                    <input 
                        type="text"
                        name="issueYear"
                        onChange={handleChange}
                        value={formData.issueYear}
                    />
                </InputGroup>
                <InputGroup>
                    <label>Expiration Month<sup>*</sup></label>
                    <MonthSelect 
                        name="expirationMonth"
                        handleChange={handleChange}
                        selectedMonth={formData.expirationMonth}
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>Expiration Year<sup>*</sup></label>
                    <input 
                        type="text"
                        name="expirationYear"
                        onChange={handleChange}
                        value={formData.expirationYear}
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow style={{alignItems: "center", justifyContent: "flex-end"}}>
                <label>The certification doesn't expire</label>
                <ToggleSwitch 
                    name="hasExpirationDate" 
                    checked={formData.hasExpirationDate} 
                    handleChange={handleChange}
                    />
            </FlexRow>
			{/* <FlexRow>
                <InputGroup>
                    <label>Credential ID<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
            </FlexRow> */}
            <FlexRow>
                <button type="button" onClick={handleSubmit}>Add</button>
            </FlexRow>
    	</div>
  )
}

export default Certification