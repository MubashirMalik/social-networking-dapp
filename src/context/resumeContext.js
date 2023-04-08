import React, { useState, useEffect } from 'react';
import resumeKeywords from '../services/resumeRanking';
// import { addressFormatter } from "../util";

const ResumeContext = React.createContext()

function ResumeContextProvider(props) {
    const [resumeData, setresumeData] = useState({

    })
    const [resumeRankingKeywords, setresumeRanking] = useState([])
    const update = (resumeParsedData) => {
        setresumeData(resumeParsedData.data)
    }

    const updateresumeWords = (parsedResumeData) => {
        const keywordsList = resumeKeywords(parsedResumeData)
        setresumeRanking(keywordsList)
    }


    return (
        <ResumeContext.Provider value={{ resumeData, update ,resumeRankingKeywords ,updateresumeWords}}>
            {props.children}
        </ResumeContext.Provider>
    )
}

export { ResumeContextProvider, ResumeContext }