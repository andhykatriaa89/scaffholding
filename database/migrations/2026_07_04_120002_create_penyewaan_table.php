<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penyewaan', function (Blueprint $table) {
            $table->string('id', 20)->primary(); // SWA-XXXX
            $table->string('pelanggan_id', 20);
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->enum('status', ['Aktif', 'Selesai', 'Telat'])->default('Aktif');
            $table->enum('metode', ['Tunai', 'Transfer', 'Lainnya'])->default('Transfer');
            $table->timestamps();

            $table->foreign('pelanggan_id')->references('id')->on('pelanggan')->onDelete('restrict');
            $table->index('status');
            $table->index('tgl_selesai');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penyewaan');
    }
};
