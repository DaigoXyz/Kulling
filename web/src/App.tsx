import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Verifikasi from "./Verifikasi";
import DashboardAdmin from "./Admin/Dashboard";
import Menu from "./Admin/Menu";
import LokasiTruck from "./Admin/LokasiTruck";
import Pesanan from "./Admin/Pesanan";
import Laporan from "./Admin/Laporan";
import DashboardDispatcher from "./Dispatcher/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/Verifikasi", element: <Verifikasi /> },
  { path: "/DashboardAdmin", element: <DashboardAdmin /> },
  { path: "/Menu", element: <Menu /> },
  { path: "/LokasiTruck", element: <LokasiTruck /> },
  { path: "/Pesanan", element: <Pesanan /> },
  { path: "/Laporan", element: <Laporan /> },
  { path: "/DashboardDispatcher", element: <DashboardDispatcher /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
