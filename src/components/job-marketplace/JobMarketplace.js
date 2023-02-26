import React, { useState, useEffect } from "react"
import { getJobs } from "../../services/job.service"
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
    const [jobList, setJobList] = useState([])
    const [filteredJobList, setFilteredJobList] = useState([])
    const [searchForm, setSearchForm] = useState({
        keyword: "",
        jobModeHybrid: false,
        jobModeRemote: false,
        jobModeOnsite: false
    })

    const handleSearchFormChange = (event) => {
        const {name, value, type, checked} = event.target
        setSearchForm(prevSearchForm => ({...prevSearchForm, [name]: type === "checkbox" ? checked : value}))
    }

    useEffect(() => {
        getJobs()
        .then(res => {
            if (!res){
                console.log("Something went wrong")
            } else{
                setJobList(res);
                setFilteredJobList(res)
            }
        });
    }, [])

    useEffect(() => {
        setFilteredJobList(jobList.filter(job => { 
            let isMatched = false

            console.log(searchForm)
            console.log(jobList)

            // keyword is present in title or description
            if (job.title.includes(searchForm.keyword) || job.description.includes(searchForm.keyword)) {
                isMatched = true
            }
        
            if (searchForm.jobModeHybrid) {
                isMatched = job.mode.toLowerCase() === "hybrid"
            } else if (searchForm.jobModeRemote) {
                isMatched = job.mode.toLowerCase() === "remote"
            } else if (searchForm.jobModeOnsite) {
                isMatched = job.mode.toLowerCase() === "onsite"
            }

            return isMatched
        }))
    }, [searchForm])

    return(
        <StyledJobMarketplace>
            <SearchAccordion searchForm={searchForm} handleChange={handleSearchFormChange}/>
            <JobCardList jobList={filteredJobList} />
        </StyledJobMarketplace>
    )
}

export default JobMarketplace;