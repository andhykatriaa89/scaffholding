<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\Penjualan;
use App\Models\Penyewaan;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    /**
     * GET /api/laporan/penjualan
     */
    public function penjualan(Request $request): JsonResponse
    {
        $query = Penjualan::with('items.barang', 'pelanggan');

        if ($dari = $request->get('dari')) {
            $query->where('tanggal', '>=', $dari);
        }
        if ($sampai = $request->get('sampai')) {
            $query->where('tanggal', '<=', $sampai);
        }

        $perPage = $request->get('per_page', 6);
        $paginated = $query->orderByDesc('tanggal')->paginate($perPage);

        $rows = collect($paginated->items())->map(fn ($t) => [
            'id' => $t->id,
            'tanggal' => Carbon::parse($t->tanggal)->format('Y-m-d'),
            'pelanggan' => $t->pelanggan->nama ?? '-',
            'detail' => $t->items->count() . ' jenis · ' . $t->items->sum('qty') . ' unit',
            'nilai' => $t->subtotal,
            'status' => $t->status,
            'metode' => $t->metode,
        ]);

        return response()->json([
            'data' => $rows,
            'total' => $paginated->total(),
            'per_page' => $paginated->perPage(),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }

    /**
     * GET /api/laporan/penyewaan
     */
    public function penyewaan(Request $request): JsonResponse
    {
        $query = Penyewaan::with('items.barang', 'pelanggan');

        if ($dari = $request->get('dari')) {
            $query->where('tgl_mulai', '>=', $dari);
        }
        if ($sampai = $request->get('sampai')) {
            $query->where('tgl_mulai', '<=', $sampai);
        }

        $perPage = $request->get('per_page', 6);
        $paginated = $query->orderByDesc('tgl_mulai')->paginate($perPage);

        $rows = collect($paginated->items())->map(fn ($t) => [
            'id' => $t->id,
            'tanggal' => Carbon::parse($t->tgl_mulai)->format('Y-m-d'),
            'pelanggan' => $t->pelanggan->nama ?? '-',
            'detail' => $t->items->count() . ' jenis · s/d ' . Carbon::parse($t->tgl_selesai)->format('Y-m-d'),
            'nilai' => $t->estimasi_total,
            'status' => $t->status,
            'metode' => $t->metode,
        ]);

        return response()->json([
            'data' => $rows,
            'total' => $paginated->total(),
            'per_page' => $paginated->perPage(),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }

    /**
     * GET /api/laporan/stok
     */
    public function stok(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 6);
        $paginated = Barang::orderBy('id')->paginate($perPage);

        $rows = collect($paginated->items())->map(fn ($b) => [
            'id' => $b->id,
            'tanggal' => '—',
            'pelanggan' => $b->nama,
            'detail' => "Total {$b->stok_total} · disewa {$b->stok_disewa} · tersedia {$b->stok_tersedia}",
            'nilai' => $b->stok_tersedia * $b->harga_jual,
            'status' => $b->stok_tersedia < $b->min_stok ? 'Menipis' : 'Cukup',
            'metode' => $b->kategori,
        ]);

        return response()->json([
            'data' => $rows,
            'total' => $paginated->total(),
            'per_page' => $paginated->perPage(),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }
}
