import {createStyles, Card, Image, Text, Group, Badge, Box, Popover, Flex, Button} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import { MONTH_NAMES} from "../../../../util";

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
    "image": "https://media.licdn.com/dms/image/C4D0BAQF1Seuee0hEjA/company-logo_200_200/0/1594064752669?e=2147483647&v=beta&t=f-_DaHdiL-mCog1kCury7keFykH7XQ0bR-Xvy7DD2N8",
    "organization": "Facebook",
}

export function ExperienceCard({ workExperience }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <Group>
            <Image src={data.image} height={100} width={100} radius={"md"}/>
            <div className={classes.body}>
                <Box className={classes.box}>
                    <Text className={classes.title} mt="sm">
                        { workExperience.designation }
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
                        { MONTH_NAMES[workExperience.fromMonth-1] + " " + workExperience.fromYear }
                    </Text>
                    -
                    <Text size="sm" color="dimmed" weight={700}>
                        {
                            (Number(workExperience.toYear) === 0) || (Number(workExperience.toMonth) === 0) ? "Present" :
                            MONTH_NAMES[workExperience.toMonth-1]  + " " +
                            workExperience.toYear
                        }
                    </Text>
                </Group>
                <Text transform="uppercase" weight={700} size="sm">
                    {data.organization}
                </Text>
                <Group spacing="xs" width={300}>
                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                                { workExperience.issuingOrganization }
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                            <Text size="sm" color="dimmed" truncate>
                                { workExperience.issuingOrganization }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
                { !workExperience.isVerified ?
                    <Flex justify={"flex-end"} mt="10px">
                        <Button size="sm" compact uppercase>
                            Request Verification
                        </Button>
                    </Flex>
                    : null
                }
            </div>
        </Group>
    </Card>);
}
