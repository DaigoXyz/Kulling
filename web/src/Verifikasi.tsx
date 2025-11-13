import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Pindah fokus ke input berikutnya
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredCode = codes.join("");
    if (enteredCode === "101025") {
      alert("Kode verifikasi benar! Mengarahkan ke dashboard...");
      navigate("/DashboardDispatcher");
    } else {
      alert("Kode verifikasi salah!");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#f6f0e5] font-[Arial]">
      <div className="flex flex-col text-center">
        {/* Judul */}
        <h1 className="text-[35px] font-extrabold text-[#a62418] mb-[5px] whitespace-nowrap text-center">
          Kode Verifikasi
        </h1>

        {/* Subjudul */}
        <p className="text-[13px] text-black mb-8 text-left">
          Sistem Manajemen Dashboard
        </p>

        {/* Input Kode */}
        <div className="flex justify-center gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={codes[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              // ✅ ref callback tanpa return
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-[50px] h-[60px] border border-[#a62418] rounded-[8px] text-center text-[22px] font-semibold focus:outline-none focus:ring-1 focus:ring-[#a62418] bg-white"
            />
          ))}
        </div>

        {/* Tombol Verifikasi */}
        <div
          onClick={handleVerify}
          className="h-[55px] bg-[#f5c14b] hover:bg-[#eab73c] text-[#5a2d00] font-semibold text-[13px] flex justify-center items-center rounded-[10px] shadow-sm cursor-pointer transition-all mb-3"
        >
          Verifikasi
        </div>

        {/* Link Login */}
        <p className="text-[11px] text-gray-600 text-center ">
          Back to{" "}
          <a href="/" className="text-[#2e6de2] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
