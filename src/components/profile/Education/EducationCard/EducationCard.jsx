import {createStyles, Card, Image, Text, Group, Badge, Box, Popover, Flex, Button } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthenticationContext } from '../../../../context/authenticationContext';
import {MONTH_NAMES, TOKEN_TYPE_EDUCATION} from "../../../../util";
import { getUser, requestVerification } from '../../../../Web3Client';
import {getUserPic} from "../../../../services/user.service";

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
    "image": "https://cdn-icons-png.flaticon.com/512/2231/2231492.png"
}

export function EducationCard({ degree, id, setRefreshUserData }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    const [issuingOrganization, setIssuingOrganization] = useState()
    const { providerStatus } = useContext(AuthenticationContext)
    const [url, setUrl] = useState("")
    useEffect(() => {
        getUser(degree.issuingOrganization)
        .then(res => {
            if (res) {
                setIssuingOrganization(res)
            }
        })
    }, [degree.issuingOrganization])
    useEffect(()=>{

        getUserPic(degree.issuingOrganization).then(res => {
            console.log(res.data)
            const url = URL.createObjectURL(res.data);
            setUrl(url)
        }).catch(err=>{
            console.log(err)
        })

    },[degree.issuingOrganization,providerStatus.connectedAccount])

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
            <Image src={url.length>1?url:data.image} height={100} width={100} radius={"md"}/>
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
                    <Group justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase onClick={handleClick}>
                            Request Verification
                        </Button>
                    </Group>
                    : degree.isPendingVerification ?
                    <Group justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase color="yellow">
                            Pending (Requested)
                        </Button>
                    </Group>
                    : null
                }
            </div>
        </Group>
    </Card>);
}
