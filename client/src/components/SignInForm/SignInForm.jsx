import { Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth.js";
import { useAlert } from "../../hooks/useAlert.js";
import AlertNotification from "../AlertNotification/AlertNotification.jsx";
import { useEffect } from "react";
import "./sign-in-form.css";

const SignInForm = () => {
  const { handleSubmit, form, handleChange, loading, error, success } =
    useAuth();

  const { setAlertMessage } = useAlert();

  useEffect(() => {
    if (error) {
      setAlertMessage(error);
    } else if (success) {
      setAlertMessage("Signed In Successfully!");
    }
  }, [error, setAlertMessage, success]);

  return (
    <div className="main-sign-in-container gap-3">
      <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <h2 className="mb-4">Helping You Help Them</h2>
        <h2 className="mb-4">
          <i className="bi bi-headset"></i>
          Sign In to AgentAssist
          <i className="bi bi-headset"></i>
        </h2>
        <hr />
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Enter Your Username:</Form.Label>
          <Form.Control
            className="shadow-lg"
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
            className="shadow-lg"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="d-grid mb-3">
          <Button
            type="submit"
            variant="primary"
            className="btn btn-primary d-flex align-items-center justify-content-center gap-3 py-3"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                <h1>Signing In...</h1>
              </>
            ) : (
              <>
                <i
                  className="bi bi-arrow-right-circle arrow-icon"
                  style={{ fontSize: "1.75rem" }}
                ></i>
                <h1>Sign In</h1>
              </>
            )}
          </Button>
        </div>

        {error && <AlertNotification error={error} />}
        {success && <AlertNotification success={success} />}
      </Form>
    </div>
  );
};

export default SignInForm;
