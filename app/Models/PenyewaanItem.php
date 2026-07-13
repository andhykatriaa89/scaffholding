<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenyewaanItem extends Model
{
    protected $table = 'penyewaan_items';

    protected $fillable = [
        'penyewaan_id', 'barang_id', 'qty', 'harga_sewa',
    ];

    protected $casts = [
        'qty' => 'integer',
        'harga_sewa' => 'integer',
    ];

    public function penyewaan(): BelongsTo
    {
        return $this->belongsTo(Penyewaan::class, 'penyewaan_id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }
}
