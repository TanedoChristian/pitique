-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 12:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pitique`
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `ptqr_id` int(11) NOT NULL,
  `rltr_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `total` double NOT NULL,
  `pamt` double NOT NULL,
  `pdate` datetime NOT NULL,
  `preceipt` varchar(255) NOT NULL,
  `famt` double NOT NULL,
  `fdate` datetime NOT NULL,
  `freceipt` varchar(255) NOT NULL,
  `rmrks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `ptqr_id`, `rltr_id`, `book_id`, `status`, `total`, `pamt`, `pdate`, `preceipt`, `famt`, `fdate`, `freceipt`, `rmrks`) VALUES
(1, 1, 1, 2, 'succeeded', 123, 123, '2023-12-01 19:41:46', 'pi_3OIVCjC1YMDXJxdt05lZ7RxN', 123, '2023-12-01 19:41:46', 'pi_3OIVCjC1YMDXJxdt05lZ7RxN', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ptqr_id_fk_payment` (`ptqr_id`),
  ADD KEY `rltr_id_fk_payment` (`rltr_id`),
  ADD KEY `book_id_fk_payment` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `book_id_fk_payment` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ptqr_id_fk_payment` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rltr_id_fk_payment` FOREIGN KEY (`rltr_id`) REFERENCES `realtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
