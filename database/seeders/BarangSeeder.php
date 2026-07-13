<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['id' => 'BRG-001', 'nama' => 'Main Frame 190', 'kategori' => 'Frame', 'harga_jual' => 412000, 'harga_sewa' => 3800, 'stok_total' => 486, 'stok_disewa' => 312, 'stok_rusak' => 14, 'min_stok' => 60, 'kondisi' => 'Baik'],
            ['id' => 'BRG-002', 'nama' => 'Main Frame 170', 'kategori' => 'Frame', 'harga_jual' => 386000, 'harga_sewa' => 3500, 'stok_total' => 342, 'stok_disewa' => 261, 'stok_rusak' => 9, 'min_stok' => 50, 'kondisi' => 'Baik'],
            ['id' => 'BRG-003', 'nama' => 'Ladder Frame 90', 'kategori' => 'Frame', 'harga_jual' => 297000, 'harga_sewa' => 2700, 'stok_total' => 188, 'stok_disewa' => 142, 'stok_rusak' => 6, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'BRG-004', 'nama' => 'Cross Brace 220', 'kategori' => 'Brace', 'harga_jual' => 118000, 'harga_sewa' => 1100, 'stok_total' => 964, 'stok_disewa' => 617, 'stok_rusak' => 28, 'min_stok' => 120, 'kondisi' => 'Baik'],
            ['id' => 'BRG-005', 'nama' => 'Cross Brace 193', 'kategori' => 'Brace', 'harga_jual' => 109000, 'harga_sewa' => 1000, 'stok_total' => 712, 'stok_disewa' => 688, 'stok_rusak' => 11, 'min_stok' => 100, 'kondisi' => 'Perlu Pengecekan'],
            ['id' => 'BRG-006', 'nama' => 'Jack Base 60', 'kategori' => 'Jack', 'harga_jual' => 147000, 'harga_sewa' => 1400, 'stok_total' => 538, 'stok_disewa' => 402, 'stok_rusak' => 17, 'min_stok' => 80, 'kondisi' => 'Baik'],
            ['id' => 'BRG-007', 'nama' => 'U-Head Jack 60', 'kategori' => 'Jack', 'harga_jual' => 156000, 'harga_sewa' => 1500, 'stok_total' => 419, 'stok_disewa' => 388, 'stok_rusak' => 22, 'min_stok' => 80, 'kondisi' => 'Perlu Pengecekan'],
            ['id' => 'BRG-008', 'nama' => 'Joint Pin', 'kategori' => 'Aksesori', 'harga_jual' => 23500, 'harga_sewa' => 250, 'stok_total' => 2140, 'stok_disewa' => 1236, 'stok_rusak' => 84, 'min_stok' => 300, 'kondisi' => 'Baik'],
            ['id' => 'BRG-009', 'nama' => 'Catwalk 225 (Metal Plank)', 'kategori' => 'Platform', 'harga_jual' => 428000, 'harga_sewa' => 4200, 'stok_total' => 276, 'stok_disewa' => 259, 'stok_rusak' => 8, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'BRG-010', 'nama' => 'Catwalk 180', 'kategori' => 'Platform', 'harga_jual' => 371000, 'harga_sewa' => 3600, 'stok_total' => 154, 'stok_disewa' => 96, 'stok_rusak' => 5, 'min_stok' => 30, 'kondisi' => 'Baik'],
            ['id' => 'BRG-011', 'nama' => 'Pipe Support TS 90', 'kategori' => 'Jack', 'harga_jual' => 318000, 'harga_sewa' => 3100, 'stok_total' => 226, 'stok_disewa' => 148, 'stok_rusak' => 12, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'BRG-012', 'nama' => 'Swivel Clamp 48mm', 'kategori' => 'Aksesori', 'harga_jual' => 31500, 'harga_sewa' => 350, 'stok_total' => 1470, 'stok_disewa' => 903, 'stok_rusak' => 57, 'min_stok' => 250, 'kondisi' => 'Baik'],
            ['id' => 'BRG-013', 'nama' => 'Fixed Clamp 48mm', 'kategori' => 'Aksesori', 'harga_jual' => 28500, 'harga_sewa' => 300, 'stok_total' => 1682, 'stok_disewa' => 1594, 'stok_rusak' => 43, 'min_stok' => 250, 'kondisi' => 'Perlu Pengecekan'],
            ['id' => 'BRG-014', 'nama' => 'Stair / Tangga Scaffolding', 'kategori' => 'Platform', 'harga_jual' => 693000, 'harga_sewa' => 6500, 'stok_total' => 64, 'stok_disewa' => 41, 'stok_rusak' => 2, 'min_stok' => 12, 'kondisi' => 'Baik'],
        ];

        foreach ($data as $row) {
            Barang::create($row);
        }
    }
}
