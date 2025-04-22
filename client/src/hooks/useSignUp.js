import { useContext } from "react";
import { SignUpContext } from "../context/SignUpContext";

export const useSignUp = () => useContext(SignUpContext);
