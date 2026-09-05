export const StatusBadge = ({ status }) => {
  const map = {
    Aktif: "bg-blue-50 text-blue-700 border-blue-200",
    Selesai: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Lunas: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Telat: "bg-red-50 text-red-700 border-red-200",
    Baik: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Perlu Pengecekan": "bg-amber-50 text-amber-700 border-amber-200",
    Perusahaan: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Perorangan: "bg-violet-50 text-violet-600 border-violet-200",
    Menipis: "bg-red-50 text-red-700 border-red-200",
    Cukup: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span
      data-testid={`badge-${status.toLowerCase().replace(/\s/g, "-")}`}
      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-semibold rounded-md whitespace-nowrap ${map[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}
    >
      {status}
    </span>
  );
};
