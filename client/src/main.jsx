import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Authprovider } from "./context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <Authprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Authprovider>
);
