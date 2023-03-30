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
import { AuthenticationContext } from "../../context/authenticationContext";
import { useContext } from "react";
import { getUserJobApplication } from "../../services/job.service";

const PAGE_SIZE = 50;
const Data = [{
    id: 1,
    job_title: "Front End Developer",
    date_applied: "10-2-2022",
    status: "Applied",
    applicant_name: "Saboor",
    job_cat: "IT"
},
{
    id: 2,
    job_title: "Backend End Developer",
    date_applied: "10-3-2022",
    status: "Rejected",
    applicant_name: "Maaz",
    job_cat: "IT"
}]
function InsightTable(props) {
    const { providerStatus } = useContext(AuthenticationContext)
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

    useEffect(() => {
        getUserJobApplication("0x123").then(res=>{
            setTableData(res)
        }).catch(err=>{
            console.log(err)
        })
     
    }, [providerStatus.connectedAccount])

    return (
        <Box sx={{ height: "65vh" }}>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
      {/*           <TextInput
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

                /> */}
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
                        render: ({ _id }) => _id,
                    },
                    {
                        accessor: "Applicant Address",
                        title: "Applicant Address",
                        // width: 300,
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: ({ applicantAddress }) => applicantAddress,
                    },
                    {
                        accessor: "Job Title",
                        title: "Job Title",
                        // width: 300,
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: ({ jobId }) => jobId.title,
                    },

                    {
                        accessor: "Job Type",
                        title: "Job Type",
                        // textAlignment: "right",
                        // width: 300,
                        sortable: true,
                        render:  ({ jobId }) => jobId.type,
                    },
                    {
                        accessor: "Date Applied",
                        title: "Date Applied",
                        // textAlignment: "right",
                        // width: 300,
                        sortable: true,
                        render: ({ jobId }) => {
                            return jobId.datePosted;
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
                records={tableData}
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
