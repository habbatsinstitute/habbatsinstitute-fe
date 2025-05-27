import { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "@/lib";

export const AdminMiddleware: FC = (): ReactElement => {
  return getUserRole() === 2 ? <Outlet /> : <Navigate to={"/"} />;
};
