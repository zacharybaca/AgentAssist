import './sign-up-form.css';
import { useSignUp } from '../../hooks/useSignUp.js';
import AvatarUpload from '../AvatarUpload/AvatarUpload.jsx';

export default function SignUpForm() {
    const { formData, handleAvatarUpload, handleChange, handleSubmit, submitting, error, success } = useSignUp();

    return (
        <form onSubmit={handleSubmit} id="signUp">
            <h2>Create Account</h2>

            <label htmlFor="name">Please Enter Your Name: </label>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="email">Please Enter Your E-mail Address: </label>

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="username">Please Create A Username: </label>

            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Please Create A Secure Password: </label>

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label htmlFor="confirm">Please Confirm You Chosen Password: </label>

            <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />

            <label htmlFor="roles">Select A Role</label>

            <select name="roles" id="roles" form="signUp" required>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
                <option selected value="agent">Agent</option>
            </select>

            <AvatarUpload onUploadComplete={handleAvatarUpload} />

            {formData.avatar && (
                <div className="text-center">
                    <p>Preview:</p>
                    <img src={formData.avatar} alt="avatar preview" />
                </div>
            )}

            <button
                type="submit"
                disabled={submitting}
            >
                {submitting ? 'Creating account...' : 'Sign Up'}
            </button>

            {error && <p>{error}</p>}
            {success && <p>Account created successfully!</p>}
        </form>
    );
}
