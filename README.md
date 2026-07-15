# 🏗️ Sistem Informasi Penyewaan & Penjualan Scaffolding

Sistem ini adalah aplikasi internal yang dikembangkan untuk manajemen operasional penyewaan dan penjualan scaffolding di **PT Sucoot Scaform Indonesia**.

📍 **Lokasi Gudang:** Gerbang Biru, Jl. Marunda Makmur No.86, Sagara Makmur, Tarumajaya, Bekasi Regency, West Java 17211

## 🌟 Fitur Utama

- **Dashboard & KPI:** Ringkasan statistik data penyewaan, penjualan, dan metrik bisnis.
- **Manajemen Barang & Stok:** Pencatatan ketersediaan stok scaffolding secara real-time.
- **Manajemen Pelanggan:** Database pelanggan (penyewa maupun pembeli).
- **Transaksi Penyewaan:** Pembuatan kontrak penyewaan scaffolding.
- **Transaksi Penjualan:** Pencatatan transaksi penjualan scaffolding.
- **Pengembalian Barang:** Proses pencatatan pengembalian scaffolding dari penyewa.
- **Laporan (Reporting):** Laporan mendetail untuk riwayat penjualan, penyewaan, dan pergerakan stok.

## 🛠️ Teknologi yang Digunakan (Tech Stack)

- **Backend:** Laravel (PHP) + MySQL + Laravel Sanctum (untuk autentikasi)
- **Frontend:** React 19 + TailwindCSS 3 + Radix UI + Recharts
- **Arsitektur:** Aplikasi Single Page Application (SPA) React yang hasil build-nya disajikan langsung (served) oleh server backend Laravel.

---

## 🚀 Cara Instalasi

Berikut adalah langkah-langkah untuk menjalankan aplikasi ini secara lokal. Pastikan komputer Anda telah terinstal **PHP**, **Composer**, **Node.js (npm)**, dan **MySQL**.

### 1. Setup Backend (Laravel)

1. **Install dependensi PHP:**
   ```bash
   composer install
   ```
2. **Konfigurasi Environment:**
   Duplikat file `.env.example` menjadi `.env`.
   ```bash
   cp .env.example .env
   ```
   Buka file `.env` dan atur konfigurasi koneksi database MySQL Anda:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nama_database_anda
   DB_USERNAME=root
   DB_PASSWORD=
   ```
3. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```
4. **Migrasi dan Seeding Database:**
   Perintah ini akan membuat struktur tabel di database dan mengisi data awal (dummy).
   ```bash
   php artisan migrate --seed
   ```

### 2. Setup Frontend (React)

1. **Masuk ke direktori frontend dan install dependensi npm:**
   ```bash
   cd frontend
   npm install
   ```
2. **Build frontend:**
   ```bash
   npm run build
   ```
   _(Catatan: Script build ini telah dikonfigurasi untuk secara otomatis meng-compile React dan menyalin hasilnya ke folder `public/app/` pada Laravel)._

### 3. Menjalankan Aplikasi

1. **Kembali ke folder utama project (root directory):**
   ```bash
   cd ..
   ```
2. **Jalankan local development server Laravel:**
   ```bash
   php artisan serve
   ```
3. **Buka Aplikasi di Browser:**
   Kunjungi URL berikut:
   👉 **http://localhost:8000/login**

### 🔑 Kredensial Login Default (Hasil Seeder)

- **Admin:** Username: `admin` | Password: `admin123` (atau sesuai konfigurasi seeder Anda)
- **Staff:** Username: `staff` | Password: `staff123`

---

## 💻 Mode Development

Jika Anda ingin mengubah kode React (frontend) dan melihat perubahan secara _real-time_ (hot-reload), buka dua terminal:

**Terminal 1 (Backend Laravel):**

```bash
php artisan serve
```

**Terminal 2 (Frontend React):**

```bash
cd frontend
npm start
```

_Gunakan `http://localhost:3000` di browser saat mode development agar React me-refresh otomatis setiap kali file
disimpan._
