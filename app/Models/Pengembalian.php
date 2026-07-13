<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pengembalian extends Model
{
    protected $table = 'pengembalian';

    protected $fillable = [
        'penyewaan_id', 'tanggal_kembali', 'total_denda', 'catatan',
    ];

    protected $casts = [
        'tanggal_kembali' => 'date',
        'total_denda' => 'integer',
    ];

    /**
     * Denda rates per kondisi (% dari harga jual)
     */
    public const DENDA_KERUSAKAN = [
        'Baik' => 0,
        'Rusak Ringan' => 0.15,
        'Rusak Berat' => 0.60,
        'Hilang' => 1.00,
    ];

    public function penyewaan(): BelongsTo
    {
        return $this->belongsTo(Penyewaan::class, 'penyewaan_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PengembalianItem::class, 'pengembalian_id');
    }
}
