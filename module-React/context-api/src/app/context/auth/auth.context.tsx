import { createContext } from "react";

export interface IAuthContext {
  username: string;
  isAuth: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
