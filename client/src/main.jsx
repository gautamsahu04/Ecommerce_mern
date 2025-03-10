import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Authprovider } from "./context/Auth.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import {CartProvider} from "./context/Card.jsx"

createRoot(document.getElementById("root")).render(
  <Authprovider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </Authprovider>
);
