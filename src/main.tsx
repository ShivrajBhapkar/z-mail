import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/font.css";
import "./styles/index.css";

import App from "./app.tsx";
import MailProvider from "./store/mail";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MailProvider>
      <App />
    </MailProvider>
  </React.StrictMode>
);
