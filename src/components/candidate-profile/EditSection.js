import styled from "styled-components"

const StyledEditSection = styled.div`
    border-left: 1px solid var(--border-color);
    padding: 20px 80px;
`
const EditSection = (props) => {
    return (
        <StyledEditSection>{ props.children }</StyledEditSection>
    )
} 

export default EditSection