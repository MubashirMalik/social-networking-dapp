import React, { useContext } from 'react';
import {Card, createStyles, Flex, Title,Spoiler,Group} from "@mantine/core";
import { Link } from "react-router-dom"
import {FiEdit2} from "react-icons/fi";
import { useEffect } from 'react';
import { getUserDetails } from '../../../services/user.service';
import { AuthenticationContext } from '../../../context/authenticationContext';

const useStyles = createStyles((theme) => ({
    card: {
        minWidth: "100%",
        marginTop:"0px"
    }
}));

function Viewable() {
    const  { providerStatus, setProviderStatus } = useContext(AuthenticationContext)
    const {classes} = useStyles();

    useEffect(() => {
        getUserDetails(providerStatus.connectedAccount)
        .then(res => {
            if (res) {
                setProviderStatus(prevProviderStatus => ({
                    ...prevProviderStatus, 
                    userBio: res.bio,
                    userHeadline: res.headline
                }))
            }
        })
    }, [providerStatus.connectedAccount])

    return (
        <Card  className={classes.card} withBorder radius={"md"} shadow={"sm"} pl={30} pr={30}>
            <Group mb={10} justify={"space-between"}>
                <Title size={20}>About</Title>
                <Link to="/account/about"><FiEdit2 size={20}/></Link>
            </Group>
            <Spoiler maxHeight={60} showLabel="Show more" hideLabel="Hide">
                { providerStatus.userBio }
            </Spoiler>
        </Card>
    );
}

export default Viewable;
