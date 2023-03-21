import {createStyles, Card, Title, Grid, Button, Box, Stack, Group} from '@mantine/core';
import { TokenCard } from "./TokenCard/TokenCard.jsx";
import {useEffect, useState} from "react";
import CardHeading from '../profile/CardHeading/CardHeading.jsx';
import Viewable from '../profile/Viewable/Viewable.jsx';
import { getCompanyData } from '../../Web3Client.js';
import { AuthenticationContext } from '../../context/authenticationContext.js';
import { useContext } from 'react';

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
    const [allData, setAllData] = useState([])

    const mainData = {
        "title": "Experience",
        "description": "",
        "data": [
            {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            }, {
                "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                "organization": "Facebook",
                "title": "Software Engineer",
                "from_date": "Feb 2019",
                "to_date": "Feb 2021",
                "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
                "author": {
                    "name": "Elsa Brown",
                    "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                }
            },


        ]
    }
    const [data ,setData]= useState([...mainData.data].slice(0,4))

    useEffect(() => {
        getCompanyData(providerStatus.connectedAccount)
        .then(res => {
            if (res) {
                console.log(res)
                setData(res)
            }
        })
    }, [])

    const items = data.map((item) => (
        <Grid.Col span={6}>
            <TokenCard data={item} verified={true}/>
        </Grid.Col>
    ));

    return (
        <Group ml={180} mr={180} mb={80}>
            {/* Replace with outlet */}
            <CardHeading/>
            <Viewable/>
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

                            {
                                data.length===mainData.data.length?(
                                    <Button fullWidth variant="light"  radius="md"

                                            onClick={()=>{
                                                setData(mainData.data.slice(0,4))
                                            }
                                            }>
                                        CLick to see less
                                    </Button>
                                ):<Button fullWidth variant="light"  radius="md"

                                        onClick={()=>{
                                            setData(mainData.data)
                                        }
                                        }>
                                    Click to see more
                                </Button>
                            }
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Group>
    );
}

