import React, { useState, useEffect, useRef } from 'react';
import './create-article.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useArticles } from '../../../hooks/useArticles.js';
import toast from 'react-hot-toast';

const CreateArticle = ({ initialData = {}, onSuccess }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [status, setStatus] = useState(initialData.status || 'draft');
    const [tags, setTags] = useState(initialData.tags?.join(', ') || '');
    const [lastEdited, setLastEdited] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const isEditing = !!initialData._id;

    const { createArticle, updateArticle } = useArticles();

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const cloudPresetName = import.meta.env.VITE_PRESET_NAME;
    const quillRef = useRef(null);

    useEffect(() => {
        const text = content.replace(/<[^>]+>/g, ''); // remove HTML tags
        setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }, [content]);

    useEffect(() => {
        if (isEditing) {
            setLastEdited(new Date().toLocaleString());
        }
    }, [title, content, status, tags]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudPresetName); // your unsigned presename
        formData.append('cloud_name', cloudName); // replace with your cloud name

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
, {
            method: 'POST',
            body: formData,
            });

            const data = await res.json();
            return data.secure_url;
        }       catch (error) {
            console.error('Cloudinary upload failed:', error);
            toast.error('Image upload failed');
            return null;
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await handleImageUpload(file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range?.index ?? editor.getLength(), 'image', url);
        toast.success('Image added to content!');
    };

    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'blockquote', 'code-block', 'image'],
        ['clean'],
    ];

    const modules = {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: () => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    const url = await handleImageUpload(file);
                    if (url) {
                        const range = quillRef.current.getEditor().getSelection();
                        quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
                    }
                }
            },
        },
    }};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const articleData = {
            title,
            content,
            status,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };

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
            toast.error(error?.message || 'Error occurred', {
                id: toastId,
                icon: '⚠️',
                style: { background: '#7f1d1d', color: '#fff' },
            });
        }
    };

    const handlePreview = () => {
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`<h1>${title}</h1>${content}`);
        previewWindow.document.close();
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
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div>
                <label>Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. setup, agents, billing"
                />
            </div>

            <div>
                <label>Article Content</label>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    placeholder="Write the article here..."
                />
            </div>

            <div className="info-row">
                <small>{wordCount} words</small>
                {lastEdited && <small>Last edited: {lastEdited}</small>}
            </div>

            <div className="upload-wrapper">
                <label htmlFor="imageUpload">Upload an Image</label>
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // or inline if you prefer
                />
            </div>

            <div className="button-row">
                <button type="submit">
                    {isEditing ? 'Update Article' : 'Create Article'}
                </button>
                <button type="button" onClick={handlePreview}>
                    Preview
                </button>
            </div>
        </form>
    );
};

export default CreateArticle;
