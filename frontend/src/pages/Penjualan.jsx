import { useState } from "react";
import { toast } from "sonner";
import { fmtRp, pelanggan } from "@/data/mock";
import { PilihPelanggan, CariBarang, TabelItem, MetodePembayaran } from "@/components/FormTransaksi";

export default function Penjualan() {
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

  const simpan = () => {
    if (!plg) return toast.error("Pilih pelanggan terlebih dahulu");
    if (items.length === 0) return toast.error("Tambahkan minimal satu barang");
    toast.success(`Transaksi penjualan tercatat — PJL-0907 · ${fmtRp(total + ppn)} (${metode})`);
    setPlg(""); setItems([]); setMetode("Tunai"); setCatatan("");
  };

  const namaPlg = pelanggan.find((p) => p.id === plg)?.nama;

  return (
    <div className="max-w-[1100px] grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      <div className="lg:col-span-2 bg-white border border-[#E4E4E0] rounded-[6px] p-5 space-y-4">
        <div>
          <div className="text-[13px] font-semibold">Transaksi Penjualan Baru</div>
          <div className="text-[11px] text-[#1F2420]/50">Barang keluar permanen dari stok gudang setelah transaksi disimpan.</div>
        </div>
        <PilihPelanggan value={plg} onChange={setPlg} />
        <CariBarang onAdd={addItem} hargaKey="hargaJual" label="Tambah barang (harga jual satuan)" />
        <TabelItem
          items={items}
          hargaLabel="Harga Jual"
          onQty={(id, qty) => setItems(items.map((i) => (i.itemId === id ? { ...i, qty } : i)))}
          onRemove={(id) => setItems(items.filter((i) => i.itemId !== id))}
        />
        <div>
          <label className="block text-[12px] font-medium mb-1.5">Catatan (opsional)</label>
          <input
            data-testid="penjualan-catatan"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="cth: kirim ke lokasi proyek Tebet, minta surat jalan 2 rangkap"
            className="w-full h-9 px-3 text-[13px] border border-[#D6D6D1] rounded-[4px] outline-none focus:border-[#D8621B]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E4E4E0] rounded-[6px] p-5 space-y-4 lg:sticky lg:top-[72px]" data-testid="penjualan-ringkasan">
        <div className="text-[13px] font-semibold">Ringkasan</div>
        <div className="text-[12px] space-y-2">
          <div className="flex justify-between text-[#1F2420]/70">
            <span>Pelanggan</span>
            <span className="font-medium text-[#1F2420] text-right max-w-[160px] truncate">{namaPlg || "—"}</span>
          </div>
          <div className="flex justify-between text-[#1F2420]/70">
            <span>Jumlah item</span>
            <span className="num">{items.length} jenis · {items.reduce((a, i) => a + i.qty, 0)} unit</span>
          </div>
          <div className="border-t border-[#EEEEEA] pt-2 flex justify-between">
            <span className="text-[#1F2420]/70">Subtotal</span>
            <span className="num" data-testid="penjualan-subtotal">{fmtRp(total)}</span>
          </div>
          <div className="flex justify-between text-[#1F2420]/70">
            <span>PPN 11%</span>
            <span className="num">{fmtRp(ppn)}</span>
          </div>
          <div className="border-t border-[#EEEEEA] pt-2 flex justify-between text-[14px] font-semibold">
            <span>Total tagihan</span>
            <span className="num text-[#D8621B]" data-testid="penjualan-total">{fmtRp(total + ppn)}</span>
          </div>
        </div>
        <MetodePembayaran value={metode} onChange={setMetode} />
        <button
          data-testid="penjualan-simpan-btn"
          onClick={simpan}
          className="w-full h-9 bg-[#D8621B] hover:bg-[#C2560F] text-white text-[13px] font-medium rounded-[4px] transition-colors"
        >
          Simpan Transaksi Penjualan
        </button>
        <p className="text-[10px] text-[#1F2420]/45 leading-relaxed">
          Pembayaran hanya dicatat sebagai data, tidak diproses melalui sistem. Nota dicetak manual dari halaman laporan.
        </p>
      </div>
    </div>
  );
}
