import React, { useState, useEffect, useRef } from "react";
import "./create-article.css";
import ReactQuill from "react-quill-new";
import { useArticles } from "../../../hooks/useArticles.js";
import toast from "react-hot-toast";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const cloudPresetName = import.meta.env.VITE_PRESET_NAME;

const CreateArticle = ({ initialData = {}, onSuccess }) => {
  const [title, setTitle] = useState(
    initialData.title ? initialData.title : ""
  );
  const [content, setContent] = useState(
    typeof initialData.content === "string" ? initialData.content : ""
  );
  const [status, setStatus] = useState(
    initialData.status ? initialData.status : "draft"
  );
  const [category, setCategory] = useState(
    initialData.category ? initialData.category : ""
  );
  const [tags, setTags] = useState(
    initialData.tags ? initialData.tags?.join(", ") : ""
  );
  const [lastEdited, setLastEdited] = useState(
    initialData.lastEdited ? initialData.lastEdited : null
  );
  const [wordCount, setWordCount] = useState(
    initialData.wordCount ? initialData.wordCount : 0
  );
  const [previewMode, setPreviewMode] = useState(false);
  const isEditing = !!initialData._id;

  const { createArticle, updateArticle } = useArticles();

  const quillRef = useRef(null);
  const initialRender = useRef(true);

  // Track word count
  const countWords = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.innerText || "";
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    setWordCount(countWords(content));
  }, [content]);

  // Set last edited on form changes
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (isEditing) {
      setLastEdited(new Date().toLocaleString());
    }
  }, [title, content, status, tags, isEditing]);

  // Drag-and-drop feedback class
  useEffect(() => {
    const dropArea = document.querySelector(".upload-wrapper");

    const handleDragEnter = () => dropArea.classList.add("dragover");
    const handleDragLeave = () => dropArea.classList.remove("dragover");
    const handleDropReset = () => dropArea.classList.remove("dragover");

    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDropReset);

    return () => {
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDropReset);
    };
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudPresetName);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const insertImageIntoEditor = (url) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection(true);
    if (range) {
      editor.insertEmbed(range.index, "image", url);
      editor.setSelection(range.index + 1);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await handleImageUpload(file);
      if (url) insertImageIntoEditor(url);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = await handleImageUpload(file);
      if (url) insertImageIntoEditor(url);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ size: ["small", false, "large", "huge"] }],
        ["link", "blockquote", "code-block", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            const url = await handleImageUpload(file);
            if (url) insertImageIntoEditor(url);
          };
        },
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      content,
      status,
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      lastEdited,
      wordCount,
    };

    const toastId = toast.loading(
      isEditing ? "Updating article..." : "Creating article..."
    );

    try {
      if (isEditing) {
        await updateArticle(initialData._id, articleData);
        toast.success("Article updated!", { id: toastId });
      } else {
        await createArticle(articleData);
        toast.success("Article created!", { id: toastId });
      }

      onSuccess?.();
    } catch (error) {
      toast.error(error?.message || "Error occurred", {
        id: toastId,
        icon: "⚠️",
        style: { background: "#7f1d1d", color: "#fff" },
      });
    }
  };

  return (
    <form className="create-article-container" onSubmit={handleSubmit}>
      <div>
        <h1 className="mb-4">Create An Article</h1>
        <hr />
      </div>
      <div>
        <label htmlFor="title">Article Title</label>
        <input
          className="shadow-lg"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="selectOption">Status</label>
        <select
          className="shadow-lg"
          id="selectOption"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          className="shadow-lg"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="bills">Bills</option>
          <option value="payment-plan">Payment Plan</option>
        </select>
      </div>

      <div>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          className="shadow-lg"
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. setup, agents, billing"
        />
      </div>

      {previewMode ? (
        <div className="preview-mode">
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      ) : (
        <div className="editor-container">
          <label htmlFor="content">Article Content</label>
          <ReactQuill
            id="content"
            theme="snow"
            value={typeof content === "string" ? content : ""}
            onChange={setContent}
            modules={modules}
            placeholder="Write the article here..."
          />
        </div>
      )}

      <div className="info-row">
        <small>{wordCount} words</small>
        {lastEdited && <small>Last edited: {lastEdited}</small>}
      </div>

      <div
        className="upload-wrapper"
        id="uploadWrapper"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor="imageUpload" className="custom-upload-label">
          Choose an image
          <span className="upload-button">Browse</span>
        </label>
        <input
          className="shadow-lg"
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="button-row">
        <button type="submit">
          {isEditing ? "Update Article" : "Create Article"}
        </button>
        <button type="button" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>
    </form>
  );
};

export default CreateArticle;
