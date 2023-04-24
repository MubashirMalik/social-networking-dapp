import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { FiEdit } from "react-icons/fi"
import './JobCard.css'
import axios from "axios"
import { showNotification } from "@mantine/notifications"
import { useContext } from "react"
import { ResumeContext } from "../../context/resumeContext"
import {
    ActionIcon,
    Button,
    createStyles,
    Group,
    Modal,
    Select,
    Stepper,
    Text, Textarea,
    TextInput,
    Title,
    Tooltip
} from "@mantine/core";
import { RingProgress, SimpleGrid, Paper, Center } from '@mantine/core';
import {AuthenticationContext} from "../../context/authenticationContext";
import {Dropzone} from "@mantine/dropzone";
import {Ban, Checks, CloudUpload, FileCheck, Trash} from "tabler-icons-react";
import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import getCountry from "../../services/helper/helper";
import {useForm} from "@mantine/form";
import {getResumeData} from "../../services/user.service";
import calculateRanking from "../../services/resumeRanking";
function escapeRegexReservedChars(str) {
    const regexReservedChars = /[.*+?^${}()|[\]\\]/g;
    return str.replace(regexReservedChars, '\\$&');
}
const useStyles = createStyles((theme) => ({
    colorButton: {
        backgroundColor: "#1cc7d0",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    },
    colorOutlineButton: {
        borderColor: "#1cc7d0",
        backgroundColor: "white",
        color: "#1cc7d0",
        border: "1px solid",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    }


}));
const JobCard = (props) => {
    const { _id, title, mode, location, description, engagement, type, posterAddress, applicantData } = props
    const context = useContext(ResumeContext)
    const {classes} = useStyles();
    const [opened, setOpened] = useState(false);
    const { providerStatus } = useContext(AuthenticationContext)
    const [file, setfile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [active, setActive] = useState(0);
    const [fileLink, setfileLink] = useState("");

console.log(applicantData)
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const form = useForm({
        initialValues: {
            headline: null,
            full_name: null,
            location: null,
            city: null,
            nationality: null,
            bio: null,
            wallet_address: null,
            linked_in: null,
            github: null,
            website_portfolio: null,
        },

        validate: {
            headline: (value) => (value ? null : "Headline must not be empty"),
            full_name: (value) => (value ? null : "Full Name must not be empty"),
            location: (value) => (value ? null : "Location must not be empty"),
            nationality: (value) => (value ? null : "Nationality must not be empty"),
            bio: (value) => (value ? null : "Bio must not be empty"),


        },
    });
useEffect(()=>{
    form.setValues({
        full_name:applicantData?.full_name,
        wallet_address:applicantData?.walletAddress,
        bio:applicantData?.bio,
        nationality:applicantData?.nationality,
        headline:applicantData?.headline,
        location:applicantData?.location,
        website_portfolio:applicantData?.website_portfolio,
        city:applicantData?.city
    })


},[applicantData])
    const handleApplication = () => {
        const data = {
            jobId: _id,
            posterAddress: posterAddress,
            applicantAddress: applicantData?.walletAddress,
            applicantId: applicantData?._id,
            status: "Pending"
        }

        var ranking = 0

        context.resumeRankingKeywords?.map(keyword => {
                if (keyword) {
                    console.log(keyword)
                    const regex = new RegExp(`\\b${escapeRegexReservedChars(keyword?.toLowerCase())}\\b`, "gi"); // create a regular expression to match whole words only
                    const found = description.toLowerCase().match(regex);

                    if (found) {
                        ranking = ranking + 0.5
                    }

                }


            })


        const rankingPayload = {
            "walletAddress": { "walletAddress": applicantData?.walletAddress },
            "updateValue": { "ranking": ranking }
        }

        axios.put("http://localhost:3001/user/update-user", rankingPayload).then((response) => {
            showNotification({
                color: "green",
                title: 'Appliction Ranking',
                message: "Appliction Ranked Successfully",
            })
        }).catch((err) => {
            showNotification({
                color: "red",
                title: 'Appliction Ranking',
                message: "Appliction Ranked Unsuccessfully",
            })
        })


        axios.post('http://localhost:3001/job/create-application', data)
            .then(response => {
                if (response.status === 200) {
                    setActive(3)
                    showNotification({
                        color: "green",
                        title: 'Appliction Submission',
                        message: "Appliction Submitted Successfully",
                    })

                } else {
                    console.error('Failed to create Application:', response.statusText);
                }
            })
            .catch(error => {
                console.log(error)
                showNotification({
                    color: "red",
                    title: 'Application Submission not Successfull',
                    message: JSON.stringify(error.response.data),
                })
                console.error('Error Submitting Application:', error);
            });
    }

    const handleSubmit = (payload) => {
        const data = { ...payload, walletAddress: providerStatus.connectedAccount }
        console.log(data)
        if(!applicantData?.walletAddress) {
            axios.post('http://localhost:3001/user/create-user', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('User created successfully!');
                        console.log('Response:', response.data);
                        showNotification({
                            title: 'User Creation',
                            message: "User Creation Successfully",
                        })
                        setActive(1)
                        props.setrenderCard(!props.renderCard)
                    } else {
                        console.error('Failed to create user:', response.statusText);
                    }
                })
                .catch(error => {
                    showNotification({
                        title: 'User Creation not Successfull',
                        message: JSON.stringify(error.response.data),
                    })
                    console.error('Error creating user:', error);
                });

        }else{
            setActive(1)
        }

    }
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Application"
                size={"70%"}

            >
                <form
                    style={{ width: "100%" }}
                    onSubmit={form.onSubmit((values, event) => {
                        handleSubmit(values)
                    })}

                >
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>

                    <Stepper.Step label="Add Bio">


                            <TextInput
                                m="sm"
                                label="Headline"
                                placeholder="Headline"
                                withAsterisk
                                {...form.getInputProps("headline")}
                            />
                            <TextInput
                                m="sm"
                                label="Full Name"
                                placeholder="Full Name"
                                withAsterisk
                                {...form.getInputProps("full_name")}
                            />
                            <TextInput
                                m="sm"
                                label="Where do you live?"
                                placeholder="Where do you live?"
                                withAsterisk
                                {...form.getInputProps("location")}
                            />
                            <TextInput
                                m="sm"
                                label="City"
                                placeholder="City"
                                {...form.getInputProps("city")}
                            />
                            <Select
                                m="sm"
                                label="Your Nationality"
                                placeholder="Your Nationality"
                                withAsterisk
                                data={getCountry()}
                                nothingFound={"No result"}
                                {...form.getInputProps("nationality")}
                            />
                            <TextInput
                                m="sm"
                                label="Linked In"
                                placeholder="Linked In"
                                {...form.getInputProps("linked_in")}
                            />
                            <TextInput
                                m="sm"
                                label="Github"
                                placeholder="Github"
                                {...form.getInputProps("github")}
                            />
                            <TextInput
                                m="sm"
                                label="Your Website/Portfolio"
                                placeholder="Your Website/Portfolio"
                                {...form.getInputProps("website_portfolio")}
                            />
                            <TextInput
                                m="sm"
                                label="Your Address"
                                placeholder="Your Address"
                                disabled={true}
                                {...form.getInputProps("wallet_address")}
                            />
                            <Textarea
                                m="sm"
                                label="Bio"
                                placeholder="Bio"
                                withAsterisk
                                {...form.getInputProps("bio")}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "right",
                                    gap: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                <Button className={classes.colorButton} mt="sm" type="submit">
                                    Save
                                </Button>

                            </div>






                    </Stepper.Step>
                    <Stepper.Step label="Add Resume"  >
                        <>
                        </>
                        {file === null ? (
                            <>
                                <Dropzone
                                    onDrop={(files) => setfile(files[0])}
                                    onReject={(files) => console.log("hello")}
                                    maxSize={3 * 1024 ** 2}
                                    style={{height:"300px"}}
                                    accept={[
                                        "application/msword",
                                        "application/pdf",
                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                    ]}
                                >
                                    <Group
                                        position="center"
                                        spacing="xl"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <Dropzone.Accept>
                                            <CloudUpload size={76} />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <Ban size={76} />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <CloudUpload size={76} />
                                        </Dropzone.Idle>

                                        <div>
                                            <Text size="xl" inline>
                                                Drag Resume here or click to select files
                                            </Text>
                                        </div>
                                    </Group>

                                </Dropzone>


                            </>


                        ) : (
                            <>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        width:"100%",
                                        height:"200px"
                                    }}
                                >
                                    <FileCheck
                                        style={{
                                            width:"70px",
                                            height:"70px"
                                        }}
                                        size={48}
                                        strokeWidth={2}

                                        color={"#1cc7d0"}
                                    />

                                    <Title>{file.name}</Title>

                                    <ActionIcon
                                        ml="xl"

                                        color="red"
                                        onClick={(e) => {
                                            setfile(null);
                                        }}
                                        variant="light"
                                        style={{
                                            width:"70px",
                                            height:"70px"
                                        }}
                                    >
                                        <Trash
                                            style={{
                                                width:"100px",
                                                height:"100px"
                                            }}
                                            size={50} />
                                    </ActionIcon>
                                </div>
                                <Group
                                    style={{
                                display:"flex",
                                        justifyContent:"end"

                                }
                                    }
                                    position={"left"}>
                                    <Button onClick={()=>{

                                        {
                                            const formData =new  FormData();
                                            formData.append("filename", file);
                                            getResumeData(formData).then((res) => {
                                                context.update(res.data)
                                                console.log(calculateRanking(res.data.data))
                                                context.updateresumeWords(res.data.data)
                                                setfileLink(res.data.file_url)
                                                setfile(null)
                                                showNotification({
                                                    title: 'Resume Parse',
                                                    message: 'Resume Parsing Successfully',
                                                    color:"green",
                                                })
                                                setActive(2)
                                            }).catch(error=>{
                                                console.log(error)
                                                showNotification({
                                                    title: 'Resume Parse',
                                                    message: 'Resume Parsing not Successfull',
                                                    styles: (theme) => ({
                                                        root: {
                                                            backgroundColor: "red",
                                                            borderColor: "red",

                                                            '&::before': { backgroundColor: theme.white },
                                                        },

                                                        title: { color: theme.white },
                                                        description: { color: theme.white },
                                                        closeButton: {
                                                            color: theme.white,
                                                            '&:hover': { backgroundColor: theme.colors.blue[7] },
                                                        },
                                                    }),
                                                })
                                            });
                                        }




                                    }} mt={5} className={classes.colorButton}>
                                        Submit
                                    </Button>
                                </Group>
                            </>

                        )}
                    </Stepper.Step>
                    <Stepper.Step label="Uploaded Resume"  >

                        <Document

                            file={fileLink}
                            onLoadSuccess={onDocumentLoadSuccess}
                        ><Group
                            style={{
                                display:"flex",
                                justifyContent:"end"

                            }
                            }
                            position={"left"}>
                            <Button onClick={handleApplication} mt={5} className={classes.colorButton}>
                                Apply
                            </Button>
                        </Group>

                            <Page renderTextLayer={false} pageNumber={pageNumber} />

                        </Document>
                    </Stepper.Step>
                    <Stepper.Step label="Successful Application"  >

                        <Paper withBorder radius="md" p="xs" >
                            <Group>
                                <RingProgress
                                    size={80}
                                    roundCaps
                                    thickness={8}
                                    sections={[{ value: "Application", color: "#1cc7d0" }]}
                                    label={
                                        <Center>
                                            <Checks
                                                size={48}
                                                strokeWidth={2}
                                                color={"#1cc7d0"}
                                            />
                                        </Center>
                                    }
                                />

                                <div>
                                    <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                                      Application
                                    </Text>
                                    <Text weight={700} size="xl">
                                        Application Submitted Successfully
                                    </Text>
                                </div>
                            </Group>
                        </Paper>

                    </Stepper.Step>
                </Stepper>

            </form>


            </Modal>
            <div className="Job-card">
                <div className="Left">
                    <div className="Job-details-row">
                        <div className="Job-mode Tiny-label" style={{ backgroundColor: `var(--job-mode-${mode.toLowerCase()})` }}>{mode.toUpperCase()}</div>
                        <div className="Job-location">
                            {location.city + ", " + location.country}</div>
                    </div>
                    <h2 className="Job-title">{title}</h2>
                    <div className="Job-details-row">
                        <div className="Job-engagement Tiny-label">{engagement.toUpperCase()}</div>
                        <div className="Job-type Tiny-label">
                            {type.toUpperCase()}
                        </div>
                    </div>
                    <div className="Job-description"
                         style={{ textAlign: 'justify', marginTop: '10px' }}
                    >
                        {description}
                    </div>
                </div>
                <div className="Right">
                    <div className="Job-match">
                        <div style={{ marginBottom: "5px" }}><b>Skill Match:</b> 90%</div>
                        <Link to={`/job/${_id}`}><FiEdit /> Edit Job</Link>
                    </div>

                    <Button
                        disabled={providerStatus.isCompany?true:false}
                        style={{backgroundColor:providerStatus.isCompany?null:"#1cc7d0"}}
                    onClick={()=>{
                    setOpened(true)}
                    }
                    >Apply</Button>


                </div>
            </div>
        </>

    )
}


export default JobCard;