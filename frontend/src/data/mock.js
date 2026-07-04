export const fmtRp = (n) => "Rp " + n.toLocaleString("id-ID");

export const KATEGORI_INISIAL = {
  Frame: "FR",
  Brace: "BR",
  Jack: "JK",
  Aksesori: "AK",
  Platform: "PL",
};

export const barang = [
  { id: "BRG-001", nama: "Main Frame 190", kategori: "Frame", hargaJual: 412000, hargaSewa: 3800, stokTotal: 486, stokDisewa: 312, stokRusak: 14, minStok: 60, kondisi: "Baik" },
  { id: "BRG-002", nama: "Main Frame 170", kategori: "Frame", hargaJual: 386000, hargaSewa: 3500, stokTotal: 342, stokDisewa: 261, stokRusak: 9, minStok: 50, kondisi: "Baik" },
  { id: "BRG-003", nama: "Ladder Frame 90", kategori: "Frame", hargaJual: 297000, hargaSewa: 2700, stokTotal: 188, stokDisewa: 142, stokRusak: 6, minStok: 40, kondisi: "Baik" },
  { id: "BRG-004", nama: "Cross Brace 220", kategori: "Brace", hargaJual: 118000, hargaSewa: 1100, stokTotal: 964, stokDisewa: 617, stokRusak: 28, minStok: 120, kondisi: "Baik" },
  { id: "BRG-005", nama: "Cross Brace 193", kategori: "Brace", hargaJual: 109000, hargaSewa: 1000, stokTotal: 712, stokDisewa: 688, stokRusak: 11, minStok: 100, kondisi: "Perlu Pengecekan" },
  { id: "BRG-006", nama: "Jack Base 60", kategori: "Jack", hargaJual: 147000, hargaSewa: 1400, stokTotal: 538, stokDisewa: 402, stokRusak: 17, minStok: 80, kondisi: "Baik" },
  { id: "BRG-007", nama: "U-Head Jack 60", kategori: "Jack", hargaJual: 156000, hargaSewa: 1500, stokTotal: 419, stokDisewa: 388, stokRusak: 22, minStok: 80, kondisi: "Perlu Pengecekan" },
  { id: "BRG-008", nama: "Joint Pin", kategori: "Aksesori", hargaJual: 23500, hargaSewa: 250, stokTotal: 2140, stokDisewa: 1236, stokRusak: 84, minStok: 300, kondisi: "Baik" },
  { id: "BRG-009", nama: "Catwalk 225 (Metal Plank)", kategori: "Platform", hargaJual: 428000, hargaSewa: 4200, stokTotal: 276, stokDisewa: 259, stokRusak: 8, minStok: 40, kondisi: "Baik" },
  { id: "BRG-010", nama: "Catwalk 180", kategori: "Platform", hargaJual: 371000, hargaSewa: 3600, stokTotal: 154, stokDisewa: 96, stokRusak: 5, minStok: 30, kondisi: "Baik" },
  { id: "BRG-011", nama: "Pipe Support TS 90", kategori: "Jack", hargaJual: 318000, hargaSewa: 3100, stokTotal: 226, stokDisewa: 148, stokRusak: 12, minStok: 40, kondisi: "Baik" },
  { id: "BRG-012", nama: "Swivel Clamp 48mm", kategori: "Aksesori", hargaJual: 31500, hargaSewa: 350, stokTotal: 1470, stokDisewa: 903, stokRusak: 57, minStok: 250, kondisi: "Baik" },
  { id: "BRG-013", nama: "Fixed Clamp 48mm", kategori: "Aksesori", hargaJual: 28500, hargaSewa: 300, stokTotal: 1682, stokDisewa: 1594, stokRusak: 43, minStok: 250, kondisi: "Perlu Pengecekan" },
  { id: "BRG-014", nama: "Stair / Tangga Scaffolding", kategori: "Platform", hargaJual: 693000, hargaSewa: 6500, stokTotal: 64, stokDisewa: 41, stokRusak: 2, minStok: 12, kondisi: "Baik" },
];

