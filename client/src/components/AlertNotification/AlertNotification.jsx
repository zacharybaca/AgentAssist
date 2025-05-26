import "./alert-notification.css";
import { useAlert } from "../../hooks/useAlert";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const AlertNotification = (props) => {
  const { show, setShow, alertMessage, setAlertMessage } = useAlert();

  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        setShow(false);
        setAlertMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [setAlertMessage, setShow, show]);

  if (show) {
    return (
      <Alert
        variant={props.error ? "danger" : "success"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          {props.error ? props.error : props.success}
        </Alert.Heading>
        <p>{alertMessage}</p>
      </Alert>
    );
  }
};

export default AlertNotification;
