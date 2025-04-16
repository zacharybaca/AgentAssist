import { createContext, useContext, useEffect, useState } from 'react';

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (newArticle) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newArticle),
    });
    const saved = await res.json();
    setArticles((prev) => [...prev, saved]);
  };

  const updateArticle = async (id, updatedFields) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    });
    const updated = await res.json();
    setArticles((prev) =>
      prev.map((a) => (a._id === id ? updated : a))
    );
  };

  const deleteArticle = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setArticles((prev) => prev.filter((a) => a._id !== id));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        fetchArticles,
        createArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
