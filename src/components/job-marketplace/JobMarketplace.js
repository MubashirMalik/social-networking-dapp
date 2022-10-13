import React from "react"
import styled from "styled-components"
import JobCardList from "./JobCardList";
import SearchAccordion from "./SearchAccordion"

const StyledJobMarketplace = styled.div`
    display: flex;
    margin: 30px 150px;
    column-gap: 30px;
    align-items: flex-start;
`

const JobMarketplace = () => {
    return(
        <StyledJobMarketplace>
            <SearchAccordion />
            <JobCardList />
        </StyledJobMarketplace>
    )
}

export default JobMarketplace;