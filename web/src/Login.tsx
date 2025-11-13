import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!username || !password) {
    alert("Username dan password wajib diisi");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("Response login:", data);

    if (!response.ok) {
      alert(data.message || "Login gagal");
      return;
    }

    // Simpan token & data user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Arahkan berdasarkan role
    if (data.user.role === "admin") {
      alert("Login berhasil sebagai Admin");
      navigate("/DashboardAdmin");
    } else if (data.user.role === "dispatcher") {
      alert("Login berhasil sebagai Dispatcher");
      navigate("/Verifikasi");
    } else {
      alert("Hanya admin dan petugas yang bisa login");
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Tidak bisa terhubung ke server (Network Request Failed)");
  }
};


  return (
    <div className="h-screen w-screen flex font-[Arial]">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f6f0e5] relative overflow-hidden items-center justify-center">
        <img
          src="../public/image/bgLogVer.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 w-[600px] h-[700px] flex items-center justify-center">
          <img
            src="../public/image/logoHp.png"
            alt="Food App Mockup"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#f6f0e5]">
        <div className="flex flex-col w-[350px] px-5">
          <h1 className="text-[35px] font-extrabold text-[#a62418] mb-[10px]">
            Login
          </h1>
          <p className="text-[15px] text-black mb-20">
            Sistem Manajemen Dashboard
          </p>

          {/* Username */}
          <div className="mb-4 w-full">
            <label
              htmlFor="username"
              className="block text-[10px] mb-[3px] text-black"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[#a62418] rounded-[5px] py-[15px] px-5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#a62418] bg-white text-black"
            />
          </div>

          {/* Password */}
          <div className="mb-1 w-full">
            <label
              htmlFor="password"
              className="block text-[10px] mb-[3px] text-black"
            >
              Password:
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#a62418] rounded-[5px] py-[15px] px-5 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#a62418] bg-white text-black"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a62418] text-[18px] cursor-pointer select-none"
              >
                {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223a10.477 10.477 0 00-.712 1.015C2.27 10.674 2 12 2 12s2.455 7 10 7 10-7 10-7-.27-1.326-1.268-2.762M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.25 4.5 12 4.5c4.75 0 8.577 3.01 9.964 7.178.07.21.07.432 0 .644C20.577 16.49 16.75 19.5 12 19.5c-4.75 0-8.577-3.01-9.964-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              </span>
            </div>
          </div>

          {/* Forget Password */}
          <div className="text-[10px] text-gray-500 mt-[6px] mb-5">
            <a href="#" className="hover:underline">
              Forget Password?
            </a>
          </div>

          {/* Login Button */}
          <div
            onClick={handleLogin}
            className="w-full h-[55px] bg-[#f5c14b] hover:bg-[#eab73c] text-[#5a2d00] font-semibold text-[13px] flex justify-center items-center rounded-[10px] shadow-sm cursor-pointer transition-all"
          >
            Login
          </div>

          {/* Sign Up */}
          <p className="text-[10px] text-gray-600 mt-3 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-[#2e6de2] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
