import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const login = async (username, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error('Login failed');
            const data = await res.json();

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsAuthenticated(true);

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
