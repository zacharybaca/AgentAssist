import { AppProviders } from "./context/AppProvider.jsx";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
