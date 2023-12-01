-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 12:55 PM
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
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `pkg_id` int(11) NOT NULL,
  `rltr_id` int(11) NOT NULL,
  `ptqr_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `share` double NOT NULL,
  `fee` double NOT NULL,
  `total` double NOT NULL,
  `date` datetime NOT NULL,
  `rmrks` varchar(255) NOT NULL,
  `approved` datetime NOT NULL,
  `declined` datetime NOT NULL,
  `completed` datetime NOT NULL,
  `cancelled` datetime NOT NULL,
  `unit_no` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal` varchar(100) NOT NULL,
  `property_size` varchar(100) NOT NULL,
  `day` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `pkg_id`, `rltr_id`, `ptqr_id`, `status`, `price`, `share`, `fee`, `total`, `date`, `rmrks`, `approved`, `declined`, `completed`, `cancelled`, `unit_no`, `street`, `city`, `province`, `postal`, `property_size`, `day`) VALUES
(2, 1, 1, 1, 'completed', 123, 0, 123, 123, '2023-12-15 19:33:38', '123', '2000-01-27 00:00:00', '0000-00-00 00:00:00', '2000-01-27 00:00:00', '0000-00-00 00:00:00', '258-v', 'jones avenue', 'Cebu City', 'Cebu', '6000', '255', 'Mid Day'),
(3, 1, 1, 1, 'payment', 123, 0, 123, 123, '2023-12-14 19:54:57', '12asd', '2023-12-01 19:41:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '258-v', 'jones avenue', 'Cebu City', 'Cebu', '6000', '25', 'Afternoon');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pkg_id_booking` (`pkg_id`),
  ADD KEY `rltr_id_booking` (`rltr_id`),
  ADD KEY `ptqr_id_booking` (`ptqr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `pkg_id_booking` FOREIGN KEY (`pkg_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ptqr_id_booking` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rltr_id_booking` FOREIGN KEY (`rltr_id`) REFERENCES `realtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
