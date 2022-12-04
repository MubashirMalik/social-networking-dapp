import React from "react"
import { Title, FlexRow, InputGroup } from "../../styles/Section.styled"

const Education = () => {
    return(
        <div>
            <Title>Education</Title>
            <FlexRow>
                <InputGroup>
                    <label>Institution Name<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Degree/Diploma<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <label>From<sup>*</sup></label>
                    <select>
                        <option>2018</option>
                        <option>2019</option>       
                    </select>
                </InputGroup>
                <InputGroup>
                    <label>To<sup>*</sup></label>
                    <select>
                        <option>2018</option>
                        <option>2019</option>       
                    </select>
                </InputGroup>
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
                <button>Update</button>
            </FlexRow>
        </div>
    )
}



export default Education;