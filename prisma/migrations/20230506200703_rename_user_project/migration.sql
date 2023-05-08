/*
  Warnings:

  - You are about to drop the `user_project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_project` DROP FOREIGN KEY `user_project_userId_fkey`;

-- DropTable
DROP TABLE `user_project`;

-- CreateTable
CREATE TABLE `project` (
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
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
