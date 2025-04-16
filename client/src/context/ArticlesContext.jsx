import { createContext, useContext, useState, useEffect } from 'react';

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const token = localStorage.getItem('token');

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  const createArticle = async (article) => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      });

      if (!res.ok) throw new Error('Create failed');
      const newArticle = await res.json();
      setArticles((prev) => [...prev, newArticle]);
      return newArticle;
    } catch (err) {
      console.error(err);
    }
  };

  const updateArticle = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Update failed');
      const updatedArticle = await res.json();
      setArticles((prev) =>
        prev.map((article) => (article._id === id ? updatedArticle : article))
      );
      return updatedArticle;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticle = async (id) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Delete failed');
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
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
