import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryProvider } from "src/api/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>,
);
