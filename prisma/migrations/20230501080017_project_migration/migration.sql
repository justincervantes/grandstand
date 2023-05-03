/*
  Warnings:

  - Made the column `userId` on table `user_details` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user_details` DROP FOREIGN KEY `user_details_userId_fkey`;

-- AlterTable
ALTER TABLE `user_details` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `profileGitHubUrl` VARCHAR(191) NULL,
    MODIFY `profileLinkedInUrl` VARCHAR(191) NULL,
    MODIFY `profileTwitterUrl` VARCHAR(191) NULL,
    MODIFY `profileInstagramUrl` VARCHAR(191) NULL,
    MODIFY `userName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserProject` (
    `id` VARCHAR(191) NOT NULL,
    `userDetailsId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `applicationUrl` VARCHAR(191) NULL,
    `projectGitHubUrl` VARCHAR(191) NULL,
    `projectMostProudOf` VARCHAR(191) NULL,
    `projectMostInteresting` VARCHAR(191) NULL,
    `projectMostUnique` VARCHAR(191) NULL,
    `projectWhyBuilt` VARCHAR(191) NULL,
    `projectTechStack` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_userDetailsId_fkey` FOREIGN KEY (`userDetailsId`) REFERENCES `user_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
