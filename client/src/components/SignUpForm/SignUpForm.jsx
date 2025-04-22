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

    const handleChange = (e) => {
        const [name, value] = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={handleChange} />
            <input type="email" placeholder="Email" onChange={handleChange} />

            <AvatarUpload onUploadComplete={handleAvatarUpload} />

            <button type="submit">Create Account</button>
        </form>
    );
}

export default SignUpForm;
