import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutContextProvider } from "./hooks/WorkoutContext.jsx";
import { AuthContextProvider } from "./hooks/useAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
