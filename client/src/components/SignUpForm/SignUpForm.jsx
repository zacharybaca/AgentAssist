import "./sign-up-form.css";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import AvatarUpload from "../AvatarUpload/AvatarUpload.jsx";
import { useSignUp } from "../../hooks/useSignUp.js";

export default function SignUpForm() {
  const {
    agents,
    addedAgent,
    fetchAgents,
    createAgent,
    handleAvatarUpload,
    handleChange,
    handleSubmit,
    submitting,
    error,
    success,
  } = useSignUp();

  return (
    <div className="sign-up-form-container">
      <Form
        onSubmit={handleSubmit}
        id="signUp"
        className="p-4 border rounded bg-light"
      >
        <h2 className="mb-4">Create Account</h2>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Please Enter Your Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={addedAgent.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Please Enter Your E-mail Address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={addedAgent.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Please Create A Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={addedAgent.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Please Create A Secure Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={addedAgent.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Please Confirm Your Chosen Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={addedAgent.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="roles" className="mb-3">
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
              checked={addedAgent.roles?.includes(role) || false}
              onChange={handleChange}
              key={role}
            />
          ))}
        </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload an Avatar</Form.Label>
          <AvatarUpload onUploadComplete={handleAvatarUpload} />
        </Form.Group>

        {addedAgent.avatar && (
          <div className="text-center mb-3">
            <p>Preview:</p>
            <img
              src={addedAgent.avatar}
              alt="avatar preview"
              className="img-thumbnail"
              style={{ maxWidth: "150px" }}
            />
          </div>
        )}

        <div className="d-grid mb-3">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <Alert variant="success">Account created successfully!</Alert>
        )}
      </Form>
    </div>
  );
}
