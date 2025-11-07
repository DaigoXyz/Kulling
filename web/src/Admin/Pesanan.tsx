import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DbItem {
  name: string;
  iconRed: string;
  iconWhite: string;
}

function Pesanan() {
  const navigate = useNavigate();

  const [dbItem] = useState<DbItem[]>([
    { name: "Dashboard", iconRed: "/image/Db-red.png", iconWhite: "/image/Db-white.png" },
    { name: "Menu", iconRed: "/image/Menu-red.png", iconWhite: "/image/Menu-white.png" },
    { name: "Pesanan", iconRed: "/image/Pesanan-red.png", iconWhite: "/image/Pesanan-white.png" },
    { name: "Laporan", iconRed: "/image/Laporan-red.png", iconWhite: "/image/Laporan-white.png" },
    { name: "Lokasi Truck", iconRed: "/image/Lokasi-red.png", iconWhite: "/image/Lokasi-white.png" },
  ]);

  const [active, setActive] = useState("Pesanan");
  const [selectedTruck, setSelectedTruck] = useState("Semua Truck");

  const handleMenuClick = (itemName: string) => {
    setActive(itemName);
    const routeMap: Record<string, string> = {
      "Dashboard": "/Dashboard",
      "Menu": "/Menu",
      "Pesanan": "/Pesanan",
      "Laporan": "/Laporan",
      "Lokasi Truck": "/LokasiTruck",
    };
    if (routeMap[itemName]) navigate(routeMap[itemName]);
  };

  const handleLogout = () => navigate("/");

  const orderItems = [
    { id: 1, truck: "Truck A", customer: "Dewi Anggraini", menu: "Ayam Geprek", quantity: 2, total: 40000, status: "Selesai" },
    { id: 2, truck: "Truck D", customer: "Rizky Saputra", menu: "Nasi Goreng Spesial", quantity: 1, total: 25000, status: "Diproses" },
    { id: 3, truck: "Truck B", customer: "Nadia Rahma", menu: "Es Teh Manis", quantity: 3, total: 15000, status: "Dibatalkan" },
    { id: 4, truck: "Truck C", customer: "Ahmad Fauzan", menu: "Mie Ayam Bakso", quantity: 2, total: 30000, status: "Selesai" },
    { id: 5, truck: "Truck A", customer: "Citra Melani", menu: "Sate Ayam", quantity: 1, total: 20000, status: "Diproses" },
    { id: 6, truck: "Truck B", customer: "Dani Kurniawan", menu: "Nasi Uduk", quantity: 3, total: 21000, status: "Selesai" },
    { id: 7, truck: "Truck E", customer: "Farah Lestari", menu: "Ayam Bakar Madu", quantity: 2, total: 50000, status: "Diproses" },
    { id: 8, truck: "Truck F", customer: "Galih Pratama", menu: "Tahu Crispy", quantity: 4, total: 20000, status: "Dibatalkan" },
    { id: 9, truck: "Truck A", customer: "Hana Nurul", menu: "Nasi Goreng Pete", quantity: 1, total: 27000, status: "Selesai" },
    { id: 10, truck: "Truck D", customer: "Imam Setiawan", menu: "Bakso Urat", quantity: 2, total: 30000, status: "Diproses" },
    { id: 11, truck: "Truck C", customer: "Jihan Amanda", menu: "Soto Betawi", quantity: 1, total: 25000, status: "Selesai" },
    { id: 12, truck: "Truck B", customer: "Khalid Ramadhan", menu: "Ayam Goreng Tepung", quantity: 2, total: 32000, status: "Dibatalkan" },
    { id: 13, truck: "Truck F", customer: "Lina Marlina", menu: "Mie Goreng Jawa", quantity: 1, total: 23000, status: "Diproses" },
    { id: 14, truck: "Truck E", customer: "Miko Saputra", menu: "Tempe Penyet", quantity: 3, total: 18000, status: "Selesai" },
    { id: 15, truck: "Truck D", customer: "Nia Ramadhani", menu: "Ayam Rica-Rica", quantity: 2, total: 36000, status: "Selesai" },
    { id: 16, truck: "Truck A", customer: "Omar Putra", menu: "Sate Kambing", quantity: 1, total: 35000, status: "Dibatalkan" },
    { id: 17, truck: "Truck B", customer: "Putri Maharani", menu: "Nasi Goreng Kampung", quantity: 2, total: 26000, status: "Diproses" },
    { id: 18, truck: "Truck C", customer: "Qory Anindya", menu: "Ayam Teriyaki", quantity: 1, total: 28000, status: "Selesai" },
    { id: 19, truck: "Truck F", customer: "Rafi Gunawan", menu: "Bakmi Jawa", quantity: 3, total: 33000, status: "Diproses" },
    { id: 20, truck: "Truck E", customer: "Salsa Dewi", menu: "Nasi Kuning", quantity: 2, total: 22000, status: "Selesai" },
  ];

  // Filter data sesuai truck
  const filteredOrders =
    selectedTruck === "Semua Truck"
      ? orderItems
      : orderItems.filter((order) => order.truck === selectedTruck);

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
            <h2 className="text-[#a62418] font-bold text-2xl">Laporan Pesanan </h2>
            <select
              value={selectedTruck}
              onChange={(e) => setSelectedTruck(e.target.value)}
              className="border border-red-800 rounded-md px-3 py-2 text-red-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option>Semua Truck</option>
              <option>Truck A</option>
              <option>Truck B</option>
              <option>Truck C</option>
              <option>Truck D</option>
              <option>Truck E</option>
              <option>Truck F</option>
            </select>
        </div>

        {/* Tabel Pesanan */}
        <div className="overflow-x-auto bg-white rounded-xl shadow mt-10">
        <table className="min-w-full table-fixed text-sm text-gray-700">
            <thead className="bg-white text-black text-left">
            <tr>
                <th className="px-6 py-3 w-[5%]"></th>
                <th className="px-6 py-3 w-[10%]">Truck</th>
                <th className="px-6 py-3 w-[20%]">Nama Pelanggan</th>
                <th className="px-6 py-3 w-[20%]">Nama Menu</th>
                <th className="px-6 py-3 w-[10%]">Jumlah</th>
                <th className="px-6 py-3 w-[15%]">Total Harga</th>
                <th className="px-6 py-3 w-[15%]">Status</th>
            </tr>
            </thead>

            <tbody>
            {filteredOrders.map((order, index) => (
                <tr
                key={order.id}
                className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                >
                <td className="px-6 py-3 text-center">
                    <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-semibold ${
                        order.status === "Selesai"
                        ? "bg-green-300 text-green-600"
                        : order.status === "Diproses"
                        ? "bg-yellow-300 text-yellow-600"
                        : "bg-red-300 text-red-600"
                    }`}
                    ></span>
                </td>
                <td className="px-6 py-3 font-medium truncate">{order.truck}</td>
                <td className="px-6 py-3 font-medium truncate">{order.customer}</td>
                <td className="px-6 py-3 truncate">{order.menu}</td>
                <td className="px-6 py-3 text-center">{order.quantity}</td>
                <td className="px-6 py-3">
                    Rp {order.total.toLocaleString("id-ID")}
                </td>
                <td
                    className={`px-6 py-3 font-semibold ${
                    order.status === "Selesai"
                        ? "text-green-600"
                        : order.status === "Diproses"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                >
                    {order.status}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Pesanan;
