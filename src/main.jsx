import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/theme.context';
import { AuthProviderWrapper } from './context/auth.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </ThemeProviderWrapper>
    </Router>
  </React.StrictMode>
);
