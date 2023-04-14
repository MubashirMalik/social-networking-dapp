import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../../context/authenticationContext";
import avatar from "../../images/dummy-avatar.png";
import {
  ActionIcon,
  Box,
  Group,
  TextInput,
  Button,
  Select,
  Menu,
  NumberInput,
  Grid,
  ThemeIcon,
  CheckIcon,
  Modal,
  Title,
  Divider,
  createStyles,
  Code,
  Kbd,
  Text,
} from "@mantine/core";
import {
  ArrowUp,
  CloudUpload,
  Ban,
  Trash,
  FileCheck,
} from "tabler-icons-react";
import { openConfirmModal } from "@mantine/modals";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getResumeData } from "../../services/user.service";
import { showNotification } from '@mantine/notifications';
import  {ResumeContext } from "../../context/resumeContext";
import calculateRanking from "../../services/resumeRanking";
import { useEffect } from "react";
import { getUserData } from "../../Web3Client";

const StyledProfileHeader = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
`;
const Container = styled.div`
  display: flex;
  gap: 10px;
`;
const ProfileInfo = styled.div`
  .Name {
    font-weight: 600;
    font-size: 42px;
  }

  .Strength-bar {
    display: flex;
    width: 475px;
    height: 15px;
    background-color: #e5e5e5;
    margin-bottom: 10px;
  }

  .Current {
    width: 75%;
    height: 15px;
    background-color: #8343e7;
    margin-bottom: 10px;
  }

  .Strength-text {
    font-size: 14px;
  }
`;
const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  colorButton: {
    backgroundColor: "#1cc7d0",
    '&:hover': {
        backgroundColor: "#1cc7d0",
        color:"white"

      }
  },
  colorOutlineButton:{
    borderColor: "#1cc7d0",
    backgroundColor:"white",
    color:"#1cc7d0",
    border :"1px solid",
    '&:hover': {
        backgroundColor: "#1cc7d0",
        color:"white"

      }
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

const ProfileHeader = () => {
  const { providerStatus } = useContext(AuthenticationContext);
  const  context  = useContext(ResumeContext)
  const { classes, theme } = useStyles();
  const [file, setfile] = useState(null);
  console.log(context);
  const [opened, setOpened] = useState(false);
  console.log(providerStatus.connectedAccount)

  useEffect(() => {
    getUserData(providerStatus.connectedAccount).then(res=>{

      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }, [providerStatus.connectedAccount])
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Please Drop Your Resume!"
      >
        <>
          {file === null ? (
            <Dropzone
              onDrop={(files) => setfile(files[0])}
              onReject={(files) => console.log("hello")}
              maxSize={3 * 1024 ** 2}
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
                  <CloudUpload size={36} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <Ban size={36} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <CloudUpload size={36} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag Resume here or click to select files
                  </Text>
                </div>
              </Group>
            </Dropzone>
          ) : (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileCheck color={"#1cc7d0"} size={70} />
              <Text>{file.name}</Text>

              <ActionIcon
                ml="xl"
                mt="xl"
                color="red"
                onClick={(e) => {
                  setfile(null);
                }}
                variant="light"
              >
                <Trash size={20} />
              </ActionIcon>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <Button
             
              className={classes.colorOutlineButton}
              mt="sm"
              onClick={() => {
                setOpened(false)
                setfile(null);
              }}
            >
              Close
            </Button>

            <Button
             className={classes.colorButton}
              mt="sm"
              onClick={() => {
                const formData =new  FormData();
                formData.append("filename", file);
                getResumeData(formData).then((res) => {
                 context.update(res.data)
                 console.log(calculateRanking(res.data.data))
                 context.updateresumeWords(res.data.data)
                  setOpened(false)
                  setfile(null)
                  showNotification({
                    title: 'Resume Parse',
                    message: 'Resume Parsing Successfully',
                   color:"green",
                  })
                
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
              }}
            >
              Submit
            </Button>
          </div>
        </>
      </Modal>
      <StyledProfileHeader>
        <Container>
          <img src={avatar} alt="avatar" />
          <ProfileInfo>
            <div className="Name">Hi,{providerStatus.userName}</div>
            <div className="Strength-bar">
              <div className="Current"></div>
            </div>
            <div className="Strength-text">
              <b>Profile Strength:</b> Strong
            </div>
          </ProfileInfo>
        </Container>

        <Menu transition="pop">
          <Menu.Target>
            <Button className={classes.colorButton}>
              Upload
              <ArrowUp size={26} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setOpened(true)}>
              Upload from Resume
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </StyledProfileHeader>
    </>
  );
};

export default ProfileHeader;
