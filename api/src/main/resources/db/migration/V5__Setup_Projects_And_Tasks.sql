-- Model: Make IT Model
-- Version: 5.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: Projects and Tasks migration

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table: COMPANY
CREATE TABLE IF NOT EXISTS `make_it`.`COMPANY`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(32)  NOT NULL,
    `description` TEXT(500)    NOT NULL,
    `logo`        VARCHAR(255) NULL,
    `owner_id`    INT UNSIGNED NOT NULL,

    -- Audit
    `created_at`  TIMESTAMP    NOT NULL,
    `updated_at`  TIMESTAMP    NOT NULL,
    `created_by`  VARCHAR(64)  NOT NULL,
    `updated_by`  VARCHAR(64)  NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_COMPANY_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_COMPANY_NAME_IDX` (`name` ASC),

    -- FK
    CONSTRAINT `FK_COMPANY_HAS_OWNER` FOREIGN KEY (`owner_id`) REFERENCES `make_it`.`USER` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: USER_PROJECT
CREATE TABLE IF NOT EXISTS `make_it`.`USER_PROJECT`
(
    -- Columns
    `user_id`         INT UNSIGNED   NOT NULL,
    `project_id`      INT UNSIGNED   NOT NULL,
    `rating`          DECIMAL(19, 2) NOT NULL DEFAULT 0.0,
    `is_user_creator` BOOLEAN        NOT NULL DEFAULT false,
    `is_user_owner`   BOOLEAN        NOT NULL DEFAULT false,

    -- ID
    PRIMARY KEY (`user_id`, `project_id`),
    UNIQUE INDEX `PK_USER_PROJECT_IDX` (`user_id`, `project_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_PROJECT_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT `FK_USER_HAS_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `make_it`.`PROJECT` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: PROJECT_TAG
CREATE TABLE IF NOT EXISTS `make_it`.`PROJECT_TAG`
(
    -- Columns
    `project_id` INT UNSIGNED NOT NULL,
    `tag_id`     INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`project_id`, `tag_id`),
    UNIQUE INDEX `PK_PROJECT_TAG_IDX` (`project_id`, `tag_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_TAG_HAS_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `make_it`.`PROJECT` (`id`),
    CONSTRAINT `FK_PROJECT_HAS_TAG` FOREIGN KEY (`tag_id`) REFERENCES `make_it`.`TAG` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: PROJECT
