# 🏗️ Sistem Informasi Penyewaan & Penjualan Scaffolding

**PT Sucoot Scaform Indonesia** — Gudang Narogong, Bekasi

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.5) + MySQL + Sanctum
- **Frontend:** React 19 + TailwindCSS 3 + Radix UI + Recharts
- **Architecture:** SPA (React) served by Laravel, API under `/api/*`

## Quick Setup

```bash
# 1. Install PHP dependencies
composer install

# 2. Copy environment & generate key
cp .env.example .env
php artisan key:generate

# 3. Setup MySQL database
# Edit .env → DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan migrate --seed

# 4. Build frontend
cd frontend
yarn install
BUILD_PATH=../public/app yarn build
cd ..

# 5. Run server
php artisan serve
```

Buka http://localhost:8000 → Login: `admin / admin123` atau `staff / staff123`

## Development Mode

```bash
# Terminal 1: Laravel API
php artisan serve

# Terminal 2: React dev server (hot reload)
cd frontend && yarn start
```

## API Endpoints

| Endpoint | Deskripsi |
|----------|-----------|
| `POST /api/auth/login` | Login |
| `GET /api/dashboard/summary` | KPI Dashboard |
| `GET /api/pelanggan` | List pelanggan |
| `GET /api/barang` | List barang & stok |
| `POST /api/penyewaan` | Buat kontrak sewa |
| `POST /api/penjualan` | Catat penjualan |
| `POST /api/pengembalian` | Proses pengembalian |
| `GET /api/laporan/*` | Laporan (penjualan/penyewaan/stok) |

Lihat semua routes: `php artisan route:list --path=api`

## Project Structure

```
├── app/
│   ├── Http/Controllers/Api/    # API Controllers
│   ├── Models/                  # Eloquent Models
│   └── Services/                # Business Logic
├── database/
│   ├── migrations/              # Database schema
│   └── seeders/                 # Sample data
├── frontend/                    # React SPA (jangan diubah)
│   └── src/
├── routes/
│   ├── api.php                  # API routes
│   └── web.php                  # SPA catch-all
└── public/app/                  # React build output (gitignored)
```
