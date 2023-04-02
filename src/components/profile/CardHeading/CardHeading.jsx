import React, { useContext } from 'react';
import {
    Card,
    Box,
    Text,
    Button,
    createStyles,
    Avatar,
    Title,
} from '@mantine/core';

import { AuthenticationContext } from '../../../context/authenticationContext';
import dummyAvatar from '../../../images/dummy-avatar.png'

const useStyles = createStyles(() => ({
    card: {
        marginTop:"10px",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    }
    ,
    titleBox: {

        maxWidth: "65%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"


    },
    headerIconBox: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button :{

        display:"flex",
        direction:"row",
        alignItems:"center",
        justifyContent:"space-between"

    },
    wrapper:{
        width:"100%",
        display:"flex",
        direction:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
}));

function CardHeading() {
    const { providerStatus } = useContext(AuthenticationContext)
    const {classes} = useStyles();

    return (
        <Card
            className={classes.card} p="lg" radius="md" withBorder
            display={'flex'}
            direction={"column"}
            pl={40} pr={40}
        >
            <Box className={classes.headerIconBox}>
                <Box>
                    <Avatar radius={100} src={dummyAvatar} sx={{width: "150px", height: "150px"}}/>
                </Box>
            </Box>
            <Box display={"flex"} direction={"row"} className={classes.wrapper}>
                <Box className={classes.titleBox}>
                    <Title>{ providerStatus.userName }</Title>
                    <Text>
                        { !providerStatus.userHeadline ? "Add Headline" : providerStatus.userHeadline }
                    </Text>
                </Box>
                <Box className={classes.button}>
                    <Button  radius={"lg"}>Open to</Button>
                    <Button ml={10}  radius={"lg"} variant={"outline"}>Add Section</Button>
                </Box>
            </Box>
        </Card>
    );
}

export default CardHeading;