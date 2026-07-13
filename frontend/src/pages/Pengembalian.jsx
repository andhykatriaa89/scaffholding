import { useMemo, useState } from "react";
import { Search, Undo2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "@/lib/axios";
import { fmtRp, hitungHari } from "@/lib/utils";

const DENDA_KERUSAKAN = { "Baik": 0, "Rusak Ringan": 0.2, "Rusak Berat": 0.5, "Hilang": 1.0 };
const HARI_INI = new Date().toISOString().split("T")[0];
import { StatusBadge } from "@/components/StatusBadge";

const KONDISI = ["Baik", "Rusak Ringan", "Rusak Berat", "Hilang"];

export default function Pengembalian() {
  const fetcher = url => axios.get(url).then(r => r.data);
  const { data: aktif = [], mutate } = useSWR("/api/penyewaan/aktif", fetcher);

  const [q, setQ] = useState("");
  const [sewa, setSewa] = useState(null);
  const [kondisi, setKondisi] = useState({});
  const hasil = useMemo(
    () =>
      q.trim()
        ? aktif.filter(
            (s) => s.id.toLowerCase().includes(q.toLowerCase()) || s.pelanggan.toLowerCase().includes(q.toLowerCase())
          )
        : aktif,
    [q, aktif]
  );

  const pilih = (s) => {
    setSewa(s);
    setKondisi(Object.fromEntries(s.items.map((i) => [i.itemId, "Baik"])));
  };

  const hariTelat = sewa ? Math.max(0, hitungHari(sewa.tglSelesai, HARI_INI)) : 0;

  const dendaItem = (it) => {
    const k = kondisi[it.itemId] || "Baik";
    const hargaJual = it.hargaJual || 0;
    const dendaRusak = Math.round(hargaJual * DENDA_KERUSAKAN[k] * it.qty);
    const dendaTelat = hariTelat * it.hargaSewa * it.qty;
    return { k, dendaRusak, dendaTelat, total: dendaRusak + dendaTelat };
  };

  const totalDenda = sewa ? sewa.items.reduce((s, it) => s + dendaItem(it).total, 0) : 0;

  const proses = async () => {
    try {
      const payload = {
        penyewaan_id: sewa.id,
        items: sewa.items.map(it => ({
          barang_id: it.itemId,
          kondisi: kondisi[it.itemId] || "Baik"
        }))
      };
      await axios.post("/api/pengembalian", payload);
      toast.success(`Pengembalian ${sewa.id} diproses — total denda ${fmtRp(totalDenda)}. Stok tersedia diperbarui.`);
      setSewa(null);
      setQ("");
      mutate();
    } catch (e) {
      toast.error(e.response?.data?.message || "Gagal memproses pengembalian");
    }
  };

  return (
    <div className="max-w-[1400px] space-y-6">
      
      {/* Search Section */}
      <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60">
        <div className="flex items-center gap-2 mb-1">
          <Undo2 size={20} className="text-[#EA580C]" strokeWidth={2.5} />
          <h2 className="text-[18px] font-bold text-slate-800 tracking-tight">Cari Kontrak Sewa Aktif</h2>
        </div>
        <div className="text-[13px] text-slate-500 font-medium mb-6">Masukkan ID sewa atau nama pelanggan untuk memproses pengembalian barang.</div>
        
        <div className="relative w-full max-w-[480px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            data-testid="pengembalian-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="cth: SWA-1198 atau Mitra Konstruksi…"
            className="w-full h-12 pl-11 pr-4 text-[14px] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasil.map((s) => (
            <button
              key={s.id}
              data-testid={`pengembalian-pilih-${s.id}`}
              onClick={() => pilih(s)}
              className={`flex items-center justify-between p-4 border rounded-xl text-left transition-all ${
                sewa?.id === s.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100 shadow-sm" : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
              }`}
            >
              <div>
                <div className="text-[14px] font-bold text-slate-800 mb-1">{s.pelanggan}</div>
                <div className="text-[12px] font-medium text-slate-500">{s.id} · {s.tglMulai} → {s.tglSelesai}</div>
              </div>
              <StatusBadge status={s.status} />
            </button>
          ))}
          {hasil.length === 0 && <p className="text-[13px] font-medium text-slate-400 py-2 col-span-full">Tidak ada kontrak aktif yang cocok.</p>}
        </div>
      </div>

      {/* Details Section */}
      {sewa && (
        <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 space-y-6 animate-in slide-in-from-bottom-4 duration-500" data-testid="pengembalian-detail">
          
          <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-[18px] font-bold text-slate-800 mb-1">Checklist Kondisi Barang — {sewa.id}</h3>
              <div className="text-[13px] font-medium text-slate-500">
                {sewa.pelanggan} · jatuh tempo <span className="font-bold text-slate-700">{sewa.tglSelesai}</span>
                {hariTelat > 0 && (
                  <span className="text-[#DC2626] font-bold bg-red-50 px-2 py-0.5 rounded-md ml-2"> · telat {hariTelat} hari (denda = tarif harian × qty × {hariTelat})</span>
                )}
              </div>
            </div>
            <StatusBadge status={sewa.status} />
          </div>

          <div className="space-y-4">
            {sewa.items.map((it) => {
              const d = dendaItem(it);
              return (
                <div key={it.itemId} className="border border-slate-200 rounded-[10px] p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <span className="text-[15px] font-bold text-slate-800">{it.nama}</span>
                      <span className="text-[13px] font-medium text-slate-500 ml-3 bg-white border border-slate-200 px-2 py-0.5 rounded-md">{it.itemId} · {it.qty} unit</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {KONDISI.map((k) => (
                        <label key={k} className="flex items-center gap-2 text-[13px] cursor-pointer bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-blue-400 transition-colors">
                          <input
                            type="radio"
                            data-testid={`kondisi-${it.itemId}-${k.toLowerCase().replace(/\s/g, "-")}`}
                            name={`kondisi-${it.itemId}`}
                            checked={kondisi[it.itemId] === k}
                            onChange={() => setKondisi({ ...kondisi, [it.itemId]: k })}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={kondisi[it.itemId] === k ? "font-bold text-slate-800" : "font-medium text-slate-600"}>{k}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {(d.k !== "Baik" || d.dendaTelat > 0) && (
                    <div className="pt-3 border-t border-dashed border-slate-200 text-[13px] space-y-1.5 bg-red-50/50 -mx-5 -mb-5 px-5 py-4 rounded-b-[10px]" data-testid={`denda-${it.itemId}`}>
                      {d.dendaTelat > 0 && (
                        <div className="flex justify-between text-slate-700 font-medium">
                          <span>Denda Keterlambatan ({hariTelat} hr × {fmtRp(it.hargaSewa)} × {it.qty} unit)</span>
                          <span className="font-bold text-[#DC2626]">{fmtRp(d.dendaTelat)}</span>
                        </div>
                      )}
                      {d.dendaRusak > 0 && (
                        <div className="flex justify-between text-slate-700 font-medium">
                          <span>Denda {d.k} ({Math.round(DENDA_KERUSAKAN[d.k] * 100)}% harga jual × {it.qty} unit)</span>
                          <span className="font-bold text-[#DC2626]">{fmtRp(d.dendaRusak)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-[14px] pt-1">
                        <span className="text-slate-800">Subtotal Denda Item</span>
                        <span className="text-[#DC2626]">{fmtRp(d.total)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-6 flex-wrap gap-4">
            <div className="text-[15px] font-bold text-slate-700">
              Total Denda Pengembalian:{" "}
              <span className={`text-[20px] font-black ml-2 ${totalDenda > 0 ? "text-[#DC2626]" : "text-[#059669]"}`} data-testid="pengembalian-total-denda">
                {fmtRp(totalDenda)}
              </span>
            </div>
            <button
              data-testid="pengembalian-proses-btn"
              onClick={proses}
              className="h-12 px-6 bg-[#2563EB] hover:bg-blue-700 text-white text-[15px] font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <CheckCircle2 size={20} strokeWidth={2.5} />
              Proses Pengembalian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
