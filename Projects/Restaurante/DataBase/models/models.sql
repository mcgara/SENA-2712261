-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema restaurant_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema restaurant_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `restaurant_database` DEFAULT CHARACTER SET utf8 ;
USE `restaurant_database` ;

-- -----------------------------------------------------
-- Table `restaurant_database`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurant_database`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NULL,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `restaurant_database`.`food_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurant_database`.`food_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurant_database`.`food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurant_database`.`food` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `image` TEXT NULL,
  `food_category_id` INT NOT NULL,
  PRIMARY KEY (`id`, `food_category_id`),
  INDEX `fk_food_food_category1_idx` (`food_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_food_food_category1`
    FOREIGN KEY (`food_category_id`)
    REFERENCES `restaurant_database`.`food_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurant_database`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurant_database`.`invoice` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `details` TEXT NULL,
  `total` INT NOT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_invoice_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `restaurant_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurant_database`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurant_database`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `invoice_id` INT NOT NULL,
  `food_id` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`, `invoice_id`, `food_id`),
  INDEX `fk_order_invoice1_idx` (`invoice_id` ASC) VISIBLE,
  INDEX `fk_order_food1_idx` (`food_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_invoice1`
    FOREIGN KEY (`invoice_id`)
    REFERENCES `restaurant_database`.`invoice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_food1`
    FOREIGN KEY (`food_id`)
    REFERENCES `restaurant_database`.`food` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