export const stokTersedia = (b) => b.stokTotal - b.stokDisewa - b.stokRusak;

export const pelanggan = [
  { id: "PLG-0041", nama: "PT Wijaya Karya Bangunan Gedung", jenis: "Perusahaan", hp: "021-8092-4417", alamat: "Jl. D.I. Panjaitan Kav. 9, Cipinang, Jakarta Timur", jumlahTransaksi: 23, terakhir: "2026-06-11" },
  { id: "PLG-0038", nama: "CV Karya Beton Sejahtera", jenis: "Perusahaan", hp: "0812-9034-7761", alamat: "Jl. Raya Narogong KM 12, Bantargebang, Bekasi", jumlahTransaksi: 17, terakhir: "2026-06-09" },
  { id: "PLG-0056", nama: "Budi Santoso", jenis: "Perorangan", hp: "0813-8845-2210", alamat: "Jl. Kemang Timur No. 47, Jakarta Selatan", jumlahTransaksi: 4, terakhir: "2026-06-08" },
  { id: "PLG-0019", nama: "PT Adhi Persada Gedung", jenis: "Perusahaan", hp: "021-7918-3358", alamat: "Jl. TB Simatupang No. 58, Pasar Rebo, Jakarta Timur", jumlahTransaksi: 31, terakhir: "2026-06-13" },
  { id: "PLG-0062", nama: "H. Muhammad Ramli", jenis: "Perorangan", hp: "0857-1929-8834", alamat: "Jl. Raya Parung No. 132, Bogor", jumlahTransaksi: 2, terakhir: "2026-05-27" },
  { id: "PLG-0047", nama: "CV Mitra Konstruksi Utama", jenis: "Perusahaan", hp: "0811-8273-664", alamat: "Ruko Grand Galaxy Blok RGA No. 21, Bekasi Selatan", jumlahTransaksi: 11, terakhir: "2026-06-02" },
  { id: "PLG-0053", nama: "PT Nusa Raya Cipta", jenis: "Perusahaan", hp: "021-5290-0715", alamat: "Gedung Graha Cipta Lt. 2, Jl. D.I. Panjaitan, Jakarta", jumlahTransaksi: 8, terakhir: "2026-05-30" },
  { id: "PLG-0059", nama: "Agus Prasetyo", jenis: "Perorangan", hp: "0821-4471-9083", alamat: "Perum Villa Nusa Indah 2 Blok S4/17, Gunung Putri", jumlahTransaksi: 6, terakhir: "2026-06-12" },
  { id: "PLG-0031", nama: "PT Totalindo Eka Persada", jenis: "Perusahaan", hp: "021-7883-9214", alamat: "Jl. Tebet Raya No. 14A, Jakarta Selatan", jumlahTransaksi: 14, terakhir: "2026-04-18" },
  { id: "PLG-0064", nama: "Siti Nurhaliza Kontraktor", jenis: "Perorangan", hp: "0838-7126-5540", alamat: "Jl. H. Mencong No. 88, Ciledug, Tangerang", jumlahTransaksi: 1, terakhir: "2026-06-05" },
];

