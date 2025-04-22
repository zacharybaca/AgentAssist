import './sign-up-form.css';
import AvatarUpload from '../AvatarUpload/AvatarUpload.jsx';
import { useSignUp } from '../../hooks/useSignUp.js';


function SignUpForm() {
    const { formData, handleAvatarUpload, handleChange, handleSubmit } = useSignUp();

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={handleChange} value={formData.name} />
            <input type="email" placeholder="Email" onChange={handleChange} value={formData.email} />

            <AvatarUpload onUploadComplete={handleAvatarUpload} />

            <button type="submit">Create Account</button>
        </form>
    );
}

export default SignUpForm;
