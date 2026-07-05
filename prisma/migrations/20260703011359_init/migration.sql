/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `personal_details` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `languages` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `interests` VARCHAR(191) NULL,
    `introduction` VARCHAR(191) NULL,
    `what_i_do` VARCHAR(191) NULL,
    `socials` JSON NULL,

    UNIQUE INDEX `personal_details_email_key`(`email`),
    UNIQUE INDEX `personal_details_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` VARCHAR(191) NOT NULL,
    `level` ENUM('PRIMARY', 'SECONDARY', 'TERTIARY', 'MASTERAL', 'DOCTORATE') NOT NULL,
    `school_name` VARCHAR(191) NOT NULL,
    `school_address` VARCHAR(191) NOT NULL,
    `year_attended` DATETIME(3) NOT NULL,
    `year_graduated` DATETIME(3) NULL,
    `course` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` VARCHAR(191) NOT NULL,
    `skill_name` VARCHAR(191) NOT NULL,
    `skill_category` ENUM('HARD', 'SOFT', 'CORE') NOT NULL,
    `skill_description` VARCHAR(191) NULL,
    `proficiency_level` INTEGER NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_requests` (
    `id` VARCHAR(191) NOT NULL,
    `requester_first_name` VARCHAR(191) NOT NULL,
    `requester_middle_name` VARCHAR(191) NULL,
    `requester_last_name` VARCHAR(191) NOT NULL,
    `requester_email` VARCHAR(191) NOT NULL,
    `request_status` ENUM('SENT', 'RECEIVED', 'PENDING') NOT NULL,
    `requested_at` DATETIME(3) NOT NULL,
    `sent_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cv_requests_requester_email_key`(`requester_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `project_title` VARCHAR(191) NOT NULL,
    `project_description` VARCHAR(191) NOT NULL,
    `project_image` VARCHAR(191) NULL,
    `project_type` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `technologies_used` VARCHAR(191) NOT NULL,
    `project_link` VARCHAR(191) NULL,
    `repository_link` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_status` ENUM('FINISHED', 'ONGOING', 'CANCELLED') NOT NULL,
    `is_ongoing` BOOLEAN NOT NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_requests` ADD CONSTRAINT `cv_requests_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
