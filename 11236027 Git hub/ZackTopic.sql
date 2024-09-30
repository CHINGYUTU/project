-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 10.1.1.3
-- 產生時間： 2024 年 09 月 30 日 06:16
-- 伺服器版本： 11.5.2-MariaDB-ubu2404
-- PHP 版本： 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ZackTopic`
--

-- --------------------------------------------------------

--
-- 資料表結構 `HouseInfo`
--

CREATE TABLE `HouseInfo` (
  `ID` int(11) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `Area` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Price` varchar(100) DEFAULT NULL,
  `Pattern` varchar(100) DEFAULT NULL,
  `Size` double DEFAULT NULL,
  `MainPic` varchar(100) DEFAULT NULL,
  `OtherPic` varchar(100) DEFAULT NULL,
  `Verify` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `HouseInfo`
--

INSERT INTO `HouseInfo` (`ID`, `City`, `Area`, `Address`, `Price`, `Pattern`, `Size`, `MainPic`, `OtherPic`, `Verify`) VALUES
(1, '基隆市', '信義區', '深溪路36巷102弄5號3樓', '1000000', '3房2廳2衛', 30.5, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `other` int(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(60) DEFAULT NULL,
  `Role` enum('admin','User','Landlord') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Users`
--

INSERT INTO `Users` (`ID`, `Name`, `Phone`, `other`, `Email`, `Password`, `Role`) VALUES
(1, 'admin', '0987878787', NULL, 'admin@zack.com', '$2y$10$10UKjuibThk3XvT9OwHYsefgPE2vOuiAqTrdFGtNzVR0YX00uM6AC', 'admin'),
(2, 'zack', NULL, NULL, 'zack@zack.com', '$2y$10$10UKjuibThk3XvT9OwHYsefgPE2vOuiAqTrdFGtNzVR0YX00uM6AC', 'User');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `HouseInfo`
--
ALTER TABLE `HouseInfo`
  ADD KEY `HouseInfo_Users_FK` (`ID`);

--
-- 資料表索引 `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `HouseInfo`
--
ALTER TABLE `HouseInfo`
  ADD CONSTRAINT `HouseInfo_Users_FK` FOREIGN KEY (`ID`) REFERENCES `Users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
