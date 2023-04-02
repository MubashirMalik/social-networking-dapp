import {
    createStyles,
    Card,
    Image,
    Text,
    Group,
    Badge,
    Box,
    Popover,
    Button,
    Flex,
} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthenticationContext } from '../../../../context/authenticationContext';
import { MONTH_NAMES, TOKEN_TYPE_CERTIFICATION } from '../../../../util';
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
    "image": "https://ezbrt4adg6k.exactdn.com/wp-content/uploads/2021/04/unnamed.png",
}

export function CertificationCard({ certification, id, setRefreshUserData }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    const [issuingOrganization, setIssuingOrganization] = useState()
    const { providerStatus } = useContext(AuthenticationContext)

    useEffect(() => {
        getUser(certification.issuingOrganization)
        .then(res => {
            if (res) {
                setIssuingOrganization(res)
            }
        })
    }, [certification.issuingOrganization])

    const handleClick = () => {
        requestVerification(providerStatus.connectedAccount, id, TOKEN_TYPE_CERTIFICATION)
        .then(res => {
            if (res) {
                setRefreshUserData(prevState => !prevState)
            }
        })
    }

    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <Group>
            <Image src={data.image} height={100} width={100} radius={"md"} />
            <div className={classes.body}>
                <Box className={classes.box}>
                    <Text className={classes.title} mt="sm">
                        {certification.name}
                    </Text>
                    {
                        certification.isVerified ?
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
                        { MONTH_NAMES[certification.issueMonth-1] + " " + certification.issueYear }
                    </Text>
                    -
                    <Text size="sm" color="dimmed" weight={700}>
                        {
                            (Number(certification.expirationMonth) === 0) || (Number(certification.expirationYear) === 0) ? "Doesn't expire" :
                                MONTH_NAMES[certification.expirationMonth-1]  + " " +
                                certification.expirationYear
                        }
                    </Text>
                </Group>
                <Text transform="uppercase" weight={700} size="sm">
                    { issuingOrganization?.fullName }
                </Text>
                <Group spacing="xs" width={300}>
                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                                { certification.issuingOrganization }
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                            <Text size="sm" color="dimmed" truncate>
                                { certification.issuingOrganization }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
                { !certification.isVerified && !certification.isPendingVerification ?
                    <Flex justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase onClick={handleClick}>
                            Request Verification
                        </Button>
                    </Flex>
                   : certification.isPendingVerification ?
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
