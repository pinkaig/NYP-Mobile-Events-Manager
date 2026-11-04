-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2019 at 04:14 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nyp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `category_desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_desc`, `created_at`, `updated_at`) VALUES
(1, 'Dance', '2019-05-15 23:10:16', '2019-05-15 23:10:16'),
(2, 'Sports', '2019-05-15 23:10:22', '2019-05-15 23:10:22'),
(3, 'Entertainment', '2019-05-15 23:10:31', '2019-05-15 23:10:31'),
(4, 'Cultural', '2019-05-15 23:10:46', '2019-05-15 23:10:46');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(10) UNSIGNED NOT NULL,
  `event_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organiser` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `venue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_id` int(10) UNSIGNED NOT NULL,
  `c_id` int(10) UNSIGNED NOT NULL,
  `photo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `organiser_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `closing_date` date NOT NULL,
  `cancellation_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_title`, `event_desc`, `startDate`, `endDate`, `startTime`, `endTime`, `organiser`, `venue`, `u_id`, `c_id`, `photo`, `organiser_email`, `status`, `closing_date`, `cancellation_date`, `created_at`, `updated_at`) VALUES
(1, 'NYP Groove', 'Think you\'ve got the moves to thrill and rock an audience? Round up your squad and show off your cool steps at NYP GROOVE! street dance competition. Stand to win attractive prizes!', '2019-05-05', '2019-05-11', '3PM', '5PM', 'NYP Dance Club', 'Block A, Nanyang Polytechnic', 1, 1, 'nypgroove.jpg', 'dancenyp@nyp_email.com', 'Ongoing', '2019-04-28', NULL, '2019-05-15 23:17:57', '2019-05-15 23:17:57');

-- --------------------------------------------------------

--
-- Table structure for table `event__feedback`
--

CREATE TABLE `event__feedback` (
  `id` int(10) UNSIGNED NOT NULL,
  `u_id` int(10) UNSIGNED NOT NULL,
  `e_id` int(10) UNSIGNED NOT NULL,
  `feedback_msg` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event__registers`
--

CREATE TABLE `event__registers` (
  `id` int(10) UNSIGNED NOT NULL,
  `u_id` int(10) UNSIGNED NOT NULL,
  `e_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_date` date NOT NULL,
  `cancellation_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(25, '2019_04_22_074803_create_users_table', 1),
(26, '2019_04_22_074815_create_categories_table', 1),
(27, '2019_04_22_074818_create_events_table', 1),
(28, '2019_04_22_074848_create_event__registers_table', 1),
(29, '2019_04_22_074912_create_event__feedback_table', 1),
(30, '2019_04_23_021501_adds_api_token_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `phoneNo`, `created_at`, `updated_at`, `api_token`) VALUES
(1, 'harry', '$2y$10$X1D0PESGYxEXeexomtvaHepPKohGLBvm9Yh4QJ0SdqVLUk1WpdxFa', 'student', '81236789', '2019-05-15 23:11:06', '2019-05-15 23:11:06', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `events_u_id_foreign` (`u_id`),
  ADD KEY `events_c_id_foreign` (`c_id`);

--
-- Indexes for table `event__feedback`
--
ALTER TABLE `event__feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event__feedback_u_id_foreign` (`u_id`),
  ADD KEY `event__feedback_e_id_foreign` (`e_id`);

--
-- Indexes for table `event__registers`
--
ALTER TABLE `event__registers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event__registers_u_id_foreign` (`u_id`),
  ADD KEY `event__registers_e_id_foreign` (`e_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_api_token_unique` (`api_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `event__feedback`
--
ALTER TABLE `event__feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event__registers`
--
ALTER TABLE `event__registers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_c_id_foreign` FOREIGN KEY (`c_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `events_u_id_foreign` FOREIGN KEY (`u_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `event__feedback`
--
ALTER TABLE `event__feedback`
  ADD CONSTRAINT `event__feedback_e_id_foreign` FOREIGN KEY (`e_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event__feedback_u_id_foreign` FOREIGN KEY (`u_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `event__registers`
--
ALTER TABLE `event__registers`
  ADD CONSTRAINT `event__registers_e_id_foreign` FOREIGN KEY (`e_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event__registers_u_id_foreign` FOREIGN KEY (`u_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
