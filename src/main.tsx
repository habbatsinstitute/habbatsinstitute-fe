import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { Loader, QueryProvider } from "./components";
import { getAccessToken, getUserRole } from "./lib";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";
import { HelmetProvider } from "react-helmet-async";

if (getAccessToken() && getUserRole() === "2") {
  const path = window.location.pathname.startsWith("/dashboard")
    ? window.location.pathname
    : "/dashboard";

  router.navigate(path);
}

if (
  getAccessToken() &&
  getUserRole() === "1" &&
  window.location.pathname === "/login"
) {
  router.navigate("/");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
          <ToastContainer />
        </Suspense>
      </QueryProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
