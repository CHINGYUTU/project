-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 10.104.0.2:3333
-- 產生時間： 2024 年 12 月 19 日 01:32
-- 伺服器版本： 11.5.2-MariaDB-ubu2404
-- PHP 版本： 8.2.25

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
(32, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0),
(33, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0),
(34, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1),
(35, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1),
(36, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1),
(37, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0),
(38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1),
(39, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1),
(40, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(41, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1),
(42, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(44, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(45, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

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
(9, 2, 3, '2024-10-22 13:18:37'),
(10, 2, 5, '2024-10-22 13:18:44'),
(11, 6, 4, '2024-10-24 13:01:48'),
(12, 3, 4, '2024-10-25 05:15:17'),
(13, 2, 30, '2024-10-25 07:12:34'),
(15, 18, 4, '2024-12-12 13:53:44'),
(18, 18, 36, '2024-12-12 17:23:20'),
(19, 18, 5, '2024-12-12 17:23:27'),
(20, 18, 40, '2024-12-12 17:54:18'),
(21, 18, 3, '2024-12-12 17:54:26');

-- --------------------------------------------------------

--
-- 資料表結構 `Feedback`
--

CREATE TABLE `Feedback` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `LandlordID` int(11) NOT NULL,
  `HouseID` int(11) NOT NULL,
  `Stars` int(11) NOT NULL,
  `Message` varchar(150) NOT NULL,
  `ReleaseTime` datetime DEFAULT current_timestamp(),
  `LandlordCheck` int(11) NOT NULL DEFAULT 0,
  `AdminCheck` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Feedback`
--

INSERT INTO `Feedback` (`ID`, `UserID`, `LandlordID`, `HouseID`, `Stars`, `Message`, `ReleaseTime`, `LandlordCheck`, `AdminCheck`) VALUES
(12, 2, 3, 2, 3, 'test', '2024-12-11 16:24:55', 1, 1),
(18, 18, 15, 36, 4, '租屋環境舒適且食衣住行皆很方便，但附近停車位置較不好找', '2024-12-12 17:24:14', -1, 0),
(19, 18, 15, 36, 4, '租屋環境舒適且食衣住行皆很方便，但附近停車位置較不好找', '2024-12-12 17:25:26', 1, 1),
(20, 18, 15, 31, 3, '雖然方便但半夜鄰居經常大吼大叫，也有一些不自然的事情，例如家裡只有我一個人，但廚房會傳來碗盤移動的聲音，請其他租客自行考量。', '2024-12-12 17:37:53', 1, 1),
(21, 18, 15, 40, 5, '風活環境相當不錯，安靜清幽值得5星好評', '2024-12-12 17:55:45', 1, 1);

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
(2, 1, 3, 4, '優質電梯套房，拎包入住(仲介勿擾)', '台中市', '大甲區', '中山路一段792號', '6000', '獨立套房', 5, 'http://image.11236027.me/i/2024/12/04/4blbi.webp', 1, '2F', 2500, '採用歐式城堡風格‧搭配多樣化藝術雕刻‧5000坪高級中庭花園‧5300坪多功能名店城\r\n\r\n社區公設應有盡有‧健身房‧電影院‧游泳池‧SPA館‧KTV‧唯一有全場籃球場的社區\r\n', 2500, '2024-10-13 16:22:42', '可養寵物', 0),
(3, NULL, 13, 3, '大甲全新裝潢套房出租', '台中市', '大甲區', '大甲區中山路908巷', '10000', '分租套房', 20, 'http://image.11236027.me/i/2024/12/04/dhbdjg.webp', 1, '4F', 3000, '大甲 全新裝潢 套房出租 很大間 適合情侶 \r\n\r\n近市區 全新裝潢 變頻冷氣 電視 第四台 網路  附安博盒子 小陽台 房內洗衣機房間 \r\n\r\n歡迎來電約看房。\r\n\r\n\r\n\r\n手機 0919817333 葉小姐\r\n附近有便利商店、傳統市場、公園綠地、學校、醫療機構、夜市。', 3000, '2024-10-13 16:37:26', '最短租期一年，可隨時遷入 此房屋男女皆可租住，不可養寵物，不可開伙', 0),
(4, NULL, 1, 4, '內湖儲物倉庫', '台北市', '內湖區', '內湖區民權東路六段123巷', '39999', '2房1廳2衛', 37.2, 'http://image.11236027.me/i/2024/12/11/12xm1z2.png\r\n', 1, '3F/11F', 1000, '屋內環境\r\n公設超齊全:健身房、KTV、交誼廳、會議室\r\n社區大樓24小時大樓管理員,包裏代收超方便\r\n垃圾集中區,不用煩惱追趕垃圾車\r\n房間每間都有對外窗,室內通風採光超級佳\r\n超寬敞廚房,在家就能做大廚\r\n超多收納空間不怕東西沒地方放\r\n雙衛浴乾溼分離還有免治馬通', 1000, '2024-10-13 16:37:26', '最短租期一年，可隨時遷入 不可養寵物', 0),
(5, NULL, 13, 5, '台中市大安區大安港路邊雅房', '台中市', '大安區', '大安區東西七路二段166號', '5000', '雅房', 8, 'http://image.11236027.me/i/2024/12/11/12v6m04.png', 1, '5F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 0),
(6, NULL, 13, 6, '大里精裝透天起家厝/大家庭首選可貓', '台中市', '大里區', '大里區仁提二街', '37000', '4房3廳4衛', 60, 'http://image.11236027.me/i/2024/12/11/12vehfb.png', 1, '6F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 1),
(7, NULL, 1, 7, '稀有物件大里透天別墅傢俱全', '台中市', '大里區', '大里區仁堤二街73號', '37000', '4房2廳3衛', 60, 'http://image.11236027.me/i/2024/12/11/12vwzkb.png', 1, '7F', 1000, NULL, 1000, '2024-10-13 16:37:26', NULL, 1),
(8, NULL, 1, 8, '中科精美系統裝潢2+1房#可租補', '台中市', '大雅區', '大雅區大林路', '27000', '3房2廳2衛', 30, 'http://image.11236027.me/i/2024/12/11/12whdcc.png', 1, '7F/10F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL, 0),
(9, NULL, 1, 9, '豐藝社區【可寵狗貓】可租補雙車位全配家具', '台中市', '大雅區', '大雅區大林路140巷', '41000', '4房2廳3衛', 61.2, 'http://image.11236027.me/i/2024/12/11/12x2f7y.png', 1, '3F/11F', 5000, NULL, 5000, '2024-10-13 16:37:26', NULL, 0),
(10, NULL, 1, 10, '中科大 一中 火車站 獨洗陽台 超便宜', '台中市', '中區', '中區臺灣大道一段141巷', '6500', '獨立套房', 10, 'http://image.11236027.me/i/2024/12/11/12y7qyl.png', 1, '2F', 3910, NULL, 3910, '2024-10-13 16:37:26', NULL, 0),
(11, NULL, 1, 11, '可租補廣擎天11坪大套房獨洗曬', '台中市', '中區', '中區民權路164號', '7500', '獨立套房', 11, 'http://image.11236027.me/i/2024/10/25/m4m9jd.webp', 1, '4F', 4238, NULL, 4238, '2024-10-13 16:37:26', NULL, 0),
(12, NULL, 1, 12, '樹孝商圈 系統櫃收納 可雙租補全新質感', '台中市', '太平區', '太平區新民路', '10000', '獨立套房', 10, 'http://image.11236027.me/i/2024/10/25/m4ml2s.webp', 1, '3F/11F', 4560, NULL, 4560, '2024-10-13 16:37:26', NULL, 1),
(13, NULL, 1, 13, '青山和園 質感社區可寵大三房 租補戶籍', '台中市', '太平區', '太平區祥順路一段', '26000', '3房2廳2衛', 30, 'http://image.11236027.me/i/2024/10/25/m4mgf6.webp', 1, '5F', 4892, NULL, 4892, '2024-10-13 16:37:26', NULL, 0),
(14, NULL, 1, 14, '全新裝潢 一房一廳 獨洗獨曬 租屋補助', '台中市', '北屯區', '北屯區東山路一段', '14799', '獨立套房', 22, 'http://image.11236027.me/i/2024/10/25/m4mm3t.webp', 1, '6F', 5220, NULL, 5220, '2024-10-13 16:37:26', NULL, 0),
(15, NULL, 1, 15, '超級大空間 獨洗獨曬 租屋補助 電梯套房', '台中市', '北屯區', '北屯區中平路', '9999', '獨立套房', 15, 'http://image.11236027.me/i/2024/10/25/m4mkau.webp', 1, '7F', 5547, NULL, 5547, '2024-10-13 16:37:26', NULL, 0),
(16, NULL, 1, 16, '小資最愛 雙租屋補助 陽台獨洗 機車位', '台中市', '北區', '北區健行路', '10499', '獨立套房', 15, 'http://image.11236027.me/i/2024/10/25/m4mqjs.webp', 1, '7F/10F', 5875, NULL, 5875, '2024-10-13 16:37:26', NULL, 0),
(17, NULL, 1, 17, '小資首選 陽台獨洗 租屋補助 室內機車位', '台中市', '北區', '北區力行路', '8299', '獨立套房', 14, 'http://image.11236027.me/i/2024/10/25/m7mjla.webp', 1, '3F/11F', 6202, NULL, 6202, '2024-10-13 16:37:26', NULL, 0),
(18, NULL, 1, 18, '總管家| 整棟透天 可租補免仲', '台北市', '中山區', '中山區松江路133巷', '23000', '3房2廳3衛', 37.23, 'http://image.11236027.me/i/2024/12/11/12y5utx.png', 1, '2F', 6529, NULL, 6529, '2024-10-13 16:37:26', NULL, 0),
(20, NULL, 1, 20, '租 石岡萬華街臨路透天，5房22000', '台中市', '石岡區', '石岡區萬華街12號', '22000', '5房2廳2衛', 37.95, 'http://image.11236027.me/i/2024/10/25/m7mihh.webp', 1, '3F/11F', 7184, NULL, 7184, '2024-10-13 16:37:26', NULL, 0),
(22, NULL, 1, 22, '超省台電 租屋補助 陽台獨洗流理台 可貓', '台中市', '西屯區', '西屯區長安路二段', '6999', '獨立套房', 13, 'http://image.11236027.me/i/2024/10/25/m7mihh.webp', 1, '6F', 7839, NULL, 7839, '2024-10-13 16:37:26', NULL, 0),
(30, 10, 13, 35, '愛買生活圈', '基隆市', '信義區', '基隆市信義區36巷102弄3樓5號', '10000', '獨立套房', 20, 'http://image.11236027.me/i/2024/10/25/o1a7jv-0.png', 1, '1F', 1, '愛買生活圈，生活機制完善', 1000, '2024-10-25 06:53:39', '最短租期一年，可隨時遷入', 1),
(31, 11, 15, 36, '123', '台中市', '北區', '雙十路一段65號', '6000', '雅房', 24, NULL, 1, '1', 1, '123', 600, '2024-12-12 13:52:47', '123', 1),
(36, 16, 15, 41, '近豐原車站!18坪大套房', '台中市', '豐原區', '中正路1-1號', '12000', '套房', 18, 'http://image.11236027.me/i/0/2024/12/13/1wl3xh-0.png', 1, '8', 1, '-', 1200, '2024-12-12 17:15:40', '距離豐原車站只要一條街，附近百貨公司、夜市都很方便！', 0),
(40, 20, 15, 45, '3層公寓，環境佳近公園', '台中市', '潭子區', '勝利路一段721號', '28000', '3房2聽2衛', 36, 'http://image.11236027.me/i/0/2024/12/13/2iub37-0.png', 1, '3', 1, '-', 0, '2024-12-12 17:53:12', '三層公寓，附近有公園，餐廳飲料店眾多一樓大門可停車', 0);

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
(1, 'http://image.11236027.me/i/2024/12/04/4ame0.webp', 'http://image.11236027.me/i/2024/12/03/12vwn5c.webp', 'http://image.11236027.me/i/2024/12/03/12vx2iy.webp', 'http://image.11236027.me/i/2024/12/03/12vxzio.webp', 'http://image.11236027.me/i/2024/12/04/6oxta.png', 'http://image.11236027.me/i/2024/12/04/6p89s.png', 'http://image.11236027.me/i/2024/12/04/6pjwi.png', 'http://image.11236027.me/i/2024/12/04/6pij5.png'),
(2, 'http://image.11236027.me/i/2024/10/23/10o8jif-0.jpg', 'http://image.11236027.me/i/2024/10/23/10oa9xt-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'http://image.11236027.me/i/2024/10/23/10psk7w-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'http://image.11236027.me/i/2024/10/23/10s557h-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'http://image.11236027.me/i/2024/10/23/10un48w-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'http://image.11236027.me/i/2024/10/23/10ver3s-0.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'http://image.11236027.me/i/2024/10/24/1104sn7-0.png', 'http://image.11236027.me/i/2024/10/24/1104znb-0.png', 'http://image.11236027.me/i/2024/10/24/11055j5-0.png', 'http://image.11236027.me/i/2024/10/24/110guoc-0.webp', 'http://image.11236027.me/i/2024/10/24/110gy34-0.png', 'http://image.11236027.me/i/2024/10/24/110gycu-0.png', 'http://image.11236027.me/i/2024/10/24/110h1vg-0.jpg', ''),
(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'http://image.11236027.me/i/2024/10/25/o1ajmz-0.png', 'http://image.11236027.me/i/2024/10/25/o1aisr-0.png', 'http://image.11236027.me/i/2024/10/25/o1agrj-0.png', 'http://image.11236027.me/i/2024/10/25/o1ao3s-0.png', NULL, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'http://image.11236027.me/i/0/2024/12/13/1t8blx-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tinzm-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tk7hk-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tlvlp-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tnmi0-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tp0l4-0.png', 'http://image.11236027.me/i/0/2024/12/13/1tqugi-0.png', NULL),
(16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `Headshot` varchar(512) DEFAULT 'http://image.11236027.me/i/2024/12/03/zmhzvy.png',
  `Verify` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Users`
--

INSERT INTO `Users` (`ID`, `Name`, `Phone`, `other`, `Email`, `Password`, `Role`, `JoinTime`, `Headshot`, `Verify`) VALUES
(1, 'admin', '0987878787', NULL, 'admin@11236027.me', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'Admin', '2024-10-09 20:02:31', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(2, 'zack', NULL, NULL, 's0903072534@gmail.com', '$2a$12$PKB1ZJ4rwZBWJMZ59BYXve9BMempYHpXL0lsevconGEbEuHN8uaV2', 'User', '2024-10-09 20:02:31', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(3, 'Eric', '0987878787', NULL, 'Eric@ericchen990.me', '$2b$10$YvXYVyWpJlJTiEalXYaRBOLndBF0.S2a3YTmlRVSLy5OoTQmw9BY.', 'Landlord', '2024-10-15 17:50:50', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(4, 'Test', NULL, NULL, 'Test@11236027.me', '$2b$10$/mjSLXpAGa75I7KtzSIxf.6b1rFFiPykFSoGojiCm0t1Hh7zpdQBC', 'User', '2024-10-20 05:24:19', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(5, 'ttt', '0984878787', NULL, 'ttt@11236027.me', '$2b$10$.fGOC./RGGlvy6.8fPOpm.4BF/3KgmupBfqXIL4CLC.sOZP5zvmBG', 'User', '2024-10-24 12:47:22', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(6, 'ericchen', '0984202990', NULL, 'z920110z@gmail.com', '$2b$10$zNQzoE9iRlYTV0q.otDtxubpx3QAZEXPVNyIDhYMvRQRG0hshrVky', 'User', '2024-10-24 12:49:59', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(8, '綠色乖乖', '0987145708', NULL, 't109590003@ntut.org.tw', '$2b$10$Jhg3OaJmgQ/tPBNmbKAWdO.vxBGidsXtf6jyfVjtRVvBevhLKKLJG', 'User', '2024-10-25 02:07:30', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(10, '123', '123456789', NULL, '123@234.com', '$2b$10$u7PnzMKN8jGywoAd0qHgbOUGeq8801NxujIMBLGK/eyCtNzRCUR6.', 'User', '2024-10-25 02:26:25', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(11, '234', '123456780', NULL, '123@123.com', '$2b$10$zTzEN5wxcEQJuRbHITBsd.2OOxjTj25MJy11KBeUkfamPLIw7s9g6', 'User', '2024-10-25 02:28:08', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(12, '123', '1234567890', NULL, 'zck20769@dcobe.com', '$2b$10$jomGs25tLzy9duP11VZkeOVYNHfusy.zySXvHxnSahMQXBD1jcvfq', 'Landlord', '2024-10-25 03:14:41', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(13, 'test', '0989767767', NULL, '11236027@ntub.edu.tw', '$2b$10$v.4wyhxbwmmqXr3/W2PedeuF/gO0X5bEo5GaDe4Cejp4.6c12/cyy', 'Landlord', '2024-10-25 05:28:03', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(14, 'Shainli', '0912001776', NULL, 'Shainli@gmail.com', '$2b$10$7Wqt2LrhjKmy.jG9ptvTY.Y8g.AP2IalspQcwwRz9BqSiy1NFj3z2', 'User', '2024-10-28 10:09:08', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(15, '陳秀芳', '0968955197', NULL, '11236034@ntub.edu.tw', '$2b$10$bbDQiDA4kDlAxW312ae8ROT4z5ifWpxGGWga4QRrNZZe.AIFwMD1m', 'Landlord', '2024-12-03 13:45:18', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(16, 'Test', '0987878787', NULL, 'z920110xc@gmail.com', '$2b$10$0k0I1P23SSYbLzLgHBg0leejrK4QIxSw2RkoUQjfLISBJc1Cp.7ui', 'User', '2024-12-03 13:48:44', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1),
(17, '陳曉鳳', '0983374638', NULL, 'ted920526@gmail.com', '$2b$10$.0PYcYUaqhaVSnzRBny56uAG9CmoLFoaRDmS3AF/9v9b.dy1/2eSe', 'User', '2024-12-03 14:46:12', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 0),
(18, '方麗萍', '0928732191', NULL, 'kloney0062@gmail.com', '$2b$10$5VdvbfignxWo3ZXsPkSMgucfaq1ukiy9vY73kIIkWNK7OXjhoH8Jy', 'User', '2024-12-12 12:25:23', 'http://image.11236027.me/i/2024/12/03/zmhzvy.png', 1);

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
-- 資料表索引 `Feedback`
--
ALTER TABLE `Feedback`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Feedback_Users_FK` (`UserID`),
  ADD KEY `Feedback_Users_FK_1` (`LandlordID`),
  ADD KEY `Feedback_HouseInfo_FK` (`HouseID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Favorites`
--
ALTER TABLE `Favorites`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `HouseInfo`
--
ALTER TABLE `HouseInfo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Image`
--
ALTER TABLE `Image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `Feedback`
--
ALTER TABLE `Feedback`
  ADD CONSTRAINT `Feedback_HouseInfo_FK` FOREIGN KEY (`HouseID`) REFERENCES `HouseInfo` (`ID`),
  ADD CONSTRAINT `Feedback_Users_FK` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`),
  ADD CONSTRAINT `Feedback_Users_FK_1` FOREIGN KEY (`LandlordID`) REFERENCES `Users` (`ID`);

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
