import React from 'react';
import ReactDOM from 'react-dom/client';

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
			        <App />
                </ContractCompaniesContextProvider>
            </AuthenticationContextProvider>
		</ BrowserRouter>
	</React.StrictMode>
);