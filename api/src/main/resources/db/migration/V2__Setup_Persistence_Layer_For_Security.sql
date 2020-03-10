-- Model: Make IT Model
-- Version: 2.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: Setup Persistence Layer For Security

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table: USER
CREATE TABLE IF NOT EXISTS `make_it`.`USER`
(
    -- Columns
    `id`                INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `username`          VARCHAR(64)      NOT NULL,
    `password`          VARCHAR(255)     NOT NULL,
    `profile_id`        INT UNSIGNED     NOT NULL,
    `user_type`         TINYINT UNSIGNED NOT NULL,
    `is_active`         BOOLEAN DEFAULT false,
    `is_email_verified` BOOLEAN DEFAULT false,

    -- Audit
    `created_at`      TIMESTAMP        NOT NULL,
    `updated_at`      TIMESTAMP        NOT NULL,
    `created_by`      VARCHAR(64)      NOT NULL,
    `updated_by`      VARCHAR(64)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_USER_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_USERNAME_IDX` (`username` ASC),
    UNIQUE INDEX `UQ_PASSWORD_IDX` (`password` ASC),

    -- FK
    CONSTRAINT `FK_USER_HAS_PROFILE` FOREIGN KEY (`profile_id`) REFERENCES `make_it`.`PROFILE` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: ROLE
CREATE TABLE IF NOT EXISTS `make_it`.`ROLE`
(
    -- Columns
    `id`        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(25)  NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_ROLE_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_ROLE_NAME_IDX` (`role_name` ASC)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: PROFILE
CREATE TABLE IF NOT EXISTS `make_it`.`PROFILE`
(
    -- Columns
    `id`              INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `status`          TINYINT UNSIGNED NOT NULL,
    `name`            VARCHAR(32)      NOT NULL,
    `patronymic_name` VARCHAR(32)      NULL DEFAULT NULL,
    `surname`         VARCHAR(32)      NOT NULL,
    `birthday`        DATE             NOT NULL,
    `email`           VARCHAR(64)      NOT NULL,
    `phone_number`    CHAR(12)         NOT NULL,
    `avatar_url`      VARCHAR(255)     NULL DEFAULT NULL,
    `address_id`      INT UNSIGNED     NOT NULL,

    -- Audit
    `created_at`      TIMESTAMP        NOT NULL,
    `updated_at`      TIMESTAMP        NOT NULL,
    `created_by`      VARCHAR(64)      NOT NULL,
    `updated_by`      VARCHAR(64)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_PROFILE_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_EMAIL_IDX` (`email` ASC),
    UNIQUE INDEX `UQ_PHONE_NUMBER_IDX` (`phone_number` ASC),

    -- FK
    CONSTRAINT `FK_PROFILE_HAS_ADDRESS` FOREIGN KEY (`address_id`) REFERENCES `make_it`.`ADDRESS` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: ADDRESS
CREATE TABLE IF NOT EXISTS `make_it`.`ADDRESS`
(
    -- Columns
    `id`           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `country`      CHAR(2)          NOT NULL DEFAULT 'UA',
    `region`       VARCHAR(64)      NOT NULL,
    `district`     VARCHAR(64)      NULL     DEFAULT NULL,
    `city`         VARCHAR(64)      NOT NULL,
    `city_type`    TINYINT UNSIGNED NOT NULL,
    `street`       VARCHAR(64)      NOT NULL,
    `street_type`  TINYINT UNSIGNED NOT NULL,
    `house_number` VARCHAR(24)      NOT NULL,
    `postal_code`  VARCHAR(9)       NOT NULL,

    -- Audit
    `created_at`      TIMESTAMP        NOT NULL,
    `updated_at`      TIMESTAMP        NOT NULL,
    `created_by`      VARCHAR(64)      NOT NULL,
    `updated_by`      VARCHAR(64)      NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_ADDRESS_IDX` (`id` ASC) INVISIBLE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: USER_AUTHORITY
CREATE TABLE IF NOT EXISTS `make_it`.`USER_AUTHORITY`
(
    -- Columns
    `user_id` INT UNSIGNED NOT NULL,
    `role_id` INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`user_id`, `role_id`),
    UNIQUE INDEX `PK_USER_AUTHORITY_IDX` (`user_id`, `role_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT FK_USER_AUTHORITY_HAS_USER FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT FK_USER_AUTHORITY_HAS_ROLE FOREIGN KEY (`role_id`) REFERENCES `make_it`.`ROLE` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;