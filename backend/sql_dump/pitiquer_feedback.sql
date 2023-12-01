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
-- Table structure for table `pitiquer_feedback`
--

CREATE TABLE `pitiquer_feedback` (
  `ptqr_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `rtng` int(11) NOT NULL,
  `fdbk` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `isvisible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pitiquer_feedback`
--

INSERT INTO `pitiquer_feedback` (`ptqr_id`, `book_id`, `rtng`, `fdbk`, `date`, `isvisible`) VALUES
(1, 2, 3, 'yes', '2023-12-01 19:41:46', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pitiquer_feedback`
--
ALTER TABLE `pitiquer_feedback`
  ADD PRIMARY KEY (`ptqr_id`,`book_id`),
  ADD KEY `book_id_fk_pfeedback` (`book_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pitiquer_feedback`
--
ALTER TABLE `pitiquer_feedback`
  ADD CONSTRAINT `book_id_fk_pfeedback` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ptqr_id_fk_pfeedback` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
