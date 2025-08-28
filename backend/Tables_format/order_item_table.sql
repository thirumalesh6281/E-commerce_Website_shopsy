CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `status` enum('pending','delivered') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`)
);
