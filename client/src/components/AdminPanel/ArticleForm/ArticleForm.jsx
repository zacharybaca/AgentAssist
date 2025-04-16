import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useArticles } from '../context/ArticlesContext';

const ArticleForm = ({ initialData = {}, onSuccess }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const { createArticle, updateArticle } = useArticles();

  const isEditing = !!initialData._id;

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote', 'code-block'],
    ['clean'],
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = { title, content };

    try {
      if (isEditing) {
        await updateArticle(initialData._id, articleData);
      } else {
        await createArticle(articleData);
      }
      onSuccess?.(); // Optional callback to refresh view, etc.
    } catch (err) {
      console.error('Error saving article:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block font-semibold mb-1">Article Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Article Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={{ toolbar: toolbarOptions }}
          placeholder="Write the article here..."
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {isEditing ? 'Update Article' : 'Create Article'}
      </button>
    </form>
  );
};

export default ArticleForm;
