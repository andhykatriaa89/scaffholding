import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Users, Package, ShoppingCart, CalendarClock,
  Undo2, FileBarChart, Search, LogOut, ChevronRight, Construction,
} from "lucide-react";
import LogoPT from "../PT.png";
import scaffoldingBg from "../scaffolding-bg.jpg";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, adminOnly: true },
  { to: "/pelanggan", label: "Pelanggan", icon: Users, adminOnly: true },
  { to: "/barang", label: "Barang & Stok", icon: Package },
  { to: "/penjualan", label: "Transaksi Penjualan", icon: ShoppingCart, adminOnly: true },
  { to: "/penyewaan", label: "Transaksi Penyewaan", icon: CalendarClock, adminOnly: true },
  { to: "/pengembalian", label: "Pengembalian Sewa", icon: Undo2 },
  { to: "/laporan", label: "Laporan", icon: FileBarChart, adminOnly: true },
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
  const isStaff = user?.role === "Staff Gudang" || Boolean(user?.role && user.role.toLowerCase().includes("staff"));
  const navItems = NAV.filter((item) => !isStaff || !item.adminOnly);

  return (
    <div className="flex min-h-screen bg-[#EEF2F7]">
      <aside
        data-testid="sidebar"
        className="fixed inset-y-0 left-0 w-[240px] bg-[#1B2A4A] flex flex-col z-30"
      >
        <div className="flex items-center justify-center px-6 h-[70px] border-b border-white/10">
          <img src={LogoPT} alt="PT Logo" className="h-9 w-auto object-contain shrink-0 brightness-0 invert" />
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              data-testid={`nav-${to.slice(1)}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/60 hover:bg-white/8 hover:text-white/90"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-[#F59E0B]" : "text-white/40"} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/8 rounded-lg p-3 border border-white/10 flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full shrink-0 ${isStaff ? "bg-amber-400" : "bg-emerald-400"}`} />
             <div className="text-[11.5px] text-white/80 font-medium leading-tight">
               Gudang Narogong<br /><span className="text-white/50 text-[10.5px] font-normal">{isStaff ? "Staff Gudang · Akses Terbatas" : "v1.0 · Administrator"}</span>
             </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-[240px] flex flex-col min-w-0">
        <header
          data-testid="topbar"
          className="sticky top-0 z-20 h-[70px] bg-white/90 backdrop-blur-md border-b border-[#D6DCE5] flex items-center gap-4 px-6 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400 min-w-0">
            {crumb.split(" / ").map((part, i, arr) => (
              <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={i === arr.length - 1 ? "text-[#1B2A4A] font-semibold" : ""}>{part}</span>
                {i < arr.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
              </span>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative w-[260px] hidden md:block">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              data-testid="global-search"
              placeholder={isStaff ? "Cari barang, stok…" : "Cari transaksi, barang, pelanggan…"}
              className="w-full h-[30px] pl-8 pr-3 text-[12px] bg-[#F0F3F8] border border-[#D6DCE5] rounded-[4px] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-2.5 pl-3 border-l border-[#D6DCE5]">
            <div className="w-7 h-7 rounded-[4px] bg-gradient-to-br from-[#2563EB] to-[#1B2A4A] text-white text-[11px] font-semibold flex items-center justify-center">
              {(user?.nama || user?.name || "U").slice(0, 2).toUpperCase()}
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="text-[12px] font-semibold text-[#1B2A4A]">{user?.nama || user?.name || "User"}</div>
              <div className="text-[10px] text-slate-400">{user?.role}</div>
            </div>
            <button
              data-testid="logout-btn"
              onClick={() => { onLogout(); navigate("/login"); }}
              title="Keluar"
              className="p-1.5 rounded-[4px] text-slate-400 hover:text-[#DC2626] hover:bg-[#DC2626]/5 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </header>
        <main className="flex-1 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={scaffoldingBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1B2A4A]/75" />
          </div>
          <div className="relative z-10 p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
