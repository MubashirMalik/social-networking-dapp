import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as React from "react";
import { Grid, Text, TextInput, Title, ActionIcon, Group, Space, Card, createStyles } from "@mantine/core";
import { Divider } from "@mantine/core";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import ApprovalTable from "./ApprovalTable";
/* import AllowanceMatineTable from "./AllowanceMatineTable";
import AddAllowance from "./AddAllowance"; */
const useStyles = createStyles((theme) => ({
    body: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        height: '100vh',
        overflowX: 'hidden'
    },
}));
function Approval() {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [refresh, setRefresh] = useState(false);

    return (
        <div className={classes.body}>
            <Card ml="xl" mt="xl" mr="xl" p="xl" withBorder >
                <Group justify={"space-between"} align={"center"}>
                    <div>
                        <Title order={3} weight={400}>Approval</Title>
                        <Text color="dimmed" size="sm">
                            All the Approvals Can be Seen here
                        </Text>

                    </div>

                </Group>

            </Card>


            <div className="master-table">
                <ApprovalTable />
            </div>


        </div>
    );
}

export default Approval;
