-- Model: Make IT Model
-- Version: 3.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: User tag and skill migration

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table: USER_SKILL
CREATE TABLE IF NOT EXISTS `make_it`.`USER_SKILL`
(
    -- Columns
    `user_id`  INT UNSIGNED   NOT NULL,
    `skill_id` INT UNSIGNED   NOT NULL,
    `rating`   DECIMAL(19, 2) NOT NULL DEFAULT 0.0,

    -- ID
    PRIMARY KEY(`user_id`,`skill_id`),
    UNIQUE INDEX `PK_USER_SKILL_IDX` (`user_id`,`skill_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_SKILL_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT `FK_USER_HAS_SKILL` FOREIGN KEY (`skill_id`) REFERENCES `make_it`.`SKILL` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: SKILL
CREATE TABLE IF NOT EXISTS `make_it`.`SKILL`
(
    -- Columnns
    `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(32)    NOT NULL,
    `description`   TEXT(500)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_SKILL_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_NAME_IDX` (`name` ASC)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: USER_TAG
CREATE TABLE IF NOT EXISTS  `make_it`.`USER_TAG`
(
    -- Columns
    `user_id`      INT UNSIGNED NOT NULL,
    `tag_id`       INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY(`user_id`,`tag_id`),
    UNIQUE INDEX `PK_USER_TAG_IDX` (`user_id`,`tag_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_TAG_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT `FK_USER_HAS_TAG` FOREIGN KEY (`tag_id`) REFERENCES `make_it`.`TAG` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: TAG
CREATE TABLE IF NOT EXISTS `make_it`.`TAG`
(
    -- Columns
    `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(32)    NOT NULL,
    `description`   TEXT(500)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_TAG_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_NAME_IDX` (`name` ASC)
)
;
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;



