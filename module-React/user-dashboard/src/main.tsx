import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { rootRoute } from "./app/route";

const router = createBrowserRouter(rootRoute);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
