import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ArticlesProvider } from './context/ArticlesContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <ArticlesProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ArticlesProvider>
    </AuthProvider>
  </Router>
  ,
)
