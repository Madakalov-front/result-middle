import { use } from "react";
import { AuthContext } from "./auth.context";

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext должен использоваться внутри провайдера");
  }

  return context;
};
