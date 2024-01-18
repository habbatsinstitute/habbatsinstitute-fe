import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
