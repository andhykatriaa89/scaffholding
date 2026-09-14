<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_staff_gudang_can_access_barang_and_pengembalian_routes(): void
    {
        $staff = User::where('role', 'Staff Gudang')->first() ?? User::factory()->create(['role' => 'Staff Gudang']);
        Sanctum::actingAs($staff);

        // Akses barang diperbolehkan
        $resBarang = $this->getJson('/api/barang');
        $resBarang->assertStatus(200);

        // Akses stok menipis diperbolehkan
        $resStokMenipis = $this->getJson('/api/barang/stok-menipis');
        $resStokMenipis->assertStatus(200);

        // Akses penyewaan aktif (untuk proses pengembalian) diperbolehkan
        $resAktif = $this->getJson('/api/penyewaan/aktif');
        $resAktif->assertStatus(200);
    }

    public function test_staff_gudang_cannot_access_restricted_admin_routes(): void
    {
        $staff = User::where('role', 'Staff Gudang')->first() ?? User::factory()->create(['role' => 'Staff Gudang']);
        Sanctum::actingAs($staff);

        // Dashboard diblokir (403)
        $this->getJson('/api/dashboard/summary')->assertStatus(403);
        $this->getJson('/api/dashboard/grafik-bulanan')->assertStatus(403);
        $this->getJson('/api/dashboard/aktivitas-terbaru')->assertStatus(403);

        // Pelanggan diblokir (403)
        $this->getJson('/api/pelanggan')->assertStatus(403);
        $this->postJson('/api/pelanggan', [])->assertStatus(403);

        // Transaksi Penyewaan diblokir (403)
        $this->getJson('/api/penyewaan')->assertStatus(403);
        $this->postJson('/api/penyewaan', [])->assertStatus(403);

        // Transaksi Penjualan diblokir (403)
        $this->getJson('/api/penjualan')->assertStatus(403);
        $this->postJson('/api/penjualan', [])->assertStatus(403);

        // Laporan diblokir (403)
        $this->getJson('/api/laporan/stok')->assertStatus(403);
        $this->getJson('/api/laporan/penjualan')->assertStatus(403);
        $this->getJson('/api/laporan/penyewaan')->assertStatus(403);
    }

    public function test_admin_can_access_all_routes(): void
    {
        $admin = User::where('role', 'Admin')->first() ?? User::factory()->create(['role' => 'Admin']);
        Sanctum::actingAs($admin);

        // Admin bisa akses dashboard
        $this->getJson('/api/dashboard/summary')->assertStatus(200);

        // Admin bisa akses pelanggan
        $this->getJson('/api/pelanggan')->assertStatus(200);

        // Admin bisa akses barang
        $this->getJson('/api/barang')->assertStatus(200);

        // Admin bisa akses penyewaan
        $this->getJson('/api/penyewaan')->assertStatus(200);

        // Admin bisa akses penjualan
        $this->getJson('/api/penjualan')->assertStatus(200);

        // Admin bisa akses laporan
        $this->getJson('/api/laporan/stok')->assertStatus(200);
    }
}
