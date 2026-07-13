<?php

namespace Database\Seeders;

use App\Models\Penyewaan;
use App\Models\PenyewaanItem;
use App\Models\Penjualan;
use App\Models\PenjualanItem;
use App\Models\Aktivitas;
use Illuminate\Database\Seeder;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        // === PENYEWAAN ===
        $penyewaanData = [
            [
                'id' => 'SWA-1247', 'pelanggan_id' => 'PLG-0019', 'tgl_mulai' => '2026-05-04', 'tgl_selesai' => '2026-07-04', 'status' => 'Aktif', 'metode' => 'Transfer',
                'items' => [
                    ['barang_id' => 'BRG-001', 'qty' => 120, 'harga_sewa' => 3800],
                    ['barang_id' => 'BRG-004', 'qty' => 240, 'harga_sewa' => 1100],
                    ['barang_id' => 'BRG-006', 'qty' => 96, 'harga_sewa' => 1400],
                ],
            ],
            [
                'id' => 'SWA-1263', 'pelanggan_id' => 'PLG-0038', 'tgl_mulai' => '2026-05-21', 'tgl_selesai' => '2026-06-21', 'status' => 'Aktif', 'metode' => 'Transfer',
                'items' => [
                    ['barang_id' => 'BRG-002', 'qty' => 64, 'harga_sewa' => 3500],
                    ['barang_id' => 'BRG-005', 'qty' => 128, 'harga_sewa' => 1000],
                    ['barang_id' => 'BRG-009', 'qty' => 38, 'harga_sewa' => 4200],
                ],
            ],
            [
                'id' => 'SWA-1198', 'pelanggan_id' => 'PLG-0047', 'tgl_mulai' => '2026-04-09', 'tgl_selesai' => '2026-06-09', 'status' => 'Telat', 'metode' => 'Tunai',
                'items' => [
                    ['barang_id' => 'BRG-003', 'qty' => 42, 'harga_sewa' => 2700],
                    ['barang_id' => 'BRG-007', 'qty' => 42, 'harga_sewa' => 1500],
                    ['barang_id' => 'BRG-008', 'qty' => 84, 'harga_sewa' => 250],
                ],
            ],
            [
                'id' => 'SWA-1271', 'pelanggan_id' => 'PLG-0059', 'tgl_mulai' => '2026-06-01', 'tgl_selesai' => '2026-06-15', 'status' => 'Aktif', 'metode' => 'Tunai',
                'items' => [
                    ['barang_id' => 'BRG-011', 'qty' => 24, 'harga_sewa' => 3100],
                    ['barang_id' => 'BRG-012', 'qty' => 48, 'harga_sewa' => 350],
                ],
            ],
            [
                'id' => 'SWA-1244', 'pelanggan_id' => 'PLG-0041', 'tgl_mulai' => '2026-05-02', 'tgl_selesai' => '2026-06-02', 'status' => 'Selesai', 'metode' => 'Transfer',
                'items' => [
                    ['barang_id' => 'BRG-001', 'qty' => 86, 'harga_sewa' => 3800],
                    ['barang_id' => 'BRG-004', 'qty' => 172, 'harga_sewa' => 1100],
                ],
            ],
            [
                'id' => 'SWA-1266', 'pelanggan_id' => 'PLG-0053', 'tgl_mulai' => '2026-05-25', 'tgl_selesai' => '2026-06-18', 'status' => 'Aktif', 'metode' => 'Transfer',
                'items' => [
                    ['barang_id' => 'BRG-014', 'qty' => 8, 'harga_sewa' => 6500],
                    ['barang_id' => 'BRG-013', 'qty' => 210, 'harga_sewa' => 300],
                ],
            ],
            [
                'id' => 'SWA-1187', 'pelanggan_id' => 'PLG-0031', 'tgl_mulai' => '2026-03-14', 'tgl_selesai' => '2026-05-14', 'status' => 'Telat', 'metode' => 'Transfer',
                'items' => [
                    ['barang_id' => 'BRG-009', 'qty' => 52, 'harga_sewa' => 4200],
                    ['barang_id' => 'BRG-007', 'qty' => 74, 'harga_sewa' => 1500],
                ],
            ],
        ];

        foreach ($penyewaanData as $row) {
            $items = $row['items'];
            unset($row['items']);
            $penyewaan = Penyewaan::create($row);

            foreach ($items as $item) {
                PenyewaanItem::create(array_merge($item, ['penyewaan_id' => $penyewaan->id]));
            }
        }

        // === PENJUALAN ===
        $penjualanData = [
            [
                'id' => 'PJL-0892', 'pelanggan_id' => 'PLG-0056', 'tanggal' => '2026-06-08', 'metode' => 'Tunai', 'status' => 'Lunas',
                'items' => [
                    ['barang_id' => 'BRG-008', 'qty' => 60, 'harga' => 23500],
                    ['barang_id' => 'BRG-012', 'qty' => 40, 'harga' => 31500],
                ],
            ],
            [
                'id' => 'PJL-0897', 'pelanggan_id' => 'PLG-0041', 'tanggal' => '2026-06-11', 'metode' => 'Transfer', 'status' => 'Lunas',
                'items' => [
                    ['barang_id' => 'BRG-001', 'qty' => 24, 'harga' => 412000],
                    ['barang_id' => 'BRG-004', 'qty' => 48, 'harga' => 118000],
                    ['barang_id' => 'BRG-006', 'qty' => 20, 'harga' => 147000],
                ],
            ],
            [
                'id' => 'PJL-0885', 'pelanggan_id' => 'PLG-0062', 'tanggal' => '2026-05-27', 'metode' => 'Tunai', 'status' => 'Lunas',
                'items' => [
                    ['barang_id' => 'BRG-003', 'qty' => 8, 'harga' => 297000],
                    ['barang_id' => 'BRG-005', 'qty' => 16, 'harga' => 109000],
                ],
            ],
            [
                'id' => 'PJL-0901', 'pelanggan_id' => 'PLG-0064', 'tanggal' => '2026-06-05', 'metode' => 'Transfer', 'status' => 'Lunas',
                'items' => [
                    ['barang_id' => 'BRG-013', 'qty' => 120, 'harga' => 28500],
                ],
            ],
            [
                'id' => 'PJL-0904', 'pelanggan_id' => 'PLG-0038', 'tanggal' => '2026-06-13', 'metode' => 'Transfer', 'status' => 'Lunas',
                'items' => [
                    ['barang_id' => 'BRG-010', 'qty' => 12, 'harga' => 371000],
                    ['barang_id' => 'BRG-008', 'qty' => 90, 'harga' => 23500],
                ],
            ],
        ];

        foreach ($penjualanData as $row) {
            $items = $row['items'];
            unset($row['items']);
            $penjualan = Penjualan::create($row);

            foreach ($items as $item) {
                PenjualanItem::create(array_merge($item, ['penjualan_id' => $penjualan->id]));
            }
        }

        // === AKTIVITAS ===
        $aktivitasData = [
            ['waktu' => '2026-06-14 09:12:00', 'jenis' => 'Penyewaan', 'ref' => 'SWA-1271', 'keterangan' => 'Agus Prasetyo — 24 unit Pipe Support TS 90 keluar gudang', 'oleh' => 'Dedi (Staff)'],
            ['waktu' => '2026-06-13 15:47:00', 'jenis' => 'Penjualan', 'ref' => 'PJL-0904', 'keterangan' => 'CV Karya Beton Sejahtera — 12 unit Catwalk 180, lunas transfer', 'oleh' => 'Rina (Admin)'],
            ['waktu' => '2026-06-13 11:20:00', 'jenis' => 'Pengembalian', 'ref' => 'SWA-1244', 'keterangan' => 'PT Wijaya Karya — 86 Main Frame 190 kembali, 3 rusak ringan', 'oleh' => 'Dedi (Staff)'],
            ['waktu' => '2026-06-12 16:05:00', 'jenis' => 'Stok', 'ref' => 'BRG-007', 'keterangan' => 'U-Head Jack 60 — 22 unit ditandai perlu pengecekan ulir', 'oleh' => 'Joko (Staff)'],
            ['waktu' => '2026-06-11 10:33:00', 'jenis' => 'Penjualan', 'ref' => 'PJL-0897', 'keterangan' => 'PT Wijaya Karya — 24 Main Frame 190 + aksesori, lunas', 'oleh' => 'Rina (Admin)'],
            ['waktu' => '2026-06-11 08:51:00', 'jenis' => 'Penyewaan', 'ref' => 'SWA-1263', 'keterangan' => 'CV Karya Beton — perpanjangan konfirmasi s/d 21 Juni', 'oleh' => 'Rina (Admin)'],
        ];

        foreach ($aktivitasData as $row) {
            Aktivitas::create($row);
        }
    }
}