CREATE TABLE IF NOT EXISTS `make_it`.`PROJECT`
(
    -- Columns
    `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(32)    NOT NULL,
    `description`   TEXT(500)      NOT NULL,
    `custom_fields` JSON           NULL,
    `company_id`    INT UNSIGNED   NULL,
    `category`      INT UNSIGNED   NULL,
    `is_fixed_rate` BOOLEAN        NOT NULL DEFAULT false,
    `is_fixed_time` BOOLEAN        NOT NULL DEFAULT false,
    `rate_per_hour` DECIMAL(19, 2) NOT NULL DEFAULT 0.0,
    `rate_currency` CHAR(3)        NOT NULL DEFAULT 'UAH',
    `min_duration`  INT UNSIGNED   NOT NULL DEFAULT 0,
    `max_duration`  INT UNSIGNED   NOT NULL DEFAULT 0,

    -- Audit
    `created_at`    TIMESTAMP      NOT NULL,
    `updated_at`    TIMESTAMP      NOT NULL,
    `created_by`    VARCHAR(64)    NOT NULL,
    `updated_by`    VARCHAR(64)    NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_PROJECT_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_COMPANY_NAME_IDX` (`name` ASC),

    -- FK
    CONSTRAINT `FK_PROJECT_HAS_COMPANY` FOREIGN KEY (`company_id`) REFERENCES `make_it`.`COMPANY` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: USER_TASK
CREATE TABLE IF NOT EXISTS `make_it`.`USER_TASK`
(
    -- Columns
    `user_id` INT UNSIGNED NOT NULL,
    `task_id` INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`user_id`, `task_id`),
    UNIQUE INDEX `PK_USER_TASK_IDX` (`user_id`, `task_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_TASK_HAS_USER` FOREIGN KEY (`user_id`) REFERENCES `make_it`.`USER` (`id`),
    CONSTRAINT `FK_USER_HAS_TASK` FOREIGN KEY (`task_id`) REFERENCES `make_it`.`TASK` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: TASK
CREATE TABLE IF NOT EXISTS `make_it`.`TASK`
(
    -- Columns
    `id`              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `name`            VARCHAR(32)    NOT NULL,
    `description`     TEXT(500)      NOT NULL,
    `complexity`      INT UNSIGNED   NOT NULL DEFAULT 3,
    `duration`        INT UNSIGNED   NOT NULL DEFAULT 0,
    `rating`          DECIMAL(19, 2) NOT NULL DEFAULT 0.0,
    `project_id`      INT UNSIGNED   NOT NULL,
    `parent_task_id`  INT UNSIGNED   NOT NULL,
    `progress_status` INT UNSIGNED   NOT NULL DEFAULT 0,
    `stated_at`       TIMESTAMP      NULL,
    `is_overdone`     BOOLEAN        NOT NULL DEFAULT false,

    -- Audit
    `created_at`      TIMESTAMP      NOT NULL,
    `updated_at`      TIMESTAMP      NOT NULL,
    `created_by`      VARCHAR(64)    NOT NULL,
    `updated_by`      VARCHAR(64)    NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_TASK_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_NAME_IDX` (`name` ASC)
)
;

-- Table: TASK_TAG
CREATE TABLE IF NOT EXISTS `make_it`.`TASK_TAG`
(
    -- Columns
    `task_id` INT UNSIGNED NOT NULL,
    `tag_id`  INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`task_id`, `tag_id`),
    UNIQUE INDEX `PK_TASK_TAG_IDX` (`task_id`, `tag_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_TAG_HAS_TASK` FOREIGN KEY (`task_id`) REFERENCES `make_it`.`TASK` (`id`),
    CONSTRAINT `FK_TASK_HAS_TAG` FOREIGN KEY (`tag_id`) REFERENCES `make_it`.`TAG` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: TASK_COMMENT
CREATE TABLE IF NOT EXISTS `make_it`.`TASK_COMMENT`
(
    -- Columns
    `task_id`    INT UNSIGNED NOT NULL,
    `comment_id` INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`task_id`, `comment_id`),
    UNIQUE INDEX `PK_TASK_COMMENT_IDX` (`task_id`, `comment_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_COMMENT_HAS_TASK` FOREIGN KEY (`task_id`) REFERENCES `make_it`.`TASK` (`id`),
    CONSTRAINT `FK_TASK_HAS_COMMENT` FOREIGN KEY (`comment_id`) REFERENCES `make_it`.`COMMENT` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table: PROJECT_COMMENT
CREATE TABLE IF NOT EXISTS `make_it`.`PROJECT_COMMENT`
(
    -- Columns
    `project_id` INT UNSIGNED NOT NULL,
    `comment_id` INT UNSIGNED NOT NULL,

    -- ID
    PRIMARY KEY (`project_id`, `comment_id`),
    UNIQUE INDEX `PK_PROJECT_COMMENT_IDX` (`project_id`, `comment_id` ASC) INVISIBLE,

    -- FK
    CONSTRAINT `FK_COMMENT_HAS_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `make_it`.`PROJECT` (`id`),
    CONSTRAINT `FK_PROJECT_HAS_COMMENT` FOREIGN KEY (`comment_id`) REFERENCES `make_it`.`COMMENT` (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

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

-- Table: CATEGORY
CREATE TABLE IF NOT EXISTS `make_it`.`CATEGORY`
(
    -- Columns
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(32)  NOT NULL,
    `description` VARCHAR(255) NOT NULL DEFAULT '',

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_CATEGORY_IDX` (`id` ASC) INVISIBLE,

    -- UQ
    UNIQUE INDEX `UQ_CATEGORY_NAME_IDX` (`name` ASC)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;


-- To distinguish the comments, those should keep information about the relation
-- What is commented? enum { PROJECT, TASK, USER }

-- Altering: COMMENT
ALTER TABLE `make_it`.`COMMENT`
    ADD COLUMN `related_to` INT UNSIGNED NOT NULL;

-- Fix charset for tags
-- Altering: TAG
ALTER TABLE `make_it`.`TAG`
    CONVERT TO CHARACTER SET utf8mb4;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
