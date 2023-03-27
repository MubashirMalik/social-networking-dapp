import { Button, createStyles, Grid, List, TextInput ,Card, Divider,Text} from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { Title, FlexRow, InputGroup, SkillItem } from "../../styles/Section.styled"
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
        <Grid>
            <Grid.Col span={6}><FlexRow>
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
                </FlexRow>

            </Grid.Col>
            <Grid.Col span={6}>
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                >
                    <Text mt="md" weight={600} size={19}>
                        Certificate{" "}
                    </Text>
                    <Divider />
                    <List>
                        <List.Item>React</List.Item>
                        <List.Item>GIT</List.Item>
                        <List.Item>Vanilla JS</List.Item>
                        <List.Item>Next JS</List.Item>
                        <List.Item>Python</List.Item>
                    </List>
                </Card>

            </Grid.Col>



        </Grid>



    )
}

export default Skills