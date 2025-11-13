import { useNavigate } from "react-router-dom";

function DispatcherDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <div className="bg-gray-100 min-h-screen w-screen overflow-x-hidden py-8 px-6 md:px-12 lg:px-16">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[#a62418] font-bold text-lg mb-1">
            Welcome to Manajemen
          </h2>
          <p className="text-red-900 font-medium">Dispatcher</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-red-900 font-semibold">08.34</span>
          <img
            src="/image/Notifikasi.png"
            alt="Notif"
            className="w-5 h-5 cursor-pointer"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-red-700 font-semibold px-4 py-2 rounded-lg border border-red-900 hover:bg-red-700 hover:text-red-900 transition"
          >
            <img src="/image/Logout.png" alt="Logout" className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Statistik Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Bahan", value: "165", icon: "/image/TB.png" },
          { title: "Stok Aman", value: "24", icon: "/image/ST.png" },
          { title: "Stok Rendah", value: "12", icon: "/image/SR.png" },
          { title: "Permintaan Pending", value: "3", icon: "/image/PP.png" },
        ].map((card, i) => (
          <div
            key={i}
            className="relative bg-white p-5 rounded-xl shadow hover:shadow-md transition flex flex-col justify-center text-red-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-white hover:text-white duration-300 cursor-pointer group"
          >
            <img
              src={card.icon}
              alt="icon"
              className="absolute top-3 right-3 w-6 h-6 transition duration-300 opacity-80 group-hover:opacity-100"
            />
            <p className="text-gray-700 text-sm group-hover:text-white">
              {card.title}
            </p>
            <h4 className="font-bold text-2xl mt-1">{card.value}</h4>
          </div>
        ))}
      </section>

      {/* Permintaan Stok Baru */}
<section className="bg-white rounded-xl shadow p-6 mb-8">
  <h3 className="text-red-900 font-bold text-lg mb-4">
    Permintaan Stok Baru
  </h3>
  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px] text-left border-collapse">
      <thead className="border-b bg-gray-50 text-gray-700 text-sm font-semibold">
        <tr>
          {["Waktu", "Bahan", "Diminta", "Stok", "Permintaan", "Aksi"].map(
            (h, i) => (
              <th
                key={i}
                className={`py-3 px-5 ${
                  i === 5 ? "text-center" : "text-left"
                }`}
              >
                {h}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <tr
            key={i}
            className="border-b hover:bg-gray-50 transition duration-150"
          >
            <td className="py-3 px-5">10.30</td>
            <td className="px-5">Daging ayam</td>
            <td className="px-5 text-orange-500 font-semibold">30 kg</td>
            <td className="px-5 text-red-600 font-semibold">
              20 kg /{" "}
              <small className="text-gray-900 font-normal">50kg</small>
            </td>
            <td className="px-5">
              {i % 2 === 0 ? "Admin Pusat" : "Food Truck A"}
            </td>
            <td className="px-5 text-center">
              <div className="flex justify-center gap-3">
                <img
                  src="/image/Check.png"
                  alt="approve"
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                />
                <img
                  src="/image/Cancel.png"
                  alt="reject"
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

{/* Riwayat Suplai Hari Ini */}
<section className="bg-white rounded-xl shadow p-6">
  <h3 className="text-red-900 font-bold text-lg mb-4">
    Riwayat Suplai Hari Ini
  </h3>
  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px] text-left border-collapse">
      <thead className="border-b bg-gray-50 text-gray-700 text-sm font-semibold">
        <tr>
          {["Waktu", "Bahan", "Jumlah", "Penerima", "Status"].map((h, i) => (
            <th key={i} className="py-3 px-5">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm">
        {[1, 2, 3, 4].map((_, i) => (
          <tr
            key={i}
            className="border-b hover:bg-gray-50 transition duration-150"
          >
            <td className="py-3 px-5">10.30</td>
            <td className="px-5">Daging ayam</td>
            <td className="px-5 text-orange-500 font-semibold">
              {30 + i * 10} pcs
            </td>
            <td className="px-5">
              {i % 2 === 0 ? "Admin Pusat" : "Food Truck A"}
            </td>
            <td className="px-5">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium">
                Terkirim
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

    </div>
  );
}

export default DispatcherDashboard;
