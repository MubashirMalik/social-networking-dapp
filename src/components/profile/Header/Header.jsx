import {useState} from 'react';
import {createStyles, Header, Container, Group, Burger, Title, Avatar} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import image from '../../assets/60111.jpg'


const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        maxWidth: "100%"
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));
const data = {
    "links": [
        {
            "link": "/about",
            "label": "Features"
        },
        {
            "link": "/pricing",
            "label": "Pricing"
        },
        {
            "link": "/learn",
            "label": "Learn"
        },
        {
            "link": "/community",
            "label": "Community"
        }
    ]
}

export function HeaderMain({links}) {
    const [opened, {toggle}] = useDisclosure(false);
    const [active, setActive] = useState(data.link);
        const {classes, cx} = useStyles();

    const items = data.links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {[classes.linkActive]: active === link.link})}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={60}>
            <Container className={classes.header}>
                <Title>Indeed</Title>

                <Group>
                    <Group spacing={5} className={classes.links}>
                        {items}

                    </Group>

                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
                    <Avatar radius={"xl"} src={image} alt="it's me"/>
                </Group>


            </Container>
        </Header>
    );
}
