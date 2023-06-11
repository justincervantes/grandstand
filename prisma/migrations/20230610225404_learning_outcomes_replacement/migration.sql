/*
  Warnings:

  - You are about to drop the column `mostInteresting` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `mostUnique` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `mostInteresting`,
    DROP COLUMN `mostUnique`,
    ADD COLUMN `learningOutcomes` TEXT NULL;
