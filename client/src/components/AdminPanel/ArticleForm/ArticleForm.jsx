import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useArticles } from '../context/ArticlesContext'; 
import toast from 'react-hot-toast';

const ArticleForm = ({ initialData = {}, onSuccess }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const isEditing = !!initialData._id;

    const { createArticle, updateArticle } = useArticles();

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
        const toastId = toast.loading(isEditing ? 'Updating article...' : 'Creating article...');

        try {
            if (isEditing) {
                await updateArticle(initialData._id, articleData);
                toast.success('Article updated!', { id: toastId });
            } else {
                await createArticle(articleData);
                toast.success('Article created!', { id: toastId });
            }

            onSuccess?.();
        } catch (err) {
            toast.error('Something went wrong.', {
                id: toastId,
                icon: '⚠️',
                style: { background: '#7f1d1d', color: '#fff' },
            });
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
