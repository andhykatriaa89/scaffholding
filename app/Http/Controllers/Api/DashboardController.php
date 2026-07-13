<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aktivitas;
use App\Models\Barang;
use App\Models\Penjualan;
use App\Models\Penyewaan;
use App\Models\Pengembalian;
use App\Services\PenyewaanService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * GET /api/dashboard/summary
     */
    public function summary(): JsonResponse
    {
        // Auto-update status telat
        (new PenyewaanService())->updateStatusTelat();

        $stokMenipis = Barang::stokMenipis()->get()->map(fn ($b) => [
            'id' => $b->id,
            'nama' => $b->nama,
            'stokTersedia' => $b->stok_tersedia,
        ]);

        $today = now()->toDateString();

        $transaksiHariIni = [
            'penyewaan' => Penyewaan::whereDate('created_at', $today)->count(),
            'penjualan' => Penjualan::whereDate('created_at', $today)->count(),
            'pengembalian' => Pengembalian::whereDate('created_at', $today)->count(),
        ];
        $transaksiHariIni['total'] = array_sum($transaksiHariIni);

        $jatuhTempo = Penyewaan::with('items.barang', 'pelanggan')
            ->jatuhTempo()
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'pelanggan' => $s->pelanggan->nama ?? '-',
                'tglMulai' => Carbon::parse($s->tgl_mulai)->format('Y-m-d'),
                'tglSelesai' => Carbon::parse($s->tgl_selesai)->format('Y-m-d'),
                'status' => $s->status,
                'items' => $s->items->map(fn ($i) => [
                    'itemId' => $i->barang_id,
                    'nama' => $i->barang->nama,
                    'qty' => $i->qty,
                    'hargaSewa' => $i->harga_sewa,
                ]),
            ]);

        $telat = Penyewaan::telat()->count();
        $totalStokBarang = Barang::sum('stok_total');
        $totalJenisBarang = Barang::count();

        return response()->json([
            'stokMenipis' => $stokMenipis,
            'transaksiHariIni' => $transaksiHariIni,
            'jatuhTempo' => $jatuhTempo,
            'telatCount' => $telat,
            'totalStokBarang' => $totalStokBarang,
            'totalJenisBarang' => $totalJenisBarang,
        ]);
    }

    /**
     * GET /api/dashboard/grafik-bulanan
     */
    public function grafikBulanan(): JsonResponse
    {
        $year = now()->year;
        $bulanNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        $result = [];

        for ($m = 1; $m <= 12; $m++) {
            // Total sewa bulan ini (estimasi total)
            $sewa = Penyewaan::whereYear('tgl_mulai', $year)
                ->whereMonth('tgl_mulai', $m)
                ->with('items')
                ->get()
                ->sum(fn ($s) => $s->estimasi_total);

            // Total penjualan bulan ini
            $jual = Penjualan::whereYear('tanggal', $year)
                ->whereMonth('tanggal', $m)
                ->with('items')
                ->get()
                ->sum(fn ($t) => $t->subtotal);

            $result[] = [
                'bulan' => $bulanNames[$m - 1],
                'sewa' => round($sewa / 1000000, 1), // dalam jutaan
                'jual' => round($jual / 1000000, 1),
            ];
        }

        return response()->json($result);
    }

    /**
     * GET /api/dashboard/aktivitas-terbaru
     */
    public function aktivitasTerbaru(): JsonResponse
    {
        $aktivitas = Aktivitas::orderByDesc('waktu')
            ->limit(6)
            ->get()
            ->map(fn ($a) => [
                'waktu' => $a->waktu->format('d/m H:i'),
                'jenis' => $a->jenis,
                'ref' => $a->ref,
                'keterangan' => $a->keterangan,
                'oleh' => $a->oleh,
            ]);

        return response()->json($aktivitas);
    }
}
