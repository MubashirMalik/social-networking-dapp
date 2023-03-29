import { Button, createStyles, Grid, List, TextInput ,Card, Divider,Text} from '@mantine/core'
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { AuthenticationContext } from '../../../context/authenticationContext';
import { Title, FlexRow, InputGroup, SkillItem } from "../../styles/Section.styled"
function Skills() {
    const [newSkill, setNewSkill] = useState("")
    const [skills, setSkills] = useState([])
    const { providerStatus } = useContext(AuthenticationContext)
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
    const handleSubmit = () => {
        const data = { skills:skills, walletAddress: providerStatus.connectedAccount }
        console.log(data)
        axios.post('http://localhost:3001/user/create-user-skills', data)
            .then(response => {

                if (response.status === 200) {
                    console.log('User Skills Added !');
                    console.log('Response:', response.data);
                    showNotification({
                        title: 'User Skills',
                        message: "User Skills Added Successfully",
                    })

                } else {
                    console.error('Failed to add user Skills:', response.statusText);
                }
            })
            .catch(error => {
                console.log(error)
                showNotification({
                    title: 'User Skills not Added Successfully',
                    message: JSON.stringify(error.response.data),
                })
                console.error('Error creating user Skills:', error);
            });
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
                    <button  onClick={()=>{handleSubmit()}}>Save</button>
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
                        Skills{" "}
                    </Text>
                    <Divider />
                    <List>
                        {skills.map(item=>(
                            <List.Item>{item}</List.Item>
                        ))}
                    </List>
                </Card>

            </Grid.Col>



        </Grid>



    )
}

export default Skills