<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BarangController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LaporanController;
use App\Http\Controllers\Api\PelangganController;
use App\Http\Controllers\Api\PengembalianController;
use App\Http\Controllers\Api\PenjualanController;
use App\Http\Controllers\Api\PenyewaanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Sistem Scaffolding PT Sucoot Scaform
|--------------------------------------------------------------------------
*/

// Auth (public)
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
    Route::get('/dashboard/grafik-bulanan', [DashboardController::class, 'grafikBulanan']);
    Route::get('/dashboard/aktivitas-terbaru', [DashboardController::class, 'aktivitasTerbaru']);

    // Pelanggan
    Route::get('/pelanggan', [PelangganController::class, 'index']);
    Route::post('/pelanggan', [PelangganController::class, 'store']);
    Route::get('/pelanggan/{id}', [PelangganController::class, 'show']);
    Route::put('/pelanggan/{id}', [PelangganController::class, 'update']);
    Route::delete('/pelanggan/{id}', [PelangganController::class, 'destroy']);

    // Barang
    Route::get('/barang', [BarangController::class, 'index']);
    Route::post('/barang', [BarangController::class, 'store']);
    Route::get('/barang/stok-menipis', [BarangController::class, 'stokMenipis']);
    Route::get('/barang/{id}', [BarangController::class, 'show']);
    Route::put('/barang/{id}', [BarangController::class, 'update']);
    Route::delete('/barang/{id}', [BarangController::class, 'destroy']);

    // Penyewaan
    Route::get('/penyewaan', [PenyewaanController::class, 'index']);
    Route::get('/penyewaan/aktif', [PenyewaanController::class, 'aktif']);
    Route::get('/penyewaan/jatuh-tempo', [PenyewaanController::class, 'jatuhTempo']);
    Route::post('/penyewaan', [PenyewaanController::class, 'store']);
    Route::get('/penyewaan/{id}', [PenyewaanController::class, 'show']);

    // Penjualan
    Route::get('/penjualan', [PenjualanController::class, 'index']);
    Route::post('/penjualan', [PenjualanController::class, 'store']);
    Route::get('/penjualan/{id}', [PenjualanController::class, 'show']);

    // Pengembalian
    Route::post('/pengembalian', [PengembalianController::class, 'store']);
    Route::get('/pengembalian/{id}', [PengembalianController::class, 'show']);

    // Laporan
    Route::get('/laporan/penjualan', [LaporanController::class, 'penjualan']);
    Route::get('/laporan/penyewaan', [LaporanController::class, 'penyewaan']);
    Route::get('/laporan/stok', [LaporanController::class, 'stok']);
});
