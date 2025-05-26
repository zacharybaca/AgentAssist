import { useState } from "react";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <AlertContext.Provider
      value={{
        show,
        setShow,
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
