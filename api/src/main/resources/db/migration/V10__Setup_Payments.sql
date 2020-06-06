-- Model: Make IT Model
-- Version: 4.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: Setup Payments

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Table:COMMENT
CREATE TABLE IF NOT EXISTS `make_it`.`PAYMENT`
(
    -- Columns
    `id`               INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `card_number`      VARCHAR(20)                 NOT NULL,
    `card_holder`      VARCHAR(48)                 NOT NULL,
    `card_expire_date` VARCHAR(5)                  NOT NULL,
    `beneficiary_name` VARCHAR(128)                NOT NULL,
    `remittance_info`  VARCHAR(255)                NULL DEFAULT '',
    `currency`         TINYINT                     NOT NULL,
    `rate`             DECIMAL(19, 2)              NOT NULL,
    `attestation`      BOOLEAN                     NULL DEFAULT false,

    -- Audit
    `created_at`       TIMESTAMP                   NOT NULL,
    `updated_at`       TIMESTAMP                   NOT NULL,
    `created_by`       VARCHAR(64)                 NOT NULL,
    `updated_by`       VARCHAR(64)                 NOT NULL,

    -- ID
    PRIMARY KEY (`id`),
    UNIQUE INDEX `PK_PAYMENT_IDX` (`id` ASC) INVISIBLE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
;

-- Table:PROFILE
ALTER TABLE `make_it`.`PROFILE`
    ADD
        COLUMN `payment_id` INT UNSIGNED NULL;

ALTER TABLE `make_it`.`PROFILE`
    ADD
        COLUMN `description` VARCHAR(255) NULL DEFAULT '';

ALTER TABLE `make_it`.`PROFILE`
    ADD
        CONSTRAINT `FK_PROFILE_HAS_PAYMENT` FOREIGN KEY (`payment_id`) REFERENCES `make_it`.`PAYMENT` (`id`);

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
