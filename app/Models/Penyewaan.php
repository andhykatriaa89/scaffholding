<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Penyewaan extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'penyewaan';

    protected $fillable = [
        'id', 'pelanggan_id', 'tgl_mulai', 'tgl_selesai',
        'status', 'metode',
    ];

    protected $casts = [
        'tgl_mulai' => 'date',
        'tgl_selesai' => 'date',
    ];

    protected $appends = ['durasi'];

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class, 'pelanggan_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PenyewaanItem::class, 'penyewaan_id');
    }

    public function pengembalian(): HasOne
    {
        return $this->hasOne(Pengembalian::class, 'penyewaan_id');
    }

    /**
     * Durasi sewa dalam hari
     */
    public function getDurasiAttribute(): int
    {
        return max(0, $this->tgl_mulai->diffInDays($this->tgl_selesai));
    }

    /**
     * Scope: kontrak aktif (belum selesai)
     */
    public function scopeAktif($query)
    {
        return $query->whereIn('status', ['Aktif', 'Telat']);
    }

    /**
     * Scope: jatuh tempo dalam 7 hari atau sudah lewat
     */
    public function scopeJatuhTempo($query)
    {
        return $query->where('status', '!=', 'Selesai')
            ->where('tgl_selesai', '<=', Carbon::now()->addDays(7));
    }

    /**
     * Scope: status telat
     */
    public function scopeTelat($query)
    {
        return $query->where('status', 'Telat');
    }

    /**
     * Estimasi total biaya sewa
     */
    public function getEstimasiTotalAttribute(): int
    {
        $perHari = $this->items->sum(fn ($item) => $item->harga_sewa * $item->qty);
        return $perHari * $this->durasi;
    }

    public static function generateId(): string
    {
        $last = static::orderByRaw("CAST(SUBSTRING(id, 5) AS UNSIGNED) DESC")->first();
        $next = $last ? (int) substr($last->id, 4) + 1 : 1;
        return 'SWA-' . str_pad($next, 4, '0', STR_PAD_LEFT);
    }
}
