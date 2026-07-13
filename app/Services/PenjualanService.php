<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\Penjualan;
use App\Models\PenjualanItem;
use App\Models\Aktivitas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PenjualanService
{
    /**
     * Catat penjualan baru
     */
    public function createPenjualan(array $data): Penjualan
    {
        return DB::transaction(function () use ($data) {
            $penjualan = Penjualan::create([
                'id' => Penjualan::generateId(),
                'pelanggan_id' => $data['pelanggan_id'],
                'tanggal' => $data['tanggal'] ?? now()->toDateString(),
                'metode' => $data['metode'] ?? 'Tunai',
                'status' => 'Lunas',
                'catatan' => $data['catatan'] ?? null,
            ]);

            foreach ($data['items'] as $item) {
                $barang = Barang::findOrFail($item['barang_id']);

                // Validasi stok
                if ($barang->stok_tersedia < $item['qty']) {
                    throw new \Exception("Stok {$barang->nama} tidak mencukupi. Tersedia: {$barang->stok_tersedia}, diminta: {$item['qty']}");
                }

                // Buat item penjualan
                PenjualanItem::create([
                    'penjualan_id' => $penjualan->id,
                    'barang_id' => $item['barang_id'],
                    'qty' => $item['qty'],
                    'harga' => $barang->harga_jual, // snapshot harga
                ]);

                // Kurangi stok total (penjualan = barang keluar permanen)
                $barang->decrement('stok_total', $item['qty']);
            }

            // Log aktivitas
            $pelanggan = $penjualan->pelanggan;
            $penjualan->load('items.barang');
            $namaBarang = $penjualan->items->first()?->barang->nama ?? '';
            $totalItems = $penjualan->items->sum('qty');

            Aktivitas::create([
                'waktu' => now(),
                'jenis' => 'Penjualan',
                'ref' => $penjualan->id,
                'keterangan' => "{$pelanggan->nama} — {$totalItems} unit {$namaBarang}, lunas {$penjualan->metode}",
                'oleh' => Auth::check() ? Auth::user()->name . ' (' . Auth::user()->role . ')' : 'System',
                'user_id' => Auth::id(),
            ]);

            // Update jumlah transaksi pelanggan
            $pelanggan->increment('jumlah_transaksi');
            $pelanggan->update(['terakhir' => now()->toDateString()]);

            return $penjualan->load('items.barang', 'pelanggan');
        });
    }
}
