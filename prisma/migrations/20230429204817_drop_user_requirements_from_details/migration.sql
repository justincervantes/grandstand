-- DropForeignKey
ALTER TABLE `user_details` DROP FOREIGN KEY `user_details_userId_fkey`;

-- AlterTable
ALTER TABLE `user_details` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
