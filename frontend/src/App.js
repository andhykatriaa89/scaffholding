import { useState } from "react";
import "@/App.css";
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
  const logout = () => {
    localStorage.removeItem("ssf_user");
    setUser(null);
  };

  const guard = (page) =>
    user ? (
      <AppLayout user={user} onLogout={logout}>{page}</AppLayout>
    ) : (
      <Navigate to="/login" replace />
    );

  return (
    <div className="App">
      <Toaster position="top-right" richColors toastOptions={{ style: { borderRadius: "5px", fontSize: "13px" } }} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />} />
          <Route path="/dashboard" element={guard(<Dashboard />)} />
          <Route path="/pelanggan" element={guard(<Pelanggan />)} />
          <Route path="/barang" element={guard(<Barang />)} />
          <Route path="/penjualan" element={guard(<Penjualan />)} />
          <Route path="/penyewaan" element={guard(<Penyewaan />)} />
          <Route path="/pengembalian" element={guard(<Pengembalian />)} />
          <Route path="/laporan" element={guard(<Laporan />)} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
