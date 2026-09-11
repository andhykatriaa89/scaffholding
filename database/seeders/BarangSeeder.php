<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Data diimpor dari file Kode barang.xlsx (40 item scaffolding Sucoot Scaform).
     */
    public function run(): void
    {
        $data = [
            ['id' => 'V60100', 'nama' => 'Vertical W/O Spigot ø60.2mm 1.0m T:3.2mm', 'keterangan' => 'Vertical W/O Spigot ø60.2mm 1.0m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 20675, 'harga_sewa' => 200, 'stok_total' => 317, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V60150', 'nama' => 'Vertical W/O Spigot ø60.2mm 1.5m T:3.2mm', 'keterangan' => 'Vertical W/O Spigot ø60.2mm 1.5m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 30792, 'harga_sewa' => 300, 'stok_total' => 334, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V61100', 'nama' => 'Vertical ø60.2mm 1.0m T:3.2mm', 'keterangan' => 'Vertical ø60.2mm 1.0m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 24453, 'harga_sewa' => 250, 'stok_total' => 351, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V61150', 'nama' => 'Vertical ø60.2mm 1.5m T:3.2mm', 'keterangan' => 'Vertical ø60.2mm 1.5m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 34570, 'harga_sewa' => 350, 'stok_total' => 368, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V62020', 'nama' => 'Basic Socket ø60.2mm 0.2m T:3.2mm', 'keterangan' => 'Basic Socket ø60.2mm 0.2m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 8543, 'harga_sewa' => 100, 'stok_total' => 385, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V62025', 'nama' => 'Sub-Vertical ø60.2mm 0.25m T:3.2mm', 'keterangan' => 'Sub-Vertical ø60.2mm 0.25m T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 8627, 'harga_sewa' => 100, 'stok_total' => 402, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V62050', 'nama' => 'Sub-Vertical ø60.2mm 0.5 T:3.2mm', 'keterangan' => 'Sub-Vertical ø60.2mm 0.5 T:3.2mm', 'kategori' => 'Frame', 'harga_jual' => 12006, 'harga_sewa' => 100, 'stok_total' => 419, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H66060', 'nama' => 'Horizontal ø48.4mm 0.6m T:2.3mm', 'keterangan' => 'Horizontal ø48.4mm 0.6m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 10390, 'harga_sewa' => 100, 'stok_total' => 436, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H66090', 'nama' => 'Horizontal ø48.4mm 0.9m T:2.3mm', 'keterangan' => 'Horizontal ø48.4mm 0.9m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 12741, 'harga_sewa' => 150, 'stok_total' => 453, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H66150', 'nama' => 'Horizontal ø48.4mm 1.5m T:2.3mm', 'keterangan' => 'Horizontal ø48.4mm 1.5m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 17422, 'harga_sewa' => 150, 'stok_total' => 470, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H66180', 'nama' => 'Horizontal ø48.4mm 1.8m T:2.3mm', 'keterangan' => 'Horizontal ø48.4mm 1.8m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 19794, 'harga_sewa' => 200, 'stok_total' => 487, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D60615', 'nama' => 'Diagonal ø48.2mm 0.6 x 1.5m T:2.5mm', 'keterangan' => 'Diagonal ø48.2mm 0.6 x 1.5m T:2.5mm', 'kategori' => 'Brace', 'harga_jual' => 20192, 'harga_sewa' => 200, 'stok_total' => 504, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D60915', 'nama' => 'Diagonal ø48.2mm 0.9 x 1.5m T:2.5mm', 'keterangan' => 'Diagonal ø48.2mm 0.9 x 1.5m T:2.5mm', 'kategori' => 'Brace', 'harga_jual' => 20948, 'harga_sewa' => 200, 'stok_total' => 521, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D61515', 'nama' => 'Diagonal ø48.2mm 1.5 x 1.5m T:2.5mm', 'keterangan' => 'Diagonal ø48.2mm 1.5 x 1.5m T:2.5mm', 'kategori' => 'Brace', 'harga_jual' => 23572, 'harga_sewa' => 250, 'stok_total' => 538, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D61815', 'nama' => 'Diagonal ø48.2mm 1.8 x 1.5m T:2.5mm', 'keterangan' => 'Diagonal ø48.2mm 1.8 x 1.5m T:2.5mm', 'kategori' => 'Brace', 'harga_jual' => 25188, 'harga_sewa' => 250, 'stok_total' => 305, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'J48601', 'nama' => 'Jack Base ø48.2mm L:600mm T:5.0mm', 'keterangan' => 'Jack Base ø48.2mm L:600mm T:5.0mm', 'kategori' => 'Jack', 'harga_jual' => 17275, 'harga_sewa' => 150, 'stok_total' => 258, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 30, 'kondisi' => 'Baik'],
            ['id' => 'U48601', 'nama' => 'U-Head ø48.2mm L:600mm T:5.0mm', 'keterangan' => 'U-Head ø48.2mm L:600mm T:5.0mm', 'kategori' => 'Jack', 'harga_jual' => 20969, 'harga_sewa' => 200, 'stok_total' => 271, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 30, 'kondisi' => 'Baik'],
            ['id' => 'V30100', 'nama' => 'Vertical W/O Spigot ø48.6mm 1.0m T:2.5mm', 'keterangan' => 'Vertical W/O Spigot ø48.6mm 1.0m T:2.5mm', 'kategori' => 'Frame', 'harga_jual' => 13832, 'harga_sewa' => 150, 'stok_total' => 356, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V30200', 'nama' => 'Vertical W/O Spigot ø48.6mm 2.0m T:2.5mm', 'keterangan' => 'Vertical W/O Spigot ø48.6mm 2.0m T:2.5mm', 'kategori' => 'Frame', 'harga_jual' => 27308, 'harga_sewa' => 250, 'stok_total' => 373, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V31100', 'nama' => 'Vertical ø48.6mm 1.0m T:2.5mm', 'keterangan' => 'Vertical ø48.6mm 1.0m T:2.5mm', 'kategori' => 'Frame', 'harga_jual' => 16561, 'harga_sewa' => 150, 'stok_total' => 390, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'V31200', 'nama' => 'Vertical ø48.6mm 2.0m T:2.5mm', 'keterangan' => 'Vertical ø48.6mm 2.0m T:2.5mm', 'kategori' => 'Frame', 'harga_jual' => 30037, 'harga_sewa' => 300, 'stok_total' => 407, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H33060', 'nama' => 'Horizontal ø42.7mm 0.6m T:2.3mm', 'keterangan' => 'Horizontal ø42.7mm 0.6m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 8291, 'harga_sewa' => 100, 'stok_total' => 424, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H33090', 'nama' => 'Horizontal ø42.7mm 0.9m T:2.3mm', 'keterangan' => 'Horizontal ø42.7mm 0.9m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 10369, 'harga_sewa' => 100, 'stok_total' => 441, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H33120', 'nama' => 'Horizontal ø42.7mm 1.2m T:2.3mm', 'keterangan' => 'Horizontal ø42.7mm 1.2m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 12405, 'harga_sewa' => 100, 'stok_total' => 458, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'H33180', 'nama' => 'Horizontal ø42.7mm 1.8m T:2.3mm', 'keterangan' => 'Horizontal ø42.7mm 1.8m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 16498, 'harga_sewa' => 150, 'stok_total' => 475, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D30920', 'nama' => 'Diagonal ø42.7mm 0.9 x 2.0m T:2.3mm', 'keterangan' => 'Diagonal ø42.7mm 0.9 x 2.0m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 22375, 'harga_sewa' => 200, 'stok_total' => 492, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D31220', 'nama' => 'Diagonal ø42.7mm 1.5 x 2.0m T:2.3mm', 'keterangan' => 'Diagonal ø42.7mm 1.5 x 2.0m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 22921, 'harga_sewa' => 250, 'stok_total' => 509, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'D31820', 'nama' => 'Diagonal ø42.7mm 1.8 x 2.0m T:2.3mm', 'keterangan' => 'Diagonal ø42.7mm 1.8 x 2.0m T:2.3mm', 'kategori' => 'Brace', 'harga_jual' => 25188, 'harga_sewa' => 250, 'stok_total' => 526, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'J38601', 'nama' => 'Jack Base ø38.5mm L:600mmL T:4.0mm', 'keterangan' => 'Jack Base ø38.5mm L:600mmL T:4.0mm', 'kategori' => 'Jack', 'harga_jual' => 13035, 'harga_sewa' => 150, 'stok_total' => 277, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 30, 'kondisi' => 'Baik'],
            ['id' => 'SS1810', 'nama' => 'Stairs H:1.0m x W:1.8m', 'keterangan' => 'Stairs H:1.0m x W:1.8m', 'kategori' => 'Platform', 'harga_jual' => 84108, 'harga_sewa' => 850, 'stok_total' => 110, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'HR1810', 'nama' => 'Handrail H:1.0m x W:1.8m', 'keterangan' => 'Handrail H:1.0m x W:1.8m', 'kategori' => 'Aksesori', 'harga_jual' => 23066, 'harga_sewa' => 250, 'stok_total' => 189, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 20, 'kondisi' => 'Baik'],
            ['id' => 'Deck', 'nama' => 'Deck L1200 x W400 + H33120', 'keterangan' => 'Deck L1200 x W400 + H33120', 'kategori' => 'Platform', 'harga_jual' => 91541, 'harga_sewa' => 900, 'stok_total' => 132, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'TP5310', 'nama' => 'Top Platform W:530 x L:1439mm', 'keterangan' => 'Top Platform W:530 x L:1439mm', 'kategori' => 'Platform', 'harga_jual' => 96376, 'harga_sewa' => 950, 'stok_total' => 143, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'F26518', 'nama' => 'Plank 265 x 1800mm', 'keterangan' => 'Plank 265 x 1800mm', 'kategori' => 'Platform', 'harga_jual' => 37383, 'harga_sewa' => 350, 'stok_total' => 450, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 40, 'kondisi' => 'Baik'],
            ['id' => 'WF15002', 'nama' => 'Wide Flange 150 x 75 x 5 x 7 L:2.0m', 'keterangan' => 'Wide Flange 150 x 75 x 5 x 7 L:2.0m', 'kategori' => 'Platform', 'harga_jual' => 113065, 'harga_sewa' => 1150, 'stok_total' => 165, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'WF15003', 'nama' => 'Wide Flange 150 x 75 x 5 x 7 L:3.0m', 'keterangan' => 'Wide Flange 150 x 75 x 5 x 7 L:3.0m', 'kategori' => 'Platform', 'harga_jual' => 169598, 'harga_sewa' => 1700, 'stok_total' => 176, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'WF15006', 'nama' => 'Wide Flange 150 x 75 x 5 x 7 L:6.0m', 'keterangan' => 'Wide Flange 150 x 75 x 5 x 7 L:6.0m', 'kategori' => 'Platform', 'harga_jual' => 339195, 'harga_sewa' => 3400, 'stok_total' => 87, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'UNP10002', 'nama' => 'Channel U 100 x 50 x 5 L:2.0m', 'keterangan' => 'Channel U 100 x 50 x 5 L:2.0m', 'kategori' => 'Platform', 'harga_jual' => 62603, 'harga_sewa' => 650, 'stok_total' => 98, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'UNP10003', 'nama' => 'Channel U 100 x 50 x 5 L:3.0m', 'keterangan' => 'Channel U 100 x 50 x 5 L:3.0m', 'kategori' => 'Platform', 'harga_jual' => 93905, 'harga_sewa' => 950, 'stok_total' => 109, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
            ['id' => 'UNP10006', 'nama' => 'Channel U 100 x 50 x 5 L:6.0m', 'keterangan' => 'Channel U 100 x 50 x 5 L:6.0m', 'kategori' => 'Platform', 'harga_jual' => 187810, 'harga_sewa' => 1900, 'stok_total' => 120, 'stok_disewa' => 0, 'stok_rusak' => 0, 'min_stok' => 15, 'kondisi' => 'Baik'],
        ];

        foreach ($data as $row) {
            Barang::updateOrCreate(['id' => $row['id']], $row);
        }
    }
}
