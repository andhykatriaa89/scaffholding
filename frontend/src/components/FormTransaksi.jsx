import { useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { barang, stokTersedia, fmtRp, pelanggan } from "@/data/mock";

export const PilihPelanggan = ({ value, onChange }) => (
  <div>
    <label className="block text-[12px] font-medium mb-1.5">Pelanggan</label>
    <select
      data-testid="trx-pilih-pelanggan"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 px-2 text-[13px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
    >
      <option value="">— Pilih pelanggan terdaftar —</option>
      {pelanggan.map((p) => (
        <option key={p.id} value={p.id}>{p.nama} ({p.jenis})</option>
      ))}
    </select>
  </div>
);

export const CariBarang = ({ onAdd, hargaKey = "hargaJual", label }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const hasil = useMemo(
    () => (q.trim() ? barang.filter((b) => b.nama.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : []),
    [q]
  );

  return (
    <div className="relative">
      <label className="block text-[12px] font-medium mb-1.5">{label}</label>
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1F2420]/35" />
        <input
          data-testid="trx-cari-barang"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Ketik nama barang, cth: main frame, catwalk…"
          className="w-full h-9 pl-8 pr-3 text-[13px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
        />
      </div>
      {open && hasil.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-[#E4E4E0] rounded-[4px] shadow-sm max-h-[240px] overflow-y-auto">
          {hasil.map((b) => (
            <button
              key={b.id}
              type="button"
              data-testid={`trx-hasil-${b.id}`}
              onClick={() => { onAdd(b); setQ(""); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#FAF3EC] border-b border-[#F2F2EE] last:border-0"
            >
              <div>
                <div className="text-[12px] font-medium">{b.nama}</div>
                <div className="text-[10px] text-[#1F2420]/50 num">{b.id} · tersedia {stokTersedia(b)} unit</div>
              </div>
              <span className="num text-[12px] text-[#1F2420]/70">{fmtRp(b[hargaKey])}{hargaKey === "hargaSewa" ? "/hr" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const TabelItem = ({ items, onQty, onRemove, hargaLabel }) => (
  <div className="border border-[#E4E4E0] rounded-[4px] overflow-hidden">
    <table className="w-full text-[12px]">
      <thead>
        <tr className="text-left text-[11px] text-[#1F2420]/50 bg-[#FAFAF8] border-b border-[#EEEEEA]">
          <th className="px-3 py-2 font-medium">Barang</th>
          <th className="px-2 py-2 font-medium text-right">{hargaLabel}</th>
          <th className="px-2 py-2 font-medium text-center w-[80px]">Qty</th>
          <th className="px-2 py-2 font-medium text-right">Subtotal</th>
          <th className="px-2 py-2 w-[36px]"></th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 && (
          <tr><td colSpan={5} className="px-3 py-6 text-center text-[#1F2420]/40">Belum ada barang. Cari dan pilih barang di atas.</td></tr>
        )}
        {items.map((it) => (
          <tr key={it.itemId} className="border-b border-[#F2F2EE] last:border-0">
            <td className="px-3 py-2">
              <div className="font-medium">{it.nama}</div>
              <div className="num text-[10px] text-[#1F2420]/45">{it.itemId}</div>
            </td>
            <td className="px-2 py-2 num text-right">{fmtRp(it.harga)}</td>
            <td className="px-2 py-2 text-center">
              <input
                data-testid={`trx-qty-${it.itemId}`}
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => onQty(it.itemId, Math.max(1, parseInt(e.target.value) || 1))}
                className="w-[64px] h-7 px-2 text-[12px] num text-right border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
              />
            </td>
            <td className="px-2 py-2 num text-right font-medium">{fmtRp(it.harga * it.qty)}</td>
            <td className="px-2 py-2 text-center">
              <button
                data-testid={`trx-hapus-${it.itemId}`}
                onClick={() => onRemove(it.itemId)}
                className="p-1 text-[#1F2420]/40 hover:text-[#B3452F]"
              >
                <Trash2 size={13} />
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
    <label className="block text-[12px] font-medium mb-1.5">Metode pembayaran <span className="font-normal text-[#1F2420]/45">(hanya dicatat)</span></label>
    <select
      data-testid="trx-metode-pembayaran"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 px-2 text-[13px] bg-white border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
    >
      <option>Tunai</option>
      <option>Transfer</option>
      <option>Lainnya</option>
    </select>
  </div>
);
