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


interface DbItem {
    name: string;
    iconRed: string;
    iconWhite: string;
}

function AdminDashboard() {
    const navigate = useNavigate();


    const [dbItem] = useState<DbItem[]>([
        { name: "Dashboard", iconRed: "/image/Db-red.png", iconWhite: "/image/Db-white.png" },
        { name: "Menu", iconRed: "/image/Menu-red.png", iconWhite: "/image/Menu-white.png" },
        { name: "Pesanan", iconRed: "/image/Pesanan-red.png", iconWhite: "/image/Pesanan-white.png" },
        { name: "Laporan", iconRed: "/image/Laporan-red.png", iconWhite: "/image/Laporan-white.png" },
        { name: "Lokasi Truck", iconRed: "/image/Lokasi-red.png", iconWhite: "/image/Lokasi-white.png" },
    ]);

    const [active, setActive] = useState("Laporan");

    const handleMenuClick = (itemName: string) => {
        setActive(itemName);

        const routeMap: Record<string, string> = {
        "Dashboard": "/Dashboard",
        "Menu": "/Menu",
        "Pesanan": "/Pesanan",
        "Laporan": "/Laporan",
        "Lokasi Truck" : "/LokasiTruck",
        };

        if (routeMap[itemName]) {
        navigate(routeMap[itemName]);
        }
    };

    const handleLogout = () => {
        navigate("/");
    };

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
                onClick={() => handleMenuClick(item.name)}
                className={`group flex items-center gap-2 font-semibold px-4 py-2 rounded border border-white transition-all duration-300
                ${
                isActive
                    ? "bg-gradient-to-r from-red-900 to-white-900 text-white"
                    : "bg-white text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white"
                }`}
            >
                {/* Gambar berubah sesuai hover/aktif */}
                <img
                src={isActive ? item.iconWhite : item.iconRed}
                alt={item.name}
                className={`w-5 h-6 transition-all duration-300 group-hover:hidden ${
                    isActive ? "hidden" : "inline"
                }`}
                />
                <img
                src={item.iconWhite}
                alt={item.name}
                className={`w-5 h-6 transition-all duration-300 hidden group-hover:inline ${
                    isActive ? "inline" : ""
                }`}
                />

                {/* Nama Menu */}
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
        <div className="ml-55 flex-1 w-[calc(100vw-15rem)] px-8 py-10 bg-gray-100 overflow-y-auto md:px-12 lg:px-16">

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

            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#a62418] font-bold text-2xl">Laporan Harian </h2>
            </div>
            
            {/* ====================== STATS SECTION ====================== */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
                    <img src="/image/Shop.png" alt="icon" className="absolute top-3 right-3 w-6 h-6 transition duration-300 " />
                    <p className="text-gray-700 text-sm group-hover:text-white">Total Pesanan</p>
                    <h4 className="font-bold text-xl">347</h4>
                </div>

                {/* Card 2 */}
                <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
                    <img src="/image/Dollar.png" alt="icon" className="absolute top-3 right-3 w-6 h-6 transition duration-300 " />
                    <p className="text-gray-700 text-sm group-hover:text-white">Total Pendapatan</p>
                    <h4 className="font-bold text-xl">Rp 1Jt</h4>
                </div>

                {/* Card 3 */}
                <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
                    <img src="/image/Box.png" alt="icon" className="absolute top-3 right-3 w-6 h-6 transition duration-300 " />
                    <p className="text-gray-700 text-sm group-hover:text-white">Pesanan Selesai</p>
                    <h4 className="font-bold text-xl">450</h4>
                </div>

                {/* Card 4 */}
                <div className="relative bg-white p-5 rounded-xl shadow flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white-900 hover:text-white transition duration-300 cursor-pointer group">
                    <img src="/image/X.png" alt="icon" className="absolute top-3 right-3 w-6 h-6 transition duration-300 " />
                    <p className="text-gray-700 text-sm group-hover:text-white">Pesanan Dibatalkan</p>
                    <h4 className="font-bold text-xl">150 Item</h4>
                </div>
            </div>
            
            {/* ====================== REKAP PER TRUCK ====================== */}
            <div className="mt-10 bg-white p-6 rounded-xl shadow w-full">
            <div className="mb-4">
                <h2 className="text-[#a62418] font-bold text-lg mb-1">Rekap Per Truck</h2>
                <div className="w-20 h-[2px] bg-[#a62418] rounded"></div>
            </div>

            {/* Data Truck */}
            {[
                {
                name: "Truck A",
                location: "Lubang Buaya",
                orders: 52,
                income: "Rp 2.6jt",
                stockUsed: 85,
                menu: "Hotdog Keju",
                crew: "Raka & Dinda",
                },
                {
                name: "Truck B",
                location: "Cibubur",
                orders: 64,
                income: "Rp 3.2jt",
                stockUsed: 78,
                menu: "Burger BBQ",
                crew: "Salsa & Bima",
                },
                {
                name: "Truck C",
                location: "Pasar Minggu",
                orders: 48,
                income: "Rp 2.1jt",
                stockUsed: 92,
                menu: "Roti Sosis Mozarella",
                crew: "Lia & Arya",
                },
                {
                name: "Truck D",
                location: "Rawamangun",
                orders: 71,
                income: "Rp 3.8jt",
                stockUsed: 88,
                menu: "Kebab Spesial",
                crew: "Vina & Dito",
                },
            ].map((truck, index) => (
                <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 mb-4 hover:shadow-md hover:bg-gray-50 transition-all duration-300"
                >
                {/* Header: Truck Name & Location */}
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[#a62418] font-bold text-base">{truck.name}</h3>
                    <span className="text-gray-500 font-medium text-sm">{truck.location}</span>
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 text-sm text-gray-700">
                    {/* Pesanan */}
                    <div className="flex flex-col items-start">
                    <p>Pesanan</p>
                    <p className="text-black text-lg font-semibold">{truck.orders}</p>
                    </div>

                    {/* Pendapatan */}
                    <div className="flex flex-col items-start">
                    <p>Pendapatan</p>
                    <p className="text-black text-lg font-semibold">{truck.income}</p>
                    </div>

                    {/* Stok Terpakai */}
                    <div className="flex flex-col items-start">
                    <p>Stok Terpakai</p>
                    <p className="text-black text-lg font-semibold">{truck.stockUsed}%</p>
                    <div className="w-25 bg-gray-200 h-2 rounded-full mt-1">
                        <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${truck.stockUsed}%` }}
                        ></div>
                    </div>
                    </div>

                    {/* Menu Terlaris */}
                    <div className="flex flex-col items-start">
                    <p>Menu Terlaris</p>
                    <p className="text-black text-base font-medium">{truck.menu}</p>
                    </div>

                    {/* Petugas */}
                    <div className="flex flex-col items-start">
                    <p>Petugas</p>
                    <p className="text-black text-base font-medium">{truck.crew}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
}

export default AdminDashboard;