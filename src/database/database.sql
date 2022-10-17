CREATE TABLE `ingredients` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `seasons` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `courses` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `menu` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `permissions` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `role` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `lastname` VARCHAR(30) NOT NULL,
    `firstname` VARCHAR(39) NOT NULL,
    `mail` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
    `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
    `permission_id` INT(10) DEFAULT 1 UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE(mail),
    KEY `FK_users_permissions` (`permission_id`),
    CONSTRAINT `FK_users_permissions` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `recipes` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `guests` TINYINT,
    `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
    `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
    `course_id` INT(10) UNSIGNED NOT NULL,
    `season_id` INT(10) UNSIGNED,
    `user_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE(slug),
    KEY `FK_recipes_courses` (`course_id`),
    CONSTRAINT `FK_recipes_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    KEY `FK_recipes_seasons` (`season_id`),
    CONSTRAINT `FK_recipes_seasons` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    KEY `FK_recipes_users` (`user_id`),
    CONSTRAINT `FK_recipes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `steps` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `content` TEXT NOT NULL,
    `recipe_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_steps_recipes` (`recipe_id`),
    CONSTRAINT `FK_steps_recipes` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `images` ( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(250) NOT NULL,
    `alternate_text` VARCHAR(200),
    `recipe_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_images_recipes` (`recipe_id`),
    CONSTRAINT `FK_images_recipes` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ingredients_recipes` (
    `ingredient_id` INT(10) UNSIGNED NOT NULL, 
    `recipe_id` INT(10) UNSIGNED NOT NULL,
    `quantity` DOUBLE NOT NULL,
    PRIMARY KEY (`ingredient_id`, `recipe_id`),
    KEY `FK_ingredients_recipes_ingredients` (`ingredient_id`),
    KEY `FK_ingredients_recipes_recipes` (`recipe_id`),
    CONSTRAINT `FK_ingredients_recipes_ingredients` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_ingredients_recipes_recipes` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;