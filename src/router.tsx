import { createBrowserRouter } from "react-router-dom";
import { Crash, NotFound } from "./components";
import { AboutUs, Course, Home, Login, News, NewsDetail } from "./pages";
import { Dashboard } from "./pages/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Crash />,
  },
  {
    path: "/course",
    element: <Course />,
    errorElement: <Crash />,
  },
  {
    path: "/news",
    element: <News />,
    errorElement: <Crash />,
  },
  {
    path: "/news/:id",
    element: <NewsDetail />,
    errorElement: <Crash />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <Crash />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Crash />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Crash />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <Crash />,
  },
]);
