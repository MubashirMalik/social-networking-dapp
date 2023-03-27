import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import {
  Text,
  TextInput,
  Title,
  ActionIcon,
  Avatar,
  Tabs,
  Select,
  Switch,
  NumberInput,
  Alert,
  Card,
  Image,
  Badge,
  Button,
  Group,
  ScrollArea,
  Textarea,
  ThemeIcon,
  CheckIcon,
  Menu,
  MultiSelect,
  createStyles,
  Checkbox,
  Box
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { Divider } from "@mantine/core";
import { Grid } from "@mantine/core";
import { ArrowLeft, Trash, X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import ProfileHeader from "./ProfileHeader";

import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/authenticationContext";


import { FlexRow, InputGroup, SkillItem } from "../styles/Section.styled"
import { ImCancelCircle } from "react-icons/im";
import Basic from "./CandidateProfileComponent/Basic";
import Social from "./CandidateProfileComponent/Social";
import Education from "./CandidateProfileComponent/Education";
import Experience from "./CandidateProfileComponent/Experience";
import Certificate from "./CandidateProfileComponent/Certificate";

const Section = {
  Basic: 1,
  Social: 2,
  Education: 3,
  Experience: 4,
  Certificate: 5,
  Skills: 6
};
const StyledCandidateProfile = styled.div`
  margin: 30px 70px;
`;
const ProfileBody = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 40px;
`;
const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: "100%"
  },
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
  },
  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
  },


}));
const CandidateProfile = () => {
  const { providerStatus } = useContext(AuthenticationContext)
  const [currentSectionTargetRef, setCurrentSectionTargetRef] = useState(
    Section.Basic
  );
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [value, setValue] = useState(new Date());
  const { classes, theme } = useStyles();
  const data = ['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']
  console.log(value)
  const navigate = useNavigate();
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState([])

  const skillsList = skills.map((skill, idx) =>
    <SkillItem key={idx}>{skill}<ImCancelCircle onClick={() => handleRemove(skill)} /></SkillItem>
  )

  const handleAdd = () => {
    if (newSkill !== "") {
      setSkills(prevSkills => [...prevSkills, newSkill])
    }
  }

  const handleRemove = (skill) => {
    setSkills(skills.filter(sk => sk !== skill))
  }
  const form = useForm({
    initialValues: {
      bio: null,
      wallet_address: null,
    
      linked_in: null,
      github: null,
      website: null,

      education: [
        {
          insititution: null,
          degree: null,
          from_month: null,
          from_year: null,
          to_month: null,
          to_year: null
        }
      ],
      experience: [{
        insititution: null,
        designation: null,
        from_month: null,
        from_year: null,
        to_month: null,
        to_year: null,
        country: null,
        city: null,
        responcibilities: null,
        currently_working: null,
      }],
      certifications: [
        {
          institution: null,
          title: null,
          issue_month: null,
          issue_year: null,
          exp_month: null,
          exp_year: null,
          expire: null,
        }

      ]
      ,
      skill: []

    },

    validate: {
      headline: (value) => (value ? null : "headline must not be empty"),
      full_name: (value) => (value ? null : "Full Name must not be empty"),
      location: (value) => (value ? null : "Location must not be empty"),
      nationality: (value) => (value ? null : "Nationality must not be empty"),
      bio: (value) => (value ? null : "Bio must not be empty"),
      education: {
        insititution: (value) => (value ? null : "Institution Name must not be empty"),
        degree: (value) => (value ? null : "Degree  must not be empty"),
        from_month: (value) => (value ? null : "From Month  must not be empty"),
        from_year: (value) => (value ? null : "From Year  must not be empty"),
        to_month: (value) => (value ? null : "To Month  must not be empty"),
        to_year: (value) => (value ? null : "To Year  must not be empty"),
        city: (value) => (value ? null : "City must not be empty"),
        country: (value) => (value ? null : "Country  must not be empty"),
      },
      experience: {
        institution: (value) => (value ? null : "Insititution  must not be empty"),
        designation: (value) => (value ? null : "Designation  must not be empty"),
        from_month: (value) => (value ? null : "From Month  must not be empty"),
        from_year: (value) => (value ? null : "From Year  must not be empty"),
        to_month: (value) => (value ? null : "To Month  must not be empty"),
        to_year: (value) => (value ? null : "To Year  must not be empty"),
        country: (value) => (value ? null : "Country  must not be empty"),
        city: (value) => (value ? null : "City  must not be empty"),
        responcibilities: (value) => (value ? null : "Responcibilities  must not be empty"),
        currently_working: (value) => (value ? null : "Currently Working  must not be empty"),
      },
      certifications: {
        institution: (value) => (value ? null : "Insititution must not be empty"),
        title: (value) => (value ? null : "Name must not be empty"),
        issue_month: (value) => (value ? null : "Issue Month must not be empty"),
        issue_year: (value) => (value ? null : "Issue Year must not be empty"),
        exp_month: (value) => (value ? null : "Expiration Month must not be empty"),
        exp_year: (value) => (value ? null : "Expiration Year must not be empty"),
      }


    },
  });
  useEffect(() => {
    scrollIntoView();
  }, [currentSectionTargetRef]);


  useEffect(() => {
    form.setFieldValue('wallet_address', providerStatus.connectedAccount);
  }, [providerStatus])

  console.log(form.values)
  return (
    <StyledCandidateProfile>


      <ProfileHeader />
      <ProfileBody>

        <div
          className="employee-creation-bottom-section"
          style={{ width: "100%" }}
        >

          <Grid>
            <Grid.Col span={7}>
              <Card withBorder>
                <div style={{ display: "flex", width: "100%" }}>
                  <Tabs
                    variant="pills"
                    orientation="vertical"
                    defaultValue="Basic"

                    style={{ width: "100%" }}
                  >
                    <Tabs.List className="employee-creation-tab-list">
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={(e) => {

                          setCurrentSectionTargetRef(Section.Basic);
                        }}
                        value="Basic"
                        style={Section.Basic === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}
                      /* icon={<IconPhoto size={14} />} */
                      >
                        Basic
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {

                          setCurrentSectionTargetRef(Section.Social);
                        }}
                        value="Social"
                        style={Section.Social === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}
                      >
                        Social
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Education);
                        }}
                        color={"blue"}
                        value="Education"
                        style={Section.Education === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}
                      >
                        Education
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Experience);
                        }}
                        value="Experience"
                        style={Section.Experience === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}

                      >
                        Experience
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Certificate);
                        }}
                        value="Certificate"
                        style={Section.Certificate === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}

                      >
                        Certificate
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Skills);
                        }}
                        value="Skills"
                        style={Section.Skills === currentSectionTargetRef ? { backgroundColor: "#1cc7d0" } : {}}

                      >
                        Skills
                      </Tabs.Tab>
                    </Tabs.List>
                   
                      <Tabs.Panel value="Basic" pt="xs" style={{ width: "100%" }}>

                        <Text
                          ref={
                            currentSectionTargetRef === Section.Basic
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Basic
                        </Text>
                        <Divider size="xs" mb="xl" />
                       <Basic/>
                      </Tabs.Panel>

                      <Tabs.Panel value="Social" pt="xs">
                        <Text
                          ref={
                            currentSectionTargetRef == Section.Social
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Add your social profiles so employers can see them when
                          you apply
                        </Text>
                        <Divider size="xs" mb="xl" />
                       <Social/>
                      </Tabs.Panel>

                      <Tabs.Panel value="Education" pt="xs">
                        <Text
                          ref={
                            currentSectionTargetRef == Section.Experience
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Education
                        </Text>
                        <Divider size="xs" mb="xl" />
                       
                     <Education/>
                      </Tabs.Panel>
                      <Tabs.Panel value="Experience" pt="xs">
                        <Text
                          ref={
                            currentSectionTargetRef == Section.Experience
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Experience
                        </Text>
                        <Divider size="xs" mb="xl" />
                       
                        <Experience/>
                      </Tabs.Panel>

                      <Tabs.Panel value="Certificate" pt="xs">
                        <Text
                          ref={
                            currentSectionTargetRef == Section.Certificate
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Licenses & Certifications
                        </Text>
                        <Divider size="xs" mb="xl" />


                        <Certificate/>
                      </Tabs.Panel>

                      <Tabs.Panel value="Skills" pt="xs" ml={10}>
                        <Text
                          ref={
                            currentSectionTargetRef == Section.Other
                              ? targetRef
                              : null
                          }
                          style={{ textAlign: "center" }}
                          mb="xs"
                          size={16}
                        >
                          Skills
                        </Text>
                        <FlexRow>
                          <InputGroup>
                            <label>Example: Java, Python, Spanish, Excel</label>
                            <input
                              name="newSkill"
                              value={newSkill}
                              type="text"
                              onChange={(event) => setNewSkill(event.target.value)}
                            />
                          </InputGroup>
                        </FlexRow>
                        <FlexRow>
                          <button onClick={handleAdd}>Add</button>
                          <button>Save</button>
                        </FlexRow>
                        <FlexRow>
                          {skillsList}
                        </FlexRow>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <Button className={classes.colorButton} mt="sm" type="submit">
                            Submit
                          </Button>

                        </div>

                      </Tabs.Panel>
               
                  </Tabs>

                  {/* <div
                    ref={scrollableRef}
                    className="employee-creation-tab-view-scroll-area"
                    style={{ width: "100%" }}
                  > */}
                  {/*  <form
                      onSubmit={form.onSubmit((values) => console.log(values))}
                      encType="multipart/form-data"
                    >
                        </form> */}
                  {/*@ts-ignore*/}



                  {/*  <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Button className={classes.colorButton} mt="sm" type="submit">
                          Add
                        </Button>

                      </div> */}

                  {/* 

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Button className={classes.colorButton} mt="sm" type="submit">
                          Add
                        </Button>

                      </div>


                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Button color="green" mt="sm" type="submit">
                          Submit
                        </Button>
                        <Button
                          variant="outline"
                          color="green"
                          mt="sm"
                          onClick={() => { }}
                        >
                          Submit & Next
                        </Button>
                      </div> */}

                  {/*   </div> */}
                </div>
              </Card>
            </Grid.Col>
            <Grid.Col span={5}>
              <Card
                className="employee-creation-right-card"
                shadow="sm"
                radius="md"
                withBorder
              >
                <Title order={2} weight={300}>
                  Profile Preview
                </Title>
                <Divider mt="xs" />

                <Text mt="md" weight={600} size={16}>
                  Basic{" "}
                </Text>
                <Divider />

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Headline: &nbsp;{" "} {form.values.headline}
                  </Text>
                  <Text size={14}> </Text>
                </div>

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Full Name : &nbsp;{" "} {form.values.full_name}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Location: &nbsp;{" "}  {form.values.location}
                  </Text>


                </div>
                <Text weight={600} size={14}>
                  City: &nbsp;{" "}  {form.values.city}
                </Text>
                <Text weight={600} size={14}>
                  Nationality {" "} {form.values.nationality}
                </Text>
                <Text mt="md" weight={600} size={16}>
                  Social Handles{" "}
                </Text>
                <Divider />

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Linked In: &nbsp;{" "} {form.values.linked_in}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Github: &nbsp;{" "} {form.values.github}
                  </Text>


                </div>
                <Text weight={600} size={14}>
                  Website: &nbsp;{" "} {form.values.website}
                </Text>

                <Text weight={600} size={14} lineClamp={1} >
                  Bio: &nbsp {form.values.bio}
                </Text>

                <Text mt="md" weight={600} size={16}>
                  Education{" "}
                </Text>
                <Divider />
                <div style={{ width: "100%" }}>
                  <Alert

                    m={10}
                    title={`Front End Developer`} >
                    <Box>
                      <Text tt="uppercase">Nustac</Text>
                      <Group><Text>Jan 2021</Text> <Text>Feb 2023</Text></Group>
                      <Group><Text>Lahore</Text> <Text>Pakistan</Text></Group>
                      <Text>The moon was a silver disc hanging in the inky blackness of the sky.</Text>
                    </Box>

                  </Alert>

                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Experience: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ width: "100%" }}>
                  <Alert

                    m={10}
                    title={`Front End Developer`} >
                    <Box>
                      <Text tt="uppercase">Nustac</Text>
                      <Group><Text>Jan 2021</Text> <Text>Feb 2023</Text></Group>
                      <Group><Text>Lahore</Text> <Text>Pakistan</Text></Group>
                      <Text>The moon was a silver disc hanging in the inky blackness of the sky.</Text>
                    </Box>

                  </Alert>

                </div>

                <Text mt="md" weight={600} size={16}>
                  Certificate{" "}
                </Text>

                <Divider />
                <Alert

                  m={10}
                  title={`Front End Developer`} >
                  <Box>
                    <Text tt="uppercase">Nustac</Text>
                    <Group><Text>Jan 2021</Text> <Text>Feb 2023</Text></Group>
                    <Group><Text>Lahore</Text> <Text>Pakistan</Text></Group>
                    <Text>The moon was a silver disc hanging in the inky blackness of the sky.</Text>
                  </Box>

                </Alert>

                <Text mt="md" weight={600} size={16}>
                  Certificate{" "}
                </Text>

                <Divider />
                <div style={{ display: "flex" }}>

                  <Text weight={600} size={14}>
                    Skills: &nbsp;{" "}
                  </Text>


                </div>
              </Card>
            </Grid.Col>
          </Grid>

          <div style={{ display: "flex" }}>
            <div>
              {/*<Card className="employee-creation-right-card-top" shadow="sm" radius="md" withBorder>*/}

              {/*</Card>*/}
            </div>
          </div>
        </div>
      </ProfileBody>
    </StyledCandidateProfile>
  );
};

export default CandidateProfile;
