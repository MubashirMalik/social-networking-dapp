import React from "react"
import { Title, Subtitle, FlexRow, InputGroup } from "../../styles/Section.styled"

const About = () => {
    return(
        <div>
            <Title>Hi Mubashir Tell us more about yourself</Title>
            <FlexRow>
                <InputGroup>
                    <label>Title<sup>*</sup></label>
                    <select>
                        <option>Mr.</option>
                        <option>Ms.</option>       
                    </select> 
                </InputGroup>
                <InputGroup>
                    <label>First name<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Last name<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <InputGroup>
                    <label>Where do you live?<sup>*</sup></label>
                    <input 
                        type="text"
                        placeholder="Country"
                    /> 
                </InputGroup>
                <InputGroup>
                    <label>City</label>
                    <input 
                        type="text"
                        placeholder="City"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Your Nationality<sup>*</sup></label>
                    <input 
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
                <button>Update</button>
            </FlexRow>
        </div>
    )
}

export default About;