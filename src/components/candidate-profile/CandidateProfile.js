import React from "react"
import {
    Routes,
    Route
} from "react-router-dom"
import styled from "styled-components"

import ProfileHeader from "./ProfileHeader"
import EditMenu from "./EditMenu"
import EditSection from "./EditSection"
import About from "./sections/About"
import Education from "./sections/Education"

const StyledCandidateProfile = styled.div`
    margin: 30px 80px;
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
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/account/education" element={<Education />} />
                    </Routes>
                </EditSection>
            </ProfileBody>
        </ StyledCandidateProfile>
    )
}


export default CandidateProfile