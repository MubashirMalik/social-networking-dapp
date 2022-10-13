import styled from "styled-components"

const StyledEditSection = styled.div`
    border-left: 1px solid var(--border-color);
    height: 100px;
`
const EditSection = (props) => {
    return (
        <StyledEditSection>{ props.children }</StyledEditSection>
    )
} 

export default EditSection