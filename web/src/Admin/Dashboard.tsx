import { useState } from "react";

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
}

interface DbItem {
  name: string;
  iconRed: string;
  iconWhite: string;
}

function AdminDashboard() {
  const [menuItems] = useState<MenuItem[]>([
    { name: "Kebab", image: "/kebab.jpg", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/burger.jpg", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/ayam.jpg", reviews: 150, likes: 12000 },
    { name: "Kebab", image: "/kebab.jpg", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/burger.jpg", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/ayam.jpg", reviews: 150, likes: 12000 },
    { name: "Kebab", image: "/kebab.jpg", reviews: 150, likes: 12000 },
    { name: "Burger", image: "/burger.jpg", reviews: 150, likes: 12000 },
    { name: "Ayam", image: "/ayam.jpg", reviews: 150, likes: 12000 },
  ]);

  const [truckStatus] = useState<TruckStatus[]>([
    { name: "Truck A", orders: 12, revenue: 480000 },
    { name: "Truck B", orders: 8, revenue: 350000 },
  ]);

  const [dbItem] = useState<DbItem[]>([
    { name: "Dashboard", iconRed: "/image/Db-red.png", iconWhite: "/image/Db-white.png" },
    { name: "Menu", iconRed: "/image/Menu-red.png", iconWhite: "/image/Menu-white.png" },
    { name: "Pesanan", iconRed: "/image/Pesanan-red.png", iconWhite: "/image/Pesanan-white.png" },
    { name: "Laporan", iconRed: "/image/Laporan-red.png", iconWhite: "/image/Laporan-white.png" },
    { name: "Lokasi Truck", iconRed: "/image/Lokasi-red.png", iconWhite: "/image/Lokasi-white.png" },
  ]);

  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
  {/* Sidebar */}
  <div className="w-60 bg-white shadow-lg flex flex-col p-6">
    {/* Logo */}
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

{/* Logout Button */}
<div className="mt-auto pt-6 border-t border-gray-200">
  <button
    onClick={() => alert("Logout Berhasil!")}
    className="flex items-center gap-2 px-4 py-2 rounded bg-white text-red-700 font-semibold"
  >
    <img src="/image/Logout.png" alt="Logout" className="w-5 h-5" />
    Logout
  </button>
</div>
  </div>
  
      {/* Main Content */}
<div className="flex-1 w-315 max-w-[calc(100vw-16rem)] px-8 py-10 space-y-10 bg-gray-100 overflow-x-auto md:px-12 lg:px-16">


  {/* Header */}
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-xl text-red-900 font-semibold">Welcome to Manajemen</h2>
      <p className="text-red-900 font-medium">Admin</p>
    </div>
    <div className="flex items-center gap-2 text-red-900 font-semibold">
      <span>08.34</span>
      <img src="/image/Notifikasi.png" alt="Notif" className="w-5 h-5" />
    </div>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-5 rounded-xl shadow flex flex-col justify-center">
      <p className="text-gray-500 text-sm ">Total Penjualan</p>
      <h4 className="text-red-900 font-bold text-xl">2500</h4>
      <small className="text-gray-500">Bulan Lalu : </small>
    </div>
    <div className="bg-white p-5 rounded-xl shadow flex flex-col justify-center">
      <p className="text-gray-500 text-sm">Total Pendapatan</p>
      <h4 className="text-red-900 font-bold text-xl">Rp 1Jt</h4>
    </div>
    <div className="bg-white p-5 rounded-xl shadow flex flex-col justify-center">
      <p className="text-gray-500 text-sm">Total Pelanggan</p>
      <h4 className="text-red-900 font-bold text-xl">450</h4>
    </div>
    <div className="bg-white p-5 rounded-xl shadow flex flex-col justify-center">
      <p className="text-gray-500 text-sm">Total Menu</p>
      <h4 className="text-red-900 font-bold text-xl">350 Item</h4>
    </div>
  </div>

  {/* Grafik Pendapatan */}
  <div className="bg-white p-6 rounded-xl shadow w-full">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-red-900 font-semibold">Grafik Pendapatan Harian</h3>
      <p className="text-green-500 text-sm font-semibold">Rp 1Jt (+1.5% minggu lalu)</p>
    </div>
    <div className="w-full h-56 bg-gradient-to-t from-red-200 to-white rounded-lg flex items-center justify-center text-red-700 font-semibold">
      <img src="/image/chart.png" alt="Chart" className="w-full h-full object-contain" />
    </div>
  </div>

  {/* Menu Favorit */}
<div className="w-full">
  <h3 className="text-red-900 font-semibold mb-4">Menu Favorit</h3>

  {/* Wrapper scroll */}
  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-200">
    {menuItems.map((menu) => (
      <div
        key={menu.name}
        className="bg-white rounded-xl shadow p-4 flex flex-col items-center min-w-[220px] sm:min-w-[240px] md:min-w-[260px] flex-shrink-0"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-36 object-cover rounded-lg"
        />
        <h4 className="font-semibold mt-2 capitalize text-red-900">{menu.name}</h4>
        <p className="text-gray-500 text-sm">{menu.reviews} Reviews</p>
        <div className="flex items-center gap-1 mt-2 text-orange-500">
          <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
        </div>
        <button className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full mt-3">
          ❤️ {menu.likes}
        </button>
      </div>
    ))}
  </div>
</div>


  {/* Status Truck */}
  <div className="bg-white p-6 rounded-xl shadow w-full mb-8">
    <h3 className="text-red-900 font-semibold mb-4">Status Truck</h3>
    <div className="space-y-3">
      {truckStatus.map((truck) => (
        <div
          key={truck.name}
          className="flex justify-between items-center border border-gray-200 p-3 rounded-lg"
        >
          <div className="flex flex-col">
            <span className="text-red-900 font-semibold">{truck.name}</span>
            <span className="text-gray-500 text-sm">{truck.orders} Orders</span>
          </div>
          <span className="text-green-500 font-semibold">
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
