import './avatar-upload.css';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

export default function AvatarUpload({ onUploadComplete }) {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1.2);
    const editorRef = useRef();

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop
    });

    const handleUpload = async () => {
        if (!editorRef.current) return;

        const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
        const blob = await fetch(canvas).then(res => res.blob());

        const formData = new FormData();
        formData.append('avatar', blob, 'avatar.png');

        try {
            const res = await fetch('/api/agents/upload-avatar', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            const data = await res.json();
            onUploadComplete(data.avatarUrl);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    return (
        <div>
            {!image ? (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag and drop or click to upload a profile photo</p>
                </div>
            ) : (
                <>
                    <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={200}
                        height={200}
                        border={50}
                        borderRadius={100}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                    />
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                    />
                    <button onClick={handleUpload}>
                        Upload Avatar
                    </button>
                </>
            )}
        </div>
    );
}
