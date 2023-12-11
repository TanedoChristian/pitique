-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 12:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `prof_img` longblob NOT NULL,
  `issuper` tinyint(1) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `fname`, `mname`, `lname`, `user`, `pass`, `email`, `phone`, `prof_img`, `issuper`, `status`) VALUES
(2, 'pitique', 'pitique', 'pitique', 'admin@pitique.com', '$2b$10$174xp/3hizAJl72j1zjplOyn66qTQQOlTrHY2FAl8KtGYzVoPGQMG', 'admin@pitique.com', '1234567890', '', 0, 'active');

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
  `day` varchar(100) NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `rltr_id` int(11) NOT NULL,
  `ptqr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `pstatus` varchar(100) NOT NULL,
  `rstatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id` int(11) NOT NULL,
  `ptqr_id` int(11) NOT NULL,
  `hasphoto` tinyint(1) NOT NULL,
  `hasvid` tinyint(1) NOT NULL,
  `hasamnty` tinyint(1) NOT NULL,
  `min_price` double NOT NULL,
  `pkg_desc` varchar(255) NOT NULL,
  `isavailable` tinyint(1) NOT NULL,
  `isvisible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `pitiquer`
--

CREATE TABLE `pitiquer` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `prof_img` longblob NOT NULL,
  `bio` varchar(100) NOT NULL,
  `isphotog` tinyint(1) NOT NULL,
  `isvideog` tinyint(1) NOT NULL,
  `isamnty` tinyint(1) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `ptqr_id` int(11) NOT NULL,
  `img` longblob NOT NULL,
  `isvisible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `realtor`
--

CREATE TABLE `realtor` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `prof_img` longblob NOT NULL,
  `id_type` varchar(100) NOT NULL,
  `id_img` longblob NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `realtor_feedback`
--

CREATE TABLE `realtor_feedback` (
  `rltr_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `rtng` int(11) NOT NULL,
  `fdbk` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `isvisible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `ptqr_id` int(11) NOT NULL,
  `started_date` datetime NOT NULL,
  `last_paid_date` datetime NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pkg_id_booking` (`pkg_id`),
  ADD KEY `rltr_id_booking` (`rltr_id`),
  ADD KEY `ptqr_id_booking` (`ptqr_id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`rltr_id`,`ptqr_id`),
  ADD KEY `ptqr_id_favorite` (`ptqr_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id_fk_notif` (`book_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ptqr_id_fk_package` (`ptqr_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ptqr_id_fk_payment` (`ptqr_id`),
  ADD KEY `rltr_id_fk_payment` (`rltr_id`),
  ADD KEY `book_id_fk_payment` (`book_id`);

--
-- Indexes for table `pitiquer`
--
ALTER TABLE `pitiquer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pitiquer_feedback`
--
ALTER TABLE `pitiquer_feedback`
  ADD PRIMARY KEY (`ptqr_id`,`book_id`),
  ADD KEY `book_id_fk_pfeedback` (`book_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ptqr_id_fk_portfolio` (`ptqr_id`);

--
-- Indexes for table `realtor`
--
ALTER TABLE `realtor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `realtor_feedback`
--
ALTER TABLE `realtor_feedback`
  ADD PRIMARY KEY (`rltr_id`,`book_id`),
  ADD KEY `ptqr_id_fk_rfeedback` (`book_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`ptqr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pitiquer`
--
ALTER TABLE `pitiquer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `realtor`
--
ALTER TABLE `realtor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `ptqr_id_favorite` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rltr_id_favorite` FOREIGN KEY (`rltr_id`) REFERENCES `realtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `book_id_fk_notif` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `package`
--
ALTER TABLE `package`
  ADD CONSTRAINT `ptqr_id_fk_package` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `book_id_fk_payment` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ptqr_id_fk_payment` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rltr_id_fk_payment` FOREIGN KEY (`rltr_id`) REFERENCES `realtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pitiquer_feedback`
--
ALTER TABLE `pitiquer_feedback`
  ADD CONSTRAINT `book_id_fk_pfeedback` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ptqr_id_fk_pfeedback` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `ptqr_id_fk_portfolio` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `realtor_feedback`
--
ALTER TABLE `realtor_feedback`
  ADD CONSTRAINT `ptqr_id_fk_rfeedback` FOREIGN KEY (`book_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rltr_id_fk_rfeedback` FOREIGN KEY (`rltr_id`) REFERENCES `realtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `ptqr_id_subscription` FOREIGN KEY (`ptqr_id`) REFERENCES `pitiquer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
