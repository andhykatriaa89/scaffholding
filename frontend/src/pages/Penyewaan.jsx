import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "@/lib/axios";
import { fmtRp, hitungHari } from "@/lib/utils";
import { PilihPelanggan, ListBarang, TabelItem, MetodePembayaran } from "@/components/FormTransaksi";
import { StatusBadge } from "@/components/StatusBadge";
import { CalendarClock, CheckCircle2 } from "lucide-react";

export default function Penyewaan() {
  const { data: pelanggan = [] } = useSWR("/api/pelanggan", url => axios.get(url).then(r => r.data));
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

  const simpan = async () => {
    if (!plg) return toast.error("Pilih pelanggan terlebih dahulu");
    if (items.length === 0) return toast.error("Tambahkan minimal satu barang sewa");
    if (durasi < 1) return toast.error("Tanggal selesai harus setelah tanggal mulai");

    const payload = {
      pelanggan_id: plg,
      tgl_mulai: tglMulai,
      tgl_selesai: tglSelesai,
      metode: metode,
      items: items.map(i => ({ barang_id: i.itemId, qty: i.qty })),
    };

    try {
      const res = await axios.post("/api/penyewaan", payload);
      toast.success(`Kontrak sewa tercatat — ${res.data.id} · estimasi ${fmtRp(estimasi)} untuk ${durasi} hari`);
      setPlg(""); setItems([]);
    } catch (e) {
      toast.error(e.response?.data?.message || "Terjadi kesalahan saat menyimpan kontrak");
    }
  };

  const namaPlg = pelanggan.find((p) => p.id === plg)?.nama;

  return (
    <div className="max-w-[1400px] grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarClock size={20} className="text-[#EA580C]" strokeWidth={2.5} />
              <h2 className="text-[18px] font-bold text-slate-800 tracking-tight">Kontrak Penyewaan Baru</h2>
            </div>
            <div className="text-[13px] text-slate-500 font-medium">Stok berpindah ke status "disewa" sampai barang dikembalikan &amp; dicek kondisinya.</div>
          </div>
          <div className="bg-[#EFF6FF] text-[#2563EB] px-3 py-1.5 rounded-lg text-[13px] font-bold border border-blue-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Status Aktif
          </div>
        </div>
        
        <div className="space-y-6">
          <PilihPelanggan value={plg} onChange={setPlg} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-[10px]">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Tanggal Mulai Sewa</label>
              <input
                data-testid="penyewaan-tgl-mulai"
                type="date"
                value={tglMulai}
                onChange={(e) => setTglMulai(e.target.value)}
                className="w-full h-11 px-4 text-[14px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Estimasi Tanggal Selesai</label>
              <input
                data-testid="penyewaan-tgl-selesai"
                type="date"
                value={tglSelesai}
                onChange={(e) => setTglSelesai(e.target.value)}
                className="w-full h-11 px-4 text-[14px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
          </div>

          <ListBarang onAdd={addItem} hargaKey="hargaSewa" label="Pilih Barang Sewa (Tarif Per Hari)" />
          <TabelItem
            items={items}
            hargaLabel="Sewa / Hari"
            onQty={(id, qty) => setItems(items.map((i) => (i.itemId === id ? { ...i, qty } : i)))}
            onRemove={(id) => setItems(items.filter((i) => i.itemId !== id))}
          />
        </div>
      </div>

      <div className="bg-white rounded-[12px] p-7 shadow-sm border border-slate-200/60 space-y-6 lg:sticky lg:top-[100px]" data-testid="penyewaan-ringkasan">
        <h3 className="text-[16px] font-bold text-slate-800 border-b border-slate-100 pb-4">Estimasi Biaya Sewa</h3>
        
        <div className="text-[14px] space-y-4">
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Pelanggan</span>
            <span className="font-bold text-slate-800 text-right max-w-[160px] truncate bg-slate-50 px-3 py-1 rounded-md">{namaPlg || "—"}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Durasi Sewa</span>
            <span className="font-bold text-[#EA580C] bg-orange-50 px-3 py-1 rounded-md" data-testid="penyewaan-durasi">{durasi} Hari</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Total Item</span>
            <span className="font-bold text-slate-800">{items.length} jenis · {items.reduce((a, i) => a + i.qty, 0)} unit</span>
          </div>
          
          <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-center">
            <span className="text-slate-500 font-medium">Biaya Per Hari</span>
            <span className="font-bold text-slate-700" data-testid="penyewaan-per-hari">{fmtRp(perHari)}</span>
          </div>
          
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            <span className="text-[15px] font-bold text-slate-800">Estimasi Total</span>
            <span className="text-[20px] font-black text-[#EA580C]" data-testid="penyewaan-estimasi">{fmtRp(estimasi)}</span>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-4">
            <p className="text-[11px] font-medium text-blue-700 leading-relaxed text-center">
              Perhitungan: tarif harian × qty × {durasi} hari. Tagihan final dihitung saat pengembalian (termasuk denda keterlambatan/kerusakan bila ada).
            </p>
          </div>
        </div>

        <MetodePembayaran value={metode} onChange={setMetode} />
        
        <button
          data-testid="penyewaan-simpan-btn"
          onClick={simpan}
          className="w-full h-12 bg-[#2563EB] hover:bg-blue-700 text-white text-[15px] font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          Simpan Kontrak Sewa
        </button>
      </div>
    </div>
  );
}
