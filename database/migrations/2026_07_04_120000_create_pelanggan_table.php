<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelanggan', function (Blueprint $table) {
            $table->string('id', 20)->primary(); // PLG-XXXX
            $table->string('nama');
            $table->enum('jenis', ['Perusahaan', 'Perorangan'])->default('Perusahaan');
            $table->string('hp', 30);
            $table->text('alamat')->nullable();
            $table->unsignedInteger('jumlah_transaksi')->default(0);
            $table->date('terakhir')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pelanggan');
    }
};
