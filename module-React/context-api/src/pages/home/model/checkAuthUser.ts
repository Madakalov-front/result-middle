import { redirect } from "react-router";
import { LOCAL_USER_AUTH, LOCAL_USER_INFO } from "../../../shared/constants";
import { RootRoute } from "../../../app/route";

export async function checkAuthUser() {
  const isAuth = localStorage.getItem(LOCAL_USER_AUTH);

  if (!isAuth) {
    throw redirect(RootRoute.login);
  }

  const username = localStorage.getItem(LOCAL_USER_INFO);

  if (!username) {
    throw redirect(RootRoute.login);
  }

  return {
    username: JSON.parse(username),
  };
}
