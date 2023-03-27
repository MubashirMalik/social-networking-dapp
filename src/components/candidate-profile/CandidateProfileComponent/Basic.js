import { Button, createStyles, Divider, Text, TextInput, Title, Box, Grid, Card } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
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
    const form = useForm({
        initialValues: {


            headline: null,
            full_name: null,
            location: null,
            city: null,
            nationality: null,


        },

        validate: {
            headline: (value) => (value ? null : "Headline must not be empty"),
            full_name: (value) => (value ? null : "Full Name must not be empty"),
            location: (value) => (value ? null : "Location must not be empty"),
            nationality: (value) => (value ? null : "Nationality must not be empty"),



        },
    });
    return (
        <Grid>
            <Grid.Col span={6}>


                <form
                    style={{ width: "100%" }}
                    onSubmit={form.onSubmit((values, event) => {
                        console.log(values);

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
               <Title mt="md" weight={700} size={19}>
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
               </Card>

                
            </Grid.Col>
        </Grid >
    )
}

export default Basic