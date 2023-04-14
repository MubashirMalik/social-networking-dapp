import React, { useState } from 'react'
import { Title, FlexRow, InputGroup, SkillItem } from "../../styles/Section.styled"
import { ImCancelCircle } from "react-icons/im";

function Skills() {
    const [newSkill, setNewSkill] = useState("")
	const [skills, setSkills] = useState([])

	const skillsList = skills.map((skill, idx) => 
		<SkillItem key={idx}>{skill}<ImCancelCircle onClick={() => handleRemove(skill)} /></SkillItem>
	)

    const handleAdd = () => {
        if (newSkill != "") {
            setSkills(prevSkills => [...prevSkills, newSkill])
        }
    }

    const handleRemove = (skill) => {
        setSkills(skills.filter(sk => sk !== skill))
    }

	return (
		<div>
			<Title>Skills</Title>
			<FlexRow>
				<InputGroup>
					<label>Example: Java, Python, Spanish, Excel</label>
					<input 
                        name="newSkill"
                        value={newSkill}
						type="text"
                        onChange={(event) => setNewSkill(event.target.value)}
					/>
				</InputGroup>
			</FlexRow>
			<FlexRow>
                <button onClick={handleAdd}>Add</button>
				<button>Save</button>
            </FlexRow>
			<FlexRow>
				{ skillsList }
			</FlexRow>
		</div>
  	)
}

export default Skills