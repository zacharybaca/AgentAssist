import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Incorrect Username and Password");
      const data = await res.json();

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      setSuccess(true);

      return { success: true };
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess(false);
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok || !token) throw new Error("No User is Currently Logged In!");

      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess(true);
      return { success: true, message: err.message };
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox" && name === "roles") {
      setForm((prevForm) => {
        const roles = prevForm.roles || [];
        return {
          ...prevForm,
          roles: checked
            ? [...roles, value] // Add selected role
            : roles.filter((r) => r !== value), // Remove unselected role
        };
      });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.username, form.password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        success,
        login,
        logout,
        form,
        error,
        loading,
        setLoading,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
