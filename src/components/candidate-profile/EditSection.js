import React from "react"
import styled from "styled-components"

const StyledEditSection = styled.div`
    border-left: 1px solid var(--border-color);
    padding: 20px 80px;
    width: 100%;
`
const EditSection = (props) => {
    return (
        <StyledEditSection>{ props.children }</StyledEditSection>
    )
} 

export default EditSection