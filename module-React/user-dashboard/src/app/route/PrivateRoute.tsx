import React from "react";
import { isAuth } from "../../shared/util";
import { Navigate } from "react-router";
import { ROUTE } from "../../shared/constants";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (!isAuth()) {
    return <Navigate to={`${ROUTE.home}/${ROUTE.login}`} replace />;
  }
  return <>{children}</>;
};
