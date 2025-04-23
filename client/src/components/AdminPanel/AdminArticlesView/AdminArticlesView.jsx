import './admin-articles-view.css';
import React, { useState } from 'react';
import ArticleList from '../../ArticleList/ArticleList.jsx';
import CreateArticle from '../../AdminPanel/CreateArticle/CreateArticle.jsx';

const AdminArticlesView = () => {
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
      <h1>Manage Articles</h1>
      <CreateArticle initialData={editingArticle} onSuccess={handleSuccess} />
      <ArticleList onEdit={handleEdit} />
    </div>
  );
};

export default AdminArticlesView;
