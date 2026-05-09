import React from "react";
import ReactDOM from "react-dom/client";
import KueList from "./KueList";
import "./tailwind.css";
import AdminKueList from "./AdminKueList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KueList />
    <AdminKueList/>
  </React.StrictMode>
);