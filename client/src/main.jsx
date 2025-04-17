import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthProvider.jsx';
import { ArticlesProvider } from './context/ArticlesProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ArticlesProvider>
          <App />
        </ArticlesProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
