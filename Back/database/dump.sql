/* Création de la table `User` */
DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users`(
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `lastname` varchar(40),
    `firstname` varchar(40),
    `login` varchar(30) NOT NULL UNIQUE,
    `password` varchar(60) NOT NULL,
    PRIMARY KEY (`id`)
);

/* Insertion d'un utilisateur avec le role admin dans la table `User`*/
INSERT INTO `Users` (`id`, `lastname`, `firstname`,`login`, `password`) VALUES
('1', 'Admin', 'Admin', 'admin', '$2y$10$OgGilVcpTrARPRsrx8YZf.GRCGW3EAugei7htlwYaGDdbROVRY2pu');


/* Création de la table `Post` */
DROP TABLE IF EXISTS `Post`;
CREATE TABLE IF NOT EXISTS `Post` (
    `id` integer NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `authorId` int NOT NULL,
    `created_at` datetime DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`authorId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

/* Insertion d'un post du compte Admin dans la table `Post` */
INSERT INTO `Post` (`id`,`title`, `content`, `authorId`,`created_at`,`updated_at`) VALUES
(1,'Premier Post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra massa sit amet gravida tempus. Etiam mattis varius ipsum et viverra. Fusce sit amet bibendum eros, vel varius quam. Maecenas.',1, '2022-12-10 14:15:24', '2022-12-10 14:15:24');