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
    width: 420px;
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
                <div className="Menu-text">
                    <div><b>About You</b></div>
                    <div className="Description">Tell us more about you</div>
                </div>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <div className="Menu-text">
                    <div><b>Your Education</b></div>
                    <div className="Description">What's your academic background?</div>
                </div>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <div className="Menu-text">
                    <div><b>Your Experience</b></div>
                    <div className="Description">What's your experience so far?</div>
                </div>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <div className="Menu-text">
                    <div><b>Your Skills</b></div>
                    <div className="Description">What are you good at?</div>
                </div>
            </EditMenuBlock>
            <EditMenuBlock>
                <FaQuestion className="Icon"/>
                <div className="Menu-text">
                    <div><b>Your Certifications</b></div>
                    <div className="Description">Do you have any certifications?</div>
                </div>
            </EditMenuBlock>
        </StyledEditMenu>
    )
}

export default EditMenu;