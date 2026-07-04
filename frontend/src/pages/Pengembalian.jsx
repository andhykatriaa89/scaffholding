import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { penyewaan, barang, fmtRp, DENDA_KERUSAKAN, hitungHari, HARI_INI } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";

const KONDISI = ["Baik", "Rusak Ringan", "Rusak Berat", "Hilang"];

export default function Pengembalian() {
  const [q, setQ] = useState("");
  const [sewa, setSewa] = useState(null);
  const [kondisi, setKondisi] = useState({});

  const aktif = penyewaan.filter((s) => s.status !== "Selesai");
  const hasil = useMemo(
    () =>
      q.trim()
        ? aktif.filter(
            (s) => s.id.toLowerCase().includes(q.toLowerCase()) || s.pelanggan.toLowerCase().includes(q.toLowerCase())
          )
        : aktif,
    [q]
  );

  const pilih = (s) => {
    setSewa(s);
    setKondisi(Object.fromEntries(s.items.map((i) => [i.itemId, "Baik"])));
  };

  const hariTelat = sewa ? Math.max(0, hitungHari(sewa.tglSelesai, HARI_INI)) : 0;

  const dendaItem = (it) => {
    const k = kondisi[it.itemId] || "Baik";
    const hargaJual = barang.find((b) => b.id === it.itemId)?.hargaJual || 0;
    const dendaRusak = Math.round(hargaJual * DENDA_KERUSAKAN[k] * it.qty);
    const dendaTelat = hariTelat * it.hargaSewa * it.qty;
    return { k, dendaRusak, dendaTelat, total: dendaRusak + dendaTelat };
  };

  const totalDenda = sewa ? sewa.items.reduce((s, it) => s + dendaItem(it).total, 0) : 0;

  const proses = () => {
    toast.success(`Pengembalian ${sewa.id} diproses — total denda ${fmtRp(totalDenda)}. Stok tersedia diperbarui.`);
    setSewa(null);
    setQ("");
  };

  return (
    <div className="max-w-[1100px] space-y-4">
      <div className="bg-white border border-[#E4E4E0] rounded-[6px] p-5">
        <div className="text-[13px] font-semibold mb-1">Cari Kontrak Sewa Aktif</div>
        <div className="text-[11px] text-[#1F2420]/50 mb-3">Masukkan ID sewa atau nama pelanggan untuk memproses pengembalian barang.</div>
        <div className="relative w-full max-w-[380px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1F2420]/35" />
          <input
            data-testid="pengembalian-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="cth: SWA-1198 atau Mitra Konstruksi…"
            className="w-full h-9 pl-8 pr-3 text-[13px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
          />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          {hasil.map((s) => (
            <button
              key={s.id}
              data-testid={`pengembalian-pilih-${s.id}`}
              onClick={() => pilih(s)}
              className={`flex items-center justify-between px-3 py-2.5 border rounded-[4px] text-left transition-colors ${
                sewa?.id === s.id ? "border-[#D8621B] bg-[#D8621B]/5" : "border-[#E4E4E0] hover:border-[#1F2420]/25"
              }`}
            >
              <div>
                <div className="text-[12px] font-medium">{s.pelanggan}</div>
                <div className="num text-[10px] text-[#1F2420]/50">{s.id} · {s.tglMulai} → {s.tglSelesai}</div>
              </div>
              <StatusBadge status={s.status} />
            </button>
          ))}
          {hasil.length === 0 && <p className="text-[12px] text-[#1F2420]/45 py-2">Tidak ada kontrak aktif yang cocok.</p>}
        </div>
      </div>

      {sewa && (
        <div className="bg-white border border-[#E4E4E0] rounded-[6px] p-5 space-y-4" data-testid="pengembalian-detail">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <div className="text-[13px] font-semibold">Checklist Kondisi — <span className="num">{sewa.id}</span></div>
              <div className="text-[11px] text-[#1F2420]/50">
                {sewa.pelanggan} · jatuh tempo <span className="num">{sewa.tglSelesai}</span>
                {hariTelat > 0 && (
                  <span className="text-[#B3452F] font-medium"> · telat {hariTelat} hari (denda keterlambatan = tarif harian × qty × {hariTelat})</span>
                )}
              </div>
            </div>
            <StatusBadge status={sewa.status} />
          </div>

          <div className="space-y-3">
            {sewa.items.map((it) => {
              const d = dendaItem(it);
              return (
                <div key={it.itemId} className="border border-[#E4E4E0] rounded-[4px] p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[13px] font-medium">{it.nama}</span>
                      <span className="num text-[11px] text-[#1F2420]/50 ml-2">{it.itemId} · {it.qty} unit</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {KONDISI.map((k) => (
                        <label key={k} className="flex items-center gap-1.5 text-[12px] cursor-pointer">
                          <input
                            type="radio"
                            data-testid={`kondisi-${it.itemId}-${k.toLowerCase().replace(/\s/g, "-")}`}
                            name={`kondisi-${it.itemId}`}
                            checked={kondisi[it.itemId] === k}
                            onChange={() => setKondisi({ ...kondisi, [it.itemId]: k })}
                            className="accent-[#D8621B]"
                          />
                          <span className={kondisi[it.itemId] === k ? "font-medium" : "text-[#1F2420]/60"}>{k}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {(d.k !== "Baik" || d.dendaTelat > 0) && (
                    <div className="mt-2 pt-2 border-t border-dashed border-[#E4E4E0] text-[12px] space-y-0.5" data-testid={`denda-${it.itemId}`}>
                      {d.dendaTelat > 0 && (
                        <div className="flex justify-between text-[#1F2420]/70">
                          <span>Denda keterlambatan ({hariTelat} hr × {fmtRp(it.hargaSewa)} × {it.qty} unit)</span>
                          <span className="num text-[#B3452F]">{fmtRp(d.dendaTelat)}</span>
                        </div>
                      )}
                      {d.dendaRusak > 0 && (
                        <div className="flex justify-between text-[#1F2420]/70">
                          <span>Denda {d.k.toLowerCase()} ({Math.round(DENDA_KERUSAKAN[d.k] * 100)}% harga jual × {it.qty} unit)</span>
                          <span className="num text-[#B3452F]">{fmtRp(d.dendaRusak)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium">
                        <span>Subtotal denda item</span>
                        <span className="num text-[#B3452F]">{fmtRp(d.total)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-[#EEEEEA] pt-3 flex-wrap gap-3">
            <div className="text-[13px]">
              Total denda pengembalian:{" "}
              <span className={`num font-semibold ${totalDenda > 0 ? "text-[#B3452F]" : "text-[#3F6B4F]"}`} data-testid="pengembalian-total-denda">
                {fmtRp(totalDenda)}
              </span>
            </div>
            <button
              data-testid="pengembalian-proses-btn"
              onClick={proses}
              className="h-9 px-4 bg-[#D8621B] hover:bg-[#C2560F] text-white text-[13px] font-medium rounded-[4px] transition-colors"
            >
              Proses Pengembalian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
