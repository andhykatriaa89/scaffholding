<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penjualan_items', function (Blueprint $table) {
            $table->id();
            $table->string('penjualan_id', 20);
            $table->string('barang_id', 20);
            $table->unsignedInteger('qty');
            $table->unsignedInteger('harga')->comment('snapshot harga jual saat transaksi');
            $table->timestamps();

            $table->foreign('penjualan_id')->references('id')->on('penjualan')->onDelete('cascade');
            $table->foreign('barang_id')->references('id')->on('barang')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penjualan_items');
    }
};
