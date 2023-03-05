import {createStyles, Card, Title, Grid, Stack } from '@mantine/core';
import {CertificationCard} from "./CertificationCard/CertificationCard.jsx";
import NoRecordAlert from "../NoRecordAlert";

const useStyles = createStyles((theme) => ({
    card: {
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
}));

export function Certification({ certifications, setRefreshUserData }) {
    const {classes} = useStyles();

    const items = certifications.map((certification, index) => (
        <Grid.Col span={6}>
            <CertificationCard 
                certification={certification}
                id={index}
                setRefreshUserData={setRefreshUserData}    
            />
        </Grid.Col>
    ))

    return (
        <Card shadow={"md"} withBorder radius="md" className={classes.card}>
            <Stack spacing={15}>
                <Title size={20}>
                    License & Certifications
                </Title>
                { certifications.length > 0 ?
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={15}>{ items } </Grid> :
                    <NoRecordAlert
                        section="certifications"
                        message="Add certification and licenses to stand out to employers."
                        href="/account/certification"
                    />
                }
            </Stack>
        </Card>
    );
}