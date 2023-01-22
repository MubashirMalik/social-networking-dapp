import React from "react"
import {
    Routes,
    Route,
} from "react-router-dom"
import styled from "styled-components"

import ProfileHeader from "./ProfileHeader"
import EditMenu from "./EditMenu"
import EditSection from "./EditSection"
import About from "./sections/About"
import Education from "./sections/Education"
import Experience from "./sections/Experience"
import Certification from "./sections/Certification"
import Skills from "./sections/Skills"

const StyledCandidateProfile = styled.div`
    margin: 30px 70px;
`
const ProfileBody = styled.div`
    display: flex;
    align-items: flex-start;
    column-gap: 40px;
`

const CandidateProfile = () => {
    return (
        <StyledCandidateProfile>
            <ProfileHeader />
            <ProfileBody>
                <EditMenu />
                <EditSection>
                    <Routes>
                        <Route exact path="about" element={<About />} />
                        <Route exact path="education" element={<Education />} />
                        <Route exact path="experience" element={<Experience />} />
                        <Route exact path="certification" element={<Certification />} />
                        <Route exact path="skills" element={<Skills />} />
                    </Routes>
                </EditSection>
            </ProfileBody>
        </ StyledCandidateProfile>
    )
}


export default CandidateProfile