import { Group } from "@mantine/core";
import { HeaderMain } from "./Header/Header.jsx";
import CardHeading from "./CardHeading/CardHeading.jsx";
import Viewable from "./Viewable/Viewable.jsx";
import { Experience } from "./Experience/Experience.jsx";
import { Education } from "./Education/Education.jsx";
import { LiscenseCertifications } from "./liscenseCertifications/LiscenseCertifications.jsx"

function Profile() {
    return (
        <>
            <HeaderMain/>
            <Group ml={180} mr={180}>
                <CardHeading/>
                <Viewable/>
                <Experience/>
                <Education/>
                <LiscenseCertifications/>
            </Group>
        </>
    )
}

export default Profile