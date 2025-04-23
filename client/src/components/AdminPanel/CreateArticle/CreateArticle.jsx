import React, { useState } from 'react';
import './create-article.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useArticles } from '../../../hooks/useArticles.js';
import toast from 'react-hot-toast';

const CreateArticle = ({ initialData = {}, onSuccess }) => {
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
        } catch (error) {
            toast.error(error, {
                id: toastId,
                icon: '⚠️',
                style: { background: '#7f1d1d', color: '#fff' },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Article Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Article Content</label>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={{ toolbar: toolbarOptions }}
                    placeholder="Write the article here..."
                />
            </div>

            <button type="submit">
                {isEditing ? 'Update Article' : 'Create Article'}
            </button>
        </form>
    );
};

export default CreateArticle;
