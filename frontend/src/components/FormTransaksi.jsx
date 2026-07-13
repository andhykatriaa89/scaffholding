import { useMemo, useState } from "react";
import { Search, Trash2, ChevronDown } from "lucide-react";
import { fmtRp, stokTersedia } from "@/lib/utils";
import useSWR from "swr";
import axios from "@/lib/axios";

const fetcher = url => axios.get(url).then(r => r.data);

export const PilihPelanggan = ({ value, onChange }) => {
  const { data: pelanggan = [] } = useSWR("/api/pelanggan", fetcher);
  return (
    <div>
      <label className="block text-[13px] font-bold text-slate-700 mb-2">Pilih Pelanggan</label>
      <div className="relative">
        <select
          data-testid="trx-pilih-pelanggan"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-4 pr-10 text-[14px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-slate-700"
        >
          <option value="">— Pilih pelanggan terdaftar —</option>
          {pelanggan.map((p) => (
            <option key={p.id} value={p.id}>{p.nama} ({p.jenis})</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

export const CariBarang = ({ onAdd, hargaKey = "hargaJual", label }) => {
  const { data: barang = [] } = useSWR("/api/barang", fetcher);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const hasil = useMemo(
    () => (q.trim() ? barang.filter((b) => b.nama.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : []),
    [q, barang]
  );

  return (
    <div className="relative">
      <label className="block text-[13px] font-bold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          data-testid="trx-cari-barang"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Ketik nama barang, cth: main frame, catwalk…"
          className="w-full h-11 pl-10 pr-4 text-[14px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder:font-normal"
        />
      </div>
      {open && hasil.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-[10px] shadow-lg max-h-[280px] overflow-y-auto overflow-hidden animate-in fade-in slide-in-from-top-2">
          {hasil.map((b) => (
            <button
              key={b.id}
              type="button"
              data-testid={`trx-hasil-${b.id}`}
              onClick={() => { onAdd(b); setQ(""); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 border-b border-slate-100 last:border-0 transition-colors"
            >
              <div>
                <div className="text-[14px] font-bold text-slate-800 mb-0.5">{b.nama}</div>
                <div className="text-[12px] font-medium text-slate-500">{b.id} · tersedia <span className="text-blue-600 font-bold">{stokTersedia(b)} unit</span></div>
              </div>
              <span className="text-[14px] font-bold text-slate-700">{fmtRp(b[hargaKey])}{hargaKey === "hargaSewa" ? "/hr" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ListBarang = ({ onAdd, hargaKey = "hargaJual", label }) => {
  const { data: barang = [] } = useSWR("/api/barang", fetcher);

  const handleChange = (e) => {
    const id = e.target.value;
    if (!id) return;
    const b = barang.find(x => x.id === id);
    if (b) {
      onAdd(b);
    }
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-[13px] font-bold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <select
          data-testid="trx-list-barang"
          onChange={handleChange}
          defaultValue=""
          className="w-full h-11 pl-4 pr-10 text-[14px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-slate-700"
        >
          <option value="" disabled>— Pilih barang untuk ditambahkan —</option>
          {barang.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nama} (Tersedia: {stokTersedia(b)} unit) — {fmtRp(b[hargaKey])}{hargaKey === "hargaSewa" ? "/hr" : ""}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

export const TabelItem = ({ items, onQty, onRemove, hargaLabel }) => (
  <div className="border border-slate-200 rounded-[10px] overflow-hidden bg-white">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-slate-200 text-[13px] text-slate-500 bg-slate-50">
          <th className="px-4 py-3 font-medium">Detail Barang</th>
          <th className="px-3 py-3 font-medium text-right">{hargaLabel}</th>
          <th className="px-3 py-3 font-medium text-center w-[100px]">Kuantitas</th>
          <th className="px-3 py-3 font-medium text-right">Subtotal</th>
          <th className="px-4 py-3 w-[50px]"></th>
        </tr>
      </thead>
      <tbody className="text-[14px] font-medium text-slate-700">
        {items.length === 0 && (
          <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400 font-medium bg-slate-50/50">Belum ada barang. Cari dan tambahkan barang di atas.</td></tr>
        )}
        {items.map((it) => (
          <tr key={it.itemId} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
            <td className="px-4 py-3">
              <div className="font-bold text-slate-800">{it.nama}</div>
              <div className="text-[12px] text-slate-500">{it.itemId}</div>
            </td>
            <td className="px-3 py-3 text-right text-slate-500">{fmtRp(it.harga)}</td>
            <td className="px-3 py-3 text-center">
              <input
                data-testid={`trx-qty-${it.itemId}`}
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => onQty(it.itemId, Math.max(1, parseInt(e.target.value) || 1))}
                className="w-[72px] h-9 px-3 text-[14px] font-bold text-right bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm"
              />
            </td>
            <td className="px-3 py-3 text-right font-bold">{fmtRp(it.harga * it.qty)}</td>
            <td className="px-4 py-3 text-center">
              <button
                data-testid={`trx-hapus-${it.itemId}`}
                onClick={() => onRemove(it.itemId)}
                className="p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Hapus item"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const MetodePembayaran = ({ value, onChange }) => (
  <div>
    <label className="block text-[13px] font-bold text-slate-700 mb-2">Metode Pembayaran <span className="font-normal text-slate-400">(catatan internal)</span></label>
    <div className="relative">
      <select
        data-testid="trx-metode-pembayaran"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 pl-4 pr-10 text-[14px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-slate-700"
      >
        <option>Tunai</option>
        <option>Transfer</option>
        <option>Cek / Giro</option>
        <option>Lainnya</option>
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);
