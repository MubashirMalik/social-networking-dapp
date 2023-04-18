import {createStyles, Card, Title, Grid, Box, Stack, Group} from '@mantine/core';
import { TokenCard } from "./TokenCard/TokenCard.jsx";
import {useEffect, useState} from "react";
import CardHeading from '../profile/CardHeading/CardHeading.jsx';
import Viewable from '../profile/Viewable/Viewable.jsx';
import { getCompanyData } from '../../Web3Client.js';
import { AuthenticationContext } from '../../context/authenticationContext.js';
import { useContext } from 'react';
import { TOKEN_TYPE_CERTIFICATION, TOKEN_TYPE_EDUCATION, TOKEN_TYPE_EXPERIENCE } from '../../util.js';

const useStyles = createStyles((theme) => ({
    card: {
        width:"100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    item: {

        '& + &': {
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },

    title: {
        lineHeight: 1,
    },
    show: {
        display: "flex",
        justifyContent: "center",
        width: "50%"

    },
    wrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%"

    },

}));



export function CompanyProfile({}) {
    const {classes} = useStyles();
    const  { providerStatus } = useContext(AuthenticationContext)

    const [experiences, setExperiences] = useState([])
    const [certifications, setCertifications] = useState([])
    const [degrees, setDegrees] = useState([])
    const [trigger, setTrigger] = useState()

    useEffect(() => {
        getCompanyData(providerStatus.connectedAccount)
        .then(res => {
            console.log(res)
            if (res) {
                setExperiences(res[2])
                setCertifications(res[1])
                setDegrees(res[0])
            }
        })
    }, [providerStatus.connectedAccount, trigger])

    const displayExperiences = experiences?.map(experience => (
        <Grid.Col span={6}>
            <TokenCard data={experience} tokenType={TOKEN_TYPE_EXPERIENCE} setTrigger={setTrigger} />
        </Grid.Col>
    ));

    const displayCertifications = certifications?.map(certification => (
        <Grid.Col span={6}>
            <TokenCard data={certification} tokenType={TOKEN_TYPE_CERTIFICATION} setTrigger={setTrigger} />
        </Grid.Col>
    ));

    const displayDegrees = degrees?.map(degree => (
        <Grid.Col span={6}>
            <TokenCard data={degree} tokenType={TOKEN_TYPE_EDUCATION} setTrigger={setTrigger} />
        </Grid.Col>
    ));

    return (
        <Group ml={180} mr={180} mb={80}>
            {/* Replace with outlet */}
            <CardHeading/>
            <Viewable/>
            <Card shadow={"md"} withBorder radius="md"  className={classes.card}>
                <Stack spacing={15} >
                    <Title size={20}>
                        All Token Requests
                    </Title>
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={15}>
                        { displayExperiences }
                        { displayCertifications }
                        { displayDegrees }
                    </Grid>

                    <Box className={classes.wrapper}>
                        { degrees.length === 0 && certifications.length === 0 && experiences.length === 0 && "You have no pending requests." }
                    </Box>
                </Stack>
            </Card>
        </Group>
    );
}

