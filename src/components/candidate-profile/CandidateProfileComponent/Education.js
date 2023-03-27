import { Button, createStyles, Group, Textarea, TextInput } from '@mantine/core'
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
function Education() {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            insititution: null,
            degree: null,
            from_month: null,
            from_year: null,
            to_month: null,
            to_year: null,
            city: null,
            country: null,
        },

        validate: {
            insititution: (value) => (value ? null : "Institution Name must not be empty"),
            degree: (value) => (value ? null : "Degree  must not be empty"),
            from_month: (value) => (value ? null : "From Month  must not be empty"),
            from_year: (value) => (value ? null : "From Year  must not be empty"),
            to_month: (value) => (value ? null : "To Month  must not be empty"),
            to_year: (value) => (value ? null : "To Year  must not be empty"),
            city: (value) => (value ? null : "City must not be empty"),
            country: (value) => (value ? null : "Country  must not be empty"),




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
                {...form.getInputProps(`insititution`)}
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


        </form>
    )
}

export default Education