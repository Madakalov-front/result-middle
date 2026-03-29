import { useState, type ReactNode } from "react";
import { AuthContext, type IAuthContext } from "./auth.context";
import { LOCAL_USER_AUTH, LOCAL_USER_INFO } from "../../../shared/constants";

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUserName] = useState<string>("");

  const jsonLocalAuth = localStorage.getItem(LOCAL_USER_AUTH);
  const localAuth = jsonLocalAuth ? JSON.parse(jsonLocalAuth) : false;

  const [isAuth, setIsAuth] = useState<boolean>(localAuth);

  const login = (username: string) => {
    setUserName(username);
    localStorage.setItem(LOCAL_USER_INFO, username);
    setIsAuth(true);
    localStorage.setItem(LOCAL_USER_AUTH, JSON.stringify(true));
  };

  const logout = () => {
    setUserName("");
    localStorage.setItem(LOCAL_USER_INFO, username);
    setIsAuth(false);
    localStorage.setItem(LOCAL_USER_AUTH, JSON.stringify(false));
  };

  const context: IAuthContext = {
    username,
    isAuth,
    login,
    logout,
  };

  return <AuthContext value={context}>{children}</AuthContext>;
};
