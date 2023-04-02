import {createStyles, Card, Text, Group, Box, Popover, Button} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useContext } from 'react';
import { AuthenticationContext } from '../../../context/authenticationContext';
import { MONTH_NAMES, TOKEN_TYPE_CERTIFICATION, TOKEN_TYPE_EDUCATION, TOKEN_TYPE_EXPERIENCE } from '../../../util';
import { respondToVerificationRequest } from '../../../Web3Client';

const useStyles = createStyles((theme) => ({
    card: {
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700, fontFamily: `Greycliff CF, ${theme.fontFamily}`, lineHeight: 1.2,
    },

    body: {
        width: "100%",
    }, box: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    }
}));


export function TokenCard({ data, tokenType }) {
    const { providerStatus } = useContext(AuthenticationContext)
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();

    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <div className={classes.body}>
            <Box className={classes.box}>
                <Text className={classes.title} mt="sm">
                    { 
                        tokenType === TOKEN_TYPE_EXPERIENCE ? data.designation 
                        : tokenType === TOKEN_TYPE_CERTIFICATION ? data.name 
                        : data.title 
                    }
                </Text>
            </Box>

            <Group noWrap spacing="xs">

                <Text size="sm" color="dimmed" weight={700}>
                    { tokenType === TOKEN_TYPE_CERTIFICATION ? MONTH_NAMES[data.issueMonth-1] + " " + data.issueYear : MONTH_NAMES[data.fromMonth-1] + " " + data.fromYear }
                </Text>
                -
                <Text size="sm" color="dimmed" weight={700}>
                { tokenType === TOKEN_TYPE_CERTIFICATION ? MONTH_NAMES[data.expirationMonth-1] + " " + data.expirationYear : MONTH_NAMES[data.toMonth-1] + " " + data.toYear }
                </Text>
            </Group>
            <Text transform="uppercase" color="dimmed" weight={700} size="sm">
                Token Type: { tokenType === TOKEN_TYPE_CERTIFICATION ? "Certification" : tokenType === TOKEN_TYPE_EDUCATION ? "Education" : "Experience" }
            </Text>
            <Group spacing="xs" width={300}>

                <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                    <Popover.Target>
                        <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                            Requester  Address: { data.issuingOrganization }
                        </Text>
                    </Popover.Target>
                    <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                        <Text size="xs" color="dimmed" truncate>
                            { data.issuingOrganization }
                        </Text>
                    </Popover.Dropdown>
                </Popover>
                <Box className={classes.button}>
                    <Button 
                        color={"teal"} 
                        variant={"light"} 
                        radius={"sm"}
                        onClick={() => respondToVerificationRequest(providerStatus.connectedAccount, data.id, data.issuingOrganization, tokenType, true)}
                    >
                        Accept
                    </Button>
                    <Button 
                        ml={10}  
                        radius={"sm"} 
                        color={"red"} 
                        variant={"outline"}
                        onClick={() => respondToVerificationRequest(providerStatus.connectedAccount, data.id, data.issuingOrganization, tokenType, false)}
                    >
                        Reject
                    </Button>
                </Box>
            </Group>

        </div>

    </Card>);
}