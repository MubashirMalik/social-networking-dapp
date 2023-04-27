import { Button, createStyles, Group, Select, Switch, Textarea, Grid, Badge,Card, Text, Divider, Alert, Box, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { AuthenticationContext } from '../../../context/authenticationContext';
import {addCertification, getAllCompanies} from "../../../Web3Client";
import {ContractCompaniesContext} from "../../../context/contractCompaniesContext";
import {monthsList} from "../../../services/helper/helper";

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
function Certificate() {
    const { classes, theme } = useStyles();
    const { providerStatus } = useContext(AuthenticationContext)
    const { companiesList } = useContext(ContractCompaniesContext)

    const form = useForm({
        initialValues: {
            institution: null,
            title: null,
            issue_month: null,
            issue_year: null,
            exp_month: null,
            exp_year: null,
            expire: false,
        },

        validate: {
            institution: (value) => (value ? companiesList.some(item => item.hasOwnProperty('value') && item["value"] === value)?null:"Institution is not registered" : "Institution must not be empty"),
            title: (value) => (value ? null : "Name must not be empty"),
            issue_month: (value) => (value ? null : "Issue Month must not be empty"),
            issue_year: (value) => (value ? null : "Issue Year must not be empty"),





        },
    });
    console.log(form.values.institution)
    console.log(companiesList)

    const handleSubmit = (payload) => {
        const data = { ...payload, walletAddress: providerStatus.connectedAccount }
        console.log(data)

        const contractData = {
            issuingOrganization: payload.institution,
            name: payload.title,
            issueMonth: parseInt(payload.issue_month),
            issueYear: parseInt(payload.issue_year),
            expirationMonth: parseInt(payload.exp_month),
            expirationYear: parseInt(payload.exp_year),
            hasExpirationDate: payload.expire
        }
        addCertification(providerStatus.connectedAccount, contractData).then(res=>{
            axios.post('http://localhost:3001/user/create-user-certificate', data)
                .then(response => {

                    if (response.status === 200) {
                        console.log('User Certificate Added !');
                        console.log('Response:', response.data);
                        showNotification({
                            title: 'User Certificate',
                            message: "User Certificate Added Successfully",
                        })

                    } else {
                        console.error('Failed to add user Certificate:', response.statusText);
                    }
                })
                .catch(error => {
                    console.log(error)
                    showNotification({
                        title: 'User Certificate not Added Successfully',
                        message: JSON.stringify(error.response.data),
                    })
                    console.error('Error creating user Certificate:', error);
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
                    label="Name"
                    placeholder="Name"
                    withAsterisk
                    {...form.getInputProps(`title`)}
                />
                <Group>
                    <Select
                        m="sm"
                        label="Issue Month"
                        placeholder=" Issue Month"
                        withAsterisk
                        data={monthsList}
                        {...form.getInputProps(`issue_month`)}
                    />
                    <TextInput
                        m="sm"
                        label="Issue Year"
                        placeholder="Issue Year"
                        withAsterisk
                        {...form.getInputProps(`issue_year`)}
                    />
                </Group>
                <Group>
                    {!(form.values.expire)?(
                        <><Select
                            m="sm"
                            label="Expiration Month"
                            placeholder=" Expiration Month"
                            withAsterisk
                            data={monthsList}
                            {...form.getInputProps(`exp_month`)}
                        />
                        <TextInput
                            m="sm"
                            label="Expiration Year"
                            placeholder="Expiration Year"
                            withAsterisk
                            {...form.getInputProps(`exp_year`)}

                        /></>):""

                    }

                    <Switch
                        m="md"
                        label="The Certificate doesn't Expire"
                        onLabel="YES"
                        offLabel="NO"
                        size="sm"
                        {...form.getInputProps(`expire`)}
                    />

                </Group>
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
                        Certificate{" "}
                    </Text>
                    <Divider />
                    <div style={{ width: "100%" }}>
                        <Alert

                            m={10}
                            title={`${form.values.title ? form.values.title : ""}`} >
                            <Box>
                                <Text tt="uppercase">Institution : {form.values.institution}</Text>
                                <Group><Text>Issue Month :{form.values.issue_month}</Text><Text>Issue Year :{form.values.issue_year}</Text> </Group>
                                <Group><Text>Expiration Month :{form.values.exp_month}</Text> <Text>Expiration Year :{form.values.exp_year}</Text></Group>
                                {!(form.values.expire) ? <Badge size="lg" radius="xl" color="red" >
                                    Will Expire
                                </Badge> : <Badge size="lg" radius="xl" color="teal" >
                                    Never Expire
                                </Badge>}
                            </Box>

                        </Alert>

                    </div>
                </Card>

            </Grid.Col>
        </Grid>

    )
}

export default Certificate