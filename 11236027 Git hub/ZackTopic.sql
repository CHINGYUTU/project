-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 10.1.1.3:3333
-- 產生時間： 2024 年 10 月 23 日 14:40
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
(25, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0),
(26, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(27, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(28, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(29, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(30, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(31, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(32, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `Favorites`
--

CREATE TABLE `Favorites` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `HouseID` int(11) NOT NULL,
  `Creation_Time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Favorites`
--

INSERT INTO `Favorites` (`ID`, `UserID`, `HouseID`, `Creation_Time`) VALUES
(5, 3, 2, '2024-10-22 13:11:45'),
(6, 3, 3, '2024-10-22 13:11:52'),
(7, 3, 5, '2024-10-22 13:12:00'),
(8, 2, 2, '2024-10-22 13:18:30'),
(9, 2, 3, '2024-10-22 13:18:37'),
(10, 2, 5, '2024-10-22 13:18:44');

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
  `Verify` tinyint(1) NOT NULL DEFAULT 0 COMMENT '核准狀態',
  `Floor` varchar(10) DEFAULT NULL COMMENT '樓層',
  `Deposit` int(11) DEFAULT NULL COMMENT '押金',
  `Introduction` varchar(512) DEFAULT NULL COMMENT '簡介',
  `ManagementFee` int(11) DEFAULT NULL COMMENT '管理費',
  `ReleaseTime` datetime DEFAULT current_timestamp() COMMENT '發布時間',
  `RentalInstructions` varchar(50) DEFAULT NULL COMMENT '租賃須知',
  `Rent` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `HouseInfo`
--

INSERT INTO `HouseInfo` (`ID`, `ImageID`, `LandlordID`, `EquipmentID`, `Title`, `City`, `Area`, `Address`, `Price`, `Pattern`, `Size`, `MainPic`, `Verify`, `Floor`, `Deposit`, `Introduction`, `ManagementFee`, `ReleaseTime`, `RentalInstructions`, `Rent`) VALUES
(1, 1, 1, 1, '愛買生活圈', '基隆市', '信義區', '深溪路36巷102弄5號3樓', '1000000', '3房2廳2衛', 30.5, 'http://image.11236027.me/i/2024/10/20/w97bi9.webp', 1, '3F/10F', 2, '不知道說啥好', 1000, '2024-10-13 08:44:09', '最短租期一年，可隨時遷入', 0),
(2, 1, 3, 4, '優質電梯套房，拎包入住(仲介勿擾)', '台中市', '大甲區', '中山路一段792號', '6000', '獨立套房', 5, 'http://image.11236027.me/i/2024/10/20/w97u10.webp', 1, '2F', 2500, '採用歐式城堡風格‧搭配多樣化藝術雕刻‧5000坪高級中庭花園‧5300坪多功能名店城\r\n\r\n社區公設應有盡有‧健身房‧電影院‧游泳池‧SPA館‧KTV‧唯一有全場籃球場的社區\r\n', 2500, '2024-10-13 16:22:42', '可養寵物', 0),
(3, NULL, 1, 3, '大甲全新裝潢套房出租', '台中市', '大甲區', '大甲區中山路908巷', '10000', '分租套房', 20, 'http://image.11236027.me/i/2024/10/20/w97p30.webp', 1, '4F', 3000, '大甲 全新裝潢 套房出租 很大間 適合情侶 \r\n\r\n近市區 全新裝潢 變頻冷氣 電視 第四台 網路  附安博盒子 小陽台 房內洗衣機房間 \r\n\r\n歡迎來電約看房。\r\n\r\n\r\n\r\n手機 0919817333 葉小姐\r\n附近有便利商店、傳統市場、公園綠地、學校、醫療機構、夜市。', 3000, '2024-10-13 16:37:26', '最短租期一年，可隨時遷入 此房屋男女皆可租住，不可養寵物，不可開伙', 0),
(4, NULL, 1, 4, '大安儲物倉庫', '台北市', '內湖區', '內湖區民權東路六段123巷', '39999', '2房1廳2衛', 37.2, 'http://image.11236027.me/i/2024/10/20/w982y3.webp\r\n', 1, '3F/11F', 1000, '屋內環境\r\n公設超齊全:健身房、KTV、交誼廳、會議室\r\n社區大樓24小時大樓管理員,包裏代收超方便\r\n垃圾集中區,不用煩惱追趕垃圾車\r\n房間每間都有對外窗,室內通風採光超級佳\r\n超寬敞廚房,在家就能做大廚\r\n超多收納空間不怕東西沒地方放\r\n雙衛浴乾溼分離還有免治馬通', 1000, '2024-10-13 16:37:26', '最短租期一年，可隨時遷入 不可養寵物', 0),
(5, NULL, 1, 5, '台中市大安區大安港路邊雅房', '台中市', '大安區', '大安區東西七路二段166號', '5000', '雅房', 8, NULL, 1, '5F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 0),
(6, NULL, 1, 6, '大里精裝透天起家厝/大家庭首選可貓', '台中市', '大里區', '大里區仁提二街', '37000', '4房3廳4衛', 60, NULL, 1, '6F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 1),
(7, NULL, 1, 7, '稀有物件大里透天別墅傢俱全', '台中市', '大里區', '大里區仁堤二街73號', '37000', '4房2廳3衛', 60, NULL, 1, '7F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 1),
(8, NULL, 1, 8, '中科精美系統裝潢2+1房#可租補', '台中市', '大雅區', '大雅區大林路', '27000', '3房2廳2衛', 30, NULL, 1, '7F/10F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL, 0),
(9, NULL, 1, 9, '豐藝社區【可寵狗貓】可租補雙車位全配家具', '台中市', '大雅區', '大雅區大林路140巷', '41000', '4房2廳3衛', 61.2, NULL, 1, '3F/11F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL, 0),
(10, NULL, 1, 10, '中科大 一中 火車站 獨洗陽台 超便宜', '台中市', '中區', '中區臺灣大道一段141巷', '6500', '獨立套房', 10, NULL, 1, '2F', 3910, NULL, 3910, '2024-10-13 16:37:26', NULL, 0),
(11, NULL, 1, 11, '可租補廣擎天11坪大套房獨洗曬', '台中市', '中區', '中區民權路164號', '7500', '獨立套房', 11, NULL, 1, '4F', 4238, NULL, 4238, '2024-10-13 16:37:26', NULL, 0),
(12, NULL, 1, 12, '樹孝商圈 系統櫃收納 可雙租補全新質感', '台中市', '太平區', '太平區新民路', '10000', '獨立套房', 10, NULL, 1, '3F/11F', 4560, NULL, 4560, '2024-10-13 16:37:26', NULL, 1),
(13, NULL, 1, 13, '青山和園 質感社區可寵大三房 租補戶籍', '台中市', '太平區', '太平區祥順路一段', '26000', '3房2廳2衛', 30, NULL, 1, '5F', 4892, NULL, 4892, '2024-10-13 16:37:26', NULL, 0),
(14, NULL, 1, 14, '全新裝潢 一房一廳 獨洗獨曬 租屋補助', '台中市', '北屯區', '北屯區東山路一段', '14799', '獨立套房', 22, NULL, 1, '6F', 5220, NULL, 5220, '2024-10-13 16:37:26', NULL, 0),
(15, NULL, 1, 15, '超級大空間 獨洗獨曬 租屋補助 電梯套房', '台中市', '北屯區', '北屯區中平路', '9999', '獨立套房', 15, NULL, 1, '7F', 5547, NULL, 5547, '2024-10-13 16:37:26', NULL, 0),
(16, NULL, 1, 16, '小資最愛 雙租屋補助 陽台獨洗 機車位', '台中市', '北區', '北區健行路', '10499', '獨立套房', 15, NULL, 1, '7F/10F', 5875, NULL, 5875, '2024-10-13 16:37:26', NULL, 0),
(17, NULL, 1, 17, '小資首選 陽台獨洗 租屋補助 室內機車位', '台中市', '北區', '北區力行路', '8299', '獨立套房', 14, NULL, 1, '3F/11F', 6202, NULL, 6202, '2024-10-13 16:37:26', NULL, 0),
(18, NULL, 1, 18, '總管家| 近麗寶整棟透天 可租補免仲', '台中市', '外埔區', '外埔區外埔路360巷', '23000', '3房2廳3衛', 37.23, NULL, 1, '2F', 6529, NULL, 6529, '2024-10-13 16:37:26', NULL, 0),
(20, NULL, 1, 20, '租 石岡萬華街臨路透天，5房22000', '台中市', '石岡區', '石岡區萬華街12號', '22000', '5房2廳2衛', 37.95, NULL, 1, '3F/11F', 7184, NULL, 7184, '2024-10-13 16:37:26', NULL, 0),
(22, NULL, 1, 22, '超省台電 租屋補助 陽台獨洗流理台 可貓', '台中市', '西屯區', '西屯區長安路二段', '6999', '獨立套房', 13, NULL, 1, '6F', 7839, NULL, 7839, '2024-10-13 16:37:26', NULL, 0),
(26, 6, 3, 31, 'asdasd', 'Taipei', '南港區', 'asd', '12312', 'asdasdas', 312312, 'http://image.11236027.me/i/2024/10/23/10uiqwu-0.jpg', 0, 'da', 1, 'asdad', 3123, '2024-10-23 14:28:28', 'adasd', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `Image`
--

CREATE TABLE `Image` (
  `ID` int(11) NOT NULL,
  `Pic1` varchar(512) DEFAULT NULL,
  `Pic2` varchar(512) DEFAULT NULL,
  `Pic3` varchar(512) DEFAULT NULL,
  `Pic4` varchar(512) DEFAULT NULL,
  `Pic5` varchar(512) DEFAULT NULL,
  `Pic6` varchar(512) DEFAULT NULL,
  `Pic7` varchar(512) DEFAULT NULL,
  `Pic8` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Image`
--

INSERT INTO `Image` (`ID`, `Pic1`, `Pic2`, `Pic3`, `Pic4`, `Pic5`, `Pic6`, `Pic7`, `Pic8`) VALUES
(1, 'http://image.11236027.me/i/2024/10/22/12lbmhb.webp\r\n', 'http://image.11236027.me/i/2024/10/22/12mss0x.webp', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734786656047184/image.png?ex=671457ce&is=6713064e&hm=b95c4a4c4de82932f8bd3dc53d04685e290829cb3e279e91f151b9fcd8a9008f&', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734747733164117/IMG_2779.jpg?ex=671457c5&is=67130645&hm=c92c997421103dafe809d90a17920d47da36be1c1682e1f0f9d7a13816b1b4e8&', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734706049908828/0004580340_B.jpg?ex=671457bb&is=6713063b&hm=4238047ee97959792aac8765179ca4e7e1deaeba5eea8d39343e2a021bc4fe7f&', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734662106452068/9c6d08f713fa5c6d511922898a4a7de4.png?ex=671457b1&is=67130631&hm=394715c5a6a02d91249e8ab713f3f36e762c959b3df17e6e4051c3bac62be292&', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734598973784105/t2.webp?ex=671457a1&is=67130621&hm=1169cf7c8df347e92a6a84b4fcc8163efeb13aa306e9a1cf1308c771c4a74119&', 'https://cdn.discordapp.com/attachments/1295725943406592135/1295734484876132352/IMG_3093.png?ex=67145786&is=67130606&hm=3d09b364277ffeb9a047e7c018108485d4987bfa6010e8c129dfd58c9d8e96dc&'),
(2, 'http://image.11236027.me/i/2024/10/23/10o8jif-0.jpg', 'http://image.11236027.me/i/2024/10/23/10oa9xt-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'http://image.11236027.me/i/2024/10/23/10psk7w-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'http://image.11236027.me/i/2024/10/23/10s557h-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'http://image.11236027.me/i/2024/10/23/10un48w-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'http://image.11236027.me/i/2024/10/23/10ver3s-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `Role` enum('Admin','User','Landlord') NOT NULL DEFAULT 'User',
  `JoinTime` datetime DEFAULT current_timestamp(),
  `Headshot` varchar(512) DEFAULT 'http://image.11236027.me/app/thumb.php?img=/i/2024/10/20/vzs370.png',
  `Verify` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Users`
--

INSERT INTO `Users` (`ID`, `Name`, `Phone`, `other`, `Email`, `Password`, `Role`, `JoinTime`, `Headshot`, `Verify`) VALUES
(1, 'admin', '0987878787', NULL, 'admin@11236027.me', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'Admin', '2024-10-09 20:02:31', 'http://image.11236027.me/app/thumb.php?img=/i/2024/10/20/w34itp.png', 1),
(2, 'zack', NULL, NULL, 's0903072534@gmail.com', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'User', '2024-10-09 20:02:31', 'http://image.11236027.me/app/thumb.php?img=/i/2024/10/20/vzs370.png', 0),
(3, 'Eric', '0987878787', NULL, 'Eric@ericchen990.me', '$2b$10$YvXYVyWpJlJTiEalXYaRBOLndBF0.S2a3YTmlRVSLy5OoTQmw9BY.', 'Landlord', '2024-10-15 17:50:50', 'http://image.11236027.me/app/thumb.php?img=/i/2024/10/20/w22zme.jpg', 1),
(4, 'Test', NULL, NULL, 'Test@11236027.me', '$2b$10$/mjSLXpAGa75I7KtzSIxf.6b1rFFiPykFSoGojiCm0t1Hh7zpdQBC', 'User', '2024-10-20 05:24:19', 'http://image.11236027.me/app/thumb.php?img=/i/2024/10/20/vzs370.png', 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `Equipment`
--
ALTER TABLE `Equipment`
  ADD PRIMARY KEY (`ID`);

--
-- 資料表索引 `Favorites`
--
ALTER TABLE `Favorites`
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
  ADD PRIMARY KEY (`ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Favorites`
--
ALTER TABLE `Favorites`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `HouseInfo`
--
ALTER TABLE `HouseInfo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Image`
--
ALTER TABLE `Image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `HouseInfo`
--
ALTER TABLE `HouseInfo`
  ADD CONSTRAINT `FK_HouseInfo_Equipment` FOREIGN KEY (`EquipmentID`) REFERENCES `Equipment` (`ID`),
  ADD CONSTRAINT `HouseInfo_Image_FK` FOREIGN KEY (`ImageID`) REFERENCES `Image` (`ID`),
  ADD CONSTRAINT `HouseInfo_Users_FK` FOREIGN KEY (`LandlordID`) REFERENCES `Users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
