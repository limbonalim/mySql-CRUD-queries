-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: office
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Компьютерное оборудование','Принтеры,сканнеры, проекторы и экраны'),(3,'Компьютеры','Ноутбуки, ПК'),(5,'Мебель',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category` int NOT NULL,
  `point` int NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `data_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `items_categories_id_fk` (`category`),
  KEY `items_points_id_fk` (`point`),
  CONSTRAINT `items_categories_id_fk` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  CONSTRAINT `items_points_id_fk` FOREIGN KEY (`point`) REFERENCES `points` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5469 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Ноутбук Lenovo V14-82C2 Intel N4020 1.1-2.8GHz,4GB,1TB',3,1,NULL,NULL,'2024-01-30 09:01:58'),(2,'Проектор Xiaomi Wanbo Projector X1 PRO LED 1280x720,350 ANSI lm,USB,HDMI,AV,WIFI,Jack 3.5mm',2,2,NULL,NULL,'2024-01-30 09:01:58'),(3,'Экран моторизированный Deluxe DLS-E229х185, Настенный/потолочный, Рабочая поверхность 221х125 см., 16:9, Matt white, Белый',2,2,NULL,'Требуется замена экрана','2024-01-30 09:01:58'),(4,'Ноутбук Lenovo V14-82C2 Intel N4020 1.1-2.8GHz,4GB,1TB',3,2,NULL,'Требуется замена термо пасты ','2024-01-30 09:01:58'),(5,'Проектор Xiaomi Wanbo Projector T2 Max LED 1920x1080,250 ANSI lm,USB,HDMI,AV,Bluetooth,WIFI,Android',2,3,NULL,NULL,'2024-01-30 09:01:58'),(45,'Стол',5,1,NULL,NULL,'2024-01-30 09:01:58'),(67,'Большой стол',5,2,NULL,NULL,'2024-01-30 09:01:58'),(102,'Кресло',5,1,NULL,NULL,'2024-01-30 09:01:58'),(112,'Компьютер',3,3,NULL,'\nПроцессор Intel Core i3-12100, MB LGA1700 ASUS H610M-R-SI D4, DDR4 8GB PC-21300 (2666MHz) KINGSTON KVR26N19S8/8 X2','2024-01-30 09:01:58'),(243,'Ноутбук Lenovo V14-82C2 Intel N4020 1.1-2.8GHz,4GB,1TB',3,4,NULL,NULL,'2024-01-30 09:01:58'),(344,'Экран для проектора Ultra Pixel 213x213 manual настенный',2,3,NULL,NULL,'2024-01-30 09:01:58'),(543,'Большой стол',5,3,NULL,NULL,'2024-01-30 09:01:58'),(5468,'Стол',5,4,NULL,NULL,'2024-01-30 09:01:58');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points`
--

DROP TABLE IF EXISTS `points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points`
--

LOCK TABLES `points` WRITE;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` VALUES (1,'Главный офис, кабинет №102',NULL),(2,'Главный офис, конференц зал № 2','Заподное крыло'),(3,'Главный офис, конференц зал № 1','Восточное крыло'),(4,'Склад','ул. Дружбы д. 102/3');
/*!40000 ALTER TABLE `points` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-30 15:04:57
