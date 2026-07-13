<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Aktivitas extends Model
{
    protected $table = 'aktivitas';

    protected $fillable = [
        'waktu', 'jenis', 'ref', 'keterangan', 'oleh', 'user_id',
    ];

    protected $casts = [
        'waktu' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
