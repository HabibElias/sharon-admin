import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import InProgress from "./pages/InProgress";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <InProgress /> }, // Fallback for unimplemented routes
    ],
  },
]);

export default routes;
