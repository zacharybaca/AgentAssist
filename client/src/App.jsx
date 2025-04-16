import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ArticleForm from "./components/AdminPanel/ArticleForm/ArticleForm";
import AdminArticlesView from "./components/AdminPanel/AdminArticlesView/AdminArticlesView.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <h1>Agent Assist</h1>
      <Routes>
        <Route path="/admin/article-form" element={<ArticleForm onSuccess={() => {
          navigate('/articles');
        }} />} />
        <Route path="/admin/articles" element={<AdminArticlesView />} />
      </Routes>
    </div>
  )
}

export default App
