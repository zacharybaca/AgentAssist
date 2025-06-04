import './avatar-upload.css';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import AvatarSelector from '../AvatarSelector/AvatarSelector.jsx';

export default function AvatarUpload({ onUploadComplete }) {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1.2);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [usePredefined, setUsePredefined] = useState(false);
    const [selectedPredefined, setSelectedPredefined] = useState(null);

    const editorRef = useRef();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Only image files are allowed.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size must be under 2MB.');
            return;
        }

        setImage(file);
        setError(null);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if (!editorRef.current) return;

        const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
        const blob = await fetch(canvas).then(res => res.blob());

        const formData = new FormData();
        formData.append('avatar', blob, 'avatar.png');

        try {
            setUploading(true);
            const res = await fetch('/api/agents/upload-avatar', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            onUploadComplete(data.avatarUrl);
        } catch (err) {
            console.error(err);
            setError('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const predefinedAvatars = [
        '',
        '../../assets/random-avatars/customer-service-headset.png',
        '../../assets/random-avatars/female-operator-2.png',
        '../../assets/random-avatars/female-operator.png',
        '../../assets/random-avatars/male-operator-2.png',
        '../../assets/random-avatars/male-operator-3.png',
        '../../assets/random-avatars/male-operator.png'
    ];

    return (
        <div className="avatar-upload-container">
            <div className="avatar-mode-toggle">
                <button
                    type="button"
                    className={!usePredefined ? 'active' : ''}
                    onClick={() => setUsePredefined(false)}
                >
                    Upload Your Own
                </button>
                <button
                    type="button"
                    className={usePredefined ? 'active' : ''}
                    onClick={() => setUsePredefined(true)}
                >
                    Choose an Avatar
                </button>
            </div>

            {usePredefined ? (
                <AvatarSelector
                    avatars={predefinedAvatars}
                    selectedAvatar={selectedPredefined}
                    onSelect={(url) => {
                        setSelectedPredefined(url);
                        onUploadComplete(url); // Same callback behavior
                    }}
                />
            ) : (
                <div>
                    {!image ? (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p>Click or drag an image</p>
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
                                scale={scale}
                            />
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={scale}
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                            />
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload Avatar'}
                            </button>
                        </>
                    )}
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
}
