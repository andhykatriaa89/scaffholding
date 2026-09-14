import { useState } from "react";
import "@/App.css";
import axios from "@/lib/axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Pelanggan from "@/pages/Pelanggan";
import Barang from "@/pages/Barang";
import Penjualan from "@/pages/Penjualan";
import Penyewaan from "@/pages/Penyewaan";
import Pengembalian from "@/pages/Pengembalian";
import Laporan from "@/pages/Laporan";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ssf_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (u) => {
    localStorage.setItem("ssf_user", JSON.stringify(u));
    setUser(u);
  };
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("ssf_user");
    setUser(null);
  };

  const isStaff = user?.role === "Staff Gudang" || Boolean(user?.role && user.role.toLowerCase().includes("staff"));
  const defaultPath = isStaff ? "/barang" : "/dashboard";

  const guard = (page, allowedRoles = null) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to={defaultPath} replace />;
    }
    return <AppLayout user={user} onLogout={logout}>{page}</AppLayout>;
  };

  return (
    <div className="App">
      <Toaster position="top-right" richColors toastOptions={{ style: { borderRadius: "5px", fontSize: "13px" } }} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to={defaultPath} replace /> : <Login onLogin={login} />} />
          <Route path="/dashboard" element={guard(<Dashboard />, ["Admin"])} />
          <Route path="/pelanggan" element={guard(<Pelanggan />, ["Admin"])} />
          <Route path="/barang" element={guard(<Barang />)} />
          <Route path="/penjualan" element={guard(<Penjualan />, ["Admin"])} />
          <Route path="/penyewaan" element={guard(<Penyewaan />, ["Admin"])} />
          <Route path="/pengembalian" element={guard(<Pengembalian />)} />
          <Route path="/laporan" element={guard(<Laporan />, ["Admin"])} />
          <Route path="*" element={<Navigate to={user ? defaultPath : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
