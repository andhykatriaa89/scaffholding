import { useMemo, useState } from "react";
import { Search, Plus, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { pelanggan as data } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";

const EMPTY = { nama: "", jenis: "Perusahaan", hp: "", alamat: "" };

export default function Pelanggan() {
  const [rows, setRows] = useState(data);
  const [q, setQ] = useState("");
  const [jenis, setJenis] = useState("Semua");
  const [panel, setPanel] = useState(null); // null | {mode, form, id}

  const filtered = useMemo(
    () =>
      rows.filter(
        (p) =>
          (jenis === "Semua" || p.jenis === jenis) &&
          (p.nama.toLowerCase().includes(q.toLowerCase()) || p.hp.includes(q) || p.id.toLowerCase().includes(q.toLowerCase()))
      ),
    [rows, q, jenis]
  );

  const openTambah = () => setPanel({ mode: "tambah", form: { ...EMPTY } });
  const openEdit = (p) => setPanel({ mode: "edit", id: p.id, form: { nama: p.nama, jenis: p.jenis, hp: p.hp, alamat: p.alamat } });

  const simpan = () => {
    const f = panel.form;
    if (!f.nama.trim() || !f.hp.trim()) {
      toast.error("Nama dan nomor HP wajib diisi");
      return;
    }
    if (panel.mode === "tambah") {
      const id = `PLG-00${65 + rows.length - data.length + 1}`;
      setRows([{ id, ...f, jumlahTransaksi: 0, terakhir: "—" }, ...rows]);
      toast.success(`Pelanggan ${f.nama} tersimpan (${id})`);
    } else {
      setRows(rows.map((r) => (r.id === panel.id ? { ...r, ...f } : r)));
      toast.success(`Data ${f.nama} diperbarui`);
    }
    setPanel(null);
  };

  const setF = (k, v) => setPanel((p) => ({ ...p, form: { ...p.form, [k]: v } }));

  return (
    <div className="max-w-[1200px]">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative w-[280px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#18181B]/35" />
          <input
            data-testid="pelanggan-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama, no HP, atau ID pelanggan…"
            className="w-full h-8 pl-8 pr-3 text-[12px] bg-white border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B]"
          />
        </div>
        <select
          data-testid="pelanggan-filter-jenis"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="h-8 px-2 text-[12px] bg-white border border-[#D4D4D8] rounded-[4px] outline-none"
        >
          <option>Semua</option>
          <option>Perusahaan</option>
          <option>Perorangan</option>
        </select>
        <span className="text-[11px] text-[#18181B]/50 num">{filtered.length} pelanggan</span>
        <div className="flex-1" />
        <button
          data-testid="pelanggan-tambah-btn"
          onClick={openTambah}
          className="h-8 px-3 inline-flex items-center gap-1.5 bg-[#09090B] hover:bg-[#27272A] text-white text-[12px] font-medium rounded-[4px] transition-colors"
        >
          <Plus size={14} /> Tambah Pelanggan
        </button>
      </div>

      <div className="bg-white border border-[#E4E4E7] rounded-[6px] overflow-x-auto">
        <table className="w-full text-[12px]" data-testid="pelanggan-table">
          <thead>
            <tr className="text-left text-[11px] text-[#18181B]/50 border-b border-[#EFEFF1]">
              <th className="px-4 py-2.5 font-medium">ID</th>
              <th className="px-2 py-2.5 font-medium">Nama</th>
              <th className="px-2 py-2.5 font-medium">Jenis</th>
              <th className="px-2 py-2.5 font-medium">No. HP</th>
              <th className="px-2 py-2.5 font-medium">Alamat</th>
              <th className="px-2 py-2.5 font-medium text-right">Jml Transaksi</th>
              <th className="px-2 py-2.5 font-medium">Terakhir</th>
              <th className="px-4 py-2.5 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA]">
                <td className="px-4 py-2.5 num text-[11px] text-[#18181B]/60">{p.id}</td>
                <td className="px-2 py-2.5 font-medium">{p.nama}</td>
                <td className="px-2 py-2.5"><StatusBadge status={p.jenis} /></td>
                <td className="px-2 py-2.5 num text-[11px]">{p.hp}</td>
                <td className="px-2 py-2.5 text-[#18181B]/60 max-w-[260px] truncate">{p.alamat}</td>
                <td className="px-2 py-2.5 num text-right">{p.jumlahTransaksi}</td>
                <td className="px-2 py-2.5 num text-[11px]">{p.terakhir}</td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    data-testid={`pelanggan-edit-${p.id}`}
                    onClick={() => openEdit(p)}
                    className="p-1.5 rounded-[4px] text-[#18181B]/45 hover:text-[#92400E] hover:bg-[#FEF3C7]"
                  >
                    <Pencil size={13} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-[#18181B]/45">Tidak ada pelanggan yang cocok dengan pencarian.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {panel && (
        <>
          <div className="fixed inset-0 bg-black/25 z-40" onClick={() => setPanel(null)} />
          <div
            data-testid="pelanggan-slideover"
            className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-white z-50 border-l border-[#E4E4E7] flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between px-5 h-[52px] border-b border-[#EFEFF1]">
              <div className="text-[13px] font-semibold">
                {panel.mode === "tambah" ? "Tambah Pelanggan Baru" : `Edit — ${panel.id}`}
              </div>
              <button data-testid="pelanggan-slideover-close" onClick={() => setPanel(null)} className="p-1.5 text-[#18181B]/45 hover:text-[#18181B]">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="block text-[12px] font-medium mb-1.5">Nama pelanggan / perusahaan</label>
                <input
                  data-testid="pelanggan-form-nama"
                  value={panel.form.nama}
                  onChange={(e) => setF("nama", e.target.value)}
                  placeholder="cth: PT Karya Konstruksi Mandiri"
                  className="w-full h-9 px-3 text-[13px] border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium mb-1.5">Jenis</label>
                <div className="flex gap-2">
                  {["Perusahaan", "Perorangan"].map((j) => (
                    <button
                      key={j}
                      type="button"
                      data-testid={`pelanggan-form-jenis-${j.toLowerCase()}`}
                      onClick={() => setF("jenis", j)}
                      className={`h-8 px-3 text-[12px] rounded-[4px] border transition-colors ${
                        panel.form.jenis === j
                          ? "border-[#18181B] bg-[#F4F4F5] text-[#09090B] font-medium"
                          : "border-[#D4D4D8] text-[#18181B]/60 hover:border-[#18181B]/30"
                      }`}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium mb-1.5">No. HP / telepon kantor</label>
                <input
                  data-testid="pelanggan-form-hp"
                  value={panel.form.hp}
                  onChange={(e) => setF("hp", e.target.value)}
                  placeholder="cth: 0812-3456-7890"
                  className="w-full h-9 px-3 text-[13px] border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B] font-mono"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium mb-1.5">Alamat penagihan / proyek</label>
                <textarea
                  data-testid="pelanggan-form-alamat"
                  value={panel.form.alamat}
                  onChange={(e) => setF("alamat", e.target.value)}
                  rows={3}
                  placeholder="Alamat lengkap untuk pengiriman dokumen &amp; penjemputan barang"
                  className="w-full px-3 py-2 text-[13px] border border-[#D4D4D8] rounded-[4px] outline-none focus:border-[#18181B] resize-none"
                />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#EFEFF1] flex gap-2">
              <button
                data-testid="pelanggan-form-simpan"
                onClick={simpan}
                className="h-9 px-4 bg-[#09090B] hover:bg-[#27272A] text-white text-[13px] font-medium rounded-[4px] transition-colors"
              >
                {panel.mode === "tambah" ? "Simpan Pelanggan" : "Simpan Perubahan"}
              </button>
              <button onClick={() => setPanel(null)} className="h-9 px-4 text-[13px] border border-[#D4D4D8] rounded-[4px] hover:bg-[#F4F4F5]">
                Batal
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