export const penyewaan = [
  {
    id: "SWA-1247", pelangganId: "PLG-0019", pelanggan: "PT Adhi Persada Gedung",
    tglMulai: "2026-05-04", tglSelesai: "2026-07-04", status: "Aktif", metode: "Transfer",
    items: [
      { itemId: "BRG-001", nama: "Main Frame 190", qty: 120, hargaSewa: 3800 },
      { itemId: "BRG-004", nama: "Cross Brace 220", qty: 240, hargaSewa: 1100 },
      { itemId: "BRG-006", nama: "Jack Base 60", qty: 96, hargaSewa: 1400 },
    ],
  },
  {
    id: "SWA-1263", pelangganId: "PLG-0038", pelanggan: "CV Karya Beton Sejahtera",
    tglMulai: "2026-05-21", tglSelesai: "2026-06-21", status: "Aktif", metode: "Transfer",
    items: [
      { itemId: "BRG-002", nama: "Main Frame 170", qty: 64, hargaSewa: 3500 },
      { itemId: "BRG-005", nama: "Cross Brace 193", qty: 128, hargaSewa: 1000 },
      { itemId: "BRG-009", nama: "Catwalk 225 (Metal Plank)", qty: 38, hargaSewa: 4200 },
    ],
  },
  {
    id: "SWA-1198", pelangganId: "PLG-0047", pelanggan: "CV Mitra Konstruksi Utama",
    tglMulai: "2026-04-09", tglSelesai: "2026-06-09", status: "Telat", metode: "Tunai",
    items: [
      { itemId: "BRG-003", nama: "Ladder Frame 90", qty: 42, hargaSewa: 2700 },
      { itemId: "BRG-007", nama: "U-Head Jack 60", qty: 42, hargaSewa: 1500 },
      { itemId: "BRG-008", nama: "Joint Pin", qty: 84, hargaSewa: 250 },
    ],
  },
  {
    id: "SWA-1271", pelangganId: "PLG-0059", pelanggan: "Agus Prasetyo",
    tglMulai: "2026-06-01", tglSelesai: "2026-06-15", status: "Aktif", metode: "Tunai",
    items: [
      { itemId: "BRG-011", nama: "Pipe Support TS 90", qty: 24, hargaSewa: 3100 },
      { itemId: "BRG-012", nama: "Swivel Clamp 48mm", qty: 48, hargaSewa: 350 },
    ],
  },
  {
    id: "SWA-1244", pelangganId: "PLG-0041", pelanggan: "PT Wijaya Karya Bangunan Gedung",
    tglMulai: "2026-05-02", tglSelesai: "2026-06-02", status: "Selesai", metode: "Transfer",
    items: [
      { itemId: "BRG-001", nama: "Main Frame 190", qty: 86, hargaSewa: 3800 },
      { itemId: "BRG-004", nama: "Cross Brace 220", qty: 172, hargaSewa: 1100 },
    ],
  },
  {
    id: "SWA-1266", pelangganId: "PLG-0053", pelanggan: "PT Nusa Raya Cipta",
    tglMulai: "2026-05-25", tglSelesai: "2026-06-18", status: "Aktif", metode: "Transfer",
    items: [
      { itemId: "BRG-014", nama: "Stair / Tangga Scaffolding", qty: 8, hargaSewa: 6500 },
      { itemId: "BRG-013", nama: "Fixed Clamp 48mm", qty: 210, hargaSewa: 300 },
    ],
  },
  {
    id: "SWA-1187", pelangganId: "PLG-0031", pelanggan: "PT Totalindo Eka Persada",
    tglMulai: "2026-03-14", tglSelesai: "2026-05-14", status: "Telat", metode: "Transfer",
    items: [
      { itemId: "BRG-009", nama: "Catwalk 225 (Metal Plank)", qty: 52, hargaSewa: 4200 },
      { itemId: "BRG-007", nama: "U-Head Jack 60", qty: 74, hargaSewa: 1500 },
    ],
  },
];

