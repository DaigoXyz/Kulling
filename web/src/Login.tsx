import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ tambahkan ini

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ⬅️ inisialisasi navigate

  const handleLogin = () => {
    // nanti bisa ditambah validasi / request API login
    navigate("/Dashboard"); // ⬅️ pindah ke dashboard
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#f6f0e5] font-[Arial]">
      <div className="flex flex-col w-[350px]">
        {/* Title */}
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
            className="w-full border border-[#a62418] rounded-[5px] py-[15px] px-5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#a62418] bg-white"
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
              className="w-full border border-[#a62418] rounded-[5px] py-[15px] px-5 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#a62418] bg-white"
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
          onClick={handleLogin} // ⬅️ klik akan pindah ke dashboard
          className="w-full h-[55px] bg-[#f5c14b] hover:bg-[#eab73c] text-[#5a2d00] font-semibold text-[13px] flex justify-center items-center rounded-[10px] shadow-sm cursor-pointer transition-all"
        >
          Login
        </div>

        {/* Sign Up */}
        <p className="text-[10px] text-gray-600 mt-3 text-center">
          Don’t have an account?{" "}
          <a href="#" className="text-[#2e6de2] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
