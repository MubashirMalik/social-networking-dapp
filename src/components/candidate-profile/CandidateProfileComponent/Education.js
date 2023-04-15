import { Alert, Box, Button, createStyles, Group, TextInput } from '@mantine/core'
import { Divider, Grid, Text, Card, Textarea } from '@mantine/core'

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../../../context/authenticationContext';
import { ResumeContext } from '../../../context/resumeContext';
import {addDegree} from "../../../Web3Client";
const useStyles = createStyles((theme) => ({
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: "100%"
    },
    colorButton: {
        backgroundColor: "#1cc7d0",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    },
    colorOutlineButton: {
        borderColor: "#1cc7d0",
        backgroundColor: "white",
        color: "#1cc7d0",
        border: "1px solid",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    },
    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
            }`,
    },


}));
function Education() {
    const { classes, theme } = useStyles();
    const { providerStatus } = useContext(AuthenticationContext)
    const context = useContext(ResumeContext)
    console.log(context.resumeData)
    const form = useForm({
        initialValues: {
            institution: null,
            degree: null,
            from_month: null,
            from_year: null,
            to_month: null,
            to_year: null,
            city: null,
            country: null,
        },

        validate: {
            institution: (value) => (value ? null : "Institution Name must not be empty"),
            degree: (value) => (value ? null : "Degree  must not be empty"),
            from_month: (value) => (value ? null : "From Month  must not be empty"),
            from_year: (value) => (value ? null : "From Year  must not be empty"),
            to_month: (value) => (value ? null : "To Month  must not be empty"),
            to_year: (value) => (value ? null : "To Year  must not be empty"),
            city: (value) => (value ? null : "City must not be empty"),
            country: (value) => (value ? null : "Country  must not be empty"),




        },
    });
    useEffect(() => {

        form.setValues({
            institution: context.resumeData?.college_name,
            degree: context.resumeData?.degree,
          
        })



    }, [context.resumeData])
    const handleSubmit = (payload) => {
        const data = { ...payload, walletAddress: providerStatus.connectedAccount }
        console.log(data)
        const contractData = {
            issuingOrganization: payload.institution,
            title: payload.degree,
            fromMonth: parseInt(payload.from_month),
            fromYear: parseInt(payload.from_month),
            toMonth: parseInt(payload.to_month),
            toYear: parseInt(payload.to_year),
        }
        addDegree(providerStatus.connectedAccount, contractData).then(res=>{
            axios.post('http://localhost:3001/user/create-user-education', data)
                .then(response => {

                    if (response.status === 200) {
                        console.log('User Education Added !');
                        console.log('Response:', response.data);
                        showNotification({
                            title: 'User Education',
                            message: "User Education Added Successfully",
                        })

                    } else {
                        console.error('Failed to add user education:', response.statusText);
                    }
                })
                .catch(error => {
                    console.log(error)
                    showNotification({
                        title: 'User Education not Added Successfully',
                        message: JSON.stringify(error.response.data),
                    })
                    console.error('Error creating user:', error);
                });
        }).catch(err=>{
            console.log(err)
        })


    }
    return (
        <Grid>
            <Grid.Col span={6}>   <form
                style={{ width: "100%" }}
                onSubmit={form.onSubmit((values, event) => {
                    handleSubmit(values)

                })}
            >

                <TextInput
                    m="sm"
                    label="Institution(Name - Address)"
                    placeholder="Institution(Name - Address)"
                    withAsterisk
                    {...form.getInputProps(`institution`)}
                />
                <TextInput
                    m="sm"
                    label="Degree/Diploma"
                    placeholder="Degree/Diploma"
                    withAsterisk
                    {...form.getInputProps(`degree`)}
                />
                <Group>
                    <TextInput
                        m="sm"
                        label="From Month"
                        placeholder=" From Month"
                        withAsterisk

                        {...form.getInputProps(`from_month`)}
                    />
                    <TextInput
                        m="sm"
                        label="From Year"
                        placeholder="From Year"
                        withAsterisk
                        {...form.getInputProps(`from_year`)}
                    />
                </Group>
                <Group>
                    <TextInput
                        m="sm"
                        label="To Month"
                        placeholder=" To Month"
                        withAsterisk

                        {...form.getInputProps(`to_month`)}

                    />
                    <TextInput
                        m="sm"
                        label="To Year"
                        placeholder="To Year"
                        withAsterisk
                        {...form.getInputProps(`to_year`)}

                    />
                </Group>

                <TextInput
                    m="sm"
                    label="Country"
                    placeholder="Country"
                    withAsterisk

                    {...form.getInputProps(`country`)}

                />
                <TextInput
                    m="sm"
                    label="City"
                    placeholder="City"
                    withAsterisk
                    {...form.getInputProps(`city`)}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "10px",
                        marginTop: "10px",
                    }}
                >
                    <Button className={classes.colorButton} mt="sm" type="submit">
                        Save
                    </Button>

                </div>


            </form></Grid.Col>
            <Grid.Col span={6}>
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                >
                    <Text mt="md" weight={600} size={19}>
                        Education{" "}
                    </Text>
                    <Divider />
                    <div style={{ width: "100%" }}>
                        <Alert

                            m={10}
                            title={`${form.values.degree ? form.values.degree : ""}`} >
                            <Box>
                                <Text tt="uppercase">{form.values.insititution}</Text>
                                <Group><Text>{form.values.from_month}</Text><Text> {form.values.from_year}</Text> <Text>{form.values.to_month}</Text> <Text>{form.values.to_year}</Text></Group>
                                <Group><Text>{form.values.city}</Text> <Text>{form.values.country}</Text></Group>

                            </Box>

                        </Alert>

                    </div>
                </Card>

            </Grid.Col>
        </Grid>

    )
}

export default Education