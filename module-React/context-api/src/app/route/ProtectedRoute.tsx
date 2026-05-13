import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/auth";
import { RootRoute } from "./routes";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = RootRoute.login,
}: ProtectedRouteProps) => {
  const { isAuth } = useAuthContext();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
