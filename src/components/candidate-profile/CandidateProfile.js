import React, { useEffect, useState } from "react";
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
  Flex,
  Checkbox,
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
const Section = {
  Basic: 1,
  Relation: 2,
  Document: 3,
  Cost: 4,
  Other: 5,
};
const StyledCandidateProfile = styled.div`
  margin: 30px 70px;
`;
const ProfileBody = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 40px;
`;

const CandidateProfile = () => {
  const [currentSectionTargetRef, setCurrentSectionTargetRef] = useState(
    Section.Basic
  );
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [value, setValue] = useState(new Date());
  console.log(value)
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {},

    validate: {},
  });
  useEffect(() => {
    scrollIntoView();
  }, [currentSectionTargetRef]);
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
                    defaultValue="about"
                    color="green"
                  >
                    <Tabs.List className="employee-creation-tab-list">
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Basic);
                        }}
                        value="Basic"
                        /* icon={<IconPhoto size={14} />} */
                      >
                        Basic
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Relation);
                        }}
                        value="Relation"
                      >
                        Relation
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Document);
                        }}
                        value="Document"
                      >
                        Document
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Cost);
                        }}
                        value="Cost"
                      >
                        Cost
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="employee-creation-tab-list"
                        onClick={() => {
                          setCurrentSectionTargetRef(Section.Other);
                        }}
                        value="Other"
                      >
                        Other
                      </Tabs.Tab>
                    </Tabs.List>
                  </Tabs>

                  <Divider
                    style={{ marginLeft: "10px" }}
                    orientation="vertical"
                  />
                  <div
                    ref={scrollableRef}
                    className="employee-creation-tab-view-scroll-area"
                    style={{ width: "100%" }}
                  >
                    <form
                      onSubmit={form.onSubmit((values) => console.log(values))}
                      encType="multipart/form-data"
                    >
                      {/*@ts-ignore*/}
                      <Text
                        ref={
                          currentSectionTargetRef == Section.Basic
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
                      <Text
                        ref={
                          currentSectionTargetRef == Section.Relation
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
                        {...form.getInputProps("address")}
                      />
                      <Textarea
                        m="sm"
                        label="Bio"
                        placeholder="Bio"
                        withAsterisk
                        {...form.getInputProps("bio")}
                      />
                      <Text
                        ref={
                          currentSectionTargetRef == Section.Document
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
                      <Flex>
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
                      </Flex>
                      <Flex>
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
                      </Flex>
                      <Flex>
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
                      </Flex>
                      <Text
                        ref={
                          currentSectionTargetRef == Section.Cost
                            ? targetRef
                            : null
                        }
                        style={{ textAlign: "center" }}
                        mb="xs"
                        size={16}
                      >
                        Cost
                      </Text>
                      <Divider size="xs" mb="xl" />
                      <NumberInput
                        m="sm"
                        placeholder="Cost Type Co"
                        {...form.getInputProps("cost_type_co")}
                      />{" "}
                      <NumberInput
                        m="sm"
                        placeholder="Cost Level Co"
                        {...form.getInputProps("cost_level_co")}
                      />
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
                        Other
                      </Text>
                      <Divider size="xs" mb="xl" />
                      <Switch
                        m="md"
                        label="active_status"
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
                        <Button color="green" mt="sm" type="submit">
                          Submit
                        </Button>
                        <Button
                          variant="outline"
                          color="green"
                          mt="sm"
                          onClick={() => {}}
                        >
                          Submit & Next
                        </Button>
                      </div>
                    </form>
                  </div>
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
                  Company Profile Preview
                </Title>
                <Divider mt="xs" />

                <Text mt="md" weight={600} size={16}>
                  Basic{" "}
                </Text>
                <Divider />

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Company Name: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Company Address : &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Company Location: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <Text mt="md" weight={600} size={16}>
                  Relation{" "}
                </Text>
                <Divider />
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Parent Id: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Fin Year Begin: &nbsp;{" "}
                  </Text>
                  <Text size={14}></Text>
                </div>

                <Text mt="md" weight={600} size={16}>
                  Document{" "}
                </Text>
                <Divider />
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Document Header: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Document Footer: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>

                <Text mt="md" weight={600} size={16}>
                  Cost{" "}
                </Text>
                <Divider />

                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Cost Type: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <Text weight={600} size={14}>
                    Cost Level: &nbsp;{" "}
                  </Text>
                  <Text size={14}> </Text>
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
