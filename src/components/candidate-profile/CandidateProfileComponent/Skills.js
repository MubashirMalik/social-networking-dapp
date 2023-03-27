import { Button, createStyles, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'

function Skills() {
    const [newSkill, setNewSkill] = useState("")
    const [skills, setSkills] = useState([])

    const skillsList = skills.map((skill, idx) =>
        <SkillItem key={idx}>{skill}<ImCancelCircle onClick={() => handleRemove(skill)} /></SkillItem>
    )

    const handleAdd = () => {
        if (newSkill !== "") {
            setSkills(prevSkills => [...prevSkills, newSkill])
        }
    }

    const handleRemove = (skill) => {
        setSkills(skills.filter(sk => sk !== skill))
    }

    return (
        <> <FlexRow>
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
                {skillsList}
            </FlexRow></>



    )
}

export default Skills