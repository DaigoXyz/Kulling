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
  image: string;
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
    { id: 1, name: "Kebab", category: "Makanan", price: 25000, stock: 15, image: "/image/Kebab.png" },
    { id: 2, name: "Burger", category: "Makanan", price: 20000, stock: 0, image: "/image/Burger.png" },
    { id: 3, name: "Ayam", category: "Makanan", price: 5000, stock: 6, image: "/image/Ayam.png" },
  ]);

  const handleMenuClick = (itemName: string) => {
    setActive(itemName);
    const routeMap: Record<string, string> = {
      Dashboard: "/Dashboard",
      Menu: "/Menu",
      Pesanan: "/Pesanan",
      Laporan: "/Laporan",
      "Lokasi Truck": "/LokasiTruck",
    };
    if (routeMap[itemName]) navigate(routeMap[itemName]);
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
                className={`group flex items-center gap-2 font-semibold px-4 py-2 rounded transition-all duration-300
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
                className={`w-5 h-5 transition-all duration-300 group-hover:hidden ${
                    isActive ? "hidden" : "inline"
                }`}
                />
                <img
                src={item.iconWhite}
                alt={item.name}
                className={`w-5 h-5 transition-all duration-300 hidden group-hover:inline ${
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
      <div className="ml-60 flex-1 w-[calc(100vw-15rem)] px-8 py-10 space-y-10 bg-gray-100 overflow-y-auto md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[#a62418] font-bold text-lg mb-1">WELCOME TO MANAGEMENT</h2>
            <p className="text-red-900 font-medium">Admin</p>
          </div>
          <div className="flex items-center gap-2 text-red-900 font-semibold">
            <span>08.34</span>
            <img src="/image/Notifikasi.png" alt="Notif" className="w-5 h-5" />
          </div>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#a62418] font-bold text-2xl">Manajemen Menu</h2>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 px-4 py-2 bg-red-900 text-red rounded-lg hover:bg-red-800 transition"
          >
            + Tambah Menu
          </button>
        </div>

        {/* Menu Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((menu) => (
            <div key={menu.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={menu.image} alt={menu.name} className="w-52 h-36 object-cover rounded-lg mb-5" />
              <h3 className="text-lg font-semibold text-gray-900">{menu.name}</h3>
              <p className="text-sm text-gray-500">{menu.category}</p>
              <p className="text-sm font-medium text-gray-700">
                Rp {menu.price.toLocaleString("id-ID")}
              </p>
              <p
                className={`text-sm font-semibold ${
                  menu.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {menu.stock > 0 ? "Tersedia" : "Habis"}
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowBahan(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <InformationCircleIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => openForm(menu)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => alert(`Hapus Berhasil`)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Bahan */}
      {showBahan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button onClick={() => setShowBahan(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold text-red-900 mb-4">Data Bahan</h2>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th>ID</th>
                  <th>Nama Bahan</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Daging Sapi</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Roti</td>
                  <td>40</td>
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
            <button onClick={() => setShowForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
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
                  className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition"
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
