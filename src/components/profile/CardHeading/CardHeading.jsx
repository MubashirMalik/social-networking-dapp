import React, {useContext, useEffect, useState} from 'react';
import {
    Card,
    Box,
    Text,
    Button,
    createStyles,
    Avatar,
    Title, Image,
} from '@mantine/core';

import { AuthenticationContext } from '../../../context/authenticationContext';
import dummyAvatar from '../../../images/dummy-avatar.png'
import {getUserPic} from "../../../services/user.service";

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
    const[file,setfile] =useState(null)

    useEffect(()=>{
        getUserPic(providerStatus.connectedAccount).then(res => {
            console.log(res.data)
            const url = URL.createObjectURL(res.data);
            setfile(url)
        }).catch(err=>{
            console.log(err)
        })
    },[providerStatus.connectedAccount])
console.log(file)
    return (
        <Card
            className={classes.card} p="lg" radius="md" withBorder
            display={'flex'}
            direction={"column"}
            pl={40} pr={40}
        >
            <Box className={classes.headerIconBox}>
                <Box>
                    {file?<Image
                            width={120}
                            height={120}
                            src={file}
                            radius={"50%"}
                        />:
                        <Avatar radius={100} src={dummyAvatar} sx={{width: "150px", height: "150px"}}/>
                    }

                </Box>
            </Box>
            <Box display={"flex"} direction={"row"} className={classes.wrapper}>
                <Box className={classes.titleBox}>
                    <Title>{ providerStatus.userName }</Title>
                    <Text>
                        { !providerStatus.userHeadline ? "Add Headline" : providerStatus.userHeadline }
                    </Text>
                </Box>

            </Box>
        </Card>
    );
}

export default CardHeading;