export const penjualan = [
  {
    id: "PJL-0892", pelangganId: "PLG-0056", pelanggan: "Budi Santoso", tanggal: "2026-06-08",
    metode: "Tunai", status: "Lunas",
    items: [
      { itemId: "BRG-008", nama: "Joint Pin", qty: 60, harga: 23500 },
      { itemId: "BRG-012", nama: "Swivel Clamp 48mm", qty: 40, harga: 31500 },
    ],
  },
  {
    id: "PJL-0897", pelangganId: "PLG-0041", pelanggan: "PT Wijaya Karya Bangunan Gedung", tanggal: "2026-06-11",
    metode: "Transfer", status: "Lunas",
    items: [
      { itemId: "BRG-001", nama: "Main Frame 190", qty: 24, harga: 412000 },
      { itemId: "BRG-004", nama: "Cross Brace 220", qty: 48, harga: 118000 },
      { itemId: "BRG-006", nama: "Jack Base 60", qty: 20, harga: 147000 },
    ],
  },
  {
    id: "PJL-0885", pelangganId: "PLG-0062", pelanggan: "H. Muhammad Ramli", tanggal: "2026-05-27",
    metode: "Tunai", status: "Lunas",
    items: [
      { itemId: "BRG-003", nama: "Ladder Frame 90", qty: 8, harga: 297000 },
      { itemId: "BRG-005", nama: "Cross Brace 193", qty: 16, harga: 109000 },
    ],
  },
  {
    id: "PJL-0901", pelangganId: "PLG-0064", pelanggan: "Siti Nurhaliza Kontraktor", tanggal: "2026-06-05",
    metode: "Transfer", status: "Lunas",
    items: [
      { itemId: "BRG-013", nama: "Fixed Clamp 48mm", qty: 120, harga: 28500 },
    ],
  },
  {
    id: "PJL-0904", pelangganId: "PLG-0038", pelanggan: "CV Karya Beton Sejahtera", tanggal: "2026-06-13",
    metode: "Transfer", status: "Lunas",
    items: [
      { itemId: "BRG-010", nama: "Catwalk 180", qty: 12, harga: 371000 },
      { itemId: "BRG-008", nama: "Joint Pin", qty: 90, harga: 23500 },
    ],
  },
];

export const totalTransaksi = (items, key = "harga") =>
  items.reduce((s, i) => s + i.qty * i[key], 0);

export const grafikBulanan = [
  { bulan: "Jan", sewa: 38.4, jual: 21.7 },
  { bulan: "Feb", sewa: 42.1, jual: 18.3 },
  { bulan: "Mar", sewa: 51.6, jual: 26.9 },
  { bulan: "Apr", sewa: 47.2, jual: 31.4 },
  { bulan: "Mei", sewa: 58.9, jual: 24.6 },
  { bulan: "Jun", sewa: 44.3, jual: 29.8 },
];

export const aktivitasTerbaru = [
  { waktu: "14/06 09:12", jenis: "Penyewaan", ref: "SWA-1271", keterangan: "Agus Prasetyo — 24 unit Pipe Support TS 90 keluar gudang", oleh: "Dedi (Staff)" },
  { waktu: "13/06 15:47", jenis: "Penjualan", ref: "PJL-0904", keterangan: "CV Karya Beton Sejahtera — 12 unit Catwalk 180, lunas transfer", oleh: "Rina (Admin)" },
  { waktu: "13/06 11:20", jenis: "Pengembalian", ref: "SWA-1244", keterangan: "PT Wijaya Karya — 86 Main Frame 190 kembali, 3 rusak ringan", oleh: "Dedi (Staff)" },
  { waktu: "12/06 16:05", jenis: "Stok", ref: "BRG-007", keterangan: "U-Head Jack 60 — 22 unit ditandai perlu pengecekan ulir", oleh: "Joko (Staff)" },
  { waktu: "11/06 10:33", jenis: "Penjualan", ref: "PJL-0897", keterangan: "PT Wijaya Karya — 24 Main Frame 190 + aksesori, lunas", oleh: "Rina (Admin)" },
  { waktu: "11/06 08:51", jenis: "Penyewaan", ref: "SWA-1263", keterangan: "CV Karya Beton — perpanjangan konfirmasi s/d 21 Juni", oleh: "Rina (Admin)" },
];

export const DENDA_KERUSAKAN = {
  "Baik": 0,
  "Rusak Ringan": 0.15,
  "Rusak Berat": 0.6,
  "Hilang": 1.0,
};

export const HARI_INI = "2026-06-14";

export const hitungHari = (a, b) =>
  Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
