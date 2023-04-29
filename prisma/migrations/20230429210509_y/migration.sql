/*
  Warnings:

  - You are about to drop the column `name` on the `user_details` table. All the data in the column will be lost.
  - Added the required column `userName` to the `user_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_details` DROP COLUMN `name`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;
