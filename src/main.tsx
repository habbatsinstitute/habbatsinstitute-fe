import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { QueryProvider } from "./components";
import { getAccessToken, getUserRole } from "./lib";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";

if (getAccessToken() && getUserRole() === "2") {
  const path = window.location.pathname.startsWith("/dashboard")
    ? window.location.pathname
    : "/dashboard";

  router.navigate(path);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryProvider>
  </React.StrictMode>,
);
