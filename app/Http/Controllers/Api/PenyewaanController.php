<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penyewaan;
use App\Services\PenyewaanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PenyewaanController extends Controller
{
    public function __construct(
        private PenyewaanService $service
    ) {}

    /**
     * GET /api/penyewaan
     */
    public function index(Request $request): JsonResponse
    {
        $query = Penyewaan::with('items.barang', 'pelanggan');

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $data = $query->orderByDesc('created_at')->get();

        return response()->json($data->map(fn ($s) => $this->formatPenyewaan($s)));
    }

    /**
     * POST /api/penyewaan
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'pelanggan_id' => 'required|string|exists:pelanggan,id',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date|after:tgl_mulai',
            'metode' => 'required|in:Tunai,Transfer,Lainnya',
            'items' => 'required|array|min:1',
            'items.*.barang_id' => 'required|string|exists:barang,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        try {
            $penyewaan = $this->service->createKontrak($data);
            return response()->json($this->formatPenyewaan($penyewaan), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * GET /api/penyewaan/{id}
     */
    public function show(string $id): JsonResponse
    {
        $s = Penyewaan::with('items.barang', 'pelanggan')->findOrFail($id);
        return response()->json($this->formatPenyewaan($s));
    }

    /**
     * GET /api/penyewaan/aktif — untuk halaman pengembalian
     */
    public function aktif(Request $request): JsonResponse
    {
        $query = Penyewaan::with('items.barang', 'pelanggan')->aktif();

        if ($q = $request->get('q')) {
            $query->where(function ($qb) use ($q) {
                $qb->where('id', 'like', "%{$q}%")
                   ->orWhereHas('pelanggan', fn ($p) => $p->where('nama', 'like', "%{$q}%"));
            });
        }

        $data = $query->orderByDesc('tgl_mulai')->get();

        return response()->json($data->map(fn ($s) => $this->formatPenyewaan($s)));
    }

    /**
     * GET /api/penyewaan/jatuh-tempo
     */
    public function jatuhTempo(): JsonResponse
    {
        $data = Penyewaan::with('items.barang', 'pelanggan')
            ->jatuhTempo()
            ->orderBy('tgl_selesai')
            ->get();

        return response()->json($data->map(fn ($s) => $this->formatPenyewaan($s)));
    }

    /**
     * Format penyewaan sesuai frontend structure
     */
    private function formatPenyewaan(Penyewaan $s): array
    {
        return [
            'id' => $s->id,
            'pelangganId' => $s->pelanggan_id,
            'pelanggan' => $s->pelanggan->nama,
            'tglMulai' => $s->tgl_mulai->format('Y-m-d'),
            'tglSelesai' => $s->tgl_selesai->format('Y-m-d'),
            'status' => $s->status,
            'metode' => $s->metode,
            'items' => $s->items->map(fn ($i) => [
                'itemId' => $i->barang_id,
                'nama' => $i->barang->nama,
                'qty' => $i->qty,
                'hargaSewa' => $i->harga_sewa,
                'hargaJual' => $i->barang->harga_jual,
            ])->toArray(),
        ];
    }
}
