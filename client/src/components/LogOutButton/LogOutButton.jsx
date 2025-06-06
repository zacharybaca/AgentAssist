import "./log-out-button.css";
import Button from "react-bootstrap/Button";

const LogOutButton = () => {
  return (
    <div id="log-out-button-container">
      <Button variant="danger">Log Out</Button>
    </div>
  );
};

export default LogOutButton;
