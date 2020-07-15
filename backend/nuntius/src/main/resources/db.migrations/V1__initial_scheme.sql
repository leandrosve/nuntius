CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `groupal` bit(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `last_modified` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `chat_user` (
  `chat_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  KEY `FK3my5637ob80l32xwbdgrtvms` (`user_id`),
  KEY `FKd5rjaiv0u3482r2pu22ky6h1v` (`chat_id`),
  CONSTRAINT `FK3my5637ob80l32xwbdgrtvms` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKd5rjaiv0u3482r2pu22ky6h1v` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contact` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `alias` varchar(128) DEFAULT NULL,
  `owner_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmsh6591ksq58093xj52flwlpm` (`owner_id`,`user_id`),
  KEY `FKe07k4jcfdophemi6j1lt84b61` (`user_id`),
  CONSTRAINT `FK3oe6yionegaoidglrl695ey9q` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKe07k4jcfdophemi6j1lt84b61` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `received_time` datetime(6) DEFAULT NULL,
  `seen_time` datetime(6) DEFAULT NULL,
  `sent_time` datetime(6) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `chat_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmejd0ykokrbuekwwgd5a5xt8a` (`chat_id`),
  KEY `FKb3y6etti1cfougkdr0qiiemgv` (`user_id`),
  CONSTRAINT `FKb3y6etti1cfougkdr0qiiemgv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKmejd0ykokrbuekwwgd5a5xt8a` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `biography` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
