import React, {useContext, useEffect, useState} from "react"
import { AuthenticationContext } from "../../../context/authenticationContext"
import { Title, Subtitle, FlexRow, InputGroup } from "../../styles/Section.styled"
import {getUserDetails, updateUserDetails} from "../../../services/user.service";
import {NotificationManager} from "react-notifications";

const About = () => {
    const { providerStatus } = useContext(AuthenticationContext)
    const [formData, setFormData] = useState({
        headline: "",
        bio: ""
    })

    useEffect(() => {
        getUserDetails(providerStatus.connectedAccount)
        .then(res => {
            if (res) {
                setFormData(res)
            }
        })
    }, [providerStatus.connectedAccount])
    const handleChange = (event) => {
        const { type } = event.target
        setFormData(
            prevFormData => ({
                ...prevFormData, [event.target.name]: type === "checkbox" ? event.target.checked : event.target.value
            })
        )
    }

    const handleSubmit = () => {
        updateUserDetails({ ...formData, walletAddress: providerStatus.connectedAccount })
        .then(res => {
            if (!res){
                NotificationManager.error("Something went wrong", "Error")
            } else {
                NotificationManager.success("Data updated successfully", "Success");
            }
        })
    }

    return(
        <div>
            <Title>Hi, Tell us more about yourself</Title>
            <FlexRow>
                <InputGroup>
                    <label>Headline<sup>*</sup></label>
                    <input 
                        name="headline"
                        value={formData.headline}
                        onChange={handleChange}
                        type="text"
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>Full name<sup>*</sup></label>
                    <input 
                        type="text"
                        disabled
                        value={providerStatus.userName}
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Where do you live?<sup>*</sup></label>
                    <input 
                        name="country"
                        type="text"
                        placeholder="Country"
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>City</label>
                    <input 
                        name="city"
                        type="text"
                        placeholder="City"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Your Nationality<sup>*</sup></label>
                    <input 
                        name="nationality"
                        type="text"
                    />
                </InputGroup>
            </FlexRow>
            <Subtitle>Add your social profiles so employers can see them when you apply</Subtitle>
            <FlexRow>
                <InputGroup>
                    <label>LinkedIn</label>
                    <input 
                        type="text"
                    /> 
                </InputGroup>
            </FlexRow>
            <FlexRow>
            <InputGroup>
                    <label>GitHub</label>
                    <input 
                        type="text"
                    /> 
                </InputGroup>
               
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Your Website/Portfolio</label>
                    <input 
                        type="text"
                    /> 
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Your Address</label>
                    <input 
                        type="text"
                        disabled
                        value={providerStatus.connectedAccount}
                    /> 
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Bio<sup>*</sup></label>
                    <textarea 
                        rows="7" 
                        onChange={handleChange}
                        name="bio"
                        value={formData.bio}    
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <button onClick={handleSubmit}>Update</button>
            </FlexRow>
        </div>
    )
}

export default About;