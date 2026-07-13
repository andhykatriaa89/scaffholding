<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aktivitas', function (Blueprint $table) {
            $table->id();
            $table->dateTime('waktu');
            $table->enum('jenis', ['Penyewaan', 'Penjualan', 'Pengembalian', 'Stok']);
            $table->string('ref', 30)->comment('ID transaksi terkait');
            $table->text('keterangan');
            $table->string('oleh');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('waktu');
            $table->index('jenis');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aktivitas');
    }
};
