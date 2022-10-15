import React from 'react'
import { Title, FlexRow, SelectGroup, InputGroup } from "../../styles/Section.styled"
import ToggleSwitch from '../../ToggleSwitch'

function Experience() {
  return (
    <div>
		<Title>Professional Experience</Title>
            <FlexRow>
                <InputGroup>
                    <label>Company<sup>*</sup></label>
                    <input 
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <label>Designation<sup>*</sup></label>
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
				<InputGroup>
                    <label>Currently working here</label>
                    <ToggleSwitch />
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
                <InputGroup>
                    <label>Responsibilities<sup>*</sup></label>
                    <textarea rows="7"></textarea>
                </InputGroup>
            </FlexRow>
            <FlexRow>
                <button>Update</button>
            </FlexRow>
    </div>
  )
}

export default Experience