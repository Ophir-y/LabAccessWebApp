-- create database
CREATE DATABASE labaccessdb;

-- use database
USE labaccessdb;


-- to delete use following command: 
-- DROP database labaccessdb;

-- People table #########################################################################
CREATE TABLE `People`(
    `person_id` INT NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `admin_system_access` TINYINT(1) NOT NULL,
    `admin_password` VARCHAR(255) NULL COMMENT 'Only active if person is an admin'
  );
ALTER TABLE
  `People`
ADD
  PRIMARY KEY (`person_id`);


-- People_Groups table #########################################################################
CREATE TABLE `People_Groups`(
    `person_group_id` INT NOT NULL,
    `person_id` INT NOT NULL,
		FOREIGN KEY (`person_id`)
		REFERENCES `People` (`person_id`)
		ON DELETE CASCADE,
    `person_group_name` VARCHAR(255) NOT NULL
  );
ALTER TABLE
  `People_Groups`
ADD
  PRIMARY KEY (`person_group_id`, `person_id`);


-- Doors table #########################################################################
CREATE TABLE `Doors`(
    `door_id` INT NOT NULL,
    `door_name` VARCHAR(255) NOT NULL,
    `building_name` VARCHAR(255) NOT NULL,
    `floor_number` INT NOT NULL
  );
ALTER TABLE
  `Doors`
ADD
  PRIMARY KEY (`door_id`);


-- Door_Groups table #########################################################################
CREATE TABLE `Door_Groups`(
    `door_group_id` INT NOT NULL,
    `door_id` INT NOT NULL,
	FOREIGN KEY (`door_id`)
		REFERENCES `Doors` (`door_id`)
		ON DELETE CASCADE,
    `door_group_name` VARCHAR(255) NOT NULL
  );
ALTER TABLE
  `Door_Groups`
ADD
  PRIMARY KEY (`door_group_id`, `door_id`);
  
  
-- Permissions_table table #########################################################################
CREATE TABLE `Permissions_table`(
    `permission_id` INT NOT NULL,
    `permission_type` VARCHAR(255) NOT NULL DEFAULT 'access' COMMENT 'permission type:

\"Door Access\" - grants access to a door.

\"Admin Privileges\" - grants admin privilages to a door.

\"Admin Add People\" - permitts adding people to the system.

\"Admin Add Doors\" - permitts adding doors to the system.

\"Admin Add Permissions_table\" - permitts adding permissions to people for specific doors.

\"Admin Add Admin\" - grants permit to add another admin to a door.',
    `initial_date` DATE NOT NULL COMMENT 'When does the permit start to take effect',
    `expiry_date` DATE NOT NULL COMMENT 'When does the permit expire',
    `start_time` TIME NOT NULL COMMENT 'When does the permit start to take effect every day.',
    `end_time` TIME NOT NULL COMMENT 'When does the permit end every day.'
  );
ALTER TABLE
  `Permissions_table`
ADD
  PRIMARY KEY (`permission_id`);


-- Permission_Groups table #########################################################################
CREATE TABLE `Permission_Groups`(
    `permission_group_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
	FOREIGN KEY (`permission_id`)
		REFERENCES `Permissions_table` (`permission_id`)
		ON DELETE CASCADE,
    `permission_group_name` VARCHAR(255) NOT NULL
  );
ALTER TABLE
  `Permission_Groups`
ADD
  PRIMARY KEY (`permission_group_id`, `permission_id`);


-- Peoples_Permissions_Doors table #########################################################################
CREATE TABLE `Peoples_Permissions_Doors`(
    `person_group_id` INT NOT NULL,
    FOREIGN KEY (person_group_id)
	REFERENCES `People_Groups` (`person_group_id`)
	ON DELETE CASCADE,
	
    `door_group_id` INT NOT NULL,
    FOREIGN KEY (`door_group_id`)
	    REFERENCES `Door_Groups` (`door_group_id`)
	    ON DELETE CASCADE,
    `permission_group_id` INT NOT NULL,
    FOREIGN KEY (`permission_group_id`)
	REFERENCES `Permission_Groups` (`permission_group_id`)
	ON DELETE CASCADE,

    `permission_group_name` VARCHAR(255) NOT NULL,
    `person_group_name` VARCHAR(255) NOT NULL,
    `door_group_name` VARCHAR(255) NOT NULL
  );
ALTER TABLE
  `Peoples_Permissions_Doors`
ADD
  PRIMARY KEY (
    `person_group_id`,
    `permission_group_id`,
    `door_group_id`
  );

  








CREATE TABLE `Door_Permission_list`(
  `id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `door_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  `permission_type` VARCHAR(255) NOT NULL,
  `start_date` DATE NOT NULL,
  `expiry_date` DATE NOT NULL,
  `initial_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `entrence_password` VARCHAR(255) NULL DEFAULT '000000' COMMENT 'Enter a 6 digit pin-code which includes digits 0-9, \"A\",\"B\",\"C\",\"D\",\"*\",\"#\".'
);
ALTER TABLE
  `Door_Permission_list`
ADD
  PRIMARY KEY (`id`);
  
CREATE TABLE `Creation_Archive`(
    `id` INT NOT NULL,
    `admin_id` INT NOT NULL,
    `entity_type` VARCHAR(255) NOT NULL,
    `entity_id` INT NOT NULL,
    `time` TIME NOT NULL,
    `date` TIMESTAMP NOT NULL
  );
ALTER TABLE
  `Creation_Archive`
ADD
  PRIMARY KEY (`id`);
  
CREATE TABLE `Permission_Archive`(
    `id` INT NOT NULL,
    `person_id` INT NOT NULL,
    `admin_id` INT NOT NULL,
    `door_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
    `date` TIMESTAMP NOT NULL,
    `time` TIME NOT NULL
  );
ALTER TABLE
  `Permission_Archive`
ADD
  PRIMARY KEY `permission_archive_id_primary`(`id`);
  
  
CREATE TABLE `Access_History`(
    `id` INT NOT NULL,
    `door_id` INT NOT NULL,
    `person_id` INT NOT NULL,
    `date` TIMESTAMP NOT NULL,
    `entrence_method` VARCHAR(255) NOT NULL
  );
ALTER TABLE
  `Access_History`
ADD
  PRIMARY KEY `access_history_id_primary`(`id`);