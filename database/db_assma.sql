-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 01:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_assma`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `GenerateKodeKelas` () RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
  DECLARE characters VARCHAR(62) DEFAULT 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  DECLARE randomCode VARCHAR(255) DEFAULT '';
  DECLARE codeExists INT DEFAULT 0;
  DECLARE i INT DEFAULT 0;

  REPEAT
    SET randomCode = '';
    SET i = 0;
    SET codeExists = 0;

    WHILE i < 7 DO
      SET randomCode = CONCAT(randomCode, SUBSTRING(characters, 1 + FLOOR(RAND() * 62), 1));
      SET i = i + 1;
    END WHILE;

    -- Cek apakah kode sudah ada di dalam tabel
    SELECT COUNT(*) INTO codeExists FROM kelas WHERE kode_kelas = randomCode;

  UNTIL codeExists = 0 END REPEAT;

  RETURN randomCode;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `generate_npp_pengajar` () RETURNS VARCHAR(10) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
    DECLARE current_year VARCHAR(2);
    DECLARE current_month VARCHAR(2);
    DECLARE next_id INT;

    -- Ambil dua digit terakhir tahun saat ini
    SET current_year = RIGHT(YEAR(CURDATE()), 2);
    -- Ambil dua digit bulan saat ini
    SET current_month = LPAD(MONTH(CURDATE()), 2, '0');
    -- Ambil ID terakhir, tambahkan 1 untuk mendapatkan ID berikutnya
    SET next_id = COALESCE((SELECT MAX(SUBSTRING(npp, 7, 2) + 1) FROM pengajar), 1);

    -- Kembalikan hasil NPP yang dihasilkan
    RETURN CONCAT(current_month, current_year, LPAD(next_id, 2, '0'));
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `generate_nps` () RETURNS VARCHAR(10) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
    DECLARE current_year VARCHAR(2);
    DECLARE current_month VARCHAR(2);
    DECLARE next_id INT;

    -- Ambil dua digit terakhir tahun saat ini
    SET current_year = RIGHT(YEAR(CURDATE()), 2);
    -- Ambil dua digit bulan saat ini
    SET current_month = LPAD(MONTH(CURDATE()), 2, '0');
    -- Ambil ID terakhir, tambahkan 1 untuk mendapatkan ID berikutnya
    SET next_id = COALESCE((SELECT MAX(SUBSTRING(nps, 5, 2) + 1) FROM siswa), 1);

    -- Kembalikan hasil NPS yang dihasilkan
    RETURN CONCAT(current_year, current_month, LPAD(next_id, 2, '0'));
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `anggota_kelas`
--

CREATE TABLE `anggota_kelas` (
  `id_anggota` int(11) NOT NULL,
  `nps` varchar(10) DEFAULT NULL,
  `kode_kelas` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota_kelas`
--

INSERT INTO `anggota_kelas` (`id_anggota`, `nps`, `kode_kelas`) VALUES
(1, '240101', 'tSPYO7I'),
(2, '240102', 'tSPYO7I');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `kode_kelas` varchar(25) NOT NULL,
  `npp` varchar(10) DEFAULT NULL,
  `nama_kelas` varchar(255) DEFAULT NULL,
  `waktu_dibuat` timestamp NOT NULL DEFAULT current_timestamp(),
  `mata_pelajaran` varchar(255) DEFAULT NULL,
  `ruang_kelas` varchar(50) DEFAULT NULL,
  `status_kelas` enum('AKTIF','NONAKTIF') DEFAULT 'AKTIF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`kode_kelas`, `npp`, `nama_kelas`, `waktu_dibuat`, `mata_pelajaran`, `ruang_kelas`, `status_kelas`) VALUES
('tSPYO7I', '012401', '4KA04 - Perencanaan Proyek SI', '2024-01-20 14:52:01', 'Perencanaan Proyek SI', 'E326', 'AKTIF');

-- --------------------------------------------------------

--
-- Table structure for table `komentar_tugas`
--

