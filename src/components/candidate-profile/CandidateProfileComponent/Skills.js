import { Button, createStyles, Grid, List, TextInput, Card, Divider, Text } from '@mantine/core'
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { AuthenticationContext } from '../../../context/authenticationContext';
import { ResumeContext } from '../../../context/resumeContext';
import { Title, FlexRow, InputGroup, SkillItem } from "../../styles/Section.styled"
import {editUserDataDetails} from "../../../services/user.service";
function Skills() {
    const [newSkill, setNewSkill] = useState("")
    const [skills, setSkills] = useState([])
    const { providerStatus } = useContext(AuthenticationContext)
    const context = useContext(ResumeContext)
    const skillsList = skills?.map((skill, idx) =>
        <SkillItem

            key={idx}>{skill}<ImCancelCircle onClick={() => handleRemove(skill)} /></SkillItem>
    )

    const handleAdd = () => {
        console.log(newSkill)
        if (newSkill != "") {
            setSkills(prevSkills => {
                console.log(prevSkills)
                return [...prevSkills, newSkill]
            })

        }
    }

    const handleRemove = (skill) => {
        setSkills(skills.filter(sk => sk !== skill))
    }
    useEffect(() => {
        
        if (context.resumeData.skills) {
          
            setSkills(context.resumeData.skills)
        }




    }, [context.resumeData])
    const handleSubmit = () => {

        const updatePayload = {
            "walletAddress": { "walletAddress": providerStatus.connectedAccount },
            "updateValue": { "skills": skills }
        }

        axios.put("http://localhost:3001/user/update-user", updatePayload).then((response) => {
            showNotification({
                color: "green",
                title: 'Skills  ',
                message: "Skills Added Successfully",
            })
        }).catch((err) => {
            showNotification({
                color: "red",
                title: 'Skills',
                message: "Skills Not Added Successfully",
            })
        })
    }
    return (
        <Grid>
            <Grid.Col span={6}>
                <FlexRow
                    style={{ width: "50%" }}
                >
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
                    <button onClick={() => { handleSubmit() }}>Save</button>
                </FlexRow>
                <FlexRow
                    style={{
                        flexWrap: "wrap",
                        gap: "20px"
                    }}
                >
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
                        Skills{" "}
                    </Text>
                    <Divider />
                    <List>
                        {skills?.map(item => (
                            <List.Item>{item}</List.Item>
                        ))}
                    </List>
                </Card>

            </Grid.Col>



        </Grid>



    )
}

export default Skills