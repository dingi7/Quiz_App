import { ColorModeScript } from '@chakra-ui/react';
// import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <>
    <AuthProvider>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </>
  // </StrictMode>
);

serviceWorker.unregister();
reportWebVitals();
