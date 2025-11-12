import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Admin/Dashboard";
import Menu from "./Admin/Menu";
import LokasiTruck from "./Admin/LokasiTruck";
import Pesanan from "./Admin/Pesanan";
import Laporan from "./Admin/Laporan";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/Menu", element: <Menu /> },
  { path: "/LokasiTruck", element: <LokasiTruck /> },
  { path: "/Pesanan", element: <Pesanan /> },
    { path: "/Laporan", element: <Laporan /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
