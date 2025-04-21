import './sign-up-form.css';
import AvatarUpload from './AvatarUpload';
import { useState } from 'react';

function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '', // <-- will hold the uploaded image URL
        // other fields...
    });

    const handleAvatarUpload = (url) => {
        setFormData(prev => ({
            ...prev,
            avatar: url
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send formData to backend, including formData.avatar
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
            <input type="email" placeholder="Email" onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />

            <AvatarUpload onUploadComplete={handleAvatarUpload} />

            <button type="submit">Create Account</button>
        </form>
    );
}

export default SignUpForm;
