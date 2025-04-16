import React, { useState } from 'react';
import { useArticles } from '../context/ArticlesContext';
import ConfirmModal from './ConfirmModal';

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
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Articles</h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article._id} className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => onEdit(article)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(article._id)}
                className="text-sm text-red-600 hover:underline"
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
