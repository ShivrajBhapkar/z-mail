import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/font.css";
import "./styles/index.css";

import App from "./app.tsx";
import MailProvider from "./store/mail";

import { enableReactUse } from "@legendapp/state/config/enableReactUse";
enableReactUse();

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
enableReactComponents();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MailProvider>
      <App />
    </MailProvider>
  </React.StrictMode>
);
