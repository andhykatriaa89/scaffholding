import { useMemo, useState } from "react";
import { FileDown, ChevronLeft, ChevronRight, FileBarChart, Filter } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "@/lib/axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { fmtRp } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

const PER_PAGE = 8;

export default function Laporan() {
  const [jenis, setJenis] = useState("Penjualan");
  const [dari, setDari] = useState("2026-05-01");
  const [sampai, setSampai] = useState("2026-06-14");
  const [page, setPage] = useState(1);

  const endpoint = jenis === "Penjualan" ? "penjualan" : jenis === "Penyewaan" ? "penyewaan" : "stok";
  const url = `/api/laporan/${endpoint}?dari=${dari}&sampai=${sampai}&page=${page}&per_page=${PER_PAGE}`;
  const fetcher = u => axios.get(u).then(r => r.data);
  const { data: response, isLoading } = useSWR(url, fetcher);

  const shown = response?.data || [];
  const totalPage = response?.last_page || 1;
  const totalBaris = response?.total || 0;
  
  // backend already handles filtering and gives us paginated results.
  // totalNilai just sums up the current page for display, or we could have backend send total sum.
  // For now, let's keep it summing the current page or remove it.
  const totalNilai = shown.reduce((s, r) => s + r.nilai, 0);

  const exportFile = async (fmt) => {
    const loadingToast = toast.loading(`Mengekspor Laporan ke ${fmt}...`);
    try {
      const fetchUrl = `/api/laporan/${endpoint}?dari=${dari}&sampai=${sampai}&per_page=10000`;
      const res = await axios.get(fetchUrl);
      const allData = res.data.data;

      if (!allData || allData.length === 0) {
        toast.error("Tidak ada data untuk diekspor pada rentang tanggal ini.", { id: loadingToast });
        return;
      }

      const reportTitle = `Laporan ${jenis}`;
      const reportDate = `${dari} s/d ${sampai}`;

      if (fmt === "PDF") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("PT SUCOOT SCAFORM INDONESIA", 14, 15);
        doc.setFontSize(12);
        doc.text(reportTitle, 14, 23);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Periode: ${jenis === "Stok" ? "Real-time" : reportDate}`, 14, 29);

        const tableColumn = jenis === "Stok" 
          ? ["Kode", "Barang", "Kategori", "Detail Stok", "Nilai Tersedia", "Status"]
          : ["ID Trans.", "Tanggal", "Pelanggan", "Metode", "Detail Transaksi", "Nilai (Rp)", "Status"];

        const tableRows = [];

        allData.forEach(r => {
          if (jenis === "Stok") {
            tableRows.push([r.id, r.pelanggan, r.metode, r.detail, fmtRp(r.nilai), r.status]);
          } else {
            tableRows.push([r.id, r.tanggal, r.pelanggan, r.metode, r.detail, fmtRp(r.nilai), r.status]);
          }
        });

        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 35,
          theme: "grid",
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [37, 99, 235] },
        });

        doc.save(`${jenis}_${dari}_to_${sampai}.pdf`);
      }

      toast.success(`Laporan ${jenis} berhasil diekspor ke PDF!`, { id: loadingToast });
    } catch (err) {
      toast.error(`Gagal mengekspor laporan ke PDF`, { id: loadingToast });
    }
  };

  const ganti = (v, setter) => { setter(v); setPage(1); };

  return (
    <div className="max-w-[1400px] space-y-6">
      <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60">
        
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 ml-1">Jenis Laporan</label>
              <div className="relative">
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  data-testid="laporan-filter-jenis"
                  value={jenis}
                  onChange={(e) => ganti(e.target.value, setJenis)}
                  className="h-10 pl-9 pr-8 text-[13px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none transition-all"
                >
                  <option>Penjualan</option>
                  <option>Penyewaan</option>
                  <option>Stok</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 ml-1">Dari Tanggal</label>
              <input
                data-testid="laporan-filter-dari"
                type="date" value={dari} onChange={(e) => ganti(e.target.value, setDari)}
                className="h-10 px-3 text-[13px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 ml-1">Sampai Tanggal</label>
              <input
                data-testid="laporan-filter-sampai"
                type="date" value={sampai} onChange={(e) => ganti(e.target.value, setSampai)}
                className="h-10 px-3 text-[13px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[12px] font-bold text-slate-500 mb-1">Total {totalBaris} Baris Data</span>
            <span className="text-[20px] font-black text-[#2563EB] bg-blue-50 px-4 py-1.5 rounded-lg border border-blue-100">{fmtRp(totalNilai)}</span>
          </div>
        </div>

        <div className="border border-slate-200 rounded-[10px] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 text-slate-800">
              <FileBarChart size={18} className="text-[#2563EB]" strokeWidth={2.5} />
              <h3 className="text-[15px] font-bold">Laporan {jenis} {jenis !== "Stok" && <span className="text-[13px] font-medium text-slate-500 ml-1">({dari} s/d {sampai})</span>}</h3>
            </div>
            
            <div className="flex gap-2">
              <button
                data-testid="laporan-export-pdf"
                onClick={() => exportFile("PDF")}
                className="h-9 px-4 inline-flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-red-600 transition-colors shadow-sm"
              >
                <FileDown size={16} /> Export PDF
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" data-testid="laporan-table">
              <thead>
                <tr className="border-b border-slate-200 text-[13px] text-slate-500 bg-white">
                  <th className="px-5 py-3.5 font-medium">{jenis === "Stok" ? "Kode" : "ID Transaksi"}</th>
                  <th className="px-3 py-3.5 font-medium">Tanggal</th>
                  <th className="px-3 py-3.5 font-medium">{jenis === "Stok" ? "Barang" : "Pelanggan"}</th>
                  <th className="px-3 py-3.5 font-medium">Detail</th>
                  <th className="px-3 py-3.5 font-medium">{jenis === "Stok" ? "Kategori" : "Metode"}</th>
                  <th className="px-3 py-3.5 font-medium text-right">{jenis === "Stok" ? "Nilai Stok Tersedia" : "Nilai"}</th>
                  <th className="px-5 py-3.5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-[14px] font-medium text-slate-700 bg-white">
                {isLoading ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-medium">Memuat data...</td></tr>
                ) : shown.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4 text-slate-500">{r.id}</td>
                    <td className="px-3 py-4 text-slate-500">{r.tanggal}</td>
                    <td className="px-3 py-4 font-bold text-slate-800">{r.pelanggan}</td>
                    <td className="px-3 py-4 text-slate-500">{r.detail}</td>
                    <td className="px-3 py-4 text-slate-500">{r.metode}</td>
                    <td className="px-3 py-4 text-right font-bold">{fmtRp(r.nilai)}</td>
                    <td className="px-5 py-4 text-right"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
                {!isLoading && shown.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-medium">Tidak ada data pada rentang tanggal tersebut.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-[13px] font-bold text-slate-500">
              Halaman {page} dari {totalPage}
            </span>
            <div className="flex gap-2">
              <button
                data-testid="laporan-prev-page"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-2 border border-slate-200 bg-white rounded-md disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                data-testid="laporan-next-page"
                disabled={page >= totalPage}
                onClick={() => setPage(page + 1)}
                className="p-2 border border-slate-200 bg-white rounded-md disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
