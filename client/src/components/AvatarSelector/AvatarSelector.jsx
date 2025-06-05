import './avatar-selector.css';
import React from 'react';

export default function AvatarSelector({ avatars = [], selectedAvatar, onSelect }) {
    return (
        <div className="avatar-grid">
            {avatars.map((url) => (
                <img
                    key={url}
                    src={url}
                    alt="Predefined avatar"
                    className={`card avatar-option ${selectedAvatar === url ? 'selected' : ''}`}
                    onClick={() => onSelect(url)}
                />
            ))}
        </div>
    );
}
