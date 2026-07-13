<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengembalian_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pengembalian_id');
            $table->string('barang_id', 20);
            $table->unsignedInteger('qty');
            $table->enum('kondisi', ['Baik', 'Rusak Ringan', 'Rusak Berat', 'Hilang'])->default('Baik');
            $table->unsignedBigInteger('denda_keterlambatan')->default(0);
            $table->unsignedBigInteger('denda_kerusakan')->default(0);
            $table->timestamps();

            $table->foreign('pengembalian_id')->references('id')->on('pengembalian')->onDelete('cascade');
            $table->foreign('barang_id')->references('id')->on('barang')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengembalian_items');
    }
};
