import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

const data = {
    "avatar": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "title": "Software engineer",
    "name": "Robert Glassbreaker",
    "email": "robert@glassbreaker.io",
    "phone": "+11 (876) 890 56 23"
}

export function UserInfoIcons({  }) {
    const { classes } = useStyles();
    return (
        <div>
            <Group noWrap>
                <Avatar src={data.avatar} size={94} radius="md" />
                <div>
                    <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                        {data.title}
                    </Text>

                    <Text size="lg" weight={500} className={classes.name}>
                        {data.name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconAt stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {data.email}
                        </Text>
                    </Group>

                    <Group noWrap spacing={10} mt={5}>
                        <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {data.phone}
                        </Text>
                    </Group>
                </div>
            </Group>
        </div>
    );
}
