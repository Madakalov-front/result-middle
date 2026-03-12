import { redirect } from "react-router";
import { isAuth } from "../../shared/util";
import { ROUTE } from "../../shared/constants";

export const checkAuthDashboard = () => {
  if (!isAuth()) {
    return redirect(`/${ROUTE.login}`);
  }
  return null;
};
