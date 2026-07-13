<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penjualan', function (Blueprint $table) {
            $table->string('id', 20)->primary(); // PJL-XXXX
            $table->string('pelanggan_id', 20);
            $table->date('tanggal');
            $table->enum('metode', ['Tunai', 'Transfer', 'Lainnya'])->default('Tunai');
            $table->enum('status', ['Lunas', 'Belum Lunas'])->default('Lunas');
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->foreign('pelanggan_id')->references('id')->on('pelanggan')->onDelete('restrict');
            $table->index('tanggal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penjualan');
    }
};
