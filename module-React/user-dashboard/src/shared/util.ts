import { LOCAL_FLAG_AUTH } from "./constants";

export const isAuth = () => {
  const value = localStorage.getItem(LOCAL_FLAG_AUTH);
  const isAuth = value ? JSON.parse(value) : value;
  return isAuth;
};
