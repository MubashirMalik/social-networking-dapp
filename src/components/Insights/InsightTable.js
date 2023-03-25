import {
    ActionIcon,
    Box,
    Group,
    Badge,
    useMantineTheme,
    TextInput,
    Button,
} from "@mantine/core";
import './Master.css'
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";

import { DatePicker } from "@mantine/dates";

const PAGE_SIZE = 50;
const Data = [{
    id: 1,
    job_title: "Front End Developer",
    date_applied: "10-2-2022",
    status: "Applied",
    applicant_name:"Saboor",
    job_cat:"IT"
},
{
    id: 2,
    job_title: "Backend End Developer",
    date_applied: "10-3-2022",
    status: "Rejected",
    applicant_name:"Maaz",
    job_cat:"IT"
}]
function InsightTable(props) {
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isFetching, setisFetching] = useState(false);
    const [opened, setOpened] = useState(false);
    const [editRow, setEditRow] = useState({});

    // Top section filters
    const [search, setSearch] = useDebouncedState("", 500);
    const [fromVouDate, setFromVouDate] = useState();
    const [toVouDate, setToVouDate] = useState();
    const [sortStatus, setSortStatus] = useState();
    // Pagination
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState();

    useEffect(() => {

    }, [search, fromVouDate, toVouDate, page, sortStatus]);

    const {
        breakpoints: { xs: xsBreakpoint },
    } = useMantineTheme();
    const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`;


    return (
        <Box sx={{ height: "65vh" }}>
            <div style={{ display: "flex", gap: "10px" ,marginTop:"20px" }}>
                <TextInput
                    className="alloc-search"
                    placeholder="Search by any field"
                    mb="md"
                    defaultValue={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}

                />
                <DatePicker
                    className="alloc-date-filter"
                    inputFormat="DD/MM/YYYY"
                    value={fromVouDate}
                    onChange={setFromVouDate}

                    placeholder="From"
                />
                <DatePicker
                    className="alloc-date-filter"
                    inputFormat="DD/MM/YYYY"
                    placeholder="To"
                    value={toVouDate}
                    onChange={setToVouDate}

                />
                {/*<Button*/}
                {/*  color="red"*/}
                {/*  className="alloc-delete"*/}
                {/*  disabled={selectedRecords.length === 0}*/}
                {/*>*/}
                {/*  Delete*/}
                {/*</Button>*/}
            </div>

            <DataTable
                withBorder
                highlightOnHover
                borderRadius="sm"
                verticalAlignment="top"
                fetching={isFetching}
                selectedRecords={selectedRecords}
                onSelectedRecordsChange={setSelectedRecords}
                columns={[
                    {
                        accessor: "Id",
                        title: "Id",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: ({ id }) => id,
                    },
                    {
                        accessor: "Applicant Name",
                        title: "Applicant Name",
                        // width: 300,
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: ({ applicant_name }) => applicant_name,
                    },
                    {
                        accessor: "Job Title",
                        title: "Job Title",
                        // width: 300,
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: ({ job_title }) => job_title,
                    },

                    {
                        accessor: "Job Category",
                        title: "Job Category",
                        // textAlignment: "right",
                        // width: 300,
                        sortable: true,
                        render: ({ job_cat }) => {
                            return job_cat;
                        },
                    },
                    {
                        accessor: "Date Applied",
                        title: "Date Applied",
                        // textAlignment: "right",
                        // width: 300,
                        sortable: true,
                        render: ({ date_applied }) => {
                            return date_applied;
                        },
                    },


                    {
                        accessor: "Status",
                        title: "Status",
                        // textAlignment: "center",
                        sortable: true,
                        render: ({ status }) => {
                            switch (status) {
                                case "Approved":
                                    return <Badge color="green"> Approved </Badge>;
                                case "Rejected":
                                    return <Badge color="red"> Rejected </Badge>;

                                default:
                                    return <Badge color="yellow"> Waiting </Badge>;
                            }
                        },
                    },
                    {
                        width: 150,
                        title: "Actions",
                        accessor: "actions",
                        textAlignment: "left",
                        render: (rowPayload) => {
                            return (
                                <Group>

                                </Group>
                            );
                        },
                    },
                ]}
                sortStatus={sortStatus}
                records={Data}
                onSortStatusChange={setSortStatus}
                totalRecords={totalRecords}
                page={page}
                recordsPerPage={PAGE_SIZE}
                onPageChange={(p) => setPage(p)}
            />


        </Box>
    );
}

export default InsightTable;
