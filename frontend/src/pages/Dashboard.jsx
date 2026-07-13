import useSWR from "swr";
import axios from "@/lib/axios";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Package, AlertTriangle, Receipt, CalendarClock, TrendingUp, ArrowUpRight, ArrowRightLeft } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Dashboard() {
  const { data: summary, error: errSummary, isLoading: loadSummary } = useSWR("/api/dashboard/summary", fetcher);
  const { data: grafikBulanan, error: errChart, isLoading: loadChart } = useSWR("/api/dashboard/grafik-bulanan", fetcher);
  const { data: aktivitasTerbaru, error: errActs, isLoading: loadActs } = useSWR("/api/dashboard/aktivitas-terbaru", fetcher);

  if (loadSummary || loadChart || loadActs) {
    return <div className="p-6 text-slate-500">Memuat data dashboard...</div>;
  }

  if (errSummary || errChart || errActs) {
    return <div className="p-6 text-red-500">Gagal memuat data dashboard.</div>;
  }

  const { totalStokBarang, totalJenisBarang, stokMenipis, transaksiHariIni, jatuhTempo, telatCount } = summary;

  return (
    <div className="space-y-6 max-w-[1400px]">
      
      {/* 4 Cards (Dynamic Data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex items-start justify-between">
          <div>
            <div className="text-[13px] text-slate-500 font-medium mb-1">Total Stok Barang</div>
            <div className="text-[32px] font-bold text-slate-800 tracking-tight mb-1">{totalStokBarang?.toLocaleString('id-ID') || 0}</div>
            <div className="text-xs text-slate-400 font-medium">{totalJenisBarang} jenis barang</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Package size={24} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex items-start justify-between">
          <div>
            <div className="text-[13px] text-slate-500 font-medium mb-1">Stok Menipis</div>
            <div className="text-[32px] font-bold text-slate-800 tracking-tight mb-1">{stokMenipis.length}</div>
            <div className="text-xs text-slate-400 font-medium">Membutuhkan restok</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
            <AlertTriangle size={24} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex items-start justify-between">
          <div>
            <div className="text-[13px] text-slate-500 font-medium mb-1">Aktivitas Hari Ini</div>
            <div className="text-[32px] font-bold text-slate-800 tracking-tight mb-1">{transaksiHariIni.total}</div>
            <div className="text-xs text-slate-400 font-medium">Transaksi tercatat</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#059669] flex items-center justify-center">
            <ArrowRightLeft size={24} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex items-start justify-between">
          <div>
            <div className="text-[13px] text-slate-500 font-medium mb-1">Sewa Jatuh Tempo</div>
            <div className="text-[32px] font-bold text-slate-800 tracking-tight mb-1">{jatuhTempo.length}</div>
            <div className="text-xs text-slate-400 font-medium">{telatCount} telah lewat tempo</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center">
            <CalendarClock size={24} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart (Dynamic Data) */}
        <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 lg:col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-[#2563EB]" strokeWidth={2.5} />
            <h2 className="text-[16px] font-bold text-slate-800">Penjualan vs Penyewaan</h2>
          </div>
          <div className="text-[13px] text-slate-400 font-medium mb-8">Volume transaksi dalam juta rupiah (2026)</div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grafikBulanan} barGap={6} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                  formatter={(v, n) => [`Rp ${v} jt`, n === "sewa" ? "Penyewaan" : "Penjualan"]} 
                />
                <Legend 
                  iconType="square" 
                  iconSize={10} 
                  wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} 
                  formatter={(v) => <span className="text-slate-600 font-medium">{v === "sewa" ? "Penyewaan" : "Penjualan"}</span>}
                />
                <Bar name="Penjualan" dataKey="jual" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={36} />
                <Bar name="Penyewaan" dataKey="sewa" fill="#EA580C" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stok Menipis List (Dynamic Data) */}
        <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#D97706]" strokeWidth={2.5} />
              <h2 className="text-[16px] font-bold text-slate-800">Stok Menipis</h2>
            </div>
            <Link to="/barang" className="text-[13px] text-[#2563EB] font-semibold flex items-center gap-1 hover:underline">
              Lihat Semua <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2" style={{ maxHeight: '280px' }}>
            {stokMenipis.length === 0 ? (
              <div className="text-sm text-slate-500 text-center py-10">Stok aman, tidak ada peringatan.</div>
            ) : stokMenipis.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[10px] bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                  <Package size={22} className="text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-slate-800 truncate mb-0.5">{item.nama}</div>
                  <div className="text-[12px] font-medium text-slate-400">Kategori: {item.kategori}</div>
                </div>
                <div className="text-[14px] font-bold text-[#DC2626] shrink-0">
                  {item.stokTersedia} unit
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table: Sewa Jatuh Tempo (Dynamic Data) */}
      <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarClock size={18} className="text-[#EA580C]" strokeWidth={2.5} />
            <h2 className="text-[16px] font-bold text-slate-800">Sewa Mendekati / Lewat Jatuh Tempo</h2>
          </div>
          <Link to="/penyewaan" className="text-[13px] text-[#2563EB] font-semibold flex items-center gap-1 hover:underline">
            Kelola Transaksi <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 text-[13px] text-slate-500">
                <th className="pb-3 px-2 font-medium">ID Sewa</th>
                <th className="pb-3 px-2 font-medium">Pelanggan</th>
                <th className="pb-3 px-2 font-medium">Tgl Mulai</th>
                <th className="pb-3 px-2 font-medium">Estimasi Selesai</th>
                <th className="pb-3 px-2 font-medium">Item Disewa</th>
                <th className="pb-3 px-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-slate-700 font-medium">
              {jatuhTempo.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-2 text-slate-500">{s.id}</td>
                  <td className="py-4 px-2">{s.pelanggan}</td>
                  <td className="py-4 px-2 text-slate-500">{s.tglMulai}</td>
                  <td className="py-4 px-2 text-slate-500">{s.tglSelesai}</td>
                  <td className="py-4 px-2">{s.items.length} jenis ({s.items.reduce((a, i) => a + i.qty, 0)} unit)</td>
                  <td className="py-4 px-2">
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Table: Aktivitas Terbaru (Dynamic Data) */}
      <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-[#059669]" strokeWidth={2.5} />
            <h2 className="text-[16px] font-bold text-slate-800">Aktivitas Terbaru</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 text-[13px] text-slate-500">
                <th className="pb-3 px-2 font-medium">Waktu</th>
                <th className="pb-3 px-2 font-medium">Jenis</th>
                <th className="pb-3 px-2 font-medium">Referensi</th>
                <th className="pb-3 px-2 font-medium">Keterangan</th>
                <th className="pb-3 px-2 font-medium">Oleh</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-slate-700 font-medium">
              {aktivitasTerbaru.map((a, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-2 text-slate-500 whitespace-nowrap">{a.waktu}</td>
                  <td className="py-4 px-2">
                    <StatusBadge status={a.jenis === "Stok" ? "Perlu Pengecekan" : a.jenis === "Penyewaan" ? "Aktif" : a.jenis === "Penjualan" ? "Lunas" : "Selesai"} />
                  </td>
                  <td className="py-4 px-2 text-slate-500">{a.ref}</td>
                  <td className="py-4 px-2 truncate max-w-[300px]">{a.keterangan}</td>
                  <td className="py-4 px-2 text-slate-500">{a.oleh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
