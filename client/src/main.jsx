import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ArticlesProvider } from './context/ArticlesContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <ArticlesProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ArticlesProvider>
  </Router>
  ,
)
