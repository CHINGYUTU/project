-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 10.1.1.3:3333
-- 產生時間： 2024 年 10 月 15 日 09:52
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
-- 資料表結構 `Equipment`
--

CREATE TABLE `Equipment` (
  `ID` int(11) NOT NULL,
  `Refrigerator` tinyint(1) NOT NULL DEFAULT 0,
  `WashingMachine` tinyint(1) NOT NULL DEFAULT 0,
  `TV` tinyint(1) NOT NULL DEFAULT 0,
  `AirConditioner` tinyint(1) NOT NULL DEFAULT 0,
  `WaterHeater` tinyint(1) NOT NULL DEFAULT 0,
  `Bed` tinyint(1) NOT NULL DEFAULT 0,
  `Wardrobe` tinyint(1) NOT NULL DEFAULT 0,
  `Channel4` tinyint(1) NOT NULL DEFAULT 0,
  `Network` tinyint(1) NOT NULL DEFAULT 0,
  `NaturalGas` tinyint(1) NOT NULL DEFAULT 0,
  `Sofa` tinyint(1) NOT NULL DEFAULT 0,
  `Tables` tinyint(1) NOT NULL DEFAULT 0,
  `Balcony` tinyint(1) NOT NULL DEFAULT 0,
  `Elevator` tinyint(1) NOT NULL DEFAULT 0,
  `ParkingSpace` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Equipment`
--

INSERT INTO `Equipment` (`ID`, `Refrigerator`, `WashingMachine`, `TV`, `AirConditioner`, `WaterHeater`, `Bed`, `Wardrobe`, `Channel4`, `Network`, `NaturalGas`, `Sofa`, `Tables`, `Balcony`, `Elevator`, `ParkingSpace`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0),
(3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(4, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0),
(5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(6, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1),
(7, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1),
(8, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0),
(9, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1),
(10, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0),
(11, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1),
(12, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1),
(13, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1),
(14, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0),
(15, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1),
(16, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1),
(17, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0),
(18, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1),
(19, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1),
(20, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
(21, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0),
(22, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1),
(23, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0),
(24, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1),
(25, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `Favorites`
--

CREATE TABLE `Favorites` (
  `UserID` int(11) DEFAULT NULL,
  `HourseID` int(11) DEFAULT NULL,
  `favorited_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `HouseInfo`
--

CREATE TABLE `HouseInfo` (
  `ID` int(11) NOT NULL,
  `ImageID` int(11) DEFAULT NULL COMMENT '圖片',
  `LandlordID` int(11) DEFAULT NULL COMMENT '房東',
  `EquipmentID` int(11) DEFAULT NULL COMMENT '設備',
  `Title` varchar(100) DEFAULT NULL COMMENT '標題',
  `City` varchar(100) DEFAULT NULL COMMENT '縣市',
  `Area` varchar(100) DEFAULT NULL COMMENT '區域',
  `Address` varchar(100) DEFAULT NULL COMMENT '地址',
  `Price` varchar(100) DEFAULT NULL COMMENT '租金',
  `Pattern` varchar(100) DEFAULT NULL COMMENT '規格',
  `Size` double DEFAULT NULL COMMENT '坪數',
  `MainPic` varchar(255) DEFAULT NULL COMMENT '圖片(主)',
  `OtherPic` varchar(100) DEFAULT NULL COMMENT '圖片(補充)',
  `Verify` tinyint(1) NOT NULL DEFAULT 0 COMMENT '核准狀態',
  `Floor` varchar(10) DEFAULT NULL COMMENT '樓層',
  `Deposit` int(11) DEFAULT NULL COMMENT '押金',
  `Introduction` varchar(512) DEFAULT NULL COMMENT '簡介',
  `ManagementFee` int(11) DEFAULT NULL COMMENT '管理費',
  `ReleaseTime` datetime DEFAULT current_timestamp() COMMENT '發布時間',
  `RentalInstructions` varchar(512) DEFAULT NULL COMMENT '租賃須知'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `HouseInfo`
--

INSERT INTO `HouseInfo` (`ID`, `ImageID`, `LandlordID`, `EquipmentID`, `Title`, `City`, `Area`, `Address`, `Price`, `Pattern`, `Size`, `MainPic`, `OtherPic`, `Verify`, `Floor`, `Deposit`, `Introduction`, `ManagementFee`, `ReleaseTime`, `RentalInstructions`) VALUES
(1, NULL, 1, 1, '愛買生活圈\r\n', '基隆市\r\n', '信義區\r\n', '深溪路36巷102弄5號3樓\r\n', '1000000\r\n', '3房2廳2衛\r\n', 30.5, 'https://cdn.discordapp.com/attachments/924904009796583424/1255358926560563210/image.jpg?ex=6707451b&is=6705f39b&hm=a962cc7ed1e7cdf1ce23e8824c9e2c79dd1a6c00ead4989d2cbf7979482673f9&\r\n', NULL, 1, '3F/10F', 2, '不知道說啥好\r\n', 1000, '2024-10-13 08:44:09', '最短租期一年，可隨時遷入'),
(2, NULL, 1, 4, '優質電梯套房，拎包入住(仲介勿擾)', '台中市', '大甲區', '大甲區中山路一段792號', '6000', '獨立套房', 5, NULL, NULL, 1, '2F', 2500, NULL, 2500, '2024-10-13 16:22:42', NULL),
(3, NULL, 1, 3, '大甲全新裝潢套房出租', '台中市', '大甲區', '大甲區中山路908巷', '10000', '分租套房', 20, NULL, NULL, 1, '4F', 3000, NULL, 3000, '2024-10-13 16:37:26', NULL),
(4, NULL, 1, 4, '大安儲物倉庫', '台中市', '大安區', '大安區南北七路182巷', '15000', '1房', 25, NULL, NULL, 1, '3F/11F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL),
(5, NULL, 1, 5, '台中市大安區大安港路邊雅房', '台中市', '大安區', '大安區東西七路二段166號', '5000', '雅房', 8, NULL, NULL, 1, '5F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL),
(6, NULL, 1, 6, '大里精裝透天起家厝/大家庭首選可貓', '台中市', '大里區', '大里區仁提二街', '37000', '4房3廳4衛', 60, NULL, NULL, 1, '6F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL),
(7, NULL, 1, 7, '稀有物件大里透天別墅傢俱全', '台中市', '大里區', '大里區仁堤二街73號', '37000', '4房2廳3衛', 60, NULL, NULL, 1, '7F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL),
(8, NULL, 1, 8, '中科精美系統裝潢2+1房#可租補', '台中市', '大雅區', '大雅區大林路', '27000', '3房2廳2衛', 30, NULL, NULL, 1, '7F/10F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL),
(9, NULL, 1, 9, '豐藝社區【可寵狗貓】可租補雙車位全配家具', '台中市', '大雅區', '大雅區大林路140巷', '41000', '4房2廳3衛', 61.2, NULL, NULL, 1, '3F/11F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL),
(10, NULL, 1, 10, '中科大 一中 火車站 獨洗陽台 超便宜', '台中市', '中區', '中區臺灣大道一段141巷', '6500', '獨立套房', 10, NULL, NULL, 1, '2F', 3910, NULL, 3910, '2024-10-13 16:37:26', NULL),
(11, NULL, 1, 11, '可租補廣擎天11坪大套房獨洗曬', '台中市', '中區', '中區民權路164號', '7500', '獨立套房', 11, NULL, NULL, 1, '4F', 4238, NULL, 4238, '2024-10-13 16:37:26', NULL),
(12, NULL, 1, 12, '樹孝商圈 系統櫃收納 可雙租補全新質感', '台中市', '太平區', '太平區新民路', '10000', '獨立套房', 10, NULL, NULL, 1, '3F/11F', 4560, NULL, 4560, '2024-10-13 16:37:26', NULL),
(13, NULL, 1, 13, '青山和園 質感社區可寵大三房 租補戶籍', '台中市', '太平區', '太平區祥順路一段', '26000', '3房2廳2衛', 30, NULL, NULL, 1, '5F', 4892, NULL, 4892, '2024-10-13 16:37:26', NULL),
(14, NULL, 1, 14, '全新裝潢 一房一廳 獨洗獨曬 租屋補助', '台中市', '北屯區', '北屯區東山路一段', '14799', '獨立套房', 22, NULL, NULL, 1, '6F', 5220, NULL, 5220, '2024-10-13 16:37:26', NULL),
(15, NULL, 1, 15, '超級大空間 獨洗獨曬 租屋補助 電梯套房', '台中市', '北屯區', '北屯區中平路', '9999', '獨立套房', 15, NULL, NULL, 1, '7F', 5547, NULL, 5547, '2024-10-13 16:37:26', NULL),
(16, NULL, 1, 16, '小資最愛 雙租屋補助 陽台獨洗 機車位', '台中市', '北區', '北區健行路', '10499', '獨立套房', 15, NULL, NULL, 1, '7F/10F', 5875, NULL, 5875, '2024-10-13 16:37:26', NULL),
(17, NULL, 1, 17, '小資首選 陽台獨洗 租屋補助 室內機車位', '台中市', '北區', '北區力行路', '8299', '獨立套房', 14, NULL, NULL, 1, '3F/11F', 6202, NULL, 6202, '2024-10-13 16:37:26', NULL),
(18, NULL, 1, 18, '總管家| 近麗寶整棟透天 可租補免仲', '台中市', '外埔區', '外埔區外埔路360巷', '23000', '3房2廳3衛', 37.23, NULL, NULL, 1, '2F', 6529, NULL, 6529, '2024-10-13 16:37:26', NULL),
(19, NULL, 1, 19, '嘉暘台中/免仲/可補助/可寵/空屋', '台中市', '外埔區', '外埔區山美路451巷', '24000', '4房2廳4衛', 70, NULL, NULL, 1, '4F', 6857, NULL, 6857, '2024-10-13 16:37:26', NULL),
(20, NULL, 1, 20, '租 石岡萬華街臨路透天，5房22000', '台中市', '石岡區', '石岡區萬華街12號', '22000', '5房2廳2衛', 37.95, NULL, NULL, 1, '3F/11F', 7184, NULL, 7184, '2024-10-13 16:37:26', NULL),
(21, NULL, 1, 21, '石岡國中整棟透天出租', '台中市', '石岡區', '石岡區萬華街', '22000', '4房2廳2衛', 80, NULL, NULL, 1, '5F', 7511, NULL, 7511, '2024-10-13 16:37:26', NULL),
(22, NULL, 1, 22, '超省台電 租屋補助 陽台獨洗流理台 可貓', '台中市', '西屯區', '西屯區長安路二段', '6999', '獨立套房', 13, NULL, NULL, 1, '6F', 7839, NULL, 7839, '2024-10-13 16:37:26', NULL),
(23, NULL, 1, 23, '全新超大空間 陽台獨洗流理台 雙租屋補助', '台中市', '西屯區', '西屯區重慶路', '14999', '獨立套房', 18, NULL, NULL, 1, '7F', 8166, NULL, 8166, '2024-10-13 16:37:26', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `Image`
--

CREATE TABLE `Image` (
  `ImageID` int(11) NOT NULL,
  `Pic1` varchar(255) DEFAULT NULL,
  `Pic2` varchar(255) DEFAULT NULL,
  `Pic3` varchar(255) DEFAULT NULL,
  `Pic4` varchar(255) DEFAULT NULL,
  `Pic5` varchar(255) DEFAULT NULL,
  `Pic6` varchar(255) DEFAULT NULL,
  `Pic7` varchar(255) DEFAULT NULL,
  `Pic8` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(60) DEFAULT NULL,
  `Role` enum('Admin','User','Landlord') NOT NULL DEFAULT 'User',
  `JoinTime` datetime DEFAULT current_timestamp(),
  `Headshot` varchar(255) DEFAULT 'https://cdn.discordapp.com/attachments/924904009796583424/1293677689181438053/User_icon.png?ex=67083ebc&is=6706ed3c&hm=b22bd7069f693fda95fd36a2b70ac1ce5d71dc69a2163aef5ce120f5d20959ca&'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Users`
--

INSERT INTO `Users` (`ID`, `Name`, `Phone`, `Email`, `Password`, `Role`, `JoinTime`, `Headshot`) VALUES
(1, 'admin', '0987878787', 'admin@zack.com', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'Admin', '2024-10-09 20:02:31', 'https://cdn.discordapp.com/attachments/924904009796583424/1293678231609806848/2D996504-723C-49AC-8E8C-A871BBB46A23.jpeg?ex=67083f3d&is=6706edbd&hm=0023d7283ef13034c573435387898ad75d92a42e65cd0a023f9e6720d7df68ec&'),
(2, 'zack', NULL, 'zack@zack.com', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'User', '2024-10-09 20:02:31', 'https://cdn.discordapp.com/attachments/924904009796583424/1293677689181438053/User_icon.png?ex=67083ebc&is=6706ed3c&hm=b22bd7069f693fda95fd36a2b70ac1ce5d71dc69a2163aef5ce120f5d20959ca&');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `Equipment`
--
ALTER TABLE `Equipment`
  ADD PRIMARY KEY (`ID`);

--
-- 資料表索引 `HouseInfo`
--
ALTER TABLE `HouseInfo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `HouseInfo_Image_FK` (`ImageID`),
  ADD KEY `HouseInfo_Users_FK` (`LandlordID`),
  ADD KEY `FK_HouseInfo_Equipment` (`EquipmentID`);

--
-- 資料表索引 `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`ImageID`);

--
-- 資料表索引 `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Equipment`
--
ALTER TABLE `Equipment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `HouseInfo`
--
ALTER TABLE `HouseInfo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Image`
--
ALTER TABLE `Image`
  MODIFY `ImageID` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `FK_HouseInfo_Equipment` FOREIGN KEY (`EquipmentID`) REFERENCES `Equipment` (`ID`),
  ADD CONSTRAINT `HouseInfo_Image_FK` FOREIGN KEY (`ImageID`) REFERENCES `Image` (`ImageID`),
  ADD CONSTRAINT `HouseInfo_Users_FK` FOREIGN KEY (`LandlordID`) REFERENCES `Users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
