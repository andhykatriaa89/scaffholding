import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "@/lib/axios";
import LogoPT from "../PT.png";

export default function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await axios.get("/sanctum/csrf-cookie");
      const res = await axios.post("/api/auth/login", {
        username: u.trim().toLowerCase(),
        password: p,
      });
      onLogin(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        const msg = error.response.data?.errors?.username?.[0] || error.response.data?.message || "Username atau password salah.";
        setErr(msg);
        return;
      } else if (error.response && error.response.status === 401) {
        setErr("Username atau password salah.");
      } else {
        setErr("Terjadi kesalahan pada server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0F3F8]">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[380px]">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8">
            <div className="flex flex-col items-start gap-4 mb-8">
              <img src={LogoPT} alt="PT Logo" className="h-14 w-auto object-contain shrink-0" />
              <div className="leading-relaxed">
                <div className="text-[18px] font-bold text-[#1B2A4A] tracking-tight">PT Sucoot Scaform Indonesia</div>
                <div className="text-[13px] text-slate-500">Sistem Informasi Penyewaan &amp; Penjualan Scaffolding</div>
              </div>
            </div>

            <form onSubmit={submit} data-testid="login-form" className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold mb-1.5 text-slate-600">Username</label>
                <input
                  data-testid="login-username-input"
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  placeholder="admin atau staff"
                  className="w-full h-10 px-3 text-[13px] border border-slate-200 rounded-lg outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-[#F8FAFC] transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1.5 text-slate-600">Password</label>
                <input
                  data-testid="login-password-input"
                  type="password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 text-[13px] border border-slate-200 rounded-lg outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-[#F8FAFC] font-mono transition-all"
                />
              </div>
              {err && (
                <p data-testid="login-error" className="text-[12px] text-[#DC2626] leading-snug bg-red-50 px-3 py-2 rounded-md border border-red-100">{err}</p>
              )}
              <button
                data-testid="login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] disabled:opacity-50 text-white text-[13px] font-semibold rounded-lg transition-all shadow-md"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>
            <p className="mt-5 text-[10px] text-slate-400 text-center">
              Hubungi bagian IT jika lupa kata sandi — ext. 114
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[45%] relative">
        <img
          src="https://images.unsplash.com/photo-1713593930871-e21d7f9ef4a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHw0fHxjb25zdHJ1Y3Rpb24lMjBzY2FmZm9sZGluZyUyMHNpdGV8ZW58MHx8fHwxNzgzMTYzMTYyfDA&ixlib=rb-4.1.0&q=85"
          alt="Scaffolding di lokasi proyek"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/90 via-[#1B2A4A]/50 to-[#1B2A4A]/30" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="w-10 h-[3px] bg-[#F59E0B] mb-3 rounded-full" />
          <div className="text-[13px] font-medium text-white">Gerbang Biru, Jl. Marunda Makmur No.86, Sagara Makmur, Tarumajaya, Bekasi Regency, West Java 17211</div>
          <div className="text-[11px] text-white/60 mt-1 max-w-[380px] leading-relaxed">
            Pencatatan penyewaan, penjualan, stok, dan pengembalian scaffolding dalam satu sistem internal.
          </div>
        </div>
      </div>
    </div>
  );
}
