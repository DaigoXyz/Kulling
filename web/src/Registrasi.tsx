import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // nanti bisa hapus token atau session di sini
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Navbar */}
      <header className="bg-[#a62418] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">🍔 FoodTruck Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-[#f5c14b] text-[#5a2d00] px-4 py-2 rounded-md hover:bg-[#eab73c] transition-all"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-[#a62418] mb-2">Total Truck</h2>
            <p className="text-4xl font-bold text-[#5a2d00]">12</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">Truck aktif hari ini</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-[#a62418] mb-2">Total Menu</h2>
            <p className="text-4xl font-bold text-[#5a2d00]">48</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">Menu terdaftar</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-[#a62418] mb-2">Pesanan Hari Ini</h2>
            <p className="text-4xl font-bold text-[#5a2d00]">127</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">Diperbarui 10 menit lalu</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#a62418] text-white text-sm text-center py-3">
        © 2025 FoodTruck System — SMKN 24 Jakarta
      </footer>
    </div>
  );
};

export default Dashboard;
