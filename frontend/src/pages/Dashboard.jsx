import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertTriangle, ArrowRightLeft, CalendarClock } from "lucide-react";
import { barang, stokTersedia, penyewaan, grafikBulanan, aktivitasTerbaru, hitungHari, HARI_INI } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";

const Card = ({ children, className = "", testid }) => (
  <div data-testid={testid} className={`bg-white border border-[#E4E4E0] rounded-[6px] ${className}`}>{children}</div>
);

export default function Dashboard() {
  const stokMenipis = barang.filter((b) => stokTersedia(b) < b.minStok);
  const jatuhTempo = penyewaan.filter(
    (s) => s.status !== "Selesai" && hitungHari(HARI_INI, s.tglSelesai) <= 7
  );
  const telat = penyewaan.filter((s) => s.status === "Telat");

  return (
    <div className="space-y-4 max-w-[1200px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card testid="card-stok-menipis" className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-[#1F2420]/60">Stok menipis</span>
            <AlertTriangle size={15} className="text-[#B3452F]" />
          </div>
          <div className="text-[22px] font-semibold num">{stokMenipis.length} <span className="text-[13px] font-normal text-[#1F2420]/50">jenis barang</span></div>
          <div className="mt-1.5 space-y-0.5">
            {stokMenipis.slice(0, 2).map((b) => (
              <div key={b.id} className="text-[11px] text-[#1F2420]/60 flex justify-between">
                <span className="truncate">{b.nama}</span>
                <span className="num text-[#B3452F] font-medium ml-2">{stokTersedia(b)} unit</span>
              </div>
            ))}
          </div>
        </Card>
        <Card testid="card-transaksi-hari-ini" className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-[#1F2420]/60">Transaksi hari ini (14 Jun)</span>
            <ArrowRightLeft size={15} className="text-[#2E3B4E]" />
          </div>
          <div className="text-[22px] font-semibold num">3 <span className="text-[13px] font-normal text-[#1F2420]/50">transaksi</span></div>
          <div className="mt-1.5 text-[11px] text-[#1F2420]/60">
            1 penyewaan keluar · 1 penjualan · 1 pengembalian
          </div>
        </Card>
        <Card testid="card-jatuh-tempo" className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-[#1F2420]/60">Sewa jatuh tempo minggu ini</span>
            <CalendarClock size={15} className="text-[#D8621B]" />
          </div>
          <div className="text-[22px] font-semibold num">{jatuhTempo.length} <span className="text-[13px] font-normal text-[#1F2420]/50">kontrak</span></div>
          <div className="mt-1.5 text-[11px] text-[#1F2420]/60">
            {telat.length} di antaranya sudah lewat tempo
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card testid="chart-sewa-vs-jual" className="p-4 lg:col-span-2">
          <div className="mb-3">
            <div className="text-[13px] font-semibold">Nilai transaksi per bulan</div>
            <div className="text-[11px] text-[#1F2420]/50">Sewa vs jual, dalam juta rupiah (2026)</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={grafikBulanan} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBEBE7" vertical={false} />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} width={32} />
              <Tooltip
                formatter={(v, n) => [`Rp ${v} jt`, n === "sewa" ? "Penyewaan" : "Penjualan"]}
                contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #E4E4E0" }}
              />
              <Legend
                formatter={(v) => <span style={{ fontSize: 11 }}>{v === "sewa" ? "Penyewaan" : "Penjualan"}</span>}
                iconSize={9}
              />
              <Bar dataKey="sewa" fill="#D8621B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="jual" fill="#2E3B4E" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card testid="tabel-aktivitas" className="lg:col-span-3 overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <div className="text-[13px] font-semibold">Aktivitas terbaru</div>
            <div className="text-[11px] text-[#1F2420]/50">Pergerakan barang &amp; transaksi tercatat</div>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-left text-[11px] text-[#1F2420]/50 border-b border-[#EEEEEA]">
                <th className="px-4 py-2 font-medium">Waktu</th>
                <th className="px-2 py-2 font-medium">Jenis</th>
                <th className="px-2 py-2 font-medium">Ref</th>
                <th className="px-2 py-2 font-medium">Keterangan</th>
                <th className="px-4 py-2 font-medium">Oleh</th>
              </tr>
            </thead>
            <tbody>
              {aktivitasTerbaru.map((a, i) => (
                <tr key={i} className="border-b border-[#F2F2EE] last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-4 py-2 num text-[11px] text-[#1F2420]/60 whitespace-nowrap">{a.waktu}</td>
                  <td className="px-2 py-2"><StatusBadge status={a.jenis === "Stok" ? "Perlu Pengecekan" : a.jenis === "Penyewaan" ? "Aktif" : a.jenis === "Penjualan" ? "Lunas" : "Selesai"} /></td>
                  <td className="px-2 py-2 num text-[11px]">{a.ref}</td>
                  <td className="px-2 py-2 text-[#1F2420]/80 max-w-[300px]">{a.keterangan}</td>
                  <td className="px-4 py-2 text-[#1F2420]/60 whitespace-nowrap">{a.oleh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card testid="tabel-jatuh-tempo" className="overflow-hidden">
        <div className="px-4 pt-4 pb-2 flex items-baseline justify-between">
          <div>
            <div className="text-[13px] font-semibold">Sewa mendekati / lewat jatuh tempo</div>
            <div className="text-[11px] text-[#1F2420]/50">Perlu konfirmasi perpanjangan atau penjadwalan pengembalian</div>
          </div>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[11px] text-[#1F2420]/50 border-b border-[#EEEEEA]">
              <th className="px-4 py-2 font-medium">ID Sewa</th>
              <th className="px-2 py-2 font-medium">Pelanggan</th>
              <th className="px-2 py-2 font-medium">Mulai</th>
              <th className="px-2 py-2 font-medium">Estimasi Selesai</th>
              <th className="px-2 py-2 font-medium">Item</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...telat, ...jatuhTempo.filter((s) => s.status !== "Telat")].map((s) => (
              <tr key={s.id} className="border-b border-[#F2F2EE] last:border-0 hover:bg-[#FAFAF8]">
                <td className="px-4 py-2 num">{s.id}</td>
                <td className="px-2 py-2">{s.pelanggan}</td>
                <td className="px-2 py-2 num text-[11px]">{s.tglMulai}</td>
                <td className="px-2 py-2 num text-[11px]">{s.tglSelesai}</td>
                <td className="px-2 py-2 text-[#1F2420]/60">{s.items.length} jenis · <span className="num">{s.items.reduce((a, i) => a + i.qty, 0)}</span> unit</td>
                <td className="px-4 py-2"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
