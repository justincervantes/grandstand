/*
  Warnings:

  - You are about to alter the column `views` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[userId,title]` on the table `article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `views` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `slug` VARCHAR(191) NULL,
    MODIFY `views` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `article_userId_title_key` ON `article`(`userId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `project_userId_title_key` ON `project`(`userId`, `title`);
