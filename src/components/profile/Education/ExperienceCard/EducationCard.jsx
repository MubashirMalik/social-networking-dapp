import {createStyles, Card, Image, Text, Group, Badge, Box, Popover, Flex, Button } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700, fontFamily: `Greycliff CF, ${theme.fontFamily}`, lineHeight: 1.2,
    },

    body: {
        width: "70%",
    }, box: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    }
}));

const data = {
    "image": "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    "organization": "NUST",
    "from_date": "March 2019",
    "to_date": "May 2023",
    "author": {
        "name": "Elsa Brown",
        "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    }
}

export function EducationCard({ degree }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
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
                            <>
                                <Badge size="lg" radius="xl" color="red">
                                    not verified
                                </Badge>
                                {/* <Flex justify={"flex-end"}>
                                    <Button  color={"teal"}  size="sm" compact uppercase>
                                        Verify
                                    </Button>
                                </Flex> */}
                            </> 
                    }
                </Box>
                <Group noWrap spacing="xs">
                    <Text size="sm" color="dimmed" weight={700}>
                        { degree.fromMonth + " " + degree.fromYear }
                    </Text>
                    -
                    <Text size="sm" color="dimmed" weight={700}>
                        { degree.toMonth + " " + degree.toYear }
                    </Text>
                </Group>
                <Text transform="uppercase" color="dimmed" weight={700} size="sm">
                    {data.organization}
                </Text>
                <Group spacing="xs" width={300}>
                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="xs" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                               { degree.issuingOrganization }
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                            <Text size="xs" color="dimmed" truncate>
                               { degree.issuingOrganization }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </div>
        </Group>
    </Card>);
}
