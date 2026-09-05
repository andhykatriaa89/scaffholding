/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.5-MariaDB, for Linux (aarch64)
--
-- Host: localhost    Database: scaffolding
-- ------------------------------------------------------
-- Server version	11.8.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `scaffolding`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `scaffolding` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `scaffolding`;

--
-- Table structure for table `aktivitas`
--

DROP TABLE IF EXISTS `aktivitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `aktivitas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `waktu` datetime NOT NULL,
  `jenis` enum('Penyewaan','Penjualan','Pengembalian','Stok') NOT NULL,
  `ref` varchar(30) NOT NULL COMMENT 'ID transaksi terkait',
  `keterangan` text NOT NULL,
  `oleh` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aktivitas_user_id_foreign` (`user_id`),
  KEY `aktivitas_waktu_index` (`waktu`),
  KEY `aktivitas_jenis_index` (`jenis`),
  CONSTRAINT `aktivitas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivitas`
--

LOCK TABLES `aktivitas` WRITE;
/*!40000 ALTER TABLE `aktivitas` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `aktivitas` VALUES
(1,'2026-06-14 09:12:00','Penyewaan','SWA-1271','Agus Prasetyo — 24 unit Pipe Support TS 90 keluar gudang','Dedi (Staff)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(2,'2026-06-13 15:47:00','Penjualan','PJL-0904','CV Karya Beton Sejahtera — 12 unit Catwalk 180, lunas transfer','Rina (Admin)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(3,'2026-06-13 11:20:00','Pengembalian','SWA-1244','PT Wijaya Karya — 86 Main Frame 190 kembali, 3 rusak ringan','Dedi (Staff)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(4,'2026-06-12 16:05:00','Stok','BRG-007','U-Head Jack 60 — 22 unit ditandai perlu pengecekan ulir','Joko (Staff)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(5,'2026-06-11 10:33:00','Penjualan','PJL-0897','PT Wijaya Karya — 24 Main Frame 190 + aksesori, lunas','Rina (Admin)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(6,'2026-06-11 08:51:00','Penyewaan','SWA-1263','CV Karya Beton — perpanjangan konfirmasi s/d 21 Juni','Rina (Admin)',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(7,'2026-07-13 16:21:47','Pengembalian','SWA-1247','PT Adhi Persada Gedung — 456 Main Frame 190 kembali','Admin (Admin)',1,'2026-07-13 16:21:47','2026-07-13 16:21:47'),
(8,'2026-07-13 16:55:06','Pengembalian','SWA-1198','CV Mitra Konstruksi Utama — 168 Ladder Frame 90 kembali, 3 rusak/hilang','Admin (Admin)',1,'2026-07-13 16:55:06','2026-07-13 16:55:06'),
(9,'2026-07-13 16:57:35','Pengembalian','SWA-1271','Agus Prasetyo — 72 Pipe Support TS 90 kembali, 2 rusak/hilang','Admin (Admin)',1,'2026-07-13 16:57:35','2026-07-13 16:57:35'),
(10,'2026-08-18 04:32:10','Pengembalian','SWA-1266','PT Nusa Raya Cipta — 218 Stair / Tangga Scaffolding kembali','Admin (Admin)',1,'2026-08-18 04:32:10','2026-08-18 04:32:10');
/*!40000 ALTER TABLE `aktivitas` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `barang`
--

DROP TABLE IF EXISTS `barang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `barang` (
  `id` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kategori` enum('Frame','Brace','Jack','Platform','Aksesori') NOT NULL,
  `harga_jual` int(10) unsigned NOT NULL DEFAULT 0,
  `harga_sewa` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'per hari',
  `stok_total` int(10) unsigned NOT NULL DEFAULT 0,
  `stok_disewa` int(10) unsigned NOT NULL DEFAULT 0,
  `stok_rusak` int(10) unsigned NOT NULL DEFAULT 0,
  `min_stok` int(10) unsigned NOT NULL DEFAULT 0,
  `kondisi` enum('Baik','Perlu Pengecekan') NOT NULL DEFAULT 'Baik',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barang`
--

LOCK TABLES `barang` WRITE;
/*!40000 ALTER TABLE `barang` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `barang` VALUES
('BRG-001','Main Frame 190','Frame',412000,3800,486,192,14,60,'Baik','2026-07-04 12:10:19','2026-07-13 16:21:47'),
('BRG-002','Main Frame 170','Frame',386000,3500,342,261,9,50,'Baik','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('BRG-003','Ladder Frame 90','Frame',297000,2700,188,100,6,40,'Perlu Pengecekan','2026-07-04 12:10:19','2026-07-13 16:55:06'),
('BRG-004','Cross Brace 220','Brace',118000,1100,964,377,28,120,'Baik','2026-07-04 12:10:19','2026-07-13 16:21:47'),
('BRG-005','Cross Brace 193','Brace',109000,1000,712,688,11,100,'Perlu Pengecekan','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('BRG-006','Jack Base 60','Jack',147000,1400,538,306,17,80,'Baik','2026-07-04 12:10:19','2026-07-13 16:21:47'),
('BRG-007','U-Head Jack 60','Jack',156000,1500,419,346,64,80,'Perlu Pengecekan','2026-07-04 12:10:19','2026-07-13 16:55:06'),
('BRG-008','Joint Pin','Aksesori',23500,250,2140,1152,168,300,'Baik','2026-07-04 12:10:19','2026-07-13 16:55:06'),
('BRG-009','Catwalk 225 (Metal Plank)','Platform',428000,4200,276,259,8,40,'Baik','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('BRG-010','Catwalk 180','Platform',371000,3600,154,96,5,30,'Baik','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('BRG-011','Pipe Support TS 90','Jack',318000,3100,226,124,12,40,'Perlu Pengecekan','2026-07-04 12:10:19','2026-07-13 16:57:35'),
('BRG-012','Swivel Clamp 48mm','Aksesori',31500,350,1470,855,105,250,'Baik','2026-07-04 12:10:19','2026-07-13 16:57:35'),
('BRG-013','Fixed Clamp 48mm','Aksesori',28500,300,1682,1384,43,250,'Perlu Pengecekan','2026-07-04 12:10:19','2026-08-18 04:32:10'),
('BRG-014','Stair / Tangga Scaffolding','Platform',693000,6500,64,33,2,12,'Baik','2026-07-04 12:10:19','2026-08-18 04:32:10');
/*!40000 ALTER TABLE `barang` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2026_07_04_115450_create_personal_access_tokens_table',1),
(5,'2026_07_04_120000_create_pelanggan_table',1),
(6,'2026_07_04_120001_create_barang_table',1),
(7,'2026_07_04_120002_create_penyewaan_table',1),
(8,'2026_07_04_120003_create_penyewaan_items_table',1),
(9,'2026_07_04_120004_create_penjualan_table',1),
(10,'2026_07_04_120005_create_penjualan_items_table',1),
(11,'2026_07_04_120006_create_pengembalian_table',1),
(12,'2026_07_04_120007_create_pengembalian_items_table',1),
(13,'2026_07_04_120008_create_aktivitas_table',1),
(14,'2026_07_04_120009_add_role_to_users_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `pelanggan`
--

DROP TABLE IF EXISTS `pelanggan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelanggan` (
  `id` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` enum('Perusahaan','Perorangan') NOT NULL DEFAULT 'Perusahaan',
  `hp` varchar(30) NOT NULL,
  `alamat` text DEFAULT NULL,
  `jumlah_transaksi` int(10) unsigned NOT NULL DEFAULT 0,
  `terakhir` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelanggan`
--

LOCK TABLES `pelanggan` WRITE;
/*!40000 ALTER TABLE `pelanggan` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `pelanggan` VALUES
('PLG-0019','PT Adhi Persada Gedung','Perusahaan','021-7918-3358','Jl. TB Simatupang No. 58, Pasar Rebo, Jakarta Timur',31,'2026-06-13','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0031','PT Totalindo Eka Persada','Perusahaan','021-7883-9214','Jl. Tebet Raya No. 14A, Jakarta Selatan',14,'2026-04-18','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0038','CV Karya Beton Sejahtera','Perusahaan','0812-9034-7761','Jl. Raya Narogong KM 12, Bantargebang, Bekasi',17,'2026-06-09','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0041','PT Wijaya Karya Bangunan Gedung','Perusahaan','021-8092-4417','Jl. D.I. Panjaitan Kav. 9, Cipinang, Jakarta Timur',23,'2026-06-11','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0047','CV Mitra Konstruksi Utama','Perusahaan','0811-8273-664','Ruko Grand Galaxy Blok RGA No. 21, Bekasi Selatan',11,'2026-06-02','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0053','PT Nusa Raya Cipta','Perusahaan','021-5290-0715','Gedung Graha Cipta Lt. 2, Jl. D.I. Panjaitan, Jakarta',8,'2026-05-30','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0056','Budi Santoso','Perorangan','0813-8845-2210','Jl. Kemang Timur No. 47, Jakarta Selatan',4,'2026-06-08','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0059','Agus Prasetyo','Perorangan','0821-4471-9083','Perum Villa Nusa Indah 2 Blok S4/17, Gunung Putri',6,'2026-06-12','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0062','H. Muhammad Ramli','Perorangan','0857-1929-8834','Jl. Raya Parung No. 132, Bogor',2,'2026-05-27','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PLG-0064','Siti Nurhaliza Kontraktor','Perorangan','0838-7126-5540','Jl. H. Mencong No. 88, Ciledug, Tangerang',1,'2026-06-05','2026-07-04 12:10:19','2026-07-04 12:10:19');
/*!40000 ALTER TABLE `pelanggan` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `pengembalian`
--

DROP TABLE IF EXISTS `pengembalian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengembalian` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `penyewaan_id` varchar(20) NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `total_denda` bigint(20) unsigned NOT NULL DEFAULT 0,
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pengembalian_penyewaan_id_unique` (`penyewaan_id`),
  CONSTRAINT `pengembalian_penyewaan_id_foreign` FOREIGN KEY (`penyewaan_id`) REFERENCES `penyewaan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengembalian`
--

LOCK TABLES `pengembalian` WRITE;
/*!40000 ALTER TABLE `pengembalian` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `pengembalian` VALUES
(1,'SWA-1247','2026-07-13',7689600,NULL,'2026-07-13 16:21:47','2026-07-13 16:21:47'),
(2,'SWA-1198','2026-07-13',14487900,NULL,'2026-07-13 16:55:06','2026-07-13 16:55:06'),
(3,'SWA-1271','2026-07-13',4605600,NULL,'2026-07-13 16:57:35','2026-07-13 16:57:35'),
(4,'SWA-1266','2026-08-18',7015000,NULL,'2026-08-18 04:32:10','2026-08-18 04:32:10');
/*!40000 ALTER TABLE `pengembalian` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `pengembalian_items`
--

DROP TABLE IF EXISTS `pengembalian_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengembalian_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pengembalian_id` bigint(20) unsigned NOT NULL,
  `barang_id` varchar(20) NOT NULL,
  `qty` int(10) unsigned NOT NULL,
  `kondisi` enum('Baik','Rusak Ringan','Rusak Berat','Hilang') NOT NULL DEFAULT 'Baik',
  `denda_keterlambatan` bigint(20) unsigned NOT NULL DEFAULT 0,
  `denda_kerusakan` bigint(20) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pengembalian_items_pengembalian_id_foreign` (`pengembalian_id`),
  KEY `pengembalian_items_barang_id_foreign` (`barang_id`),
  CONSTRAINT `pengembalian_items_barang_id_foreign` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`),
  CONSTRAINT `pengembalian_items_pengembalian_id_foreign` FOREIGN KEY (`pengembalian_id`) REFERENCES `pengembalian` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengembalian_items`
--

LOCK TABLES `pengembalian_items` WRITE;
/*!40000 ALTER TABLE `pengembalian_items` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `pengembalian_items` VALUES
(1,1,'BRG-001',120,'Baik',4104000,0,'2026-07-13 16:21:47','2026-07-13 16:21:47'),
(2,1,'BRG-004',240,'Baik',2376000,0,'2026-07-13 16:21:47','2026-07-13 16:21:47'),
(3,1,'BRG-006',96,'Baik',1209600,0,'2026-07-13 16:21:47','2026-07-13 16:21:47'),
(4,2,'BRG-003',42,'Rusak Ringan',3855600,1871100,'2026-07-13 16:55:06','2026-07-13 16:55:06'),
(5,2,'BRG-007',42,'Rusak Berat',2142000,3931200,'2026-07-13 16:55:06','2026-07-13 16:55:06'),
(6,2,'BRG-008',84,'Hilang',714000,1974000,'2026-07-13 16:55:06','2026-07-13 16:55:06'),
(7,3,'BRG-011',24,'Rusak Ringan',2083200,1144800,'2026-07-13 16:57:35','2026-07-13 16:57:35'),
(8,3,'BRG-012',48,'Rusak Berat',470400,907200,'2026-07-13 16:57:35','2026-07-13 16:57:35'),
(9,4,'BRG-014',8,'Baik',3172000,0,'2026-08-18 04:32:10','2026-08-18 04:32:10'),
(10,4,'BRG-013',210,'Baik',3843000,0,'2026-08-18 04:32:10','2026-08-18 04:32:10');
/*!40000 ALTER TABLE `pengembalian_items` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `penjualan`
--

DROP TABLE IF EXISTS `penjualan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `penjualan` (
  `id` varchar(20) NOT NULL,
  `pelanggan_id` varchar(20) NOT NULL,
  `tanggal` date NOT NULL,
  `metode` enum('Tunai','Transfer','Lainnya') NOT NULL DEFAULT 'Tunai',
  `status` enum('Lunas','Belum Lunas') NOT NULL DEFAULT 'Lunas',
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penjualan_pelanggan_id_foreign` (`pelanggan_id`),
  KEY `penjualan_tanggal_index` (`tanggal`),
  CONSTRAINT `penjualan_pelanggan_id_foreign` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penjualan`
--

LOCK TABLES `penjualan` WRITE;
/*!40000 ALTER TABLE `penjualan` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `penjualan` VALUES
('PJL-0885','PLG-0062','2026-05-27','Tunai','Lunas',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PJL-0892','PLG-0056','2026-06-08','Tunai','Lunas',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PJL-0897','PLG-0041','2026-06-11','Transfer','Lunas',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PJL-0901','PLG-0064','2026-06-05','Transfer','Lunas',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
('PJL-0904','PLG-0038','2026-06-13','Transfer','Lunas',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19');
/*!40000 ALTER TABLE `penjualan` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `penjualan_items`
--

DROP TABLE IF EXISTS `penjualan_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `penjualan_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `penjualan_id` varchar(20) NOT NULL,
  `barang_id` varchar(20) NOT NULL,
  `qty` int(10) unsigned NOT NULL,
  `harga` int(10) unsigned NOT NULL COMMENT 'snapshot harga jual saat transaksi',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penjualan_items_penjualan_id_foreign` (`penjualan_id`),
  KEY `penjualan_items_barang_id_foreign` (`barang_id`),
  CONSTRAINT `penjualan_items_barang_id_foreign` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`),
  CONSTRAINT `penjualan_items_penjualan_id_foreign` FOREIGN KEY (`penjualan_id`) REFERENCES `penjualan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penjualan_items`
--

LOCK TABLES `penjualan_items` WRITE;
/*!40000 ALTER TABLE `penjualan_items` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `penjualan_items` VALUES
(1,'PJL-0892','BRG-008',60,23500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(2,'PJL-0892','BRG-012',40,31500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(3,'PJL-0897','BRG-001',24,412000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(4,'PJL-0897','BRG-004',48,118000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(5,'PJL-0897','BRG-006',20,147000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(6,'PJL-0885','BRG-003',8,297000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(7,'PJL-0885','BRG-005',16,109000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(8,'PJL-0901','BRG-013',120,28500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(9,'PJL-0904','BRG-010',12,371000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(10,'PJL-0904','BRG-008',90,23500,'2026-07-04 12:10:19','2026-07-04 12:10:19');
/*!40000 ALTER TABLE `penjualan_items` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `penyewaan`
--

DROP TABLE IF EXISTS `penyewaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `penyewaan` (
  `id` varchar(20) NOT NULL,
  `pelanggan_id` varchar(20) NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date NOT NULL,
  `status` enum('Aktif','Selesai','Telat') NOT NULL DEFAULT 'Aktif',
  `metode` enum('Tunai','Transfer','Lainnya') NOT NULL DEFAULT 'Transfer',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penyewaan_pelanggan_id_foreign` (`pelanggan_id`),
  KEY `penyewaan_status_index` (`status`),
  KEY `penyewaan_tgl_selesai_index` (`tgl_selesai`),
  CONSTRAINT `penyewaan_pelanggan_id_foreign` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penyewaan`
--

LOCK TABLES `penyewaan` WRITE;
/*!40000 ALTER TABLE `penyewaan` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `penyewaan` VALUES
('SWA-1187','PLG-0031','2026-03-14','2026-05-14','Telat','Transfer','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('SWA-1198','PLG-0047','2026-04-09','2026-06-09','Selesai','Tunai','2026-07-04 12:10:19','2026-07-13 16:55:06'),
('SWA-1244','PLG-0041','2026-05-02','2026-06-02','Selesai','Transfer','2026-07-04 12:10:19','2026-07-04 12:10:19'),
('SWA-1247','PLG-0019','2026-05-04','2026-07-04','Selesai','Transfer','2026-07-04 12:10:19','2026-07-13 16:21:47'),
('SWA-1263','PLG-0038','2026-05-21','2026-06-21','Telat','Transfer','2026-07-04 12:10:19','2026-07-13 15:51:00'),
('SWA-1266','PLG-0053','2026-05-25','2026-06-18','Selesai','Transfer','2026-07-04 12:10:19','2026-08-18 04:32:10'),
('SWA-1271','PLG-0059','2026-06-01','2026-06-15','Selesai','Tunai','2026-07-04 12:10:19','2026-07-13 16:57:35');
/*!40000 ALTER TABLE `penyewaan` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `penyewaan_items`
--

DROP TABLE IF EXISTS `penyewaan_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `penyewaan_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `penyewaan_id` varchar(20) NOT NULL,
  `barang_id` varchar(20) NOT NULL,
  `qty` int(10) unsigned NOT NULL,
  `harga_sewa` int(10) unsigned NOT NULL COMMENT 'snapshot harga saat transaksi',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penyewaan_items_penyewaan_id_foreign` (`penyewaan_id`),
  KEY `penyewaan_items_barang_id_foreign` (`barang_id`),
  CONSTRAINT `penyewaan_items_barang_id_foreign` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`),
  CONSTRAINT `penyewaan_items_penyewaan_id_foreign` FOREIGN KEY (`penyewaan_id`) REFERENCES `penyewaan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penyewaan_items`
--

LOCK TABLES `penyewaan_items` WRITE;
/*!40000 ALTER TABLE `penyewaan_items` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `penyewaan_items` VALUES
(1,'SWA-1247','BRG-001',120,3800,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(2,'SWA-1247','BRG-004',240,1100,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(3,'SWA-1247','BRG-006',96,1400,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(4,'SWA-1263','BRG-002',64,3500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(5,'SWA-1263','BRG-005',128,1000,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(6,'SWA-1263','BRG-009',38,4200,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(7,'SWA-1198','BRG-003',42,2700,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(8,'SWA-1198','BRG-007',42,1500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(9,'SWA-1198','BRG-008',84,250,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(10,'SWA-1271','BRG-011',24,3100,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(11,'SWA-1271','BRG-012',48,350,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(12,'SWA-1244','BRG-001',86,3800,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(13,'SWA-1244','BRG-004',172,1100,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(14,'SWA-1266','BRG-014',8,6500,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(15,'SWA-1266','BRG-013',210,300,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(16,'SWA-1187','BRG-009',52,4200,'2026-07-04 12:10:19','2026-07-04 12:10:19'),
(17,'SWA-1187','BRG-007',74,1500,'2026-07-04 12:10:19','2026-07-04 12:10:19');
/*!40000 ALTER TABLE `penyewaan_items` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `personal_access_tokens` VALUES
(6,'App\\Models\\User',1,'auth-token','e856bab31a6d12ff2d7432715e12bf3184734d817ba94cafa4c75d9a4be585d8','[\"*\"]',NULL,NULL,'2026-07-13 15:59:15','2026-07-13 15:59:15');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Admin','Staff Gudang') NOT NULL DEFAULT 'Staff Gudang',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Admin','admin','admin@sucootscaform.com','Admin',NULL,'$2y$12$tJKqdn1f7Mxe27VXKVi1ievo8Aqi14HDzPUwk.ZOJQAWGaNVIsi7W',NULL,'2026-07-04 12:10:18','2026-07-04 12:10:18'),
(2,'Dedi Firmansyah','staff','staff@sucootscaform.com','Staff Gudang',NULL,'$2y$12$xC/bM1n9CZkVArMjUQybxOPdfEJAiA3wuApkEC5vOlU52Jw4LdmAG',NULL,'2026-07-04 12:10:19','2026-07-04 12:10:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-08-22 14:09:59
