import React from "react"
import { Link } from "react-router-dom"
import { FaQuestion } from "react-icons/fa";
import styled from "styled-components"

const StyledEditMenu = styled.div`
    display: flex;
    flex-direction: column;
`
const EditMenuBlock = styled.div`
    display: flex;
    border: 1px solid var(--border-color);
    align-items: center;
    column-gap: 40px;
    width: 380px;
    padding: 10px 24px;

    .Description {
        font-size: 12px;
    }

    .Icon {
        font-size: 30px;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        padding: 10px;
    }
`

const EditMenu = () => {
    return (
        <StyledEditMenu>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <Link to="/account/about">
                    <div>
                        <div><b>About You</b></div>
                        <div className="Description">Tell us more about you</div>
                    </div>
                </Link>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <Link to="/account/education">
                    <div>
                        <div><b>Your Education</b></div>
                        <div className="Description">What's your academic background?</div>
                    </div>
                </Link>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <Link to="/account/experience">
                    <div>
                        <div><b>Your Experience</b></div>
                        <div className="Description">What's your experience so far?</div>
                    </div>
                </Link>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <Link to="/account/skills">
                    <div>
                        <div><b>Your Skills</b></div>
                        <div className="Description">What are you good at?</div>
                    </div>
                </Link>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <Link to="/account/certification">
                    <div>
                        <div><b>Your Certifications</b></div>
                        <div className="Description">Do you have any certifications?</div>
                    </div>
                </Link>
            </EditMenuBlock>
        </StyledEditMenu>
    )
}

export default EditMenu;