import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import InProgress from "./pages/InProgress";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <InProgress /> }, // Fallback for unimplemented routes
    ],
  },
]);

export default routes;
