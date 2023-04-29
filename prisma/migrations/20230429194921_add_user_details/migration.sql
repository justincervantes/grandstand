-- CreateTable
CREATE TABLE `user_details` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profileGitHubUrl` VARCHAR(191) NOT NULL,
    `profileLinkedInUrl` VARCHAR(191) NOT NULL,
    `profileTwitterUrl` VARCHAR(191) NOT NULL,
    `profileGInstagramUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_details_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
