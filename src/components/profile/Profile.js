import { Group } from "@mantine/core";
import CardHeading from "./CardHeading/CardHeading.jsx";
import Viewable from "./Viewable/Viewable.jsx";
import { Experience } from "./Experience/Experience.jsx";
import { Education } from "./Education/Education.jsx";
import { Certification } from "./Certification/Certification.jsx"
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/authenticationContext.js";
import { getUserData } from "../../Web3Client.js";
import { NotificationManager} from 'react-notifications';

function Profile() {
    const  { providerStatus } = useContext(AuthenticationContext)
    const [degrees, setDegrees] = useState([])
    const [certifications, setCertifications] = useState([])
    const [workExperiences, setWorkExperiences] = useState([])
    const [refreshUserData, setRefreshUserData] = useState(false)

    useEffect(() => {
        getUserData(providerStatus.connectedAccount)
        .then(res => {
            if (!res){
                NotificationManager.error("Something went wrong", "Error")
            } else {
                setDegrees(res[0])
                setCertifications(res[1])
                setWorkExperiences(res[2])
            }
        });
    }, [providerStatus.connectedAccount, refreshUserData])

    return (
        <Group ml={180} mr={180} mb={80}>
            <CardHeading/>
            <Viewable/>
            <Experience workExperiences={workExperiences} setRefreshUserData={setRefreshUserData} />
            <Education degrees={degrees} setRefreshUserData={setRefreshUserData}/>
            <Certification certifications={certifications} setRefreshUserData={setRefreshUserData} />
        </Group>
    )
}

export default Profile