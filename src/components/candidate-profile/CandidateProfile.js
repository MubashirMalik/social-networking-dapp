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
import EditMenu from "./EditMenu";
import EditSection from "./EditSection";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Certification from "./sections/Certification";
import Skills from "./sections/Skills";
import { Month } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/authenticationContext";
import { getUserDetails } from "../../services/user.service";

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
  const form = useForm({
    initialValues: {
      bio: null,
      wallet_address: null,
      headline: null,
      full_name: null,
      location: null,
      city: null,
      nationality: null,
      linked_in: null,
      github: null,
      website: null,

      education: [
        {
          insititution: {
            name: "",
            address: ""
          },
          degree: null,
          from_month: null,
          from_year: null,
          to_month: null,
          to_year: null
        }
      ],
      experience: [{
        insititution: {
          name: "",
          address: ""
        },
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
          insititution: {
            name: "",
            address: ""
          },
          degree: null,
          from_month: null,
          from_year: null,
          to_month: null,
          to_year: null,
          expire: null,
        }

      ]
      ,
      skill: []

    },

    validate: {
      headline: (value) => (value ? null : "headline must not be empty"),
      full_name: (value) => (value ? null : "Full name must not be empty"),
      location: (value) => (value ? null : "Location must not be empty"),
      nationality: (value) => (value ? null : "Nationality must not be empty"),
      bio:(value) => (value ? null : "Bio must not be empty"),
      education:{
        insititution: {
          name: (value) => (value ? null : "Insitution Name must not be empty"),
          address: (value) => (value ? null : "Address Name must not be empty")
        },
        degree: (value) => (value ? null : "Degree Name must not be empty"),
        from_month: (value) => (value ? null : "From Month Name must not be empty"),
        from_year: (value) => (value ? null : "From Year Name must not be empty"),
        to_month: (value) => (value ? null : "To Month Name must not be empty"),
        to_year: (value) => (value ? null : "To Year Name must not be empty"), 
      },
      experience:{
        insititution: {
          name: (value) => (value ? null : "Insitution Name must not be empty"),
          address: (value) => (value ? null : "Address Name must not be empty")
        },
        designation: (value) => (value ? null : "Designation Name must not be empty"),
        from_month: (value) => (value ? null : "From Month Name must not be empty"),
        from_year: (value) => (value ? null : "From Year Name must not be empty"),
        to_month: (value) => (value ? null : "To Month Name must not be empty"),
        to_year: (value) => (value ? null : "To Year Name must not be empty"),
        country: (value) => (value ? null : "Country Name must not be empty"),
        city: (value) => (value ? null : "City Name must not be empty"),
        responcibilities: (value) => (value ? null : "Responcibilities Name must not be empty"),
        currently_working: (value) => (value ? null : "Currently Working Name must not be empty"),
      },
      certificaiton:{
      
          insititution: {
            name: (value) => (value ? null : "Insitution Name must not be empty"),
            address: (value) => (value ? null : "Address Name must not be empty")
          },
          title: (value) => (value ? null :  "Name must not be empty"),
          issue_month: (value) => (value ? null : "Issue Month Name must not be empty"),
          issue_year: (value) => (value ? null : "Issue Year Name must not be empty"),
          exp_month: (value) => (value ? null : "Expiration Month Name must not be empty"),
          exp_year: (value) => (value ? null : "Expiration Year Name must not be empty"), 
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
                      <TextInput
                        m="sm"
                        label="Your Nationality"
                        placeholder="Your Nationality"
                        withAsterisk
                        {...form.getInputProps("nationality")}
                      />
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
                        Experience
                      </Text>
                      <Divider size="xs" mb="xl" />
                      <Select
                        m="sm"
                        label="Institution(Name - Address)"
                        placeholder="Institution(Name - Address)"
                        withAsterisk
                        data={[]}
                        {...form.getInputProps("institution")}
                      />
                      <TextInput
                        m="sm"
                        label="Degree/Diploma"
                        placeholder="Degree/Diploma"
                        withAsterisk
                        {...form.getInputProps("degree")}
                      />
                      <Group>
                        <Select
                          m="sm"
                          label="From Month"
                          placeholder=" From Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("from_month")}
                        />
                        <TextInput
                          m="sm"
                          label="From Year"
                          placeholder="From Year"
                          withAsterisk
                          {...form.getInputProps("from_year")}
                        />
                      </Group>
                      <Group>
                        <Select
                          m="sm"
                          label="To Month"
                          placeholder=" To Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("to_month")}
                        />
                        <TextInput
                          m="sm"
                          label="To Year"
                          placeholder="To Year"
                          withAsterisk
                          {...form.getInputProps("to_year")}
                        />
                      </Group>

                      <Select
                        m="sm"
                        label="Country"
                        placeholder="Country"
                        withAsterisk
                        data={[]}
                        {...form.getInputProps("country")}
                      />
                      <TextInput
                        m="sm"
                        label="City"
                        placeholder="City"
                        withAsterisk
                        {...form.getInputProps("city")}
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
                          Add
                        </Button>

                      </div>
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
                      <Select
                        m="sm"
                        label="Compnay/Organization(Name - Address)"
                        placeholder="Compnay/Organization(Name - Address)"
                        withAsterisk
                        data={[]}
                        {...form.getInputProps("institution")}
                      />
                      <TextInput
                        m="sm"
                        label="Designation/Job Title"
                        placeholder="Designation/Title"
                        withAsterisk
                        {...form.getInputProps("degree")}
                      />
                      <Group>
                        <Select
                          m="sm"
                          label="From Month"
                          placeholder=" From Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("from_month")}
                        />
                        <TextInput
                          m="sm"
                          label="From Year"
                          placeholder="From Year"
                          withAsterisk
                          {...form.getInputProps("from_year")}
                        />
                      </Group>
                      <Group>
                        <Select
                          m="sm"
                          label="To Month"
                          placeholder=" To Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("to_month")}
                        />
                        <TextInput
                          m="sm"
                          label="To Year"
                          placeholder="To Year"
                          withAsterisk
                          {...form.getInputProps("to_year")}
                        />
                      </Group>

                      <Select
                        m="sm"
                        label="Country"
                        placeholder="Country"
                        withAsterisk
                        data={[]}
                        {...form.getInputProps("country")}
                      />
                      <TextInput
                        m="sm"
                        label="City"
                        placeholder="City"
                        withAsterisk
                        {...form.getInputProps("city")}
                      />
                      <Textarea
                        m="sm"
                        label="Responcibilites"
                        placeholder="Responcibilites"
                        withAsterisk
                        {...form.getInputProps("responcibilities")}
                      />
                      <Switch
                        m="md"
                        label="Currently Working"
                        onLabel="YES"
                        offLabel="NO"
                        size="sm"
                        {...form.getInputProps("active_status")}
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
                          Add
                        </Button>

                      </div>
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
                      <Select
                        m="sm"
                        label="Institution(Name - Address)"
                        placeholder="Institution(Name - Address)"
                        withAsterisk
                        data={[]}
                        {...form.getInputProps("institution")}
                      />
                      <TextInput
                        m="sm"
                        label="Name"
                        placeholder="Name"
                        withAsterisk
                        {...form.getInputProps("degree")}
                      />
                      <Group>
                        <Select
                          m="sm"
                          label="Issue Month"
                          placeholder=" Issue Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("from_month")}
                        />
                        <TextInput
                          m="sm"
                          label="Issue Year"
                          placeholder="Issue Year"
                          withAsterisk
                          {...form.getInputProps("from_year")}
                        />
                      </Group>
                      <Group>
                        <Select
                          m="sm"
                          label="Expiration Month"
                          placeholder=" Expiration Month"
                          withAsterisk
                          data={[]}
                          {...form.getInputProps("to_month")}
                        />
                        <TextInput
                          m="sm"
                          label="Expiration Year"
                          placeholder="Expiration Year"
                          withAsterisk
                          {...form.getInputProps("to_year")}
                        />
                        <Switch
                          m="md"
                          label="The Certificate doesn't Expire"
                          onLabel="YES"
                          offLabel="NO"
                          size="sm"
                          {...form.getInputProps("expire")}
                        />

                      </Group>

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
                    </Tabs.Panel>

                    <Tabs.Panel value="Skills" pt="xs">
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

                      <MultiSelect
                        data={data}
                        label="Large data set"
                        placeholder="Scroll to see all options"
                        maxDropdownHeight={160}
                      />

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
                  City: &nbsp;{" "}  {form.values.location}
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
                    Linked In: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Github: &nbsp;{" "}
                  </Text>


                </div>
                <Text weight={600} size={14}>
                  Website: &nbsp;{" "}
                </Text>

                <Text weight={600} size={14}>
                  Bio: &nbsp;{" "}
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
