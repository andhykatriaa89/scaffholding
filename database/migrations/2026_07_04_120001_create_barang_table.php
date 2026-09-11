<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->string('id', 20)->primary(); // Kode Barang
            $table->string('nama');
            $table->text('keterangan')->nullable();
            $table->enum('kategori', ['Frame', 'Brace', 'Jack', 'Platform', 'Aksesori']);
            $table->unsignedInteger('harga_jual')->default(0);
            $table->unsignedInteger('harga_sewa')->default(0)->comment('per hari');
            $table->unsignedInteger('stok_total')->default(0);
            $table->unsignedInteger('stok_disewa')->default(0);
            $table->unsignedInteger('stok_rusak')->default(0);
            $table->unsignedInteger('min_stok')->default(0);
            $table->enum('kondisi', ['Baik', 'Perlu Pengecekan'])->default('Baik');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('barang');
    }
};
