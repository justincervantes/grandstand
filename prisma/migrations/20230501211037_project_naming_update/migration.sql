/*
  Warnings:

  - You are about to drop the column `projectGitHubUrl` on the `userproject` table. All the data in the column will be lost.
  - You are about to drop the column `projectMostInteresting` on the `userproject` table. All the data in the column will be lost.
  - You are about to drop the column `projectMostProudOf` on the `userproject` table. All the data in the column will be lost.
  - You are about to drop the column `projectMostUnique` on the `userproject` table. All the data in the column will be lost.
  - You are about to drop the column `projectTechStack` on the `userproject` table. All the data in the column will be lost.
  - You are about to drop the column `projectWhyBuilt` on the `userproject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userproject` DROP COLUMN `projectGitHubUrl`,
    DROP COLUMN `projectMostInteresting`,
    DROP COLUMN `projectMostProudOf`,
    DROP COLUMN `projectMostUnique`,
    DROP COLUMN `projectTechStack`,
    DROP COLUMN `projectWhyBuilt`,
    ADD COLUMN `gitHubUrl` VARCHAR(191) NULL,
    ADD COLUMN `mostInteresting` VARCHAR(191) NULL,
    ADD COLUMN `mostProudOf` VARCHAR(191) NULL,
    ADD COLUMN `mostUnique` VARCHAR(191) NULL,
    ADD COLUMN `techStack` VARCHAR(191) NULL,
    ADD COLUMN `whyBuilt` VARCHAR(191) NULL;
