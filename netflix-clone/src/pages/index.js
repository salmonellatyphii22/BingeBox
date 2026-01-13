import React from 'react';
import App from './App';
import ReactDom from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

const root=ReactDom.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
);

