import {createStyles, Card, Title, Grid, Box, Stack, Group} from '@mantine/core';
import { TokenCard } from "./TokenCard/TokenCard.jsx";
import {useEffect, useState} from "react";
import CardHeading from '../profile/CardHeading/CardHeading.jsx';
import Viewable from '../profile/Viewable/Viewable.jsx';

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

    return (
        <Group ml={180} mr={180} mb={80}>
            {/* Replace with outlet */}
            <CardHeading/>
            <Viewable/>

        </Group>
    );
}

