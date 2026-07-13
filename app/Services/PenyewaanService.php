<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\Penyewaan;
use App\Models\PenyewaanItem;
use App\Models\Aktivitas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PenyewaanService
{
    /**
     * Buat kontrak sewa baru
     */
    public function createKontrak(array $data): Penyewaan
    {
        return DB::transaction(function () use ($data) {
            $penyewaan = Penyewaan::create([
                'id' => Penyewaan::generateId(),
                'pelanggan_id' => $data['pelanggan_id'],
                'tgl_mulai' => $data['tgl_mulai'],
                'tgl_selesai' => $data['tgl_selesai'],
                'status' => 'Aktif',
                'metode' => $data['metode'] ?? 'Transfer',
            ]);

            foreach ($data['items'] as $item) {
                $barang = Barang::findOrFail($item['barang_id']);

                // Validasi stok
                if ($barang->stok_tersedia < $item['qty']) {
                    throw new \Exception("Stok {$barang->nama} tidak mencukupi. Tersedia: {$barang->stok_tersedia}, diminta: {$item['qty']}");
                }

                // Buat item sewa
                PenyewaanItem::create([
                    'penyewaan_id' => $penyewaan->id,
                    'barang_id' => $item['barang_id'],
                    'qty' => $item['qty'],
                    'harga_sewa' => $barang->harga_sewa, // snapshot harga
                ]);

                // Update stok disewa
                $barang->increment('stok_disewa', $item['qty']);
            }

            // Log aktivitas
            $pelanggan = $penyewaan->pelanggan;
            $totalItems = collect($data['items'])->sum('qty');
            $namaBarang = $penyewaan->items()->with('barang')->get()->first()?->barang->nama ?? '';

            Aktivitas::create([
                'waktu' => now(),
                'jenis' => 'Penyewaan',
                'ref' => $penyewaan->id,
                'keterangan' => "{$pelanggan->nama} — {$totalItems} unit {$namaBarang} keluar gudang",
                'oleh' => Auth::check() ? Auth::user()->name . ' (' . Auth::user()->role . ')' : 'System',
                'user_id' => Auth::id(),
            ]);

            // Update jumlah transaksi pelanggan
            $pelanggan->increment('jumlah_transaksi');
            $pelanggan->update(['terakhir' => now()->toDateString()]);

            return $penyewaan->load('items.barang', 'pelanggan');
        });
    }

    /**
     * Update status telat untuk kontrak yang sudah lewat jatuh tempo
     */
    public function updateStatusTelat(): int
    {
        return Penyewaan::where('status', 'Aktif')
            ->where('tgl_selesai', '<', now()->toDateString())
            ->update(['status' => 'Telat']);
    }
}
