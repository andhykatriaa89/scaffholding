import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { barang as data, stokTersedia, fmtRp, KATEGORI_INISIAL } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";

export default function Barang() {
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");

  const filtered = useMemo(
    () =>
      data.filter(
        (b) =>
          (kat === "Semua" || b.kategori === kat) &&
          (b.nama.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, kat]
  );

  return (
    <div className="max-w-[1200px]">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative w-[280px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1F2420]/35" />
          <input
            data-testid="barang-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama barang atau kode…"
            className="w-full h-8 pl-8 pr-3 text-[12px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
          />
        </div>
        <select
          data-testid="barang-filter-kategori"
          value={kat}
          onChange={(e) => setKat(e.target.value)}
          className="h-8 px-2 text-[12px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none"
        >
          <option>Semua</option>
          <option>Frame</option>
          <option>Brace</option>
          <option>Jack</option>
          <option>Platform</option>
          <option>Aksesori</option>
        </select>
        <span className="text-[11px] text-[#1F2420]/50 num">{filtered.length} jenis barang</span>
      </div>

      <div className="bg-white border border-[#E4E4E0] rounded-[6px] overflow-x-auto">
        <table className="w-full text-[12px]" data-testid="barang-table">
          <thead>
            <tr className="text-left text-[11px] text-[#1F2420]/50 border-b border-[#EEEEEA]">
              <th className="px-4 py-2.5 font-medium">Barang</th>
              <th className="px-2 py-2.5 font-medium">Kategori</th>
              <th className="px-2 py-2.5 font-medium text-right">Harga Jual</th>
              <th className="px-2 py-2.5 font-medium text-right">Sewa / Hari</th>
              <th className="px-2 py-2.5 font-medium text-right">Stok Total</th>
              <th className="px-2 py-2.5 font-medium text-right">Tersedia</th>
              <th className="px-2 py-2.5 font-medium text-right">Disewa</th>
              <th className="px-4 py-2.5 font-medium">Kondisi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const tersedia = stokTersedia(b);
              const menipis = tersedia < b.minStok;
              return (
                <tr key={b.id} className="border-b border-[#F2F2EE] last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-[4px] bg-[#ECECE8] border border-[#E0E0DB] flex items-center justify-center shrink-0">
                        <span className="num text-[11px] font-semibold text-[#1F2420]/45">{KATEGORI_INISIAL[b.kategori]}</span>
                      </div>
                      <div className="leading-tight">
                        <div className="font-medium">{b.nama}</div>
                        <div className="num text-[10px] text-[#1F2420]/45">{b.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-[#1F2420]/70">{b.kategori}</td>
                  <td className="px-2 py-2 num text-right">{fmtRp(b.hargaJual)}</td>
                  <td className="px-2 py-2 num text-right">{fmtRp(b.hargaSewa)}</td>
                  <td className="px-2 py-2 num text-right">{b.stokTotal}</td>
                  <td className="px-2 py-2 text-right">
                    <span className={`num inline-flex items-center gap-1.5 justify-end ${menipis ? "text-[#B3452F] font-semibold" : ""}`}>
                      {tersedia}
                      <StatusBadge status={menipis ? "Menipis" : "Cukup"} />
                    </span>
                  </td>
                  <td className="px-2 py-2 num text-right text-[#2E3B4E]">{b.stokDisewa}</td>
                  <td className="px-4 py-2"><StatusBadge status={b.kondisi} /></td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-[#1F2420]/45">Barang tidak ditemukan. Periksa ejaan atau ganti filter kategori.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-[#1F2420]/45">
        Tersedia = stok total − sedang disewa − ditandai rusak. Batas menipis mengikuti stok minimum tiap barang.
      </p>
    </div>
  );
}
