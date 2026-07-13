<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengembalianItem extends Model
{
    protected $table = 'pengembalian_items';

    protected $fillable = [
        'pengembalian_id', 'barang_id', 'qty', 'kondisi',
        'denda_keterlambatan', 'denda_kerusakan',
    ];

    protected $casts = [
        'qty' => 'integer',
        'denda_keterlambatan' => 'integer',
        'denda_kerusakan' => 'integer',
    ];

    public function pengembalian(): BelongsTo
    {
        return $this->belongsTo(Pengembalian::class, 'pengembalian_id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }

    /**
     * Total denda item ini
     */
    public function getTotalDendaAttribute(): int
    {
        return $this->denda_keterlambatan + $this->denda_kerusakan;
    }
}
