<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penjualan;
use App\Services\PenjualanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PenjualanController extends Controller
{
    public function __construct(
        private PenjualanService $service
    ) {}

    /**
     * GET /api/penjualan
     */
    public function index(Request $request): JsonResponse
    {
        $query = Penjualan::with('items.barang', 'pelanggan');

        if ($dari = $request->get('dari')) {
            $query->where('tanggal', '>=', $dari);
        }
        if ($sampai = $request->get('sampai')) {
            $query->where('tanggal', '<=', $sampai);
        }

        $data = $query->orderByDesc('tanggal')->get();

        return response()->json($data->map(fn ($t) => $this->formatPenjualan($t)));
    }

    /**
     * POST /api/penjualan
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'pelanggan_id' => 'required|string|exists:pelanggan,id',
            'metode' => 'required|in:Tunai,Transfer,Lainnya',
            'catatan' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.barang_id' => 'required|string|exists:barang,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        try {
            $penjualan = $this->service->createPenjualan($data);
            return response()->json($this->formatPenjualan($penjualan), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * GET /api/penjualan/{id}
     */
    public function show(string $id): JsonResponse
    {
        $t = Penjualan::with('items.barang', 'pelanggan')->findOrFail($id);
        return response()->json($this->formatPenjualan($t));
    }

    /**
     * Format penjualan sesuai frontend structure
     */
    private function formatPenjualan(Penjualan $t): array
    {
        return [
            'id' => $t->id,
            'pelangganId' => $t->pelanggan_id,
            'pelanggan' => $t->pelanggan->nama,
            'tanggal' => $t->tanggal->format('Y-m-d'),
            'metode' => $t->metode,
            'status' => $t->status,
            'items' => $t->items->map(fn ($i) => [
                'itemId' => $i->barang_id,
                'nama' => $i->barang->nama,
                'qty' => $i->qty,
                'harga' => $i->harga,
            ])->toArray(),
        ];
    }
}
