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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
            <AuthenticationContextProvider>
                <ContractCompaniesContextProvider>
                    <MantineProvider>
			            <App />
                    </MantineProvider>
                </ContractCompaniesContextProvider>
            </AuthenticationContextProvider>
		</ BrowserRouter>
	</React.StrictMode>
);