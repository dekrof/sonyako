-- Model: Make IT Model
-- Version: 6.0.0
-- Author: sonnyako <Makydon Sofiia>
-- Project: MySQL DB for Job Promoter Application "Make IT"
-- Description: Add more details to project migration

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `make_it`.`PROJECT`
    ADD
        COLUMN `required_level` INT NULL DEFAULT 3;

ALTER TABLE `make_it`.`PROJECT`
    ADD
        COLUMN `level_of_efforts` INT NULL DEFAULT 40;

ALTER TABLE `make_it`.`PROJECT`
    ADD
        COLUMN `proposals` INT NOT NULL DEFAULT 1;

ALTER TABLE `make_it`.`PROJECT`
    ADD
        COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;