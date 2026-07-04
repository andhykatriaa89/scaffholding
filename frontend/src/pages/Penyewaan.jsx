import { useState } from "react";
import { toast } from "sonner";
import { fmtRp, pelanggan, hitungHari } from "@/data/mock";
import { PilihPelanggan, CariBarang, TabelItem, MetodePembayaran } from "@/components/FormTransaksi";
import { StatusBadge } from "@/components/StatusBadge";

export default function Penyewaan() {
  const [plg, setPlg] = useState("");
  const [items, setItems] = useState([]);
  const [metode, setMetode] = useState("Transfer");
  const [tglMulai, setTglMulai] = useState("2026-06-14");
  const [tglSelesai, setTglSelesai] = useState("2026-07-14");

  const durasi = hitungHari(tglMulai, tglSelesai);

  const addItem = (b) => {
    setItems((prev) =>
      prev.find((i) => i.itemId === b.id)
        ? prev.map((i) => (i.itemId === b.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { itemId: b.id, nama: b.nama, harga: b.hargaSewa, qty: 1 }]
    );
  };

  const perHari = items.reduce((s, i) => s + i.harga * i.qty, 0);
  const estimasi = perHari * durasi;

  const simpan = () => {
    if (!plg) return toast.error("Pilih pelanggan terlebih dahulu");
    if (items.length === 0) return toast.error("Tambahkan minimal satu barang sewa");
    if (durasi < 1) return toast.error("Tanggal selesai harus setelah tanggal mulai");
    toast.success(`Kontrak sewa tercatat — SWA-1274 · estimasi ${fmtRp(estimasi)} untuk ${durasi} hari`);
    setPlg(""); setItems([]);
  };

  const namaPlg = pelanggan.find((p) => p.id === plg)?.nama;

  return (
    <div className="max-w-[1100px] grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      <div className="lg:col-span-2 bg-white border border-[#E4E4E7] rounded-[6px] p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[13px] font-semibold">Kontrak Penyewaan Baru</div>
            <div className="text-[11px] text-[#18181B]/50">Stok berpindah ke status "disewa" sampai barang dikembalikan &amp; dicek kondisinya.</div>
          </div>
          <StatusBadge status="Aktif" />
        </div>
        <PilihPelanggan value={plg} onChange={setPlg} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Tanggal mulai sewa</label>
            <input
              data-testid="penyewaan-tgl-mulai"
              type="date"
              value={tglMulai}
              onChange={(e) => setTglMulai(e.target.value)}
              className="w-full h-9 px-3 text-[13px] num border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Estimasi tanggal selesai</label>
            <input
              data-testid="penyewaan-tgl-selesai"
              type="date"
              value={tglSelesai}
              onChange={(e) => setTglSelesai(e.target.value)}
              className="w-full h-9 px-3 text-[13px] num border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B]"
            />
          </div>
        </div>
        <CariBarang onAdd={addItem} hargaKey="hargaSewa" label="Tambah barang sewa (tarif per hari)" />
        <TabelItem
          items={items}
          hargaLabel="Sewa / Hari"
          onQty={(id, qty) => setItems(items.map((i) => (i.itemId === id ? { ...i, qty } : i)))}
          onRemove={(id) => setItems(items.filter((i) => i.itemId !== id))}
        />
      </div>

      <div className="bg-white border border-[#E4E4E7] rounded-[6px] p-5 space-y-4 lg:sticky lg:top-[72px]" data-testid="penyewaan-ringkasan">
        <div className="text-[13px] font-semibold">Estimasi Biaya Sewa</div>
        <div className="text-[12px] space-y-2">
          <div className="flex justify-between text-[#18181B]/70">
            <span>Pelanggan</span>
            <span className="font-medium text-[#18181B] text-right max-w-[160px] truncate">{namaPlg || "—"}</span>
          </div>
          <div className="flex justify-between text-[#18181B]/70">
            <span>Durasi sewa</span>
            <span className="num" data-testid="penyewaan-durasi">{durasi} hari</span>
          </div>
          <div className="flex justify-between text-[#18181B]/70">
            <span>Jumlah item</span>
            <span className="num">{items.length} jenis · {items.reduce((a, i) => a + i.qty, 0)} unit</span>
          </div>
          <div className="border-t border-[#EFEFF1] pt-2 flex justify-between">
            <span className="text-[#18181B]/70">Biaya per hari</span>
            <span className="num" data-testid="penyewaan-per-hari">{fmtRp(perHari)}</span>
          </div>
          <div className="border-t border-[#EFEFF1] pt-2 flex justify-between text-[14px] font-semibold">
            <span>Estimasi total</span>
            <span className="num text-[#B45309]" data-testid="penyewaan-estimasi">{fmtRp(estimasi)}</span>
          </div>
          <p className="text-[10px] text-[#18181B]/45 leading-relaxed">
            Perhitungan: tarif harian × qty × {durasi} hari. Tagihan final dihitung saat pengembalian (termasuk denda keterlambatan/kerusakan bila ada).
          </p>
        </div>
        <MetodePembayaran value={metode} onChange={setMetode} />
        <button
          data-testid="penyewaan-simpan-btn"
          onClick={simpan}
          className="w-full h-9 bg-[#09090B] hover:bg-[#27272A] text-white text-[13px] font-medium rounded-[4px] transition-colors"
        >
          Simpan Kontrak Sewa
        </button>
      </div>
    </div>
  );
}
