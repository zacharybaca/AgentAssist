import { Form, Button, Alert, Spinner } from "react-bootstrap";
import CustomLoadingButton from "../CustomLoadingButton/CustomLoadingButton";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogIn } from "lucide-react";
import "./sign-in-form.css";

const SignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

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
    <div className="main-sign-in-container gap-2">
      <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <h2 className="mb-4">Helping You Help Them — Sign In to AgentAssist</h2>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Enter Your Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Enter Your Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="form-option-container">
          <Form.Label>Select A Role: </Form.Label>
          {["admin", "manager", "supervisor", "agent"].map((role) => (
            <Form.Check
              inline
              type="checkbox"
              name="roles"
              value={role}
              label={`${role.charAt(0).toUpperCase()}${role.slice(1)}`}
              id={`default-${role}`}
              checked={form.roles?.includes(role) || false}
              onChange={handleChange}
              key={role}
            />
          ))}
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {success && (
            <Alert variant="success">Account created successfully!</Alert>
          )} */}
        <div className="sign-in-button-container">
          <CustomLoadingButton bttnText="Sign In" text="Signing In..." />
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
