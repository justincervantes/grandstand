/*
  Warnings:

  - You are about to drop the `article_action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userproject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_createdByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_deletedByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_updatedByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `article_action` DROP FOREIGN KEY `article_action_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `article_action` DROP FOREIGN KEY `article_action_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userproject` DROP FOREIGN KEY `UserProject_userId_fkey`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `article_action`;

-- DropTable
DROP TABLE `userproject`;

-- CreateTable
CREATE TABLE `user_project` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `applicationUrl` VARCHAR(191) NULL,
    `gitHubUrl` VARCHAR(191) NULL,
    `mostProudOf` VARCHAR(191) NULL,
    `mostInteresting` VARCHAR(191) NULL,
    `mostUnique` VARCHAR(191) NULL,
    `whyBuilt` VARCHAR(191) NULL,
    `techStack` VARCHAR(191) NULL,

    UNIQUE INDEX `user_project_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `article_userId_key` ON `article`(`userId`);

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project` ADD CONSTRAINT `user_project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
