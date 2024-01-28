import { getUserRole } from "@/utils/token";
import { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminMiddleware: FC = (): ReactElement => {
  const role = getUserRole();

  return role === "2" ? <Outlet /> : <Navigate to={"/"} />;
};
