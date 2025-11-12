import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DbItem {
  name: string;
  iconRed: string;
  iconWhite: string;
}

interface Truck {
  id: number;
  name: string;
  plat: string;
  lokasi: string;
  aktif: boolean;
  pesanan: number;
  mapSrc: string;
}

function LokasiTruck() {
  const navigate = useNavigate();

  const [dbItem] = useState<DbItem[]>([
    { name: "Dashboard", iconRed: "/image/Db-red.png", iconWhite: "/image/Db-white.png" },
    { name: "Menu", iconRed: "/image/Menu-red.png", iconWhite: "/image/Menu-white.png" },
    { name: "Pesanan", iconRed: "/image/Pesanan-red.png", iconWhite: "/image/Pesanan-white.png" },
    { name: "Laporan", iconRed: "/image/Laporan-red.png", iconWhite: "/image/Laporan-white.png" },
    { name: "Lokasi Truck", iconRed: "/image/Lokasi-red.png", iconWhite: "/image/Lokasi-white.png" },
  ]);

  const [active, setActive] = useState("Lokasi Truck");

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

  const [truckList] = useState<Truck[]>([
    {
      id: 1,
      name: "Truck A",
      plat: "B 3452 QZ",
      lokasi: "Pekayon, Jakarta Timur",
      aktif: true,
      pesanan: 48,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2845987394817!2d106.9487!3d-6.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f22071e4d2c1%3A0x5a0f62a9f4cb3cf2!2sPekayon%20Jakarta%20Timur!5e0!3m2!1sid!2sid!4v1700000000001"
    },
    {
      id: 2,
      name: "Truck B",
      plat: "B 7619 DF",
      lokasi: "Cibubur, Jakarta Timur",
      aktif: true,
      pesanan: 62,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.076585715849!2d106.8859!3d-6.2457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1510d8b7cc9%3A0x9a3b702e4a153e2a!2sCibubur!5e0!3m2!1sid!2sid!4v1700000000002"
    },
    {
      id: 3,
      name: "Truck C",
      plat: "B 9823 LR",
      lokasi: "Kalimalang, Bekasi",
      aktif: false,
      pesanan: 0,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.169328640327!2d106.9443!3d-6.2407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f22c71234567%3A0x1234567890abcdef!2sKalimalang!5e0!3m2!1sid!2sid!4v1700000000003"
    },
    {
      id: 4,
      name: "Truck D",
      plat: "B 2211 VA",
      lokasi: "Cawang, Jakarta Timur",
      aktif: true,
      pesanan: 57,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.278623903014!2d106.8615!3d-6.2305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f469123456%3A0xabcdefabcdefabcd!2sCawang!5e0!3m2!1sid!2sid!4v1700000000004"
    },
    {
      id: 5,
      name: "Truck E",
      plat: "B 7744 BK",
      lokasi: "Kemang, Jakarta Selatan",
      aktif: true,
      pesanan: 42,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0574769278694!2d106.8148!3d-6.2465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15d31234567%3A0xa1b2c3d4e5f67890!2sKemang!5e0!3m2!1sid!2sid!4v1700000000005"
    },
    {
      id: 6,
      name: "Truck F",
      plat: "B 8877 YZ",
      lokasi: "Kelapa Gading, Jakarta Utara",
      aktif: false,
      pesanan: 0,
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0165469082577!2d106.8924!3d-6.2495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f21031234567%3A0xb1b2c3d4e5f67890!2sKelapa%20Gading!5e0!3m2!1sid!2sid!4v1700000000006"
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

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
            <h2 className="text-[#a62418] font-bold text-2xl">Lokasi Truck </h2>
        </div>

        {/* Truck Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {truckList.map((truck) => (
            <div key={truck.id} className="bg-white rounded-xl shadow p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <img src="/image/Lokasi-red.png" alt="Location Icon" className="w-6 h-7" />
                <h3 className="text-lg font-bold text-red-900">{truck.name}</h3>
              </div>
              <div className="flex flex-col space-y-1 text-sm text-gray-700">
                <p>
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${truck.aktif ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {truck.aktif ? "Aktif" : "Nonaktif"}
                  </span>
                </p>
                <p>Plat no: {truck.plat}</p>
                <p>Posisi: {truck.lokasi}</p>
                <p>Pesanan hari ini: {truck.pesanan}</p>
              </div>
              <button
                onClick={() => setSelectedTruck(truck)}
                className="mt-4 w-full bg-[#a62418] text-red-800 font-semibold py-2 rounded-md hover:bg-[#8b1f14] transition"
              >
                Lihat di maps
              </button>
            </div>
          ))}
        </div>

        {/* Maps Section */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Peta Lokasi Real-Time</h3>
          <div className="w-full h-[350px] overflow-hidden rounded-lg border">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.190947692802!2d106.8283!3d-6.238269999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14b6fef9c2b%3A0x9a35f63e01959c32!2sKFC!5e0!3m2!1sid!2sid!4v1690456789012!5m2!1sid!2sid"
              width="100%"
              height="350"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Popup Modal */}
        {selectedTruck && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedTruck.name} – {selectedTruck.lokasi}
              </h3>
              <iframe
                title={selectedTruck.name}
                src={selectedTruck.mapSrc}
                width="100%"
                height="350"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
              <button
                onClick={() => setSelectedTruck(null)}
                className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LokasiTruck;
