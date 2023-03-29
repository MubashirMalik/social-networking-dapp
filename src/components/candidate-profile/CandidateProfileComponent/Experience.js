import { Button, createStyles, Group, Select, Switch, Grid, Text, Divider, Card, Alert, Box, Textarea, TextInput, Badge } from '@mantine/core'
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useContext } from 'react'
import { AuthenticationContext } from '../../../context/authenticationContext';
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
function Experience() {
    const { classes, theme } = useStyles();
    const { providerStatus } = useContext(AuthenticationContext)
    const form = useForm({
        initialValues: {
            institution: null,
            designation: null,
            from_month: null,
            from_year: null,
            to_month: null,
            to_year: null,
            country: null,
            city: null,
            responsibilities: null,
            currently_working: null,
        },

        validate: {
            institution: (value) => (value ? null : "Insititution  must not be empty"),
            designation: (value) => (value ? null : "Designation  must not be empty"),
            from_month: (value) => (value ? null : "From Month  must not be empty"),
            from_year: (value) => (value ? null : "From Year  must not be empty"),
            to_month: (value) => (value ? null : "To Month  must not be empty"),
            to_year: (value) => (value ? null : "To Year  must not be empty"),
            country: (value) => (value ? null : "Country  must not be empty"),
            city: (value) => (value ? null : "City  must not be empty"),
            responsibilities: (value) => (value ? null : "Responcibilities  must not be empty"),
            currently_working: (value) => (value ? null : "Currently Working  must not be empty"),
        },
    });

    const handleSubmit = (payload) => {
        const data = { ...payload, walletAddress: providerStatus.connectedAccount }
        console.log(data)
        axios.post('http://localhost:3001/user/create-user-experience', data)
            .then(response => {

                if (response.status === 200) {
                    console.log('User Experience Added !');
                    console.log('Response:', response.data);
                    showNotification({
                        title: 'User Experience',
                        message: "User Experience Added Successfully",
                    })

                } else {
                    console.error('Failed to add user Experience:', response.statusText);
                }
            })
            .catch(error => {
                console.log(error)
                showNotification({
                    title: 'User Experience not Added Successfully',
                    message: JSON.stringify(error.response.data),
                })
                console.error('Error creating user:', error);
            });}
    return (
        <Grid>
            <Grid.Col span={6}>
                <form
                    style={{ width: "100%" }}
                    onSubmit={form.onSubmit((values, event) => {
                        
                        handleSubmit(values)
                    })}
                >
                    <TextInput
                        m="sm"
                        label="Compnay/Organization(Name - Address)"
                        placeholder="Compnay/Organization(Name - Address)"
                        withAsterisk
                        {...form.getInputProps(`institution`)}

                    />
                    <TextInput
                        m="sm"
                        label="Designation/Job Title"
                        placeholder="Designation/Title"
                        withAsterisk
                        {...form.getInputProps(`designation`)}

                    />
                    <Group>
                        <TextInput
                            m="sm"
                            label="From Month"
                            placeholder=" From Month"
                            withAsterisk
                            data={[]}
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
                    <Textarea
                        m="sm"
                        label="Responcibilites"
                        placeholder="Responcibilites"
                        withAsterisk
                        {...form.getInputProps(`responsibilities`)}


                    />
                    <Switch
                        m="md"
                        label="Currently Working"
                        onLabel="YES"
                        offLabel="NO"
                        size="sm"
                        {...form.getInputProps(`currently_working`)}
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


                </form>
            </Grid.Col>
            <Grid.Col span={6}>
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                >
                    <Text mt="md" weight={600} size={19}>
                        Experience{" "}
                    </Text>
                    <Divider />
                    <div style={{ width: "100%" }}>
                        <Alert

                            m={10}
                            title={`${form.values.designation ? form.values.designation : ""}`} >
                            <Box>
                                <Text tt="uppercase">{form.values.institution}</Text>
                                <Group><Text>{form.values.from_month}</Text><Text> {form.values.from_year}</Text> <Text>{form.values.to_month}</Text> <Text>{form.values.to_year}</Text></Group>
                                <Group><Text>{form.values.city}</Text> <Text>{form.values.country}</Text></Group>
                                <Text>{form.values.responcibilities}</Text>
                                {form.values.currently_working ? <Badge size="lg" radius="xl" color="teal" >
                                    Currently Working
                                </Badge> : <Badge size="lg" radius="xl" color="red" >
                                    Not Working Currently
                                </Badge>}



                            </Box>

                        </Alert>

                    </div>
                </Card>
            </Grid.Col>
        </Grid>
    )
}

export default Experience