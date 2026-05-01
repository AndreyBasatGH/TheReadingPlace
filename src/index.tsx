import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Премахваме .js, TypeScript ще намери правилния файл сам

// Възклицателният знак тук е правилен за .tsx (казва, че root елементът със сигурност съществува)
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
