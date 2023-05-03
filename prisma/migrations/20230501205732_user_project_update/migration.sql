/*
  Warnings:

  - You are about to drop the column `userDetailsId` on the `userproject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserProject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userproject` DROP FOREIGN KEY `UserProject_userDetailsId_fkey`;

-- AlterTable
ALTER TABLE `userproject` DROP COLUMN `userDetailsId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserProject_userId_key` ON `UserProject`(`userId`);

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
