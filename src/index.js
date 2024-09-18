import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <PayPalScriptProvider options={{ "client-id": "AXOgFhsygEXA-WPS9JAGx3rM2Dln7Sp3S4iSMGQllSx6Eb9WgLiXjTvBZegXBQVrCVv441t8yT3NNDZ2" }}>
    <App />
    
    </PayPalScriptProvider>
    </BrowserRouter>

  

  </React.StrictMode>
);


