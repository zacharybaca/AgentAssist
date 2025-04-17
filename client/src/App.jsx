import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ArticleForm from "./components/AdminPanel/ArticleForm/ArticleForm";
import AdminArticlesView from "./components/AdminPanel/AdminArticlesView/AdminArticlesView.jsx";
import { Toaster } from 'react-hot-toast';
import Logo from './assets/agent-assist-icon-no-background.png';
import Loader from "./components/Loader/Loader.jsx";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const loader = document.getElementById("loader");
  const loaderContainer = document.getElementById("loader-container");

  useEffect(() => {
    if (loader && loaderContainer) {
      setTimeout(() => {
        loader.style.display = 'none';
        loaderContainer.style.display = 'none';
        setLoading(false);
      }, 6000);
    }
  }, [loader, loaderContainer]);

  return (
    !loading && (
      <div id="main-app-container">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <img src={Logo} alt="logo" />
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
