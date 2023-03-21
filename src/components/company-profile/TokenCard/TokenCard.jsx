import {createStyles, Card, Text, Group, Badge, Box, Popover, Button, Loader} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import React from "react";

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


export function TokenCard({verified,data}) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    return (<Card withBorder radius="md" p={20} className={classes.card}>


        <div className={classes.body}>
            <Box className={classes.box}>
                <Text className={classes.title} mt="sm">
                    {data.title}
                </Text>
                {
                    (verified ? <Badge size="lg" radius="xl" color="teal">
                        verified
                    </Badge> : <Loader color="yellow">Verfiying</Loader>)
                }


            </Box>

            <Group noWrap spacing="xs">


                <Text size="sm" color="dimmed" weight={700}>
                    {data.from_date}
                </Text>
                -
                <Text size="sm" color="dimmed" weight={700}>
                    {data.to_date}
                </Text>
            </Group>
            <Text transform="uppercase" color="dimmed" weight={700} size="sm">
                {data.organization}
            </Text>
            <Group spacing="xs" width={300}>

                <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                    <Popover.Target>
                        <Text size="sm" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                            0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7
                        </Text>
                    </Popover.Target>
                    <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                        <Text size="xs" color="dimmed" truncate>
                            0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7
                        </Text>
                    </Popover.Dropdown>
                </Popover>
                <Box className={classes.button}>
                    <Button color={"teal"} variant={"light"} radius={"sm"}>Accept</Button>
                    <Button ml={10}  radius={"sm"} color={"red"} variant={"outline"}>Reject</Button>
                </Box>
            </Group>

        </div>

    </Card>);
}