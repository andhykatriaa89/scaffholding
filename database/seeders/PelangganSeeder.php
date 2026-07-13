<?php

namespace Database\Seeders;

use App\Models\Pelanggan;
use Illuminate\Database\Seeder;

class PelangganSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['id' => 'PLG-0041', 'nama' => 'PT Wijaya Karya Bangunan Gedung', 'jenis' => 'Perusahaan', 'hp' => '021-8092-4417', 'alamat' => 'Jl. D.I. Panjaitan Kav. 9, Cipinang, Jakarta Timur', 'jumlah_transaksi' => 23, 'terakhir' => '2026-06-11'],
            ['id' => 'PLG-0038', 'nama' => 'CV Karya Beton Sejahtera', 'jenis' => 'Perusahaan', 'hp' => '0812-9034-7761', 'alamat' => 'Jl. Raya Narogong KM 12, Bantargebang, Bekasi', 'jumlah_transaksi' => 17, 'terakhir' => '2026-06-09'],
            ['id' => 'PLG-0056', 'nama' => 'Budi Santoso', 'jenis' => 'Perorangan', 'hp' => '0813-8845-2210', 'alamat' => 'Jl. Kemang Timur No. 47, Jakarta Selatan', 'jumlah_transaksi' => 4, 'terakhir' => '2026-06-08'],
            ['id' => 'PLG-0019', 'nama' => 'PT Adhi Persada Gedung', 'jenis' => 'Perusahaan', 'hp' => '021-7918-3358', 'alamat' => 'Jl. TB Simatupang No. 58, Pasar Rebo, Jakarta Timur', 'jumlah_transaksi' => 31, 'terakhir' => '2026-06-13'],
            ['id' => 'PLG-0062', 'nama' => 'H. Muhammad Ramli', 'jenis' => 'Perorangan', 'hp' => '0857-1929-8834', 'alamat' => 'Jl. Raya Parung No. 132, Bogor', 'jumlah_transaksi' => 2, 'terakhir' => '2026-05-27'],
            ['id' => 'PLG-0047', 'nama' => 'CV Mitra Konstruksi Utama', 'jenis' => 'Perusahaan', 'hp' => '0811-8273-664', 'alamat' => 'Ruko Grand Galaxy Blok RGA No. 21, Bekasi Selatan', 'jumlah_transaksi' => 11, 'terakhir' => '2026-06-02'],
            ['id' => 'PLG-0053', 'nama' => 'PT Nusa Raya Cipta', 'jenis' => 'Perusahaan', 'hp' => '021-5290-0715', 'alamat' => 'Gedung Graha Cipta Lt. 2, Jl. D.I. Panjaitan, Jakarta', 'jumlah_transaksi' => 8, 'terakhir' => '2026-05-30'],
            ['id' => 'PLG-0059', 'nama' => 'Agus Prasetyo', 'jenis' => 'Perorangan', 'hp' => '0821-4471-9083', 'alamat' => 'Perum Villa Nusa Indah 2 Blok S4/17, Gunung Putri', 'jumlah_transaksi' => 6, 'terakhir' => '2026-06-12'],
            ['id' => 'PLG-0031', 'nama' => 'PT Totalindo Eka Persada', 'jenis' => 'Perusahaan', 'hp' => '021-7883-9214', 'alamat' => 'Jl. Tebet Raya No. 14A, Jakarta Selatan', 'jumlah_transaksi' => 14, 'terakhir' => '2026-04-18'],
            ['id' => 'PLG-0064', 'nama' => 'Siti Nurhaliza Kontraktor', 'jenis' => 'Perorangan', 'hp' => '0838-7126-5540', 'alamat' => 'Jl. H. Mencong No. 88, Ciledug, Tangerang', 'jumlah_transaksi' => 1, 'terakhir' => '2026-06-05'],
        ];

        foreach ($data as $row) {
            Pelanggan::create($row);
        }
    }
}
