import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import '@mantine/core/styles.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import { ErrorBoundary } from 'react-error-boundary';  
import FallBackErrorComponent from "./components/errors/FallbackComponent";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
    <MantineProvider>
    <Router>
    <ErrorBoundary FallbackComponent={FallBackErrorComponent}>
      <App />
    </ErrorBoundary>
    </Router>
    </MantineProvider>
    <Toaster position='top-center' reverseOrder={false} />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
);
