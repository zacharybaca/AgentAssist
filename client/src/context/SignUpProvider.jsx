import { SignUpContext } from './SignUpContext';
import { useState } from 'react';

export const SignUpProvider = ({ children }) => {

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
        <SignUpContext.Provider value={{
            formData,
            handleAvatarUpload,
            handleChange,
            handleSubmit
        }}>
            {children}
        </SignUpContext.Provider>
    );
};
