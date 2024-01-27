import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  Dashboard,
  DashboardCourseCreate,
  DashboardCourseGet,
  DashboardCourseManage,
  DashboardNews,
  DashboardUsers,
  Home,
  Login,
  News,
  NewsDetail,
} from "./pages";
import { Crash, NotFound } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/dashboard/courses",
    element: <DashboardCourseGet />,
    errorElement: <Crash />,
  },
  {
    path: "/dashboard/courses/add",
    element: <DashboardCourseCreate />,
    errorElement: <Crash />,
  },
  {
    path: "/dashboard/courses/manage/:id",
    element: <DashboardCourseManage />,
    errorElement: <Crash />,
  },
  {
    path: "/dashboard/news",
    element: <DashboardNews />,
    errorElement: <Crash />,
  },
  {
    path: "/dashboard/users",
    element: <DashboardUsers />,
    errorElement: <Crash />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <Crash />,
  },
]);
