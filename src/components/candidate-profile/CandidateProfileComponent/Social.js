import { Button, createStyles, Divider, Grid, Text, Card,Textarea, TextInput } from '@mantine/core'
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
function Social() {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            bio: null,
            wallet_address: null,
            linked_in: null,
            github: null,
            website_portfolio: null,
        },

        validate: {
            bio: (value) => (value ? null : "Bio must not be empty"),




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
                    
                </Card>

            </Grid.Col>
        </Grid>

    )
}

export default Social