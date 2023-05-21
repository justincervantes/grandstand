-- AlterTable
ALTER TABLE `project` MODIFY `description` TEXT NULL,
    MODIFY `mostProudOf` TEXT NULL,
    MODIFY `mostInteresting` TEXT NULL,
    MODIFY `mostUnique` TEXT NULL,
    MODIFY `whyBuilt` TEXT NULL,
    MODIFY `codeSnippet` TEXT NULL,
    MODIFY `techStack` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `description` TEXT NULL;
