<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengembalian;
use App\Services\PengembalianService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PengembalianController extends Controller
{
    public function __construct(
        private PengembalianService $service
    ) {}

    /**
     * POST /api/pengembalian
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'penyewaan_id' => 'required|string|exists:penyewaan,id',
            'tanggal_kembali' => 'nullable|date',
            'catatan' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.barang_id' => 'required|string|exists:barang,id',
            'items.*.kondisi' => 'required|in:Baik,Rusak Ringan,Rusak Berat,Hilang',
        ]);

        try {
            $pengembalian = $this->service->prosesKembali($data);

            return response()->json([
                'id' => $pengembalian->id,
                'penyewaan_id' => $pengembalian->penyewaan_id,
                'tanggal_kembali' => $pengembalian->tanggal_kembali->format('Y-m-d'),
                'total_denda' => $pengembalian->total_denda,
                'items' => $pengembalian->items->map(fn ($i) => [
                    'barang_id' => $i->barang_id,
                    'nama' => $i->barang->nama,
                    'qty' => $i->qty,
                    'kondisi' => $i->kondisi,
                    'denda_keterlambatan' => $i->denda_keterlambatan,
                    'denda_kerusakan' => $i->denda_kerusakan,
                ]),
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * GET /api/pengembalian/{id}
     */
    public function show(int $id): JsonResponse
    {
        $p = Pengembalian::with('items.barang', 'penyewaan.pelanggan')->findOrFail($id);

        return response()->json([
            'id' => $p->id,
            'penyewaan_id' => $p->penyewaan_id,
            'tanggal_kembali' => $p->tanggal_kembali->format('Y-m-d'),
            'total_denda' => $p->total_denda,
            'pelanggan' => $p->penyewaan->pelanggan->nama,
            'items' => $p->items->map(fn ($i) => [
                'barang_id' => $i->barang_id,
                'nama' => $i->barang->nama,
                'qty' => $i->qty,
                'kondisi' => $i->kondisi,
                'denda_keterlambatan' => $i->denda_keterlambatan,
                'denda_kerusakan' => $i->denda_kerusakan,
            ]),
        ]);
    }
}
