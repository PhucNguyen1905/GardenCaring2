-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2022 at 10:12 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `garden_caring`
--

-- --------------------------------------------------------

--
-- Table structure for table `changelimit`
--

CREATE TABLE `changelimit` (
  `DEVICEID` int(11) NOT NULL,
  `TIMEUPDATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `TYPE` varchar(100) NOT NULL,
  `NEWVALUE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(100) NOT NULL,
  `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`ID`, `TYPE`, `NAME`) VALUES
(1, 'Light', 'Light 1'),
(2, 'Pump', 'Pump 1'),
(3, 'Dome', 'Dome 1'),
(4, 'Tempsen', 'Temp Sensor 1'),
(5, 'Moistsen', 'Moist Sensor 1');

-- --------------------------------------------------------

--
-- Table structure for table `outputdevice`
--

CREATE TABLE `outputdevice` (
  `DEVICEID` int(11) NOT NULL,
  `STATUS` varchar(100) NOT NULL DEFAULT 'off',
  `MODE` varchar(100) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `outputdevice`
--

INSERT INTO `outputdevice` (`DEVICEID`, `STATUS`, `MODE`) VALUES
(1, 'off', 'no'),
(2, 'off', 'no'),
(3, 'off', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `SENSORID` int(11) NOT NULL,
  `UPLIMIT` int(11) NOT NULL,
  `LOWLIMIT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`SENSORID`, `UPLIMIT`, `LOWLIMIT`) VALUES
(4, 45, 20),
(5, 90, 50);

-- --------------------------------------------------------

--
-- Table structure for table `update`
--

CREATE TABLE `update` (
  `DEVICEID` int(11) NOT NULL,
  `TIMEUPDATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `CHANGE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `ADAKEY` varchar(100) NOT NULL,
  `ADANAME` varchar(100) NOT NULL,
  `GMAIL` varchar(100) NOT NULL,
  `ADDRESS` varchar(500) NOT NULL,
  `FNAME` varchar(100) NOT NULL,
  `LNAME` varchar(100) NOT NULL,
  `PHONE` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `ADAKEY`, `ADANAME`, `GMAIL`, `ADDRESS`, `FNAME`, `LNAME`,`PHONE`) VALUES
(1, 'aio_DDdA88zcsN2lN3b7sVZNqFLdjZeO', 'PhucBKU', 'user1@gmail.com', '268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh', 'Phuc', 'Nguyen','0388542487');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `changelimit`
--
ALTER TABLE `changelimit`
  ADD PRIMARY KEY (`DEVICEID`,`TIMEUPDATE`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `outputdevice`
--
ALTER TABLE `outputdevice`
  ADD PRIMARY KEY (`DEVICEID`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`SENSORID`);

--
-- Indexes for table `update`
--
ALTER TABLE `update`
  ADD PRIMARY KEY (`DEVICEID`,`TIMEUPDATE`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`,`ADANAME`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `changelimit`
--
ALTER TABLE `changelimit`
  ADD CONSTRAINT `CHANGELIMIT_ibfk_1` FOREIGN KEY (`DEVICEID`) REFERENCES `device` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `outputdevice`
--
ALTER TABLE `outputdevice`
  ADD CONSTRAINT `OUTPUTDEVICE_ibfk_1` FOREIGN KEY (`DEVICEID`) REFERENCES `device` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `SENSOR_ibfk_1` FOREIGN KEY (`SENSORID`) REFERENCES `device` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `update`
--
ALTER TABLE `update`
  ADD CONSTRAINT `UPDATE_ibfk_2` FOREIGN KEY (`DEVICEID`) REFERENCES `device` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
