import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ArticleForm from "./components/AdminPanel/ArticleForm/ArticleForm";
import AdminArticlesView from "./components/AdminPanel/AdminArticlesView/AdminArticlesView.jsx";
import { Toaster } from 'react-hot-toast';
import Logo from './assets/agent-assist-icon-no-background.png';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const loader = document.getElementById("loader");
  const loaderContainer = document.getElementById("loader-container");

  useEffect(() => {
    if (loading && loader && loaderContainer) {
      setTimeout(() => {
        loader.style.display = 'none';
        loaderContainer.style.display = 'none';
        setLoading(false);
      }, 6000);
    }
  }, [loader, loaderContainer, loading]);

  return (
    !loading && (
      <div id="main-app-container">
        <div id="nav-bar-app-container">
          <NavBar />
        </div>
        <div id="logo-container">
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <img src={Logo} alt="logo" />
          <h1>☎️"Answers at the speed of your next call"☎️</h1>
        </div>
        <Routes>
          <Route path="/admin/article-form" element={<ArticleForm onSuccess={() => {
            navigate('/articles');
          }} />} />
          <Route path="/admin/articles" element={<AdminArticlesView />} />
        </Routes>
      </div>
    )
  )
}

export default App
