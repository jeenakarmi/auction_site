import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import GlobalProvider from './context/GlobalContext';

import App from './App';

import { theme } from './theme/theme';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <ChakraProvider resetCSS theme={theme}>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </ChakraProvider>
    </BrowserRouter>
);
