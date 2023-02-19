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

import image from '../../assets/60111.jpg'
import { AuthenticationContext } from '../../../context/authenticationContext';

const useStyles = createStyles((theme) => ({
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
    progressBar: {
        backgroundColor: "#8A2BE2"
    },
    headerIconBox: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    badge: {
        display: "flex"
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
    const {classes, cx} = useStyles();
    const avatar = (
        <Avatar
            alt="Avatar for badge"
            size={24}
            mr={5}
            src={image}
        />
    );

    return (
        <Card
            className={classes.card} p="lg" radius="md" withBorder
            display={'flex'}
            direction={"column"}
            pl={40} pr={40}
        >
            <Box className={classes.headerIconBox}>
                <Box>
                    <Avatar radius={100} src={image} sx={{width: "150px", height: "150px"}}/>
                </Box>
            </Box>
            <Box display={"flex"} direction={"row"} className={classes.wrapper}>
                <Box className={classes.titleBox}>
                    <Title>{ providerStatus.userName }</Title>
                    <Text>{ 
                        providerStatus.userHeadline }</Text>
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