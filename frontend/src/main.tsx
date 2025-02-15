import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

const rootElement = document.getElementById("root");

// make sure rootElement exists before rendering
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error(
    "Failed to find the root element. Make sure the element with id 'root' exists in your HTML."
  );
}
