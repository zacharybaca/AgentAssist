
import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ArticleForm from "./components/AdminPanel/ArticleForm/ArticleForm";

function App() {
  const navigate = useNavigate();

  return (

    <>
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
