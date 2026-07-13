<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    /**
     * GET /api/pelanggan
     */
    public function index(Request $request): JsonResponse
    {
        $query = Pelanggan::query();

        if ($q = $request->get('q')) {
            $query->where(function ($qb) use ($q) {
                $qb->where('nama', 'like', "%{$q}%")
                   ->orWhere('hp', 'like', "%{$q}%")
                   ->orWhere('id', 'like', "%{$q}%");
            });
        }

        if ($jenis = $request->get('jenis')) {
            if ($jenis !== 'Semua') {
                $query->where('jenis', $jenis);
            }
        }

        $pelanggan = $query->orderByDesc('created_at')->get();

        return response()->json($pelanggan->map(fn ($p) => [
            'id' => $p->id,
            'nama' => $p->nama,
            'jenis' => $p->jenis,
            'hp' => $p->hp,
            'alamat' => $p->alamat,
            'jumlahTransaksi' => $p->jumlah_transaksi,
            'terakhir' => $p->terakhir?->format('Y-m-d') ?? '—',
        ]));
    }

    /**
     * POST /api/pelanggan
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:Perusahaan,Perorangan',
            'hp' => 'required|string|max:30',
            'alamat' => 'nullable|string',
        ]);

        $pelanggan = Pelanggan::create([
            'id' => Pelanggan::generateId(),
            'nama' => $data['nama'],
            'jenis' => $data['jenis'],
            'hp' => $data['hp'],
            'alamat' => $data['alamat'] ?? '',
            'jumlah_transaksi' => 0,
        ]);

        return response()->json([
            'id' => $pelanggan->id,
            'nama' => $pelanggan->nama,
            'jenis' => $pelanggan->jenis,
            'hp' => $pelanggan->hp,
            'alamat' => $pelanggan->alamat,
            'jumlahTransaksi' => 0,
            'terakhir' => '—',
        ], 201);
    }

    /**
     * GET /api/pelanggan/{id}
     */
    public function show(string $id): JsonResponse
    {
        $p = Pelanggan::findOrFail($id);

        return response()->json([
            'id' => $p->id,
            'nama' => $p->nama,
            'jenis' => $p->jenis,
            'hp' => $p->hp,
            'alamat' => $p->alamat,
            'jumlahTransaksi' => $p->jumlah_transaksi,
            'terakhir' => $p->terakhir?->format('Y-m-d') ?? '—',
        ]);
    }

    /**
     * PUT /api/pelanggan/{id}
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $pelanggan = Pelanggan::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:Perusahaan,Perorangan',
            'hp' => 'required|string|max:30',
            'alamat' => 'nullable|string',
        ]);

        $pelanggan->update($data);

        return response()->json([
            'id' => $pelanggan->id,
            'nama' => $pelanggan->nama,
            'jenis' => $pelanggan->jenis,
            'hp' => $pelanggan->hp,
            'alamat' => $pelanggan->alamat,
            'jumlahTransaksi' => $pelanggan->jumlah_transaksi,
            'terakhir' => $pelanggan->terakhir?->format('Y-m-d') ?? '—',
        ]);
    }
    /**
     * DELETE /api/pelanggan/{id}
     */
    public function destroy(string $id): JsonResponse
    {
        $pelanggan = Pelanggan::findOrFail($id);
        try {
            $pelanggan->delete();
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Cannot delete customer with active transactions'], 400);
        }
    }
}
