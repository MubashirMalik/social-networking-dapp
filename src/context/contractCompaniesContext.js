import React, { useState, useEffect, useContext } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getAllCompanies } from '../Web3Client';
import { AuthenticationContext } from './authenticationContext';

const ContractCompaniesContext = React.createContext() 

function ContractCompaniesContextProvider(props) {
    const { providerStatus } = useContext(AuthenticationContext)
    const [companiesList, setCompaniesList] = useState([])

    useEffect(() => {
        if (providerStatus.connectedAccount) {
            getAllCompanies()
            .then(res => {
                if (!res){
                    NotificationManager.error("Something went wrong", "Loading companies failed")
                } else {
                    const addresses = res[0]
                    const names = res[1]
                    setCompaniesList(addresses.map(
                        ((address, idx) => ({ value: address, label: names[idx] + " - " + address }))
                    ))
                }
            });
        }
    }, [providerStatus.connectedAccount])

    return (
        <ContractCompaniesContext.Provider value={{ companiesList }}>
            { props.children }
            <NotificationContainer/>
        </ContractCompaniesContext.Provider>
    )
}

export { ContractCompaniesContext, ContractCompaniesContextProvider}