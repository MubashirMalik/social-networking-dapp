import {createStyles, Card, Title, Grid, Stack } from '@mantine/core';
import {LiscenseCertificationsCard} from "./LiscenseCertificationsCard/LiscenseCertificationsCard.jsx";
import NoRecordAlert from "../NoRecordAlert";

const useStyles = createStyles((theme) => ({
    card: {
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
}));

export function LiscenseCertifications({ certifications }) {
    const {classes} = useStyles();

    const items = certifications.map(certification => (
        <Grid.Col span={6}>
            <LiscenseCertificationsCard certification={certification}/>
        </Grid.Col>
    ))

    return (
        <Card shadow={"md"} withBorder radius="md" className={classes.card}>
            <Stack spacing={15}>
                <Title size={20}>
                    License & Certifications
                </Title>
                <NoRecordAlert
                    section="certifications"
                    message="Add certification and licenses to stand out to employers."
                    href="/account/certifications"
                />
            </Stack>
        </Card>
    );
}


