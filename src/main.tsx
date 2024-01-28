import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryProvider } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryProvider>
  </React.StrictMode>,
);
