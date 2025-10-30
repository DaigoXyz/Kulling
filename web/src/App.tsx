import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Admin/Dashboard";
import Menu from "./Admin/Menu";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/Menu", element: <Menu /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
