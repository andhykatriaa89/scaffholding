<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pelanggan extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'pelanggan';

    protected $fillable = [
        'id', 'nama', 'jenis', 'hp', 'alamat',
        'jumlah_transaksi', 'terakhir',
    ];

    protected $casts = [
        'terakhir' => 'date',
        'jumlah_transaksi' => 'integer',
    ];

    public function penyewaan(): HasMany
    {
        return $this->hasMany(Penyewaan::class, 'pelanggan_id');
    }

    public function penjualan(): HasMany
    {
        return $this->hasMany(Penjualan::class, 'pelanggan_id');
    }

    /**
     * Generate next ID: PLG-XXXX
     */
    public static function generateId(): string
    {
        $last = static::orderByRaw("CAST(SUBSTRING(id, 5) AS UNSIGNED) DESC")->first();
        $next = $last ? (int) substr($last->id, 4) + 1 : 1;
        return 'PLG-' . str_pad($next, 4, '0', STR_PAD_LEFT);
    }
}
