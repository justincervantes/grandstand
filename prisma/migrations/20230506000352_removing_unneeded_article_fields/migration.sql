/*
  Warnings:

  - You are about to drop the column `createdByUserId` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `deletedByUserId` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedByUserId` on the `article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `article_createdByUserId_fkey` ON `article`;

-- DropIndex
DROP INDEX `article_deletedByUserId_fkey` ON `article`;

-- DropIndex
DROP INDEX `article_updatedByUserId_fkey` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `createdByUserId`,
    DROP COLUMN `deletedByUserId`,
    DROP COLUMN `updatedByUserId`;
