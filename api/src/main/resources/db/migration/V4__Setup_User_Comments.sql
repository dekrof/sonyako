-- Model: Make IT Model
-- Version: 4.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: User tag and skill migration

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table: USER_COMMENT
CREATE TABLE IF NOT EXISTS `make_it`.`USER_COMMENT`
(
    -- Columns
    `user_id`    INT UNSIGNED NOT NULL,
    `comment_id` INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`user_id`, `comment_id`),
    UNIQUE INDEX `PK_USER_COMMENT_IDX` (`user_id`, `comment_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_COMMENT_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT `FK_USER_HAS_COMMENT` FOREIGN KEY (`comment_id`) REFERENCES `make_it`.`COMMENT` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table:COMMENT
CREATE TABLE IF NOT EXISTS `make_it`.`COMMENT`
(
    -- Columns
    `id`                INT UNSIGNED NOT NULL,
    `commentator_id`    INT UNSIGNED NOT NULL,
    `parent_comment_id` INT UNSIGNED NOT NULL,
    `comment_text`      VARCHAR(255) NOT NULL,
    `comment_col`       VARCHAR(45),

    -- Audit
    `created_at`        TIMESTAMP    NOT NULL,
    `updated_at`        TIMESTAMP    NOT NULL,
    `created_by`        VARCHAR(64)  NOT NULL,
    `updated_by`        VARCHAR(64)  NOT NULL,

    -- ID
    PRIMARY KEY (`id`),

    -- FK
    CONSTRAINT `FK_PARENT_COMMENT_HAS_COMMENT` FOREIGN KEY (`parent_comment_id`) REFERENCES `make_it`.`COMMENT` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;


