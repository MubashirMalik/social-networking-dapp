import { Button, createStyles, Divider, Text, TextInput, Title, Box, Grid, Card, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form';
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { AuthenticationContext } from '../../../context/authenticationContext';
import { showNotification } from '@mantine/notifications';
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
function Basic() {
    const { classes, theme } = useStyles();
    const { providerStatus } = useContext(AuthenticationContext)
    const form = useForm({
        initialValues: {
            headline: null,
            full_name: null,
            location: null,
            city: null,
            nationality: null,
            bio: null,
            wallet_address: null,
            linked_in: null,
            github: null,
            website_portfolio: null,
        },

        validate: {
            headline: (value) => (value ? null : "Headline must not be empty"),
            full_name: (value) => (value ? null : "Full Name must not be empty"),
            location: (value) => (value ? null : "Location must not be empty"),
            nationality: (value) => (value ? null : "Nationality must not be empty"),
            bio: (value) => (value ? null : "Bio must not be empty"),


        },
    });


    const handleSubmit = (payload) => {
        const data = { ...payload, walletAddress: providerStatus.connectedAccount }
        console.log(data)
        axios.post('http://localhost:3001/user/create-user', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('User created successfully!');
                    console.log('Response:', response.data);
                    showNotification({
                        title: 'User Creation',
                        message: "User Creation Successfully",
                    })

                } else {
                    console.error('Failed to create user:', response.statusText);
                }
            })
            .catch(error => {
                showNotification({
                    title: 'User Creation not Successfull',
                    message: JSON.stringify(error.response.data),
                })
                console.error('Error creating user:', error);
            });
    }
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
                        label="Headline"
                        placeholder="Headline"
                        withAsterisk
                        {...form.getInputProps("headline")}
                    />
                    <TextInput
                        m="sm"
                        label="Full Name"
                        placeholder="Full Name"
                        withAsterisk
                        {...form.getInputProps("full_name")}
                    />
                    <TextInput
                        m="sm"
                        label="Where do you live?"
                        placeholder="Where do you live?"
                        withAsterisk
                        {...form.getInputProps("location")}
                    />
                    <TextInput
                        m="sm"
                        label="City"
                        placeholder="City"
                        {...form.getInputProps("city")}
                    />
                    <TextInput
                        m="sm"
                        label="Your Nationality"
                        placeholder="Your Nationality"
                        withAsterisk
                        {...form.getInputProps("nationality")}
                    />
                    <TextInput
                        m="sm"
                        label="Linked In"
                        placeholder="Linked In"
                        {...form.getInputProps("linked_in")}
                    />
                    <TextInput
                        m="sm"
                        label="Github"
                        placeholder="Github"
                        {...form.getInputProps("github")}
                    />
                    <TextInput
                        m="sm"
                        label="Your Website/Portfolio"
                        placeholder="Your Website/Portfolio"
                        {...form.getInputProps("website_portfolio")}
                    />
                    <TextInput
                        m="sm"
                        label="Your Address"
                        placeholder="Your Address"
                        disabled={true}
                        {...form.getInputProps("wallet_address")}
                    />
                    <Textarea
                        m="sm"
                        label="Bio"
                        placeholder="Bio"
                        withAsterisk
                        {...form.getInputProps("bio")}
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
                    <Title mt="md" weight={600} size={19}>
                        Basic{" "}
                    </Title>
                    <Divider />

                    <div style={{ display: "flex" }}>
                        <Text weight={600} size={14}>
                            Headline: &nbsp;{" "} {form.values.headline}
                        </Text>
                        <Text size={14}> </Text>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Text weight={600} size={14}>
                            Full Name : &nbsp;{" "} {form.values.full_name}
                        </Text>
                        <Text size={14}> </Text>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Text weight={600} size={14}>
                            Location: &nbsp;{" "}  {form.values.location}
                        </Text>


                    </div>
                    <Text weight={600} size={14}>
                        City: &nbsp;{" "}  {form.values.city}
                    </Text>
                    <Text weight={600} size={14}>
                        Nationality {" "} {form.values.nationality}
                    </Text>
                    <Text mt="md" weight={600} size={19}>
                        Social Handles{" "}
                    </Text>
                    <Divider />

                    <div style={{ display: "flex" }}>
                        <Text weight={600} size={14}>
                            Linked In: &nbsp;{" "} {form.values.linked_in}
                        </Text>
                        <Text size={14}> </Text>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Text weight={600} size={14}>
                            Github: &nbsp;{" "} {form.values.github}
                        </Text>


                    </div>
                    <Text weight={600} size={14}>
                        Website: &nbsp;{" "} {form.values.website_portfolio}
                    </Text>

                    <Text weight={600} size={14} lineClamp={1} >
                        Bio: &nbsp; {form.values.bio}
                    </Text>
                </Card>


            </Grid.Col>
        </Grid >
    )
}

export default Basic