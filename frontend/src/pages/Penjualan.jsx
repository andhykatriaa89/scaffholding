import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "@/lib/axios";
import { fmtRp } from "@/lib/utils";
import { PilihPelanggan, ListBarang, TabelItem, MetodePembayaran } from "@/components/FormTransaksi";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

export default function Penjualan() {
  const { data: pelanggan = [] } = useSWR("/api/pelanggan", url => axios.get(url).then(r => r.data));
  const [plg, setPlg] = useState("");
  const [items, setItems] = useState([]);
  const [metode, setMetode] = useState("Tunai");
  const [catatan, setCatatan] = useState("");

  const addItem = (b) => {
    setItems((prev) =>
      prev.find((i) => i.itemId === b.id)
        ? prev.map((i) => (i.itemId === b.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { itemId: b.id, nama: b.nama, harga: b.hargaJual, qty: 1 }]
    );
  };

  const total = items.reduce((s, i) => s + i.harga * i.qty, 0);
  const ppn = Math.round(total * 0.11);

  const simpan = async () => {
    if (!plg) return toast.error("Pilih pelanggan terlebih dahulu");
    if (items.length === 0) return toast.error("Tambahkan minimal satu barang");
    
    const payload = {
      pelanggan_id: plg,
      metode: metode,
      catatan: catatan,
      items: items.map(i => ({ barang_id: i.itemId, qty: i.qty })),
    };

    try {
      const res = await axios.post("/api/penjualan", payload);
      toast.success(`Transaksi penjualan tercatat — ${res.data.id} · ${fmtRp(total + ppn)} (${metode})`);
      setPlg(""); setItems([]); setMetode("Tunai"); setCatatan("");
    } catch (e) {
      toast.error(e.response?.data?.message || "Terjadi kesalahan saat menyimpan transaksi");
    }
  };

  const namaPlg = pelanggan.find((p) => p.id === plg)?.nama;

  return (
    <div className="max-w-[1400px] grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart size={20} className="text-[#2563EB]" strokeWidth={2.5} />
            <h2 className="text-[18px] font-bold text-slate-800 tracking-tight">Transaksi Penjualan Baru</h2>
          </div>
          <div className="text-[13px] text-slate-500 font-medium">Barang keluar permanen dari stok gudang setelah transaksi disimpan.</div>
        </div>
        
        <div className="space-y-6">
          <PilihPelanggan value={plg} onChange={setPlg} />
          <ListBarang onAdd={addItem} hargaKey="hargaJual" label="Tambah Barang ke Keranjang (Harga Jual Satuan)" />
          <TabelItem
            items={items}
            hargaLabel="Harga Jual"
            onQty={(id, qty) => setItems(items.map((i) => (i.itemId === id ? { ...i, qty } : i)))}
            onRemove={(id) => setItems(items.filter((i) => i.itemId !== id))}
          />
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Catatan Tambahan (Opsional)</label>
            <input
              data-testid="penjualan-catatan"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="cth: kirim ke lokasi proyek Tebet, minta surat jalan 2 rangkap"
              className="w-full h-11 px-4 text-[14px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder:font-normal"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 space-y-6 lg:sticky lg:top-[100px]" data-testid="penjualan-ringkasan">
        <h3 className="text-[16px] font-bold text-slate-800 border-b border-slate-100 pb-4">Ringkasan Tagihan</h3>
        
        <div className="text-[14px] space-y-4">
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Pelanggan</span>
            <span className="font-bold text-slate-800 text-right max-w-[160px] truncate bg-slate-50 px-3 py-1 rounded-md">{namaPlg || "—"}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Total Item</span>
            <span className="font-bold text-slate-800">{items.length} jenis · {items.reduce((a, i) => a + i.qty, 0)} unit</span>
          </div>
          <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-center">
            <span className="text-slate-500 font-medium">Subtotal</span>
            <span className="font-bold text-slate-700" data-testid="penjualan-subtotal">{fmtRp(total)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="text-slate-500 font-medium">PPN 11%</span>
            <span className="font-bold text-slate-700">{fmtRp(ppn)}</span>
          </div>
          
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            <span className="text-[15px] font-bold text-slate-800">Total Tagihan</span>
            <span className="text-[20px] font-black text-[#2563EB]" data-testid="penjualan-total">{fmtRp(total + ppn)}</span>
          </div>
        </div>

        <MetodePembayaran value={metode} onChange={setMetode} />
        
        <button
          data-testid="penjualan-simpan-btn"
          onClick={simpan}
          className="w-full h-12 bg-[#2563EB] hover:bg-blue-700 text-white text-[15px] font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          Proses Transaksi
        </button>
        <p className="text-[11px] font-medium text-slate-400 leading-relaxed text-center px-2 mt-4">
          Pembayaran hanya dicatat sebagai data, tidak diproses melalui sistem. Nota dicetak manual dari halaman laporan.
        </p>
      </div>
    </div>
  );
}
