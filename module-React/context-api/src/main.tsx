import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { rootRouter } from "./app/route";
import { AuthProvider } from "./app/context/auth";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={rootRouter} />
  </AuthProvider>,
);
