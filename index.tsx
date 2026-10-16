import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Sign-in redirects land on /admin; the app uses hash routing.
if (window.location.pathname === '/admin') window.history.replaceState(null, '', '/#/admin');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);