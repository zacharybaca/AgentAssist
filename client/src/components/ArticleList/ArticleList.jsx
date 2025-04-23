import React, { useState } from 'react';
import './article-list.css';
import { useArticles } from '../../hooks/useArticles.js';
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx';

const ArticleList = ({ onEdit }) => {
  const { articles, deleteArticle } = useArticles();
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteArticle(selectedId);
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <div>
              <button
                onClick={() => onEdit(article)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(article._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this article?"
      />
    </div>
  );
};

export default ArticleList;
