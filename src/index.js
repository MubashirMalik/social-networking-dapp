import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core'

// Contexts
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationContextProvider } from './context/authenticationContext';
import { ContractCompaniesContextProvider } from './context/contractCompaniesContext';

// Custom Components
import App from './App';

// Assets
import './index.css';
import { ResumeContextProvider } from './context/resumeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ResumeContextProvider>
                <AuthenticationContextProvider>
                    <ContractCompaniesContextProvider>

                        <MantineProvider theme={{ fontFamily: 'Inter' }}>
                            <App />
                        </MantineProvider>

                    </ContractCompaniesContextProvider>
                </AuthenticationContextProvider>
            </ResumeContextProvider>
        </ BrowserRouter>
    </React.StrictMode>
);