import React from 'react'
import { Title, FlexRow, InputGroup, SkillItem } from "../../styles/Section.styled"
import { ImCancelCircle } from "react-icons/im";

function Skills() {
	const skills = ["C++", "Java"]

	const skillsList = skills.map(skill => 
		<SkillItem>{skill}<ImCancelCircle /></SkillItem>
	)

	return (
		<div>
			<Title>Skills</Title>
			<FlexRow>
				<InputGroup>
					<label>Example: Java, Python, Spanish, Excel</label>
					<input 
						type="text"
						placeholder=''
					/>
				</InputGroup>
			</FlexRow>
			<FlexRow>
                <button>Add</button>
				<button>Save</button>
            </FlexRow>
			<FlexRow>
				{ skillsList }
			</FlexRow>
		</div>
  	)
}

export default Skills