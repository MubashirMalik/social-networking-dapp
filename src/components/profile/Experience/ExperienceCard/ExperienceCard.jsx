import { createStyles, Card, Image, Text, Group, Badge, Box, Popover, Flex, Button } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthenticationContext } from '../../../../context/authenticationContext';
import { getUserExperienceDetails } from '../../../../services/user.service';
import { MONTH_NAMES } from "../../../../util";
import { getUser } from '../../../../Web3Client';

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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
}

export function ExperienceCard({ workExperience }) {
    const [opened, { close, open }] = useDisclosure(false);
    const { classes } = useStyles();
    const [issuingOrganization, setIssuingOrganization] = useState()
    const { providerStatus, setProviderStatus } = useContext(AuthenticationContext)
    const [experienceData, setexperienceData] = useState([])
    useEffect(() => {
        getUser(workExperience.issuingOrganization)
            .then(res => {
                if (res) {
                    setIssuingOrganization(res)
                }
            })

        getUserExperienceDetails(providerStatus.connectedAccount).then(res => {
            setexperienceData([...res])
        }).catch(err => {
            console.log(err)
        })
    }, [workExperience.issuingOrganization, providerStatus.connectedAccount])

    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <Group>
            <Image src={data.image} height={100} width={100} radius={"md"} />
            <div className={classes.body}>
                <Box className={classes.box}>
                    <Text className={classes.title} mt="sm">
                        {workExperience.designation}
                    </Text>
                    {
                        workExperience.isVerified ?
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
                        {MONTH_NAMES[workExperience.fromMonth - 1] + " " + workExperience.fromYear}
                    </Text>
                    -
                    <Text size="sm" color="dimmed" weight={700}>
                        {
                            (Number(workExperience.toYear) === 0) || (Number(workExperience.toMonth) === 0) ? "Present" :
                                MONTH_NAMES[workExperience.toMonth - 1] + " " +
                                workExperience.toYear
                        }
                    </Text>
                </Group>
                <Text transform="uppercase" weight={700} size="sm">
                    {issuingOrganization?.fullName}
                </Text>
                <Group spacing="xs" width={300}>
                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                                {workExperience.issuingOrganization}
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                            <Text size="sm" color="dimmed" truncate>
                                {workExperience.issuingOrganization}
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
                {!workExperience.isVerified ?
                    <Group justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase>
                            Request Verification
                        </Button>
                    </Group>
                    : null
                }
            </div>
        </Group>
    </Card>);
}
