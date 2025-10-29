import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface MenuItem {
  name: string;
  image: string;
  reviews: number;
  likes: number;
}

interface TruckStatus {
  name: string;
  orders: number;
  revenue: number;
  active: boolean; 
}

const truckStatus: TruckStatus[] = [
  { name: "Truck A", orders: 12, revenue: 1500000, active: true },
  { name: "Truck B", orders: 8, revenue: 980000, active: false },
  { name: "Truck C", orders: 15, revenue: 2100000, active: true },
];

interface DbItem {
  name: string;
  iconRed: string;
  iconWhite: string;
}

function AdminDashboard() {
    const navigate = useNavigate();
    const [menuItems] = useState<MenuItem[]>([
    { name: "Kebab", image: "/image/Kebab.png", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/image/Burger.png", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/image/Ayam.png", reviews: 150, likes: 12000 },
    { name: "Kebab", image: "/image/Kebab.png", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/image/Burger.png", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/image/Ayam.png", reviews: 150, likes: 12000 },
    { name: "Kebab", image: "/image/Kebab.png", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/image/Burger.png", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/image/Ayam.png", reviews: 150, likes: 12000 },
  ]);

  const [dbItem] = useState<DbItem[]>([
    { name: "Dashboard", iconRed: "/image/Db-red.png", iconWhite: "/image/Db-white.png" },
    { name: "Menu", iconRed: "/image/Menu-red.png", iconWhite: "/image/Menu-white.png" },
    { name: "Pesanan", iconRed: "/image/Pesanan-red.png", iconWhite: "/image/Pesanan-white.png" },
    { name: "Laporan", iconRed: "/image/Laporan-red.png", iconWhite: "/image/Laporan-white.png" },
    { name: "Lokasi Truck", iconRed: "/image/Lokasi-red.png", iconWhite: "/image/Lokasi-white.png" },
  ]);

  const handleLogout = () => {
    navigate("/"); 
  };

  const dataPendapatan = [
  { hari: "Sen", pendapatan: 800000 },
  { hari: "Sel", pendapatan: 950000 },
  { hari: "Rab", pendapatan: 1000000 },
  { hari: "Kam", pendapatan: 850000 },
  { hari: "Jum", pendapatan: 1200000 },
  { hari: "Sab", pendapatan: 1100000 },
  { hari: "Min", pendapatan: 900000 },
];

const [active, setActive] = useState("Dashboard");
    return (
    <div className="flex bg-gray-100 min-h-screen">
    {/* Sidebar */}
    <div className="fixed top-0 left-0 h-full w-60 bg-white shadow-lg flex flex-col p-6">
      <div className="flex items-center mb-8">
        <img src="/image/Logo.png" alt="Logo" className="w-100 h-auto mr-2" />
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-3 text-red-700 flex-1">
        {dbItem.map((item) => {
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-2 font-semibold px-4 py-2 rounded border border-white transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-red-900 to-white-900 text-white"
                  : "bg-white text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white"
              }`}
            >
              <img
                src={isActive ? item.iconWhite : item.iconRed}
                alt={item.name}
                className="w-5 h-5"
              />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded bg-white text-red-700 font-semibold"
        >
          <img src="/image/Logout.png" alt="Logout" className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="ml-60 flex-1 w-[calc(100vw-15rem)] px-8 py-10 space-y-10 bg-gray-100 overflow-y-auto md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
                <div className="mb-4">
                    <h2 className="text-[#a62418] font-bold text-lg mb-1">WELCOME TO MANAGEMENT</h2>
                    <p className="text-red-900 font-medium">Admin</p>
                </div>
            </div>
            <div className="flex items-center gap-2 text-red-900 font-semibold">
                <span>08.34</span>
                <img src="/image/Notifikasi.png" alt="Notif" className="w-5 h-5" />
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
            <img
            src="/image/Tp1.png"
            alt="icon"
            className="absolute top-3 right-3 w-6 h-6 transition duration-300 "
            />
            <p className="text-gray-500 text-sm group-hover:text-white">Total Penjualan</p>
            <h4 className="font-bold text-xl">2500</h4>
            <small className="text-gray-500 group-hover:text-white">Bulan Lalu :</small>
        </div>

        <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
            <img
            src="/image/Tp2.png"
            alt="icon"
            className="absolute top-3 right-3 w-6 h-6 transition duration-300 "
            />
            <p className="text-gray-500 text-sm group-hover:text-white">Total Pendapatan</p>
            <h4 className="font-bold text-xl">Rp 1Jt</h4>
            <small className="text-gray-500 group-hover:text-white">Bulan Lalu :</small>
        </div>

        <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
            <img
            src="/image/Tp3.png"
            alt="icon"
            className="absolute top-3 right-3 w-6 h-6 transition duration-300 "
            />
            <p className="text-gray-500 text-sm group-hover:text-white">Total Pelanggan</p>
            <h4 className="font-bold text-xl">450</h4>
            <small className="text-gray-500 group-hover:text-white">Bulan Lalu :</small>
        </div>

        <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
            <img
            src="/image/Tm.png"
            alt="icon"
            className="absolute top-3 right-3 w-6 h-6 transition duration-300 "
            />
            <p className="text-gray-500 text-sm group-hover:text-white">Total Menu</p>
            <h4 className="font-bold text-xl">350 Item</h4>
            <small className="text-gray-500 group-hover:text-white">Bulan Lalu :</small>
        </div>
        </div>

        {/* Grafik Pendapatan */}
        <div className="bg-white p-6 rounded-xl shadow w-full">
            <div className="flex justify-between items-center mb-3">
                <div className="mb-4">
                    <h2 className="text-[#a62418] font-bold text-lg mb-1">
                        Grafik Pendapatan Harian
                    </h2>
                <div className="w-16 h-[2px] bg-[#a62418] rounded"></div>
            </div>
            <div className="text-right">
                <p className="text-red-900 text-2xl font-bold leading-none">Rp 1Jt</p>
                <div className="flex justify-end items-baseline gap-1 mt-1">
                    <p className="text-sm text-green-600 font-semibold">+1.5%</p>
                    <p className="text-sm text-black font-medium">minggu lalu</p>
                </div>
            </div>
        </div>

        {/* Grafik menggunakan Recharts */}
        <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={dataPendapatan}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
                {/* Gradient untuk garis */}
                <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a62418" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ffbaba" stopOpacity={0.2} />
                </linearGradient>
                {/* Shadow efek untuk garis */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#a62418" floodOpacity="0.5" />
                </filter>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="hari" tick={{ fontSize: 12, fill: "#a62418" }} />
                <YAxis
                tickFormatter={(value) => `Rp ${value / 1000}K`}
                tick={{ fontSize: 12, fill: "#a62418" }}
                />
                <Tooltip
                formatter={(value) => [`Rp ${value.toLocaleString("id-ID")}`, "Pendapatan"]}
                />
                <Line
                type="monotone"
                dataKey="pendapatan"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#a62418" }}
                activeDot={{ r: 6 }}
                filter="url(#shadow)"
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
        </div>

        {/* Wrapper scroll */}
        <div className="bg-white p-6 rounded-xl shadow w-full mb-8">
        <div className="mb-4">
            <h2 className="text-[#a62418] font-bold text-lg mb-1">Menu Favorite</h2>
            <div className="w-16 h-[2px] bg-[#a62418] rounded"></div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-200">
            {menuItems.map((menu) => (
            <div
                key={menu.name}
                className="group bg-white rounded-xl shadow p-4 flex flex-col items-start min-w-[200px] sm:min-w-[220px] md:min-w-[200px] flex-shrink-0 transition-all duration-500 hover:bg-gradient-to-r hover:from-white hover:to-red-900 hover:shadow-lg hover:scale-[1.02]"
            >
                {/* Gambar */}
                <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-36 object-cover rounded-lg mb-2"
                />

                {/* Nama menu */}
                <h4 className="font-semibold mt-1 text-[16px] text-black transition-colors duration-300 group-hover:text-red-900">
                {menu.name}
                </h4>

                {/* Rating dan Reviews */}
                <div className="flex items-center mt-1">
                <div className="flex text-[#fbbf24] text-[18px]">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>☆</span>
                </div>
                <span className="text-gray-500 text-[13px] ml-2 transition-colors duration-300 group-hover:text-white">
                    ({menu.reviews} Review)
                </span>
                </div>

                {/* Tombol Like */}
                <button
                className="flex items-center gap-1 bg-[#ffe0e0] text-[#b91c1c] text-[13px] font-medium px-3 py-[4px] rounded-full mt-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-white hover:to-red-900 hover:text-white"
                >
                <span>❤️</span>
                <span>{menu.likes.toLocaleString("id-ID")} Like it</span>
                </button>
            </div>
            ))}
        </div>
        </div>

        {/* Status Truck */}
        <div className="bg-white p-6 rounded-xl shadow w-full mb-8">
        {/* Header */}
        <div className="mb-4">
            <h2 className="text-[#a62418] font-bold text-lg mb-1">Status Truck</h2>
            <div className="w-16 h-[2px] bg-[#a62418] rounded"></div>
        </div>

        {/* Daftar truck */}
        <div className="space-y-3">
            {truckStatus.map((truck) => (
            <div
                key={truck.name}
                className="flex justify-between items-center border border-gray-200 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-red-50 hover:to-white"
            >
                <div className="flex items-center gap-3">
                {/* Ikon status */}
                <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    truck.active
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                        : "bg-gray-400 shadow-none"
                    }`}
                ></div>

                {/* Nama dan orders */}
                <div className="flex flex-col">
                    <span className="text-red-900 font-semibold">{truck.name}</span>
                    <span className="text-gray-500 text-sm">{truck.orders} Orders</span>
                </div>
                </div>

                {/* Pendapatan */}
                <span className="text-green-600 font-semibold">
                Rp {truck.revenue.toLocaleString("id-ID")}
                </span>
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
  );
}

export default AdminDashboard;
