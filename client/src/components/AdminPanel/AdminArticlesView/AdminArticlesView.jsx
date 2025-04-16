import './admin-articles-view.css';
import React, { useState } from 'react';
import ArticleList from '../../ArticleList/ArticleList.jsx';
import ArticleForm from '../../AdminPanel/ArticleForm/ArticleForm.jsx';

const AdminArticlesPage = () => {
  const [editingArticle, setEditingArticle] = useState(null);

  const handleEdit = (article) => {
    setEditingArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional UX
  };

  const handleSuccess = () => {
    setEditingArticle(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">Manage Articles</h1>
      <ArticleForm initialData={editingArticle} onSuccess={handleSuccess} />
      <ArticleList onEdit={handleEdit} />
    </div>
  );
};

export default AdminArticlesPage;
