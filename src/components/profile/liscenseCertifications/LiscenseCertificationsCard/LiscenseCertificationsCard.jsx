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
    Loader,
} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import { MONTH_NAMES } from '../../../../util';

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
    "organization": "Facebook",
    "title": "Software Engineer",
    "from_date": "Feb 2019",
    "to_date": "Feb 2021",
    "address": "0xb7bcfea0af6f76d5219d024bde453ccb102c47d18256efabbd4d5ea3471369b7",
    "author": {
        "name": "Elsa Brown",
        "avatar": "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    }
}

export function LiscenseCertificationsCard({ certification }) {
    const [opened, {close, open}] = useDisclosure(false);
    const {classes} = useStyles();
    return (<Card withBorder radius="md" p={20} className={classes.card}>
        <Group>
            <Image src={data.image} height={100} width={100} radius={"md"}/>
            <div className={classes.body}>
                <Box className={classes.box}>
                    <Text className={classes.title} mt="sm">
                        {certification.name}
                    </Text>
                    {
                        certification.isVerified ? <Badge size="lg" radius="xl" color="red">
                           not verified
                        </Badge> : <Loader color="yellow">Verfiying</Loader>
                    }


                </Box>

                <Group spacing="xs">
                    <Text size="xs" color="dimmed" weight={500}>
                        <strong>Issued: </strong> {certification.issueMonth + " " + certification.issueYear}  </Text>
                </Group>
                <Group spacing="xs">
                    <Text size="xs" color="dimmed" weight={500}>
                   <strong> Expiry: </strong>  
                    { MONTH_NAMES[certification.expirationMonth] + " " + certification.expirationYear}
                    </Text>




                </Group>
                <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                    {data.organization}
                </Text>
                <Group spacing="xs" width={300}>

                    <Popover withinPortal position="bottom" withArrow shadow="md" opened={opened}>
                        <Popover.Target>
                            <Text size="xs" color="dimmed" truncate onMouseEnter={open} onMouseLeave={close}>
                                { certification.issuingOrganization }
                            </Text>
                        </Popover.Target>
                        <Popover.Dropdown sx={{pointerEvents: 'none'}}>
                            <Text size="xs" color="dimmed" truncate>
                                { certification.issuingOrganization }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>

                </Group>
            </div>


        </Group>
    </Card>);
}
