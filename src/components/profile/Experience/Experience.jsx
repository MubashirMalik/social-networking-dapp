import {createStyles, Card, Title, Grid, Button, Box, Stack} from '@mantine/core';
import {ExperienceCard} from "./ExperienceCard/ExperienceCard.jsx";
import NoRecordAlert from "../NoRecordAlert";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: "100%"
    },
}));


export function Experience({ workExperiences }) {
    const {classes} = useStyles();

    const items = workExperiences.map(workExperience => (
        <Grid.Col span={6}>
            <ExperienceCard workExperience={workExperience} />
        </Grid.Col>
    ));

    return (
        <Card shadow={"md"} withBorder radius="md"  className={classes.card}>
            <Stack spacing={15} >
                <Title size={20}>
                    Experience
                </Title>
                { workExperiences.length > 0 ?
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={15}>{ items } </Grid> :
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


