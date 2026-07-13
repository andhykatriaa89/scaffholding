import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Users, Package, ShoppingCart, CalendarClock,
  Undo2, FileBarChart, Search, LogOut, ChevronRight, Construction,
} from "lucide-react";
import LogoPT from "../PT.png";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/pelanggan", label: "Pelanggan", icon: Users },
  { to: "/barang", label: "Barang & Stok", icon: Package },
  { to: "/penjualan", label: "Transaksi Penjualan", icon: ShoppingCart },
  { to: "/penyewaan", label: "Transaksi Penyewaan", icon: CalendarClock },
  { to: "/pengembalian", label: "Pengembalian Sewa", icon: Undo2 },
  { to: "/laporan", label: "Laporan", icon: FileBarChart },
];

const CRUMB = {
  "/dashboard": "Dashboard",
  "/pelanggan": "Master Data / Pelanggan",
  "/barang": "Master Data / Barang & Stok",
  "/penjualan": "Transaksi / Penjualan",
  "/penyewaan": "Transaksi / Penyewaan",
  "/pengembalian": "Transaksi / Pengembalian Sewa",
  "/laporan": "Laporan Transaksi",
};

export default function AppLayout({ user, onLogout, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const crumb = CRUMB[pathname] || "";

  return (
    <div className="flex min-h-screen bg-[#F4F4F5]">
      <aside
        data-testid="sidebar"
        className="fixed inset-y-0 left-0 w-[240px] bg-white shadow-[1px_0_10px_rgba(0,0,0,0.03)] flex flex-col z-30 border-r border-slate-200"
      >
        <div className="flex items-center justify-center px-6 h-[70px] border-b border-slate-100">
          <img src={LogoPT} alt="PT Logo" className="h-9 w-auto object-contain shrink-0" />
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              data-testid={`nav-${to.slice(1)}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-white rounded-lg p-3 border border-slate-200 flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
             <div className="text-[11.5px] text-slate-700 font-medium leading-tight">
               Gudang Narogong<br /><span className="text-slate-500 text-[10.5px] font-normal">v1.0 · Sistem Internal</span>
             </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-[240px] flex flex-col min-w-0">
        <header
          data-testid="topbar"
          className="sticky top-0 z-20 h-[70px] bg-white/80 backdrop-blur-md border-b border-[#E4E4E7] flex items-center gap-4 px-6 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[12px] text-[#18181B]/55 min-w-0">
            {crumb.split(" / ").map((part, i, arr) => (
              <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={i === arr.length - 1 ? "text-[#18181B] font-medium" : ""}>{part}</span>
                {i < arr.length - 1 && <ChevronRight size={12} className="text-[#18181B]/30" />}
              </span>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative w-[260px] hidden md:block">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#18181B]/35" />
            <input
              data-testid="global-search"
              placeholder="Cari transaksi, barang, pelanggan…"
              className="w-full h-[30px] pl-8 pr-3 text-[12px] bg-[#F4F4F5] border border-[#E4E4E7] rounded-[4px] outline-none focus:border-[#A1A1AA]"
            />
          </div>
          <div className="flex items-center gap-2.5 pl-3 border-l border-[#E4E4E7]">
            <div className="w-7 h-7 rounded-[4px] bg-[#3F3F46] text-white text-[11px] font-semibold flex items-center justify-center">
              {user.nama.slice(0, 2).toUpperCase()}
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="text-[12px] font-medium">{user.nama}</div>
              <div className="text-[10px] text-[#18181B]/50">{user.role}</div>
            </div>
            <button
              data-testid="logout-btn"
              onClick={() => { onLogout(); navigate("/login"); }}
              title="Keluar"
              className="p-1.5 rounded-[4px] text-[#18181B]/45 hover:text-[#DC2626] hover:bg-[#DC2626]/5 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
