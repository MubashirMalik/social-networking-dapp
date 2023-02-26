import React from "react"
import './SearchAccordion.css'
import { TbListSearch, TbRefresh,TbCurrentLocation, TbBuildingSkyscraper } from "react-icons/tb";


const SearchAccordion = ({ searchForm, handleChange }) => {

    return (
        <div className="Search-accordion">
            <div className="Accordion-heading Accordion-common">
                <b>Filter</b>
                <TbRefresh />
            </div>
            <div className="Accordion-input Accordion-common">
                <div className="Icon-text">
                    <TbListSearch /> 
                    Keyword
                </div>
                <input 
                    type="text"
                    name="keyword"
                    placeholder="Search..."
                    value={searchForm.keyword}
                    onChange={handleChange}
                />
            </div>
            <div className="Accordion-input Accordion-common">
                <div className="Icon-text"> 
                    <TbCurrentLocation /> 
                    Location
                </div>

                <div className="Accordion-checkbox">
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                            name="jobModeOnsite"
                            checked={searchForm.jobModeOnsite}
                            id="jobModeOnsite"
                            onChange={handleChange}
                        />
                        <label htmlFor="jobModeOnsite">Onsite</label>
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                            name="jobModeHybrid"
                            checked={searchForm.jobModeHybrid}
                            id="jobModeHybrid"
                            onChange={handleChange}
                        />
                        <label htmlFor="jobModeHybrid">Hybrid</label>
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                            name="jobModeRemote"
                            checked={searchForm.jobModeRemote}
                            id="jobModeRemote"
                            onChange={handleChange}
                        />
                        <label htmlFor="jobModeRemote">Remote</label>
                    </div>
                </div>
            </div>
            <div className="Accordion-input Accordion-common">
                <div className="Icon-text"> 
                    <TbBuildingSkyscraper /> 
                    Job engagement
                </div>

                <div className="Accordion-checkbox">
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Part Time</label>
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Full Time</label>
                    </div>
                </div>
            </div>
            <div className="Accordion-input Accordion-common">
                <div className="Icon-text"> 
                    <TbBuildingSkyscraper /> 
                    Job type
                </div>

                <div className="Accordion-checkbox">
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Permanent</label>
                        
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Temporary</label>
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Contract</label>
                    </div>
                    <div className="Checkbox-group">
                        <input
                            type="checkbox"
                        />
                        <label>Internship</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAccordion;