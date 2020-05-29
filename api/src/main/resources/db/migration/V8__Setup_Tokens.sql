-- Model: Make IT Model
-- Version: 4.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: Setup tokens

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table:USER_DEVICE
CREATE TABLE IF NOT EXISTS `make_it`.`USER_DEVICE`
(
    -- Columns
    `id`                 INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `user_id`            INT UNSIGNED     NOT NULL,
    `device_type`        TINYINT UNSIGNED NOT NULL,
    `notification_token` TEXT             NOT NULL,
    `device_id`          TEXT             NOT NULL,
    `is_refresh_active`  BOOLEAN DEFAULT false,

    -- Audit
    `created_at`         TIMESTAMP        NOT NULL,
    `updated_at`         TIMESTAMP        NOT NULL,
    `created_by`         VARCHAR(64)      NOT NULL,
    `updated_by`         VARCHAR(64)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_USER_DEVICE` (`id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_USER_DEVICE_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table:REFRESH_TOKEN
CREATE TABLE IF NOT EXISTS `make_it`.`REFRESH_TOKEN`
(
    -- Columns
    `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `token`          TEXT         NOT NULL,
    `user_device_id` INT UNSIGNED NOT NULL,
    `refresh_count`  INT UNSIGNED NOT NULL DEFAULT 0,
    `expiry_at`      TIMESTAMP    NOT NULL,

    -- Audit
    `created_at`     TIMESTAMP    NOT NULL,
    `updated_at`     TIMESTAMP    NOT NULL,
    `created_by`     VARCHAR(64)  NOT NULL,
    `updated_by`     VARCHAR(64)  NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_REFRESH_TOKEN` (`id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_REFRESH_TOKEN_HAS_USER_DEVICE` FOREIGN KEY (`user_device_id`) REFERENCES `make_it`.`USER_DEVICE` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table:PASSWORD_RESET_TOKEN
CREATE TABLE IF NOT EXISTS `make_it`.`PASSWORD_RESET_TOKEN`
(
    -- Columns
    `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `token`      TEXT         NOT NULL,
    `user_id`    INT UNSIGNED NOT NULL,
    `expiry_at`  TIMESTAMP    NOT NULL,

    -- Audit
    `created_at` TIMESTAMP    NOT NULL,
    `updated_at` TIMESTAMP    NOT NULL,
    `created_by` VARCHAR(64)  NOT NULL,
    `updated_by` VARCHAR(64)  NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_PASSWORD_RESET_TOKEN` (`id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_PASSWORD_RESET_TOKEN_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table:EMAIL_VERIFICATION_TOKEN
CREATE TABLE IF NOT EXISTS `make_it`.`EMAIL_VERIFICATION_TOKEN`
(
    -- Columns
    `id`           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `token`        TEXT             NOT NULL,
    `token_status` TINYINT UNSIGNED NOT NULL,
    `user_id`      INT UNSIGNED     NOT NULL,
    `expiry_at`    TIMESTAMP        NOT NULL,

    -- Audit
    `created_at`   TIMESTAMP        NOT NULL,
    `updated_at`   TIMESTAMP        NOT NULL,
    `created_by`   VARCHAR(64)      NOT NULL,
    `updated_by`   VARCHAR(64)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_EMAIL_VERIFICATION_TOKEN` (`id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_EMAIL_VERIFICATION_TOKEN_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
