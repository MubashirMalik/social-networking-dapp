import {createStyles, Card, Title, Grid, Stack, List, ThemeIcon} from '@mantine/core';

import NoRecordAlert from "../NoRecordAlert";
import {CircleLetterS} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: "100%"
    },
}));



export function Skills({ skills }) {
    const {classes} = useStyles();

    function getSkills() {
        return skills.map(item=>(
            <List.Item>{item}</List.Item>
        ))
    }
    return (
        <Card shadow={"md"} withBorder radius="md"  className={classes.card}>
            <Stack spacing={15} >
                <Title size={20}>
                    Skills
                </Title>
                { skills?.length > 0 ?
                    (
                        <List
                            spacing="xs"
                            size="sm"
                            center
                            icon={
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <CircleLetterS
                                        size={48}
                                        strokeWidth={2}
                                        color={'black'}
                                    />
                                </ThemeIcon>
                            }
                        >
                            {getSkills()}





                        </List>
                    ) :
                    <NoRecordAlert
                        section="experiences"
                        message="Add professional work experiences to stand out to employers."
                        href="/account/experience"
                    />
                }
            </Stack>
        </Card>
    );
}


