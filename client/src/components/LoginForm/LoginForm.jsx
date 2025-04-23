import './login-form.css';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.username, form.password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <h1>Helping You Help Them — Sign In to AgentAssist</h1>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit"><LogIn size={25}/> Login</button>
    </form>
  );
};

export default LoginForm;
