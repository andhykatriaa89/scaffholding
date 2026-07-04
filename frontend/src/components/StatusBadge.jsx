export const StatusBadge = ({ status }) => {
  const map = {
    Aktif: "bg-[#2E3B4E]/10 text-[#2E3B4E] border-[#2E3B4E]/25",
    Selesai: "bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25",
    Lunas: "bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25",
    Telat: "bg-[#B3452F]/10 text-[#B3452F] border-[#B3452F]/25",
    Baik: "bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25",
    "Perlu Pengecekan": "bg-[#D8621B]/10 text-[#B14E13] border-[#D8621B]/25",
    Perusahaan: "bg-[#2E3B4E]/10 text-[#2E3B4E] border-[#2E3B4E]/25",
    Perorangan: "bg-[#1F2420]/5 text-[#1F2420]/70 border-[#1F2420]/15",
    Menipis: "bg-[#B3452F]/10 text-[#B3452F] border-[#B3452F]/25",
    Cukup: "bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25",
  };
  return (
    <span
      data-testid={`badge-${status.toLowerCase().replace(/\s/g, "-")}`}
      className={`inline-flex items-center border px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] whitespace-nowrap ${map[status] || map.Perorangan}`}
    >
      {status}
    </span>
  );
};
