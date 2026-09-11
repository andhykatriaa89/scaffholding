<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Barang extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'barang';

    protected $fillable = [
        'id', 'nama', 'keterangan', 'kategori', 'harga_jual', 'harga_sewa',
        'stok_total', 'stok_disewa', 'stok_rusak', 'min_stok', 'kondisi',
    ];

    protected $casts = [
        'harga_jual' => 'integer',
        'harga_sewa' => 'integer',
        'stok_total' => 'integer',
        'stok_disewa' => 'integer',
        'stok_rusak' => 'integer',
        'min_stok' => 'integer',
    ];

    protected $appends = ['stok_tersedia'];

    /**
     * Stok tersedia = total - disewa - rusak
     */
    public function getStokTersediaAttribute(): int
    {
        return $this->stok_total - $this->stok_disewa - $this->stok_rusak;
    }

    /**
     * Scope: barang dengan stok menipis
     */
    public function scopeStokMenipis($query)
    {
        return $query->whereRaw('(CAST(stok_total AS SIGNED) - CAST(stok_disewa AS SIGNED) - CAST(stok_rusak AS SIGNED)) < CAST(min_stok AS SIGNED)');
    }

    /**
     * Scope: filter by kategori
     */
    public function scopeKategori($query, string $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    public function penyewaanItems(): HasMany
    {
        return $this->hasMany(PenyewaanItem::class, 'barang_id');
    }

    public function penjualanItems(): HasMany
    {
        return $this->hasMany(PenjualanItem::class, 'barang_id');
    }

    /**
     * Kategori initial mapping for UI
     */
    public const KATEGORI_INISIAL = [
        'Frame' => 'FR',
        'Brace' => 'BR',
        'Jack' => 'JK',
        'Aksesori' => 'AK',
        'Platform' => 'PL',
    ];

    public static function generateId(): string
    {
        $last = static::orderByRaw("CAST(SUBSTRING(id, 5) AS UNSIGNED) DESC")->first();
        $next = $last ? (int) substr($last->id, 4) + 1 : 1;
        return 'BRG-' . str_pad($next, 3, '0', STR_PAD_LEFT);
    }
}
