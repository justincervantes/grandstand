-- AlterTable
ALTER TABLE `article` ADD COLUMN `state` ENUM('Draft', 'Published') NOT NULL DEFAULT 'Published';

-- AlterTable
ALTER TABLE `project` ADD COLUMN `state` ENUM('Draft', 'Published') NOT NULL DEFAULT 'Published';
