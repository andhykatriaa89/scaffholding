<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penjualan extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'penjualan';

    protected $fillable = [
        'id', 'pelanggan_id', 'tanggal', 'metode', 'status', 'catatan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class, 'pelanggan_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PenjualanItem::class, 'penjualan_id');
    }

    /**
     * Subtotal (tanpa PPN)
     */
    public function getSubtotalAttribute(): int
    {
        return $this->items->sum(fn ($item) => $item->harga * $item->qty);
    }

    /**
     * PPN 11%
     */
    public function getPpnAttribute(): int
    {
        return (int) round($this->subtotal * 0.11);
    }

    /**
     * Total (subtotal + PPN)
     */
    public function getTotalAttribute(): int
    {
        return $this->subtotal + $this->ppn;
    }

    public static function generateId(): string
    {
        $last = static::orderByRaw("CAST(SUBSTRING(id, 5) AS UNSIGNED) DESC")->first();
        $next = $last ? (int) substr($last->id, 4) + 1 : 1;
        return 'PJL-' . str_pad($next, 4, '0', STR_PAD_LEFT);
    }
}
