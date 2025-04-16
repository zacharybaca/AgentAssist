import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ArticleForm from "./components/AdminPanel/ArticleForm/ArticleForm";
import { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate();

  return (

    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <div>
        <h1>Vite + React</h1>
        <h1>This is the App Component.</h1>
        <ArticleForm onSuccess={() => {
          navigate('/articles');
        }} />
      </div>
      <Routes>
        <Route path="/articles/form" element={<ArticleForm />} />
      </Routes>
    </>
  )
}

export default App
