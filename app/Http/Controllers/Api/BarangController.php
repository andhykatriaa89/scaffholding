<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    /**
     * GET /api/barang
     */
    public function index(Request $request): JsonResponse
    {
        $query = Barang::query();

        if ($q = $request->get('q')) {
            $query->where(function ($qb) use ($q) {
                $qb->where('nama', 'like', "%{$q}%")
                   ->orWhere('id', 'like', "%{$q}%");
            });
        }

        if ($kategori = $request->get('kategori')) {
            if ($kategori !== 'Semua') {
                $query->kategori($kategori);
            }
        }

        $barang = $query->orderBy('id')->get();

        return response()->json($barang->map(fn (Barang $b) => $this->formatBarang($b)));
    }

    /**
     * POST /api/barang
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:barang,id',
            'nama' => 'required|string',
            'keterangan' => 'nullable|string',
            'kategori' => 'required|string',
            'harga_jual' => 'required|numeric',
            'harga_sewa' => 'required|numeric',
            'stok_total' => 'required|integer',
            'min_stok' => 'required|integer',
            'kondisi' => 'nullable|string|in:Baik,Perlu Pengecekan',
        ]);

        $b = Barang::create([
            'id' => $validated['id'],
            'nama' => $validated['nama'],
            'keterangan' => $validated['keterangan'] ?? $validated['nama'],
            'kategori' => $validated['kategori'],
            'harga_jual' => $validated['harga_jual'],
            'harga_sewa' => $validated['harga_sewa'],
            'stok_total' => $validated['stok_total'],
            'min_stok' => $validated['min_stok'],
            'stok_disewa' => 0,
            'stok_rusak' => 0,
            'kondisi' => $validated['kondisi'] ?? 'Baik',
        ]);

        return response()->json($this->formatBarang($b), 201);
    }

    /**
     * GET /api/barang/{id}
     */
    public function show(string $id): JsonResponse
    {
        $b = Barang::findOrFail($id);
        return response()->json($this->formatBarang($b));
    }

    /**
     * GET /api/barang/stok-menipis
     */
    public function stokMenipis(): JsonResponse
    {
        $barang = Barang::stokMenipis()->get();
        return response()->json($barang->map(fn ($b) => $this->formatBarang($b)));
    }

    /**
     * PUT /api/barang/{id}
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $b = Barang::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'sometimes|string',
            'keterangan' => 'sometimes|nullable|string',
            'kategori' => 'sometimes|string',
            'harga_jual' => 'sometimes|numeric',
            'harga_sewa' => 'sometimes|numeric',
            'stok_total' => 'sometimes|integer',
            'min_stok' => 'sometimes|integer',
            'kondisi' => 'sometimes|string|in:Baik,Perlu Pengecekan',
        ]);

        $b->update($validated);

        return response()->json($this->formatBarang($b));
    }

    /**
     * DELETE /api/barang/{id}
     */
    public function destroy(string $id): JsonResponse
    {
        $b = Barang::findOrFail($id);

        if ($b->stok_disewa > 0) {
            return response()->json([
                'message' => 'Barang tidak dapat dihapus karena sebagian stok masih dalam status sedang disewa.'
            ], 422);
        }

        try {
            $b->delete();
            return response()->json(['message' => 'Barang berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Barang tidak dapat dihapus karena sudah terhubung dengan riwayat transaksi penyewaan atau penjualan.'
            ], 422);
        }
    }

    /**
     * Format barang sesuai frontend mock data structure
     *
     * @param  \App\Models\Barang  $b
     */
    private function formatBarang($b): array
    {
        return [
            'id' => $b->id,
            'nama' => $b->nama,
            'keterangan' => $b->keterangan ?? $b->nama,
            'kategori' => $b->kategori,
            'hargaJual' => $b->harga_jual,
            'hargaSewa' => $b->harga_sewa,
            'stokTotal' => $b->stok_total,
            'stokDisewa' => $b->stok_disewa,
            'stokRusak' => $b->stok_rusak,
            'minStok' => $b->min_stok,
            'kondisi' => $b->kondisi,
        ];
    }
}
