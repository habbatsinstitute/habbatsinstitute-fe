import { createBrowserRouter } from "react-router-dom";
import { lazily } from "react-lazily";
const {
  AboutUs,
  Course,
  CourseDetail,
  Dashboard,
  DashboardCourseCreate,
  DashboardCourseGet,
  DashboardCourseManage,
  DashboardNewsCreate,
  DashboardNewsGet,
  DashboardNewsManage,
  DashboardUsersCreate,
  DashboardUsersGet,
  DashboardUsersManage,
  Home,
  Login,
  News,
  NewsDetail,
} = lazily(() => import("./pages"));
import { AdminMiddleware, Crash, Loader, NotFound } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Crash />,
  },
  {
    path: "/courses",
    element: <Course />,
    errorElement: <Crash />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetail />,
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
    element: <AdminMiddleware />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "courses", element: <DashboardCourseGet /> },
      { path: "courses/add", element: <DashboardCourseCreate /> },
      { path: "courses/manage/:id", element: <DashboardCourseManage /> },
      { path: "news", element: <DashboardNewsGet /> },
      { path: "news/add", element: <DashboardNewsCreate /> },
      { path: "news/manage/:id", element: <DashboardNewsManage /> },
      { path: "users", element: <DashboardUsersGet /> },
      { path: "users/add", element: <DashboardUsersCreate /> },
      { path: "users/manage/:id", element: <DashboardUsersManage /> },
    ],
    errorElement: <Crash />,
  },
  { path: "/dev", element: <Loader /> },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <Crash />,
  },
]);
