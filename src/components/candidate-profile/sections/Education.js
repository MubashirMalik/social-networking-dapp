import React, { useContext, useState } from "react"
import { addDegree } from "../../../Web3Client"
import CountrySelect from "../../CountrySelect"
import MonthSelect from "../../MonthSelect"
import { Title, FlexRow, InputGroup, Error } from "../../styles/Section.styled"
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { AuthenticationContext } from "../../../context/authenticationContext"
import { ContractCompaniesContext } from "../../../context/contractCompaniesContext"
import Select from 'react-select'

const Education = () => {
    const { companiesList } = useContext(ContractCompaniesContext)
    const { providerStatus } = useContext(AuthenticationContext)
    const [formData, setFormData] = useState({
        issuingOrganization: "",
        title: "",
        fromMonth: 1,
        fromYear: 2018,
        toMonth: 7,
        toYear: 2022,
    })
    const [error, setError] = useState("")

    const handleChange = (event) => {
        setFormData(
            prevFormData => ({
                ...prevFormData, [event.target.name]: event.target.value
            })
        )
    }

    const validateFormData = () => {
        if (formData.issuingOrganization === "") {
            setError("Please select an institution")
            return false
        } else if (formData.title === "") {
            setError("Please provide a degree/diploma")
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
            addDegree(providerStatus.connectedAccount, formData)
            .then(res => {
                if (!res){
                    NotificationManager.error("Something went wrong", "Transaction failed")
                } else {
                    NotificationManager.success("Education added to Blockchain", "Transaction successful");
                }
            });
        }
    }

    return(
        <div>
            <Title>Education</Title>
            <Error>
                { error ? error : null }
            </Error>
            <FlexRow>
                <InputGroup>
                    <label>Institution (Name - Address)<sup>*</sup></label>
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
                    <label>Degree/Diploma<sup>*</sup></label>
                    <input 
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
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
            <FlexRow>
                <InputGroup>
                    <label>Country<sup>*</sup></label>
                    <CountrySelect 
                        handleChange={handleChange}
                        selectedCountry={formData.country}
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>City<sup>*</sup></label>
                    <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <button type="button" onClick={handleSubmit}>Add</button>
            </FlexRow>
        </div>
    )
}

export default Education;