CREATE TABLE `komentar_tugas` (
  `id_komentar` int(11) NOT NULL,
  `id_tugas` int(11) DEFAULT NULL,
  `pengirim` varchar(255) DEFAULT NULL,
  `isi_komentar` text DEFAULT NULL,
  `tanggal_komentar` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mengajar`
--

CREATE TABLE `mengajar` (
  `id_mengajar` int(11) NOT NULL,
  `npp` varchar(10) DEFAULT NULL,
  `kode_kelas` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mengajar`
--

INSERT INTO `mengajar` (`id_mengajar`, `npp`, `kode_kelas`) VALUES
(2, '012401', 'tSPYO7I');

-- --------------------------------------------------------

--
-- Table structure for table `mengikuti`
--

CREATE TABLE `mengikuti` (
  `id_mengikuti` int(11) NOT NULL,
  `nps` varchar(10) DEFAULT NULL,
  `kode_kelas` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mengikuti`
--

INSERT INTO `mengikuti` (`id_mengikuti`, `nps`, `kode_kelas`) VALUES
(1, '240101', 'tSPYO7I'),
(2, '240102', 'tSPYO7I');

--
-- Triggers `mengikuti`
--
DELIMITER $$
CREATE TRIGGER `tambah_anggota_kelas` AFTER INSERT ON `mengikuti` FOR EACH ROW BEGIN
  INSERT INTO anggota_kelas (nps, kode_kelas) VALUES (NEW.nps, NEW.kode_kelas);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pengajar`
--

CREATE TABLE `pengajar` (
  `npp` varchar(10) NOT NULL,
  `nama_pengajar` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_profil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajar`
--

INSERT INTO `pengajar` (`npp`, `nama_pengajar`, `email`, `password`, `foto_profil`) VALUES
('012401', 'Agus Sofyan', 'agus@gmail.com', '$2b$10$7WJaKu7daaD03.8YPhpGOeV.WEoJDiMkLVrdcihr0fAsL/a95XgDm', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pengumpulan_tugas`
--

CREATE TABLE `pengumpulan_tugas` (
  `id_pengumpulan` int(11) NOT NULL,
  `id_tugas` int(11) DEFAULT NULL,
  `nps_siswa` varchar(255) DEFAULT NULL,
  `file_pengumpulan` varchar(255) DEFAULT NULL,
  `tanggal_pengumpulan` datetime DEFAULT NULL,
  `catatan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nps` varchar(10) NOT NULL,
  `nama_siswa` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_profil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nps`, `nama_siswa`, `email`, `password`, `foto_profil`) VALUES
('240101', 'Randi Risdiansyah', 'randyrisdiansyah@gmail.com', '$2b$10$FCIhqY7O6wBDt5XG740ikOVBabk6SST2nxxpq.vwnCj2xpjjeHlRe', NULL),
('240102', 'Lutfi Fadhlurahman', 'lutfi@gmail.com', '$2b$10$FIy/NU1OfmYzSdRiqPU9.OBB0dtgMuNW01Bc/ZUQxB3QkzaXXYDYa', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `topik`
--

CREATE TABLE `topik` (
  `id_topik` int(11) NOT NULL,
  `nama_topik` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id_tugas` int(11) NOT NULL,
  `kode_kelas` varchar(255) DEFAULT NULL,
  `judul_tugas` varchar(255) DEFAULT NULL,
  `deskripsi_tugas` text DEFAULT NULL,
  `tanggal_deadline` datetime DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_topik` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id_tugas`, `kode_kelas`, `judul_tugas`, `deskripsi_tugas`, `tanggal_deadline`, `nilai`, `created_at`, `id_topik`) VALUES
(3, 'tSPYO7I', 'Tugas Akhir', 'Buatlah project berdasarkan studi kasus penulisan ilmiah\r\n\r\nkumpulkan dalam bentuk .rar', '2024-01-10 11:56:00', NULL, '2024-01-22 04:53:30', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota_kelas`
--
ALTER TABLE `anggota_kelas`
  ADD PRIMARY KEY (`id_anggota`),
  ADD UNIQUE KEY `unique_anggota` (`nps`,`kode_kelas`),
  ADD KEY `kode_kelas` (`kode_kelas`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`kode_kelas`),
  ADD KEY `npp` (`npp`);

--
-- Indexes for table `komentar_tugas`
--
ALTER TABLE `komentar_tugas`
  ADD PRIMARY KEY (`id_komentar`),
  ADD KEY `id_tugas` (`id_tugas`);

--
-- Indexes for table `mengajar`
--
ALTER TABLE `mengajar`
  ADD PRIMARY KEY (`id_mengajar`),
  ADD KEY `npp` (`npp`),
  ADD KEY `kode_kelas` (`kode_kelas`);

--
-- Indexes for table `mengikuti`
--
ALTER TABLE `mengikuti`
  ADD PRIMARY KEY (`id_mengikuti`),
  ADD KEY `nps` (`nps`),
  ADD KEY `kode_kelas` (`kode_kelas`);

--
-- Indexes for table `pengajar`
--
ALTER TABLE `pengajar`
  ADD PRIMARY KEY (`npp`);

--
-- Indexes for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  ADD PRIMARY KEY (`id_pengumpulan`),
  ADD KEY `id_tugas` (`id_tugas`),
  ADD KEY `nps_siswa` (`nps_siswa`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nps`);

--
-- Indexes for table `topik`
--
ALTER TABLE `topik`
  ADD PRIMARY KEY (`id_topik`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id_tugas`),
  ADD KEY `kode_kelas` (`kode_kelas`),
  ADD KEY `fk_tugas_topik` (`id_topik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota_kelas`
--
ALTER TABLE `anggota_kelas`
  MODIFY `id_anggota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `komentar_tugas`
--
ALTER TABLE `komentar_tugas`
  MODIFY `id_komentar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mengajar`
--
ALTER TABLE `mengajar`
  MODIFY `id_mengajar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mengikuti`
--
ALTER TABLE `mengikuti`
  MODIFY `id_mengikuti` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  MODIFY `id_pengumpulan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggota_kelas`
--
ALTER TABLE `anggota_kelas`
  ADD CONSTRAINT `anggota_kelas_ibfk_1` FOREIGN KEY (`nps`) REFERENCES `siswa` (`nps`),
  ADD CONSTRAINT `anggota_kelas_ibfk_2` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas` (`kode_kelas`);

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`npp`) REFERENCES `pengajar` (`npp`);

--
-- Constraints for table `komentar_tugas`
--
ALTER TABLE `komentar_tugas`
  ADD CONSTRAINT `komentar_tugas_ibfk_1` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`);

--
-- Constraints for table `mengajar`
--
ALTER TABLE `mengajar`
  ADD CONSTRAINT `mengajar_ibfk_1` FOREIGN KEY (`npp`) REFERENCES `pengajar` (`npp`),
  ADD CONSTRAINT `mengajar_ibfk_2` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas` (`kode_kelas`);

--
-- Constraints for table `mengikuti`
--
ALTER TABLE `mengikuti`
  ADD CONSTRAINT `mengikuti_ibfk_1` FOREIGN KEY (`nps`) REFERENCES `siswa` (`nps`),
  ADD CONSTRAINT `mengikuti_ibfk_2` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas` (`kode_kelas`);

--
-- Constraints for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  ADD CONSTRAINT `pengumpulan_tugas_ibfk_1` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`),
  ADD CONSTRAINT `pengumpulan_tugas_ibfk_2` FOREIGN KEY (`nps_siswa`) REFERENCES `siswa` (`nps`);

--
-- Constraints for table `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `fk_tugas_topik` FOREIGN KEY (`id_topik`) REFERENCES `topik` (`id_topik`),
  ADD CONSTRAINT `tugas_ibfk_1` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas` (`kode_kelas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
