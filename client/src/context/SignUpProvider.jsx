import { SignUpContext } from './SignUpContext';
import { useState } from 'react';

export const SignUpProvider = ({ children }) => {

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: formData.name || '',
        email: formData.email || '',
        username: formData.username || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
        role: formData.role || '',
        avatar: formData.avatar || ''
    });

    const handleAvatarUpload = (url) => {
        setFormData(prev => ({
            ...prev,
            avatar: url
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    role: formData.role,
                    avatar: formData.avatar
                }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Signup failed');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SignUpContext.Provider value={{
            formData,
            handleAvatarUpload,
            handleChange,
            handleSubmit,
            submitting,
            success,
            error
        }}>
            {children}
        </SignUpContext.Provider>
    );
};
