import { redirect } from "react-router";
import { isAuth } from "../../shared/util";
import { ROUTE } from "../../shared/constants";

export const checkAuthLogin = () => {
  if (isAuth()) {
    return redirect(`/${ROUTE.dashboard.root}`);
  }
  return null;
};
