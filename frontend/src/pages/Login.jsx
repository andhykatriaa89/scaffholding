import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Construction } from "lucide-react";

const AKUN = {
  admin: { pass: "admin123", nama: "Rina Kusuma", role: "Admin" },
  staff: { pass: "staff123", nama: "Dedi Firmansyah", role: "Staff Gudang" },
};

export default function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const akun = AKUN[u.trim().toLowerCase()];
    if (akun && akun.pass === p) {
      onLogin({ nama: akun.nama, role: akun.role });
      navigate("/dashboard");
    } else {
      setErr("Username atau password salah. Coba: admin/admin123 atau staff/staff123");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-[5px] bg-[#D8621B] flex items-center justify-center">
            <Construction size={19} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold text-[#1F2420]">PT Sucoot Scaform Indonesia</div>
            <div className="text-[11px] text-[#1F2420]/55">Sistem Informasi Penyewaan &amp; Penjualan Scaffolding</div>
          </div>
        </div>

        <form
          onSubmit={submit}
          data-testid="login-form"
          className="bg-white border border-[#E4E4E0] rounded-[6px] p-5 space-y-4"
        >
          <div>
            <label className="block text-[12px] font-medium mb-1.5 text-[#1F2420]/80">Username</label>
            <input
              data-testid="login-username-input"
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="admin atau staff"
              className="w-full h-9 px-3 text-[13px] border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B] bg-white"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5 text-[#1F2420]/80">Password</label>
            <input
              data-testid="login-password-input"
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="••••••••"
              className="w-full h-9 px-3 text-[13px] border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B] bg-white font-mono"
            />
          </div>
          {err && (
            <p data-testid="login-error" className="text-[12px] text-[#B3452F] leading-snug">{err}</p>
          )}
          <button
            data-testid="login-submit-btn"
            type="submit"
            className="w-full h-9 bg-[#D8621B] hover:bg-[#C2560F] text-white text-[13px] font-medium rounded-[4px] transition-colors"
          >
            Masuk
          </button>
          <div className="pt-1 border-t border-[#EEEEEA] text-[11px] text-[#1F2420]/45 leading-relaxed">
            Akses internal untuk Admin &amp; Staff Gudang.<br />
            <span className="font-mono">admin / admin123</span> · <span className="font-mono">staff / staff123</span>
          </div>
        </form>
        <p className="mt-4 text-[10px] text-[#1F2420]/35 text-center">
          Hubungi bagian IT jika lupa kata sandi — ext. 114
        </p>
      </div>
    </div>
  );
}
