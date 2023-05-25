-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `book_room`;
CREATE TABLE `book_room` (
  `br_id` int NOT NULL AUTO_INCREMENT,
  `re_id` int NOT NULL,
  `user_id` int NOT NULL,
  `book_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `amount_people` int NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`br_id`),
  KEY `re_id` (`re_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `book_room_ibfk_1` FOREIGN KEY (`re_id`) REFERENCES `real_estate` (`re_id`),
  CONSTRAINT `book_room_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `re_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `user_id` (`user_id`),
  KEY `re_id` (`re_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`re_id`) REFERENCES `real_estate` (`re_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(1,	'ktx khu B',	'hcm',	'vietnam',	''),
(2,	'ktx khu A',	'hcm',	'vietnam',	'');

DROP TABLE IF EXISTS `real_estate`;
CREATE TABLE `real_estate` (
  `re_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` enum('rooms','castles','beachfront','iconiccities','desert','omg','adapted','hanoks','amazingpools','lakefront','amazingviews') NOT NULL,
  `images` json NOT NULL,
  `location_id` int NOT NULL,
  `capacity` int NOT NULL,
  `room_amount` int NOT NULL,
  `bed_amount` int NOT NULL,
  `bathroom_amount` int NOT NULL,
  `description` varchar(2000) NOT NULL,
  `price` int NOT NULL,
  `washingmachine` tinyint(1) NOT NULL,
  `iron` tinyint(1) NOT NULL,
  `television` tinyint(1) NOT NULL,
  `airconditioner` tinyint(1) NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `kitchen` tinyint(1) NOT NULL,
  `parkinglot` tinyint(1) NOT NULL,
  `pool` tinyint(1) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`re_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `real_estate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `real_estate` (`re_id`, `user_id`, `name`, `type`, `images`, `location_id`, `capacity`, `room_amount`, `bed_amount`, `bathroom_amount`, `description`, `price`, `washingmachine`, `iron`, `television`, `airconditioner`, `wifi`, `kitchen`, `parkinglot`, `pool`, `created`, `updated`) VALUES
(1,	1,	'the big room',	'rooms',	'\"\"',	3,	1,	3,	2,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 08:04:05',	NULL),
(2,	1,	'The villa has sea view',	'beachfront',	'\"168492088490215f7a777-b92e-49f4-9328-0dcd605cedb2V.png_1684920884903a0f5913c-01f3-4463-aae7-a1ce1f9d66aefatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	200000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:34:45',	NULL),
(3,	1,	'The villa has sea view2',	'beachfront',	'\"16849209054174c97740f-fd4f-471d-94b1-214b4df4692bV.png_16849209054180a245d12-f054-4d39-bfe4-f131797369d4fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	300000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:35:05',	NULL),
(6,	1,	'Rooms so beautiful',	'beachfront',	'\"1684920964809091f98df-d416-4c2f-a3fa-fd9dd5f294cdV.png_16849209648090d47ff9e-efa5-4543-ab2c-21bfb1946a4bfatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:05',	NULL),
(7,	1,	'Rooms so beautiful',	'beachfront',	'\"168492096609468cc747a-e7ab-4c36-8853-1669c0eca68aV.png_168492096609456ce976c-9a15-431d-8b05-c7321b982c71fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	230000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:06',	NULL),
(8,	1,	'Rooms so beautiful',	'beachfront',	'\"16849209676184aad6673-6664-4afc-9cd4-5fa1f48171ecV.png_1684920967618d69778fc-bf90-4340-8770-4949759707fafatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:08',	NULL),
(9,	1,	'House beautiful',	'beachfront',	'\"16849209852732f15e0fa-e579-4d5f-9074-e7be2a631ea9V.png_16849209852739ee2751a-26a1-4abd-970c-477534d1d944fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	700000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:25',	NULL),
(10,	1,	'House beautiful',	'beachfront',	'\"1684920986212ae084b02-a69d-40c0-a3fd-29e254cd06b0V.png_1684920986212703170fe-6700-47ce-8471-12e9587ac483fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	800000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:26',	NULL),
(11,	1,	'House beautiful',	'beachfront',	'\"1684920987265f02f8817-cd2e-4eef-bef3-2ba17dcd373eV.png_16849209872660172f79f-1f9b-4661-b8a7-f0ddbf91d8c3fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	134000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:27',	NULL),
(12,	1,	'House beautiful',	'beachfront',	'\"168500494785985335b04-0701-4a01-bea4-dd50fa649871V.png_168500494786844a6bf4a-999f-4159-b01d-129427487a02V.png_1685004947869471ed992-1e2e-4e34-9dec-50429d646cb0V.png_16850049478709c0a8f76-ef9e-4454-93cf-d4c3da5da39eV.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 08:55:48',	NULL),
(13,	1,	'House beautiful',	'beachfront',	'\"1685005550208aaa50537-02be-4817-bd5c-832fb18c34ffV.png_1685005550208f4b2993b-2117-41f6-87b7-66317ca3efddV.png_1685005550209bd04d4c6-fa51-4512-a37e-e5113696af50V.png_16850055502158f6ead3c-ada1-4019-9c37-9b622e62e296V.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 09:05:50',	NULL),
(14,	1,	'House beautiful',	'beachfront',	'\"168500562679924571974-2f55-4346-8eb0-937231cc86a3V.png_168500562679954d587da-da7f-424f-a9c3-07f441028ddfV.png_1685005626800d8760d0e-7e9a-4034-b04e-6f19ce285e2cV.png_168500562680015f0ddf3-0551-4d57-a7cd-04fb75ab912cV.png_16850056268046230238a-051c-46b7-b665-55d9124a2b7aV.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 09:07:07',	NULL);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`user_id`, `full_name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `created`, `updated`) VALUES
(1,	'admin',	'admin@gmail.com',	'$2b$10$9u370uewFq7GbbJ/mMmZK.ceT0WwDdOJxdwxIw/GHAuLmnSf6IUXK',	'0346128692',	NULL,	'female',	'user',	'2023-05-24 07:45:45',	NULL);

-- 2023-05-25 11:51:04
