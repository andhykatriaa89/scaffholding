<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\Pengembalian;
use App\Models\PengembalianItem;
use App\Models\Penyewaan;
use App\Models\Aktivitas;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PengembalianService
{
    /**
     * Proses pengembalian barang sewa
     */
    public function prosesKembali(array $data): Pengembalian
    {
        return DB::transaction(function () use ($data) {
            $penyewaan = Penyewaan::with('items.barang')->findOrFail($data['penyewaan_id']);

            if ($penyewaan->status === 'Selesai') {
                throw new \Exception("Kontrak {$penyewaan->id} sudah selesai dikembalikan.");
            }

            $tanggalKembali = $data['tanggal_kembali'] ?? now()->toDateString();
            $hariTelat = max(0, Carbon::parse($penyewaan->tgl_selesai)->diffInDays(Carbon::parse($tanggalKembali), false));

            $pengembalian = Pengembalian::create([
                'penyewaan_id' => $penyewaan->id,
                'tanggal_kembali' => $tanggalKembali,
                'total_denda' => 0,
                'catatan' => $data['catatan'] ?? null,
            ]);

            $totalDenda = 0;

            foreach ($data['items'] as $itemData) {
                $sewaItem = $penyewaan->items->firstWhere('barang_id', $itemData['barang_id']);
                if (!$sewaItem) continue;

                $barang = $sewaItem->barang;
                $kondisi = $itemData['kondisi'] ?? 'Baik';
                $qty = $sewaItem->qty;

                // Hitung denda keterlambatan
                $dendaTelat = $hariTelat > 0 ? ($hariTelat * $sewaItem->harga_sewa * $qty) : 0;

                // Hitung denda kerusakan
                $rate = Pengembalian::DENDA_KERUSAKAN[$kondisi] ?? 0;
                $dendaRusak = (int) round($barang->harga_jual * $rate * $qty);

                PengembalianItem::create([
                    'pengembalian_id' => $pengembalian->id,
                    'barang_id' => $barang->id,
                    'qty' => $qty,
                    'kondisi' => $kondisi,
                    'denda_keterlambatan' => $dendaTelat,
                    'denda_kerusakan' => $dendaRusak,
                ]);

                $totalDenda += $dendaTelat + $dendaRusak;

                // Update stok barang
                $barang->decrement('stok_disewa', $qty);

                // Jika rusak berat atau hilang, tambah stok rusak
                if (in_array($kondisi, ['Rusak Berat', 'Hilang'])) {
                    $barang->increment('stok_rusak', $qty);
                } elseif ($kondisi === 'Rusak Ringan') {
                    // Rusak ringan masih bisa dipakai tapi ditandai perlu pengecekan
                    if ($barang->kondisi === 'Baik') {
                        $barang->update(['kondisi' => 'Perlu Pengecekan']);
                    }
                }
            }

            // Update total denda
            $pengembalian->update(['total_denda' => $totalDenda]);

            // Update status penyewaan
            $penyewaan->update(['status' => 'Selesai']);

            // Log aktivitas
            $totalQty = $penyewaan->items->sum('qty');
            $namaBarang = $penyewaan->items->first()?->barang->nama ?? '';
            $rusakCount = collect($data['items'])->filter(fn ($i) => ($i['kondisi'] ?? 'Baik') !== 'Baik')->count();
            $keterangan = "{$penyewaan->pelanggan->nama} — {$totalQty} {$namaBarang} kembali";
            if ($rusakCount > 0) {
                $keterangan .= ", {$rusakCount} rusak/hilang";
            }

            Aktivitas::create([
                'waktu' => now(),
                'jenis' => 'Pengembalian',
                'ref' => $penyewaan->id,
                'keterangan' => $keterangan,
                'oleh' => Auth::check() ? Auth::user()->name . ' (' . Auth::user()->role . ')' : 'System',
                'user_id' => Auth::id(),
            ]);

            return $pengembalian->load('items.barang', 'penyewaan.pelanggan');
        });
    }
}
