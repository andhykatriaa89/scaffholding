import { useMemo, useState } from "react";
import { FileDown, FileSpreadsheet, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { penjualan, penyewaan, barang, stokTersedia, fmtRp, totalTransaksi, hitungHari } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";

const PER_PAGE = 6;

export default function Laporan() {
  const [jenis, setJenis] = useState("Penjualan");
  const [dari, setDari] = useState("2026-05-01");
  const [sampai, setSampai] = useState("2026-06-14");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    if (jenis === "Penjualan")
      return penjualan
        .filter((t) => t.tanggal >= dari && t.tanggal <= sampai)
        .map((t) => ({
          id: t.id, tanggal: t.tanggal, pelanggan: t.pelanggan,
          detail: `${t.items.length} jenis · ${t.items.reduce((a, i) => a + i.qty, 0)} unit`,
          nilai: totalTransaksi(t.items, "harga"), status: t.status, metode: t.metode,
        }));
    if (jenis === "Penyewaan")
      return penyewaan
        .filter((t) => t.tglMulai >= dari && t.tglMulai <= sampai)
        .map((t) => ({
          id: t.id, tanggal: t.tglMulai, pelanggan: t.pelanggan,
          detail: `${t.items.length} jenis · s/d ${t.tglSelesai}`,
          nilai: totalTransaksi(t.items, "hargaSewa") * hitungHari(t.tglMulai, t.tglSelesai),
          status: t.status, metode: t.metode,
        }));
    return barang.map((b) => ({
      id: b.id, tanggal: "—", pelanggan: b.nama,
      detail: `Total ${b.stokTotal} · disewa ${b.stokDisewa} · tersedia ${stokTersedia(b)}`,
      nilai: stokTersedia(b) * b.hargaJual,
      status: stokTersedia(b) < b.minStok ? "Menipis" : "Cukup", metode: b.kategori,
    }));
  }, [jenis, dari, sampai]);

  const totalPage = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const shown = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalNilai = rows.reduce((s, r) => s + r.nilai, 0);

  const exportFile = (fmt) =>
    toast.success(`Laporan ${jenis.toLowerCase()} periode ${dari} s/d ${sampai} diekspor ke ${fmt}`);

  const ganti = (v, setter) => { setter(v); setPage(1); };

  return (
    <div className="max-w-[1200px]">
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-medium mb-1 text-[#1F2420]/60">Jenis laporan</label>
          <select
            data-testid="laporan-filter-jenis"
            value={jenis}
            onChange={(e) => ganti(e.target.value, setJenis)}
            className="h-8 px-2 text-[12px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none"
          >
            <option>Penjualan</option>
            <option>Penyewaan</option>
            <option>Stok</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-medium mb-1 text-[#1F2420]/60">Dari tanggal</label>
          <input
            data-testid="laporan-filter-dari"
            type="date" value={dari} onChange={(e) => ganti(e.target.value, setDari)}
            className="h-8 px-2 text-[12px] num bg-white border border-[#D6D6D1] rounded-[4px] outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium mb-1 text-[#1F2420]/60">Sampai tanggal</label>
          <input
            data-testid="laporan-filter-sampai"
            type="date" value={sampai} onChange={(e) => ganti(e.target.value, setSampai)}
            className="h-8 px-2 text-[12px] num bg-white border border-[#D6D6D1] rounded-[4px] outline-none"
          />
        </div>
        <span className="text-[11px] text-[#1F2420]/50 pb-1.5">
          <span className="num">{rows.length}</span> baris · total nilai <span className="num font-medium text-[#1F2420]">{fmtRp(totalNilai)}</span>
        </span>
      </div>

      <div className="bg-white border border-[#E4E4E0] rounded-[6px] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#EEEEEA]">
          <div className="text-[13px] font-semibold">Laporan {jenis} {jenis !== "Stok" && <span className="text-[11px] font-normal text-[#1F2420]/50 num">({dari} — {sampai})</span>}</div>
          <div className="flex gap-2">
            <button
              data-testid="laporan-export-pdf"
              onClick={() => exportFile("PDF")}
              className="h-8 px-3 inline-flex items-center gap-1.5 text-[12px] border border-[#D6D6D1] rounded-[4px] hover:bg-[#F7F7F5] transition-colors"
            >
              <FileDown size={13} /> PDF
            </button>
            <button
              data-testid="laporan-export-excel"
              onClick={() => exportFile("Excel")}
              className="h-8 px-3 inline-flex items-center gap-1.5 text-[12px] border border-[#D6D6D1] rounded-[4px] hover:bg-[#F7F7F5] transition-colors"
            >
              <FileSpreadsheet size={13} /> Excel
            </button>
          </div>
        </div>
        <table className="w-full text-[12px]" data-testid="laporan-table">
          <thead>
            <tr className="text-left text-[11px] text-[#1F2420]/50 border-b border-[#EEEEEA]">
              <th className="px-4 py-2.5 font-medium">{jenis === "Stok" ? "Kode" : "ID Transaksi"}</th>
              <th className="px-2 py-2.5 font-medium">Tanggal</th>
              <th className="px-2 py-2.5 font-medium">{jenis === "Stok" ? "Barang" : "Pelanggan"}</th>
              <th className="px-2 py-2.5 font-medium">Detail</th>
              <th className="px-2 py-2.5 font-medium">{jenis === "Stok" ? "Kategori" : "Metode"}</th>
              <th className="px-2 py-2.5 font-medium text-right">{jenis === "Stok" ? "Nilai Stok Tersedia" : "Nilai"}</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-b border-[#F2F2EE] last:border-0 hover:bg-[#FAFAF8]">
                <td className="px-4 py-2.5 num text-[11px]">{r.id}</td>
                <td className="px-2 py-2.5 num text-[11px]">{r.tanggal}</td>
                <td className="px-2 py-2.5 font-medium">{r.pelanggan}</td>
                <td className="px-2 py-2.5 text-[#1F2420]/60">{r.detail}</td>
                <td className="px-2 py-2.5 text-[#1F2420]/70">{r.metode}</td>
                <td className="px-2 py-2.5 num text-right">{fmtRp(r.nilai)}</td>
                <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#1F2420]/45">Tidak ada data pada rentang tanggal tersebut.</td></tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#EEEEEA]">
          <span className="text-[11px] text-[#1F2420]/50 num">
            Halaman {page} dari {totalPage}
          </span>
          <div className="flex gap-1">
            <button
              data-testid="laporan-prev-page"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 border border-[#D6D6D1] rounded-[4px] disabled:opacity-35 hover:bg-[#F7F7F5]"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              data-testid="laporan-next-page"
              disabled={page >= totalPage}
              onClick={() => setPage(page + 1)}
              className="p-1.5 border border-[#D6D6D1] rounded-[4px] disabled:opacity-35 hover:bg-[#F7F7F5]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
