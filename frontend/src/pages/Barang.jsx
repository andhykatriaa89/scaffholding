import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Filter, Plus, X, Pencil, Trash2 } from "lucide-react";
import useSWR from "swr";
import axios from "@/lib/axios";
import { toast } from "sonner";

const fmtRp = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
const stokTersedia = (b) => Math.max(0, b.stokTotal - b.stokDisewa - b.stokRusak);
const KATEGORI_INISIAL = { Frame: "FR", Brace: "CB", Jack: "JK", Platform: "PL", Aksesori: "AC" };
import { StatusBadge } from "@/components/StatusBadge";

export default function Barang() {
  const fetcher = url => axios.get(url).then(r => r.data);
  const { data: serverRows = [], isLoading, mutate } = useSWR("/api/barang", fetcher);

  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua Kategori");
  
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDel, setShowDel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newB, setNewB] = useState({ id: "", nama: "", kategori: "Frame", hargaJual: "", hargaSewa: "", stokTotal: "", minStok: "5" });
  const [editB, setEditB] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/barang", {
        id: newB.id,
        nama: newB.nama,
        kategori: newB.kategori,
        harga_jual: newB.hargaJual || 0,
        harga_sewa: newB.hargaSewa || 0,
        stok_total: newB.stokTotal || 0,
        min_stok: newB.minStok || 0,
      });
      setShowAdd(false);
      setNewB({ id: "", nama: "", kategori: "Frame", hargaJual: "", hargaSewa: "", stokTotal: "", minStok: "5" });
      mutate();
      toast.success("Barang berhasil ditambahkan");
    } catch(err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan barang");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/barang/${editB.id}`, {
        nama: editB.nama,
        kategori: editB.kategori,
        harga_jual: editB.hargaJual || 0,
        harga_sewa: editB.hargaSewa || 0,
        stok_total: editB.stokTotal || 0,
        min_stok: editB.minStok || 0,
      });
      setShowEdit(false);
      setEditB(null);
      mutate();
      toast.success("Data barang berhasil diubah");
    } catch(err) {
      toast.error(err.response?.data?.message || "Gagal mengubah data barang");
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async () => {
    if(!showDel) return;
    setLoading(true);
    try {
      await axios.delete(`/api/barang/${showDel}`);
      setShowDel(null);
      mutate();
      toast.success("Barang berhasil dihapus");
    } catch(err) {
      toast.error(err.response?.data?.message || "Gagal menghapus barang");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(
    () =>
      serverRows.filter(
        (b) =>
          (kat === "Semua Kategori" || b.kategori === kat) &&
          (b.nama.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase()))
      ),
    [serverRows, q, kat]
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-[320px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                data-testid="barang-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama barang atau kode…"
                className="w-full h-10 pl-9 pr-4 text-[13px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                data-testid="barang-filter-kategori"
                value={kat}
                onChange={(e) => setKat(e.target.value)}
                className="h-10 pl-9 pr-8 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option>Semua Kategori</option>
                <option>Frame</option>
                <option>Brace</option>
                <option>Jack</option>
                <option>Platform</option>
                <option>Aksesori</option>
              </select>
            </div>
            <span className="text-[13px] text-slate-500 font-medium px-2">{filtered.length} jenis barang</span>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="h-10 px-4 inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} /> Tambah Barang
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" data-testid="barang-table">
            <thead>
              <tr className="border-b-2 border-slate-100 text-[13px] text-slate-500">
                <th className="pb-3 px-4 font-medium">Detail Barang</th>
                <th className="pb-3 px-2 font-medium">Kategori</th>
                <th className="pb-3 px-2 font-medium text-right">Harga Jual</th>
                <th className="pb-3 px-2 font-medium text-right">Sewa / Hari</th>
                <th className="pb-3 px-2 font-medium text-right">Stok Total</th>
                <th className="pb-3 px-2 font-medium text-right">Tersedia</th>
                <th className="pb-3 px-2 font-medium text-right">Disewa</th>
                <th className="pb-3 px-4 font-medium">Kondisi</th>
                <th className="pb-3 px-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-slate-700 font-medium">
              {isLoading ? (
                <tr><td colSpan={8} className="py-12 text-center text-slate-500 font-medium">Memuat data...</td></tr>
              ) : filtered.map((b) => {
                const tersedia = stokTersedia(b);
                const menipis = tersedia < b.minStok;
                return (
                  <tr key={b.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[42px] h-[42px] rounded-[8px] bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <span className="text-[14px] font-bold text-slate-400">{KATEGORI_INISIAL[b.kategori]}</span>
                        </div>
                        <div className="leading-tight">
                          <div className="font-bold text-slate-800">{b.nama}</div>
                          <div className="text-[12px] font-medium text-slate-400">{b.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-500">{b.kategori}</td>
                    <td className="py-4 px-2 text-right">{fmtRp(b.hargaJual)}</td>
                    <td className="py-4 px-2 text-right">{fmtRp(b.hargaSewa)}</td>
                    <td className="py-4 px-2 text-right">{b.stokTotal}</td>
                    <td className="py-4 px-2 text-right">
                      <span className={`inline-flex items-center gap-2 justify-end ${menipis ? "text-[#DC2626] font-bold" : ""}`}>
                        {tersedia}
                        {menipis && <StatusBadge status="Menipis" />}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right text-slate-400 font-bold">{b.stokDisewa}</td>
                    <td className="py-4 px-4"><StatusBadge status={b.kondisi} /></td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setEditB(b); setShowEdit(true); }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Barang"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setShowDel(b.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Hapus Barang"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-slate-500 font-medium">Barang tidak ditemukan. Periksa ejaan atau ganti filter kategori.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[12px] font-medium text-slate-400 px-4">
          *Tersedia = stok total − sedang disewa − ditandai rusak. Batas menipis mengikuti stok minimum tiap barang.
        </p>
      </div>

      {showAdd && createPortal(
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-[100] backdrop-blur-sm transition-opacity" onClick={() => setShowAdd(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-white z-[110] border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[16px] font-bold text-slate-800">Tambah Barang Baru</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Kode Barang</label>
                  <input required value={newB.id} onChange={e => setNewB({...newB, id: e.target.value})} placeholder="e.g. BRG-025" className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Kategori</label>
                  <select required value={newB.kategori} onChange={e => setNewB({...newB, kategori: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                    <option>Frame</option>
                    <option>Brace</option>
                    <option>Jack</option>
                    <option>Platform</option>
                    <option>Aksesori</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Nama Barang</label>
                <input required value={newB.nama} onChange={e => setNewB({...newB, nama: e.target.value})} placeholder="Nama lengkap barang" className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Harga Jual (Rp)</label>
                  <input required type="number" value={newB.hargaJual} onChange={e => setNewB({...newB, hargaJual: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Sewa / Hari (Rp)</label>
                  <input required type="number" value={newB.hargaSewa} onChange={e => setNewB({...newB, hargaSewa: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Stok Awal</label>
                  <input required type="number" value={newB.stokTotal} onChange={e => setNewB({...newB, stokTotal: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Batas Menipis</label>
                  <input required type="number" value={newB.minStok} onChange={e => setNewB({...newB, minStok: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-slate-100 bg-white flex gap-3">
              <button disabled={loading} onClick={handleAdd} className="flex-1 h-11 bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm">
                {loading ? "Menyimpan..." : "Simpan Barang"}
              </button>
              <button onClick={() => setShowAdd(false)} className="px-6 h-11 text-[14px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Batal
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
      {showEdit && editB && createPortal(
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-[100] backdrop-blur-sm transition-opacity" onClick={() => { setShowEdit(false); setEditB(null); }} />
          <div className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-white z-[110] border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[16px] font-bold text-slate-800">Edit Barang — {editB.id}</h2>
              <button onClick={() => { setShowEdit(false); setEditB(null); }} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Kategori</label>
                <select required value={editB.kategori} onChange={e => setEditB({...editB, kategori: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                  <option>Frame</option>
                  <option>Brace</option>
                  <option>Jack</option>
                  <option>Platform</option>
                  <option>Aksesori</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Nama Barang</label>
                <input required value={editB.nama} onChange={e => setEditB({...editB, nama: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Harga Jual (Rp)</label>
                  <input required type="number" value={editB.hargaJual} onChange={e => setEditB({...editB, hargaJual: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Sewa / Hari (Rp)</label>
                  <input required type="number" value={editB.hargaSewa} onChange={e => setEditB({...editB, hargaSewa: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Stok Total</label>
                  <input required type="number" value={editB.stokTotal} onChange={e => setEditB({...editB, stokTotal: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Batas Menipis</label>
                  <input required type="number" value={editB.minStok} onChange={e => setEditB({...editB, minStok: e.target.value})} className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-slate-100 bg-white flex gap-3">
              <button disabled={loading} onClick={handleEdit} className="flex-1 h-11 bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm">
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <button onClick={() => { setShowEdit(false); setEditB(null); }} className="px-6 h-11 text-[14px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Batal
              </button>
            </div>
          </div>
        </>,
        document.body
      )}

      {showDel && createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative text-center">
            <button onClick={() => setShowDel(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2">Hapus Barang?</h2>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">Apakah Anda yakin ingin menghapus barang <strong className="text-slate-800">{showDel}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button disabled={loading} onClick={() => setShowDel(null)} className="flex-1 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] rounded-lg transition-colors">
                Batal
              </button>
              <button disabled={loading} onClick={handleDel} className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-lg transition-colors">
                {loading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
