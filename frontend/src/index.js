import React from "react";
import { createRoot } from "react-dom/client";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);