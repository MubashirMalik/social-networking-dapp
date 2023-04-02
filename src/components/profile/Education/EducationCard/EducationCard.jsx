import {createStyles, Card, Image, Text, Group, Badge, Box, Popover, Flex, Button } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthenticationContext } from '../../../../context/authenticationContext';
import {MONTH_NAMES, TOKEN_TYPE_EDUCATION} from "../../../../util";
import { getUser, requestVerification } from '../../../../Web3Client';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700, lineHeight: 1.2,
    },

    body: {
        width: "70%",
    }, box: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    }
}));

const data = {
    "image": "data:image/jpeg;base64,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",
}

export function EducationCard({ degree, id, setRefreshUserData }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    const [issuingOrganization, setIssuingOrganization] = useState()
    const { providerStatus } = useContext(AuthenticationContext)

    useEffect(() => {
        getUser(degree.issuingOrganization)
        .then(res => {
            if (res) {
                setIssuingOrganization(res)
            }
        })
    }, [degree.issuingOrganization])

    const handleClick = () => {
        requestVerification(providerStatus.connectedAccount, id, TOKEN_TYPE_EDUCATION)
        .then(res => {
            if (res) {
                setRefreshUserData(prevState => !prevState)
            }
        })
    }

    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <Group>
            <Image src={data.image} height={100} width={100} radius={"md"}/>
            <div className={classes.body}>
                <Box className={classes.box}>
                    <Text className={classes.title} mt="sm">
                        { degree.title }
                    </Text>
                    {
                        degree.isVerified ? 
                            <Badge size="lg" radius="xl" color="teal">
                                verified
                            </Badge>   
                        :
                            <Badge size="lg" radius="xl" color="red">
                                not verified
                            </Badge>
                    }
                </Box>
                <Group noWrap spacing="xs">
                    <Text size="sm" color="dimmed" weight={700}>
                        { MONTH_NAMES[degree.fromMonth-1] + " " + degree.fromYear }
                    </Text>
                    -
                    <Text size="sm" color="dimmed" weight={700}>
                        { MONTH_NAMES[degree.toMonth-1] + " " + degree.toYear }
                    </Text>
                </Group>
                <Text transform="uppercase" weight={700} size="sm">
                    { issuingOrganization?.fullName }
                </Text>
                <Group spacing="xs" width={300}>
                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                               { degree.issuingOrganization }
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                            <Text size="sm" color="dimmed" truncate>
                               { degree.issuingOrganization }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
                { !degree.isVerified && !degree.isPendingVerification ?
                    <Flex justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase onClick={handleClick}>
                            Request Verification
                        </Button>
                    </Flex>
                    : degree.isPendingVerification ?
                    <Flex justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase color="yellow">
                            Pending (Requested)
                        </Button>
                    </Flex>
                    : null
                }
            </div>
        </Group>
    </Card>);
}
