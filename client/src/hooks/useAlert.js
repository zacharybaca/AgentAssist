import { useContext } from "react";
import { AlertContext } from "../context/AlertContext.jsx";

export const useAlert = () => useContext(AlertContext);
