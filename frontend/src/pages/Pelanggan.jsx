import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Plus, Pencil, X, Filter, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "@/lib/axios";
import { StatusBadge } from "@/components/StatusBadge";

const EMPTY = { nama: "", jenis: "Perusahaan", hp: "", alamat: "" };

export default function Pelanggan() {
  const fetcher = url => axios.get(url).then(r => r.data);
  const { data: serverRows = [], mutate, isLoading } = useSWR("/api/pelanggan", fetcher);

  const [q, setQ] = useState("");
  const [jenis, setJenis] = useState("Semua Jenis");
  const [panel, setPanel] = useState(null); // null | {mode, form, id}
  const [showDel, setShowDel] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () =>
      serverRows.filter(
        (p) =>
          (jenis === "Semua Jenis" || p.jenis === jenis) &&
          (p.nama.toLowerCase().includes(q.toLowerCase()) || p.hp.includes(q) || p.id.toLowerCase().includes(q.toLowerCase()))
      ),
    [serverRows, q, jenis]
  );

  const openTambah = () => setPanel({ mode: "tambah", form: { ...EMPTY } });
  const openEdit = (p) => setPanel({ mode: "edit", id: p.id, form: { nama: p.nama, jenis: p.jenis, hp: p.hp, alamat: p.alamat } });

  const simpan = async () => {
    const f = panel.form;
    if (!f.nama.trim() || !f.hp.trim()) {
      toast.error("Nama dan nomor HP wajib diisi");
      return;
    }
    
    try {
      setLoading(true);
      if (panel.mode === "tambah") {
        await axios.post("/api/pelanggan", f);
        toast.success(`Pelanggan ${f.nama} tersimpan`);
      } else {
        await axios.put(`/api/pelanggan/${panel.id}`, f);
        toast.success(`Data ${f.nama} diperbarui`);
      }
      mutate(); // refresh data
      setPanel(null);
    } catch (e) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/pelanggan/${showDel.id}`);
      toast.success("Pelanggan berhasil dihapus!");
      setShowDel(null);
      mutate();
    } catch (e) {
      toast.error(e.response?.data?.message || "Tidak dapat menghapus pelanggan yang memiliki transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const setF = (k, v) => setPanel((p) => ({ ...p, form: { ...p.form, [k]: v } }));

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200/60 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-[320px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                data-testid="pelanggan-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama, no HP, atau ID pelanggan…"
                className="w-full h-10 pl-9 pr-4 text-[13px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                data-testid="pelanggan-filter-jenis"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="h-10 pl-9 pr-8 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option>Semua Jenis</option>
                <option>Perusahaan</option>
                <option>Perorangan</option>
              </select>
            </div>
            <span className="text-[13px] text-slate-500 font-medium px-2">{filtered.length} pelanggan</span>
          </div>
          <button
            data-testid="pelanggan-tambah-btn"
            onClick={openTambah}
            className="h-10 px-4 inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} /> Tambah Pelanggan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" data-testid="pelanggan-table">
            <thead>
              <tr className="border-b-2 border-slate-100 text-[13px] text-slate-500">
                <th className="pb-3 px-4 font-medium">ID</th>
                <th className="pb-3 px-2 font-medium">Nama</th>
                <th className="pb-3 px-2 font-medium">Jenis</th>
                <th className="pb-3 px-2 font-medium">No. HP</th>
                <th className="pb-3 px-2 font-medium">Alamat</th>
                <th className="pb-3 px-2 font-medium text-right">Jml Transaksi</th>
                <th className="pb-3 px-2 font-medium">Terakhir</th>
                <th className="pb-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-slate-700 font-medium">
              {isLoading ? (
                <tr><td colSpan={8} className="py-12 text-center text-slate-500 font-medium">Memuat data...</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 text-slate-500">{p.id}</td>
                  <td className="py-4 px-2">{p.nama}</td>
                  <td className="py-4 px-2"><StatusBadge status={p.jenis} /></td>
                  <td className="py-4 px-2 text-slate-500 font-mono text-[13px]">{p.hp}</td>
                  <td className="py-4 px-2 text-slate-500 max-w-[260px] truncate">{p.alamat}</td>
                  <td className="py-4 px-2 text-right">{p.jumlahTransaksi}</td>
                  <td className="py-4 px-2 text-slate-500">{p.terakhir}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Pelanggan"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setShowDel({ id: p.id, nama: p.nama })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus Pelanggan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-slate-500 font-medium">Tidak ada pelanggan yang cocok dengan pencarian.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slideover Form via Portal */}
      {panel && createPortal(
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-[100] backdrop-blur-sm transition-opacity" onClick={() => setPanel(null)} />
          <div
            data-testid="pelanggan-slideover"
            className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-white z-[110] border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100 bg-slate-50/50">
              <div className="text-[16px] font-bold text-slate-800">
                {panel.mode === "tambah" ? "Tambah Pelanggan Baru" : `Edit Pelanggan`}
              </div>
              <button data-testid="pelanggan-slideover-close" onClick={() => setPanel(null)} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Nama pelanggan / perusahaan</label>
                <input
                  required
                  data-testid="pelanggan-form-nama"
                  value={panel.form.nama}
                  onChange={(e) => setF("nama", e.target.value)}
                  placeholder="cth: PT Karya Konstruksi Mandiri"
                  className="w-full h-11 px-4 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Jenis Pelanggan</label>
                <div className="flex gap-3">
                  {["Perusahaan", "Perorangan"].map((j) => (
                    <button
                      key={j}
                      type="button"
                      data-testid={`pelanggan-form-jenis-${j.toLowerCase()}`}
                      onClick={() => setF("jenis", j)}
                      className={`h-11 px-5 text-[13px] font-bold rounded-lg border transition-all flex-1 ${
                        panel.form.jenis === j
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-slate-200 text-slate-500 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">No. HP / telepon kantor</label>
                <input
                  required
                  data-testid="pelanggan-form-hp"
                  value={panel.form.hp}
                  onChange={(e) => setF("hp", e.target.value)}
                  placeholder="cth: 0812-3456-7890"
                  className="w-full h-11 px-4 text-[14px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Alamat penagihan / proyek</label>
                <textarea
                  data-testid="pelanggan-form-alamat"
                  value={panel.form.alamat}
                  onChange={(e) => setF("alamat", e.target.value)}
                  rows={4}
                  placeholder="Alamat lengkap untuk pengiriman dokumen & penjemputan barang"
                  className="w-full px-4 py-3 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
            </div>
            
            <div className="px-6 py-5 border-t border-slate-100 bg-white flex gap-3">
              <button
                data-testid="pelanggan-form-simpan"
                onClick={simpan}
                disabled={loading}
                className="flex-1 h-11 bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? "Menyimpan..." : (panel.mode === "tambah" ? "Simpan Pelanggan" : "Simpan Perubahan")}
              </button>
              <button onClick={() => setPanel(null)} className="px-6 h-11 text-[14px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Batal
              </button>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {showDel && createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative text-center">
            <button onClick={() => setShowDel(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2">Hapus Pelanggan?</h2>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus pelanggan <strong className="text-slate-800">{showDel.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
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
