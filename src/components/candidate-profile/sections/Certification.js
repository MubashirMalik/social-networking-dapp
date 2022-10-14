import React from 'react'
import { Title, FlexRow, InputGroup, SelectGroup } from '../../styles/Section.styled'

function Certification() {
  	return (
		<div>
			<Title>Licenses & Certifications</Title>
			<FlexRow>
                <InputGroup>
                    <label>Name<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Issuing Organization<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
            </FlexRow>
			<FlexRow>
                <InputGroup>
                    <label>From<sup>*</sup></label>
					<SelectGroup>
						<select>
							<option>Aug</option>
							<option>Sep</option>       
						</select>
						<select>
							<option>2018</option>
							<option>2019</option>       
						</select>
					</SelectGroup>
                </InputGroup>
                <InputGroup>
                    <label>Till<sup>*</sup></label>
                    <SelectGroup>
						<select>
							<option>Aug</option>
							<option>Sep</option>       
						</select>
						<select>
							<option>2018</option>
							<option>2019</option>       
						</select>
					</SelectGroup>
                </InputGroup>
            </FlexRow>
			<FlexRow>
                <InputGroup>
                    <label>Credential ID<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
            </FlexRow>
    	</div>
  )
}

export default Certification