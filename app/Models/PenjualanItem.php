<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenjualanItem extends Model
{
    protected $table = 'penjualan_items';

    protected $fillable = [
        'penjualan_id', 'barang_id', 'qty', 'harga',
    ];

    protected $casts = [
        'qty' => 'integer',
        'harga' => 'integer',
    ];

    public function penjualan(): BelongsTo
    {
        return $this->belongsTo(Penjualan::class, 'penjualan_id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }
}
