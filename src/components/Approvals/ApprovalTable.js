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
import {getCompanyData, respondToVerificationRequest} from "../../Web3Client";
import {monthsList, monthsShort} from "../../services/helper/helper";

const PAGE_SIZE = 50;

function ApprovalTable(props) {
    const { providerStatus } = useContext(AuthenticationContext)
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isFetching, setisFetching] = useState(false);
    const [opened, setOpened] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [posterJobs, setposterJobs] = useState([])
    const [selected, setselected] = useState("1");
    const [row, setrow] = useState({})
    const [renderDom, setrenderDom] = useState(true);
    // Top section filters
    const [search, setSearch] = useDebouncedState("", 500);
    const [fromVouDate, setFromVouDate] = useState();
    const [toVouDate, setToVouDate] = useState();
    const [sortStatus, setSortStatus] = useState();
    // Pagination
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState();



    const {
        breakpoints: { xs: xsBreakpoint },
    } = useMantineTheme();
    const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`;

    useEffect(() => {



        getCompanyData(providerStatus.connectedAccount)
            .then(res => {
                const arr = res


                const temp = arr?.[2];

                for (let i = 2; i > 1; i--) {
                    arr[i] = arr?.[i-1];
                }


                arr[1] = temp;
                setTableData(arr)
            })

    }, [providerStatus.connectedAccount, row,renderDom])



    function getRowHeaders() {
console.log(tableData)
        switch (selected) {
            case "1":
                return  [
                    {
                        accessor: "Id",
                        title: "Id",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  payload.id,
                    },
                    {
                        accessor: "Title",
                        title: "Title",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  payload.title,
                    },
                    {
                        accessor: "Issuing Organization",
                        title: "Issuing Organization",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  payload.issuingOrganization,
                    }
                    ,{
                        accessor: "From Date",
                        title: "From Date",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  monthsShort[parseInt(payload.fromMonth)-1]+" "+payload.fromYear,
                    }
                    ,
                    {
                        accessor: "To Date",
                        title: "To Date",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  monthsShort[parseInt(payload.toMonth)-1]+" "+payload.toYear,
                    }
                    ,
                    {
                        accessor: "Verfication",
                        title: "Verfication",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  {
                            if(payload.isPendingVerification){
                                return <Badge color="yellow">Pending</Badge>
                            }
                            if(payload.isRequestRejected){
                                return <Badge color="red">Rejected</Badge>
                            }
                            if(payload.isVerified){
                                return <Badge color="teal">Verified</Badge>
                            }

                        },
                    },

                    {
                        accessor: "Action",
                        title: "Action",
                        sortable: true,
                        visibleMediaQuery: aboveXsMediaQuery,
                        render: (payload) =>  {
                            return (<Group>
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
                                        <Menu.Item onClick={async () => {
                                             respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), true).then((res)=>{
                                                 setrenderDom(!renderDom)
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
                                            onClick={async () => {
                                                 respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), false).then((res)=>{
                                                     setrenderDom(!renderDom)
                                                 })

                                            }}
                                        >
                                            Rejected
                                        </Menu.Item>

                                    </Menu.Dropdown>
                                </Menu>

                            </Group>)

                        },
                    },

                ]

            case "2":
               return  [
                   {
                       accessor: "Id",
                       title: "Id",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  payload.id,
                   },
                   {
                       accessor: "Designation",
                       title: "Designation",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  payload.designation,
                   },
                   {
                       accessor: "Issuing Organization",
                       title: "Issuing Organization",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  payload.issuingOrganization,
                   }
                   ,{
                       accessor: "From Date",
                       title: "From Date",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  monthsShort[parseInt(payload.fromMonth)-1]+" "+payload.fromYear,
                   }
                   ,
                   {
                       accessor: "To Date",
                       title: "To Date",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) => payload.toMonth === "0" || payload.toYear === "0" ?<Badge color="teal">Currently Working</Badge> :monthsShort[parseInt(payload.toMonth)-1]+" "+payload.toYear,
                   }
                   ,
                   {
                       accessor: "Verfication",
                       title: "Verfication",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  {
                           if(payload.isPendingVerification){
                               return <Badge color="yellow">Pending</Badge>
                           }
                           if(payload.isRequestRejected){
                               return <Badge color="red">Rejected</Badge>
                           }
                           if(payload.isVerified){
                               return <Badge color="teal">Verified</Badge>
                           }

                       },
                   },

                   {
                       accessor: "Action",
                       title: "Action",
                       sortable: true,
                       visibleMediaQuery: aboveXsMediaQuery,
                       render: (payload) =>  {
                           return (<Group>
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
                                       <Menu.Item onClick={async () => {
                                           respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), true).then((res)=>{
                                               setrenderDom(!renderDom)
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
                                           onClick={async () => {
                                               respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), false).then((res)=>{
                                                   setrenderDom(!renderDom)
                                               })

                                           }}
                                       >
                                           Rejected
                                       </Menu.Item>

                                   </Menu.Dropdown>
                               </Menu>

                           </Group>)

                       },
                   },

               ]

            default:
            return [
                {
                    accessor: "Id",
                    title: "Id",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  payload.id,
                },
                {
                    accessor: "Name",
                    title: "Name",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  payload.name,
                },
                {
                    accessor: "Issuing Organization",
                    title: "Issuing Organization",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  payload.issuingOrganization,
                }
                ,{
                    accessor: "Issue Date",
                    title: "Issue Date",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  monthsShort[parseInt(payload.issueMonth)-1]+" "+payload.issueYear,
                }
                ,
                {
                    accessor: "Expire Date",
                    title: "Expire Date",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) => payload.expirationMonth === "0" && payload.expirationYear === "0" ?<Badge color="teal">Doesn't Expire</Badge>: monthsShort[parseInt(payload.expirationMonth)-1]+" "+payload.expirationYear,
                }
                ,
                {
                    accessor: "Verfication",
                    title: "Verfication",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  {
                        if(payload.isPendingVerification){
                            return <Badge color="yellow">Pending</Badge>
                        }
                        if(payload.isRequestRejected){
                            return <Badge color="red">Rejected</Badge>
                        }
                        if(payload.isVerified){
                            return <Badge color="teal">Verified</Badge>
                        }

                    },
                },

                {
                    accessor: "Action",
                    title: "Action",
                    sortable: true,
                    visibleMediaQuery: aboveXsMediaQuery,
                    render: (payload) =>  {
                        return (<Group>
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
                                    <Menu.Item onClick={async () => {
                                        respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), true).then((res)=>{
                                            setrenderDom(!renderDom)
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
                                        onClick={async () => {
                                            respondToVerificationRequest(providerStatus.connectedAccount, payload.id, payload.issuingOrganization, parseInt(selected), false).then((res)=>{
                                                setrenderDom(!renderDom)
                                            })

                                        }}
                                    >
                                        Rejected
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>

                        </Group>)

                    },
                },

            ]



        }
    }
    return (
        <Box sx={{ height: "65vh" }}>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Select
                    label="Select Type"
                    placeholder="Type"
                    data={[{
                        value:"1",
                        label:"Education"
                    },
                        {
                            value:"2",
                            label:"Experience"
                        },{
                            value:"3",
                            label:"Certification"
                        }]}
                    value={selected}
                    onChange={setselected}
                    defaultValue="1"
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
                columns={
                    getRowHeaders()
                }
                sortStatus={sortStatus}
                records={tableData?tableData[parseInt(selected)-1]:[]}
                onSortStatusChange={setSortStatus}
                totalRecords={totalRecords}
                page={page}
                recordsPerPage={PAGE_SIZE}
                onPageChange={(p) => setPage(p)}
            />


        </Box>
    );
}

export default ApprovalTable;
