import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import HomeCompany from "./routes/HomeCompany";
import HomeRoutes from "./routes/HomeRoutes";
import Login from "./routes/Login";
import Menu from "./routes/Menu";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <ErrorPage /> 
  },
  {
    path: "/login",
    element:<Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/company",
    element:<HomeCompany />,
    errorElement: <ErrorPage />
  },
  {
    path: "/routes",
    element:<HomeRoutes />,
    errorElement: <ErrorPage />
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
