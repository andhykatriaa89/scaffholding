<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penyewaan_items', function (Blueprint $table) {
            $table->id();
            $table->string('penyewaan_id', 20);
            $table->string('barang_id', 20);
            $table->unsignedInteger('qty');
            $table->unsignedInteger('harga_sewa')->comment('snapshot harga saat transaksi');
            $table->timestamps();

            $table->foreign('penyewaan_id')->references('id')->on('penyewaan')->onDelete('cascade');
            $table->foreign('barang_id')->references('id')->on('barang')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penyewaan_items');
    }
};
