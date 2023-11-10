import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import "./index.css";
/* existing imports */
import ErrorPage from "./error-page";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage /> 
  },
  {
    path: "/hola",
    element:<h1>Hola Mundo</h1>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
