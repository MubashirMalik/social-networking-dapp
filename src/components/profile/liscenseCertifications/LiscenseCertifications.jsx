import {createStyles, Card, Title, Grid, Button, Box, Stack} from '@mantine/core';
import {LiscenseCertificationsCard} from "./LiscenseCertificationsCard/LiscenseCertificationsCard.jsx";

const useStyles = createStyles((theme) => ({
    card: {
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

const data = {
    "title": "Liscense & Certifications",
    "description": "",
    "data": [
        {
            "title": "Messages",
            "description": "Direct messages you have received from other users"
        },
        {
            "title": "Review requests",
            "description": "Code review requests from your team members"
        },
        {
            "title": "Review requests",
            "description": "Code review requests from your team members"
        },
        {
            "title": "Review requests",
            "description": "Code review requests from your team members"
        },

    ]
}

export function LiscenseCertifications({}) {
    const {classes} = useStyles();

    const items = data.data.map((item) => (
        <>

            <Grid.Col span={6}>

                <LiscenseCertificationsCard verified={true}/>


            </Grid.Col>



        </>


    ));

    return (
        <Card shadow={"md"} withBorder radius="md"  className={classes.card}>
            <Stack spacing={15} >
                <Title size="xl" className={classes.title} weight={500}>
                    {data.title}
                </Title>
                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={15}>
                    {items}
                </Grid>

                <Box className={classes.wrapper}>

                    <Box className={classes.show}>

                        <Button fullWidth variant="light"  radius="md">
                            CLick to see more
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Card>
    );
}


