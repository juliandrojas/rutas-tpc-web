import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./routes/Home";
import Login from "./routes/Login"; // Importa el componente directamente, no con *
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage /> 
  },
  {
    path: "/login",
    element:<Login />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
