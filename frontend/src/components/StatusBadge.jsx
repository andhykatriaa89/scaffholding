export const StatusBadge = ({ status }) => {
  const map = {
    Aktif: "bg-[#F4F4F5] text-[#18181B] border-[#D4D4D8]",
    Selesai: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    Lunas: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    Telat: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
    Baik: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    "Perlu Pengecekan": "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]",
    Perusahaan: "bg-[#F4F4F5] text-[#3F3F46] border-[#E4E4E7]",
    Perorangan: "bg-white text-[#52525B] border-[#E4E4E7]",
    Menipis: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
    Cukup: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
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
