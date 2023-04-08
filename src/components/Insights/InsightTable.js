import {
    ActionIcon,
    Box,
    Group,
    Badge,
    useMantineTheme,
    TextInput,
    Button,
    Menu,
    Select,
} from "@mantine/core";
import './Master.css'
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";
import {
    AiOutlineMenu,
} from "react-icons/ai";
import { DatePicker } from "@mantine/dates";
import { AuthenticationContext } from "../../context/authenticationContext";
import { useContext } from "react";
import { getPosterJobs, getUserJobApplication, updateUserJobApplication } from "../../services/job.service";
import { showNotification } from "@mantine/notifications";

const PAGE_SIZE = 50;

function InsightTable(props) {
    const { providerStatus } = useContext(AuthenticationContext)
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isFetching, setisFetching] = useState(false);
    const [opened, setOpened] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [posterJobs, setposterJobs] = useState([])
    const [selectedJob, setselectedJob] = useState();
    const [row, setrow] = useState({})
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
        /* getUserJobApplication("0x123").then(res => {

            setTableData(res)
        }).catch(err => {
            console.log(err)
        }) */
        console.log(providerStatus.connectedAccount)
        getPosterJobs(providerStatus.connectedAccount).then(res => {
            console.log(res)
            const parsedValues = res.posterJobs.map(item => (
                {
                    value: item._id,
                    label: item.title
                }
            ))
            console.log(parsedValues)
            setposterJobs(parsedValues)
        }).catch(err => {
            console.log(err)
        })

    }, [providerStatus.connectedAccount, row])



    useEffect(() => {
        if(selectedJob){
            console.log(selectedJob)
            getUserJobApplication(selectedJob).then(res => {
                setTableData(res)
            }).catch(err => {
                console.log(err)
            })
        }
    
    }, [selectedJob])
    
    return (
        <Box sx={{ height: "65vh" }}>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Select
                    label="Select Job"
                    placeholder="Jobs"
                    data={posterJobs}
                    value={selectedJob}
                    onChange={setselectedJob}
                    mb={10}
                    mt={10}
                    searchable
                    nothingFound="No options"
                />
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
                        render: ({ applicantId }) => applicantId._id,
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
                        render: ({ jobId }) => jobId.type,
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
                            console.log(rowPayload)
                            return (
                                <Group>
                                    <Menu width={200} shadow="md">
                                        <Menu.Target>

                                            <ActionIcon
                                                color="dark"
                                                variant="subtle"
                                            >
                                                <AiOutlineMenu size={20} />

                                            </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Item onClick={() => {
                                                updateUserJobApplication({ _id: rowPayload._id, status: "Approved" }).then(res => {
                                                    setrow(res)
                                                    showNotification({
                                                        color: "green",
                                                        title: 'Approval Success',
                                                        message: "Approved Successfully",
                                                    })
                                                }).catch(err => {
                                                    showNotification({
                                                        color: "red",
                                                        title: 'Approval Success',
                                                        message: "Approval Not Successfull",
                                                    })
                                                })

                                            }}
                                                color={"green"}
                                            >
                                                Approve
                                            </Menu.Item>
                                            <Menu.Item
                                                color={
                                                    "red"
                                                }
                                                onClick={() => {
                                                    updateUserJobApplication({ _id: rowPayload._id, status: "Rejected" }).then(res => {
                                                        setrow(res)
                                                        showNotification({
                                                            color: "green",
                                                            title: 'Rejection Success',
                                                            message: "Rejected Successfully",
                                                        })
                                                    }).catch(err => {
                                                        showNotification({
                                                            color: "red",
                                                            title: 'Rejection Success',
                                                            message: "Rejection Not Successfull",
                                                        })
                                                    })

                                                }}
                                            >
                                                Rejected
                                            </Menu.Item>

                                        </Menu.Dropdown>
                                    </Menu>

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
