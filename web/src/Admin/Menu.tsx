import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface DbItem {
  name: string;
  iconRed: string;
  iconWhite: string;
}

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
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

  const [active, setActive] = useState("Menu");
  const [showBahan, setShowBahan] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

const [menuItems, setMenuItems] = useState<MenuItem[]>([
  // 🍔 Makanan
  { id: 1, name: "Kebab Spesial", category: "Makanan", price: 25000, stock: 15, status: "" },
  { id: 2, name: "Burger BBQ", category: "Makanan", price: 20000, stock: 0, status: "" },
  { id: 3, name: "Ayam Crispy", category: "Makanan", price: 5000, stock: 6, status: "" },
  { id: 4, name: "Hotdog Keju", category: "Makanan", price: 22000, stock: 8, status: "" },
  { id: 5, name: "Roti Bakar Cokelat", category: "Makanan", price: 18000, stock: 12, status: "" },
  { id: 6, name: "Sosis Bakar Pedas", category: "Makanan", price: 15000, stock: 20, status: "" },
  { id: 7, name: "Kentang Goreng", category: "Makanan", price: 12000, stock: 25, status: "" },
  { id: 8, name: "Nasi Daging Blackpepper", category: "Makanan", price: 28000, stock: 10, status: "" },
  { id: 9, name: "Kebab Mini", category: "Makanan", price: 15000, stock: 18, status: "" },
  { id: 10, name: "Roti Sosis Mozarella", category: "Makanan", price: 20000, stock: 5, status: "" },

  // ☕ Minuman
  { id: 11, name: "Es Kopi Susu Gula Aren", category: "Minuman", price: 18000, stock: 30, status: "" },
  { id: 12, name: "Matcha Latte", category: "Minuman", price: 22000, stock: 25, status: "" },
  { id: 13, name: "Cokelat Panas", category: "Minuman", price: 20000, stock: 10, status: "" },
  { id: 14, name: "Lemon Tea", category: "Minuman", price: 15000, stock: 18, status: "" },
  { id: 15, name: "Es Susu Regal", category: "Minuman", price: 20000, stock: 12, status: "" },
  { id: 16, name: "Avocado Coffee", category: "Minuman", price: 25000, stock: 8, status: "" },
  { id: 17, name: "Es Cincau Hitam", category: "Minuman", price: 10000, stock: 15, status: "" },
  { id: 18, name: "Teh Tarik", category: "Minuman", price: 12000, stock: 22, status: "" },
  { id: 19, name: "Kopi Tubruk", category: "Minuman", price: 10000, stock: 17, status: "" },
  { id: 20, name: "Jus Mangga", category: "Minuman", price: 15000, stock: 13, status: "" },

  // 🍰 Dessert
  { id: 21, name: "Puding Cokelat", category: "Dessert", price: 10000, stock: 20, status: "" },
  { id: 22, name: "Cheesecake Mini", category: "Dessert", price: 25000, stock: 9, status: "" },
  { id: 23, name: "Brownies Lumer", category: "Dessert", price: 18000, stock: 14, status: "" },
  { id: 24, name: "Donat Glaze", category: "Dessert", price: 12000, stock: 15, status: "" },
  { id: 25, name: "Waffle Vanilla", category: "Dessert", price: 22000, stock: 7, status: "" },
  { id: 26, name: "Muffin Blueberry", category: "Dessert", price: 16000, stock: 19, status: "" },
  { id: 27, name: "Es Krim Stroberi", category: "Dessert", price: 15000, stock: 11, status: "" },
  { id: 28, name: "Banana Split", category: "Dessert", price: 20000, stock: 5, status: "" },
  { id: 29, name: "Crepes Cokelat", category: "Dessert", price: 17000, stock: 13, status: "" },
  { id: 30, name: "Tiramisu Cup", category: "Dessert", price: 23000, stock: 9, status: "" },
]);

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

  const handleLogout = () => navigate("/");

  const openForm = (menu?: MenuItem) => {
    setEditMode(!!menu);
    setSelectedMenu(menu || null);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm(false);
    alert(editMode ? "Menu berhasil diperbarui!" : "Menu baru berhasil ditambahkan!");
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
            <h2 className="text-[#a62418] font-bold text-2xl">Menu </h2>
            <button
            onClick={() => openForm()}
            className="flex items-right bg-red-900 text-red-900 rounded-lg hover:bg-red-800 transition"
          >
            + Tambah Menu
          </button>
        </div>

        {/* Menu Table */}
<div className="overflow-x-auto bg-white rounded-xl shadow">
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-white text-black text-left">
      <tr>
        <th className="px-6 py-3"></th>
        <th className="px-6 py-3">Nama Menu</th>
        <th className="px-6 py-3">Kategori</th>
        <th className="px-6 py-3">Harga</th>
        <th className="px-6 py-3">Stok</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-6 py-3 text-center">Aksi</th>
      </tr>
    </thead>
      <tbody>
        {/* Group data by category */}
        {["Makanan", "Minuman", "Dessert"].map((category) => {
          const filteredMenus = menuItems.filter((item) => item.category === category);
          return (
            <React.Fragment key={category}>
              {/* Category header row */}
              <tr className="bg-gray-200 text-gray-800 font-semibold">
                <td colSpan={7} className="px-25 py-2 uppercase">{category}</td>
              </tr>

              {/* Menu items for this category */}
              {filteredMenus.length > 0 ? (
                filteredMenus.map((menu, index) => (
                  <tr
                    key={menu.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-semibold ${
                          menu.stock > 0
                            ? "bg-green-300 text-green-600"
                            : "bg-red-300 text-red-600"
                        }`}
                      ></span>
                    </td>
                    <td className="px-6 py-3 font-medium">{menu.name}</td>
                    <td className="px-6 py-3">{menu.category}</td>
                    <td className="px-6 py-3">Rp {menu.price.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-3">{menu.stock}</td>
                    <td
                      className={`px-6 py-3 font-semibold ${
                        menu.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {menu.stock > 0 ? "Tersedia" : "Habis"}
                    </td>
                    <td className="px-6 py-3 text-center flex justify-center gap-2">
                      <button
                        onClick={() => setShowBahan(true)}
                        className="text-gray-600 hover:text-blue-600 transition"
                        title="Detail Bahan"
                      >
                        <InformationCircleIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openForm(menu)}
                        className="text-gray-600 hover:text-green-600 transition"
                        title="Edit Menu"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => alert("Menu berhasil dihapus!")}
                        className="text-gray-600 hover:text-red-600 transition"
                        title="Hapus Menu"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-3">
                    Tidak ada menu di kategori ini
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
  </table>
</div>

      </div>

      {/* Popup Bahan */}
      {showBahan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setShowBahan(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold text-red-900 mb-4">Data Bahan</h2>
            <table className="w-full text-sm text-left border border-gray-200 rounded">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Nama Bahan</th>
                  <th className="px-3 py-2">Stok</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">Daging Sapi</td>
                  <td className="px-3 py-2">25</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">Roti</td>
                  <td className="px-3 py-2">40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Popup Tambah/Edit Menu */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[420px] p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold text-red-900 mb-4">
              {editMode ? "Edit Menu" : "Tambah Menu"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="ID Menu"
                defaultValue={selectedMenu?.id || ""}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Nama Menu"
                defaultValue={selectedMenu?.name || ""}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                placeholder="Deskripsi"
                defaultValue={selectedMenu ? "Menu lezat dan bergizi." : ""}
                className="w-full border p-2 rounded"
                required
              ></textarea>
              <input
                type="number"
                placeholder="Harga"
                defaultValue={selectedMenu?.price || ""}
                className="w-full border p-2 rounded"
                required
              />
              <input type="file" className="w-full border p-2 rounded" accept="image/*" />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-900 text-red-900 rounded hover:bg-red-800 transition"
                >
                  {editMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
