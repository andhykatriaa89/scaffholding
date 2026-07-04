import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Users, Package, ShoppingCart, CalendarClock,
  Undo2, FileBarChart, Search, LogOut, ChevronRight, Construction,
} from "lucide-react";

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
        className="fixed inset-y-0 left-0 w-[220px] bg-[#09090B] text-[#A1A1AA] flex flex-col z-30"
      >
        <div className="flex items-center gap-2.5 px-4 h-[52px] border-b border-white/10">
          <div className="w-7 h-7 rounded-[4px] bg-[#EAB308] flex items-center justify-center shrink-0">
            <Construction size={16} className="text-[#09090B]" />
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold tracking-tight text-white">Sucoot Scaform</div>
            <div className="text-[10px] text-white/40">Sistem Penyewaan &amp; Penjualan</div>
          </div>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              data-testid={`nav-${to.slice(1)}`}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-[7px] rounded-[4px] text-[13px] transition-colors border-l-2 ${
                  isActive
                    ? "bg-[#27272A] text-white font-medium border-[#EAB308]"
                    : "text-white/55 hover:text-white hover:bg-white/5 border-transparent"
                }`
              }
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-white/10 text-[10px] text-white/35 leading-relaxed">
          Gudang Narogong — Bekasi<br />v1.0 · internal
        </div>
      </aside>

      <div className="flex-1 ml-[220px] flex flex-col min-w-0">
        <header
          data-testid="topbar"
          className="sticky top-0 z-20 h-[52px] bg-white border-b border-[#E4E4E7] flex items-center gap-4 px-5"
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
