# PRD — Sistem Informasi Penyewaan & Penjualan Scaffolding (PT Sucoot Scaform Indonesia)

## Problem Statement (asli)
Prototype UI/UX frontend-only (dummy/mock data, tanpa backend logic real) untuk aplikasi internal back-office penyewaan & penjualan scaffolding. Alat kerja harian staff gudang & admin — bukan landing page/SaaS. Referensi visual: ERP gudang padat informasi (Deskera/Odoo) + kerapian Linear/Notion. 7 area data: pelanggan, barang, stok, penyewaan, penjualan, pengembalian sewa, laporan. TANPA payment gateway, TANPA integrasi pihak ketiga.

## Pilihan User
- Login: kredensial dummy tetap (admin/admin123, staff/staff123)
- Export PDF/Excel: dummy (toast saja)
- Thumbnail barang: placeholder abu-abu dengan inisial kategori
- Tidak perlu testing agent

## Design Token (wajib diikuti)
- BG #F7F7F5, teks #1F2420, aksen oranye industrial #D8621B, biru-abu #2E3B4E, hijau muted #3F6B4F, merah bata #B3452F
- Font: Inter (UI) + IBM Plex Mono (semua angka: harga, tanggal, ID, stok) — class `.num`
- Radius 4-6px, tanpa shadow besar/gradient
- Sidebar kiri fixed ikon+label (220px), top bar tipis breadcrumb+search+profil

## Arsitektur
- Frontend-only: React 19 + Tailwind + recharts + lucide-react + sonner. Backend FastAPI template ada tapi TIDAK dipakai (semua data mock di `/app/frontend/src/data/mock.js`).
- Auth mock via localStorage (`ssf_user`), route guard di App.js.
- Struktur: `pages/` (Login, Dashboard, Pelanggan, Barang, Penjualan, Penyewaan, Pengembalian, Laporan), `components/` (AppLayout, StatusBadge, FormTransaksi).

## Sudah Diimplementasi (14 Jun 2026)
1. Login — form sederhana, role Admin & Staff, error handling kredensial
2. Dashboard — 3 kartu ringkas (stok menipis, transaksi hari ini, jatuh tempo), bar chart sewa vs jual per bulan (solid color), tabel aktivitas terbaru, tabel jatuh tempo
3. Pelanggan — tabel + search + filter jenis, slide-over panel kanan tambah/edit (state lokal)
4. Barang & Stok — tabel dengan thumbnail inisial kategori, badge Menipis/Cukup, kondisi
5. Penjualan — form 2 kolom, autocomplete barang, multi-item, ringkasan live + PPN 11%, metode pembayaran (dicatat saja)
6. Penyewaan — + tanggal mulai/selesai, auto-kalkulasi durasi × tarif harian × qty, status Aktif/Selesai/Telat
7. Pengembalian — search kontrak aktif, radio kondisi per item (Baik/Rusak Ringan 15%/Rusak Berat 60%/Hilang 100% harga jual), denda keterlambatan otomatis (hari telat × tarif × qty)
8. Laporan — filter tanggal & jenis (Penjualan/Penyewaan/Stok), pagination 6/halaman, export PDF/Excel dummy (toast)

Semua data-testid terpasang. Bahasa Indonesia natural konteks scaffolding, angka dummy realistis.

## Backlog / P1-P2
- P1: simpan transaksi baru masuk ke daftar laporan (state global), detail transaksi per baris laporan
- P1: cetak nota/surat jalan (dummy print view)
- P2: manajemen user, riwayat per pelanggan, mutasi stok manual
- P2 (jika lanjut production): backend real (FastAPI + MongoDB) untuk semua 7 area data
