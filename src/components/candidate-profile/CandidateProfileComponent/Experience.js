import { Button, createStyles, Group, Select, Switch, Textarea, TextInput } from '@mantine/core'
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
function Experience() {
    const { classes, theme } = useStyles();
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
            responcibilities: null,
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
            responcibilities: (value) => (value ? null : "Responcibilities  must not be empty"),
            currently_working: (value) => (value ? null : "Currently Working  must not be empty"),




        },
    });
    return (
        <form
            style={{ width: "100%" }}
            onSubmit={form.onSubmit((values, event) => {
                console.log(values);

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
                {...form.getInputProps(`responcibilities`)}


            />
            <Switch
                m="md"
                label="Currently Working"
                onLabel="YES"
                offLabel="NO"
                size="sm"
                {...form.getInputProps(`active_status`)}
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
    )
}

export default Experience