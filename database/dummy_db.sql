-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2022 at 06:58 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_article`
--

CREATE TABLE `tb_article` (
  `id` int(5) NOT NULL,
  `articleheader` varchar(60) NOT NULL,
  `articletext` text NOT NULL,
  `upload_date` date NOT NULL,
  `uploader` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_article`
--

INSERT INTO `tb_article` (`id`, `articleheader`, `articletext`, `upload_date`, `uploader`) VALUES
(39, 'Ikas', 'Ambra', '0000-00-00', '2022-5-12'),
(40, 'dasd', 'dasda', '2022-05-11', 'null'),
(41, 'dasda', 'dasdad', '2022-05-11', 'null'),
(42, 'dfasfadfawefa', 'sfasfadfaf', '2022-05-11', 'null'),
(46, 'cxzcxz', 'xczcz', '2022-05-11', 'null'),
(47, 'cxzcxz', 'czxcxzc', '2022-05-11', 'null'),
(51, 'dasdsa', 'sdada', '2022-05-11', 'Serpent'),
(52, 'dasdas', 'dsadad', '2022-05-11', 'Serpent'),
(53, 'dasda', 'dasdaadsasd', '2022-05-11', 'Serpent'),
(54, 'Nexion', 'Laser beam and thing.', '2022-05-12', 'Serpent'),
(55, 'dsad', 'dasda', '2022-05-12', 'Serpent');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`) VALUES
(1, 'Alpha', 'magucka'),
(2, 'Aleph', 'horin'),
(3, 'Banbano', 'helix'),
(17, 'Darma', 'Dambala'),
(18, 'Damra', 'Dambala'),
(19, 'Jumanji', 'juju'),
(21, 'Serpent', 'Uc52kDRBgiqKPUp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_article`
--
ALTER TABLE `tb_article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_article`
--
ALTER TABLE `tb_article`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
