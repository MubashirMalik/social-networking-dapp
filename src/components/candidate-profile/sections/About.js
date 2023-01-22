import React, { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from "../../../context/authenticationContext"
import { getUser } from "../../../Web3Client"
import { Title, Subtitle, FlexRow, InputGroup } from "../../styles/Section.styled"

const About = () => {
    const { providerStatus } = useContext(AuthenticationContext)
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        getUser(providerStatus.connectedAccount)
        .then(res => {
            if (res) {
                setFullName(res[0])
            }
        })
    }, [])

    return(
        <div>
            <Title>Hi, Tell us more about yourself</Title>
            <FlexRow>
                <InputGroup style={{ width: "150px" }}>
                    <label>Title<sup>*</sup></label>
                    <select>
                        <option>Mr.</option>
                        <option>Ms.</option>       
                    </select> 
                </InputGroup>
                <InputGroup>
                    <label>Full name<sup>*</sup></label>
                    <input 
                        type="text"
                        disabled
                        value={fullName}
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
                <button>Update</button>
            </FlexRow>
        </div>
    )
}

export default About;