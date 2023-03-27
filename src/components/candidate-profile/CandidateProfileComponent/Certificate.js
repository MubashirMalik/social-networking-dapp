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
function Certificate() {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            institution: null,
            title: null,
            issue_month: null,
            issue_year: null,
            exp_month: null,
            exp_year: null,
            expire: null,
        },

        validate: {
            institution: (value) => (value ? null : "Insititution must not be empty"),
            title: (value) => (value ? null : "Name must not be empty"),
            issue_month: (value) => (value ? null : "Issue Month must not be empty"),
            issue_year: (value) => (value ? null : "Issue Year must not be empty"),
            exp_month: (value) => (value ? null : "Expiration Month must not be empty"),
            exp_year: (value) => (value ? null : "Expiration Year must not be empty"),




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
                <TextInput
                    m="sm"
                    label="Issue Month"
                    placeholder=" Issue Month"
                    withAsterisk

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
                <Select
                    m="sm"
                    label="Expiration Month"
                    placeholder=" Expiration Month"
                    withAsterisk
                    data={[]}
                    {...form.getInputProps(`exp_month`)}
                />
                <TextInput
                    m="sm"
                    label="Expiration Year"
                    placeholder="Expiration Year"
                    withAsterisk
                    {...form.getInputProps(`exp_year`)}

                />
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


        </form>
    )
}

export default Certificate