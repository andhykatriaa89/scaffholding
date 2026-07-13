<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengembalian', function (Blueprint $table) {
            $table->id();
            $table->string('penyewaan_id', 20)->unique();
            $table->date('tanggal_kembali');
            $table->unsignedBigInteger('total_denda')->default(0);
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->foreign('penyewaan_id')->references('id')->on('penyewaan')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengembalian');
    }
};
