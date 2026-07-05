/*
  Warnings:

  - The values [PRIMARY,SECONDARY,TERTIARY,MASTERAL,DOCTORATE] on the enum `education_level` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `cv_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cv_requests` DROP FOREIGN KEY `cv_requests_personal_details_id_fk_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_personal_details_id_fk_fkey`;

-- DropForeignKey
ALTER TABLE `skills` DROP FOREIGN KEY `skills_personal_details_id_fk_fkey`;

-- AlterTable
ALTER TABLE `education` MODIFY `level` ENUM('primary', 'secondary', 'tertiary', 'masteral', 'doctorate') NOT NULL;

-- DropTable
DROP TABLE `cv_requests`;

-- DropTable
DROP TABLE `projects`;

-- DropTable
DROP TABLE `skills`;

-- CreateTable
CREATE TABLE `skill` (
    `id` VARCHAR(191) NOT NULL,
    `skill_name` VARCHAR(191) NOT NULL,
    `skill_category` ENUM('hard', 'soft', 'core') NOT NULL,
    `skill_description` VARCHAR(191) NULL,
    `proficiency_level` INTEGER NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_request` (
    `id` VARCHAR(191) NOT NULL,
    `requester_first_name` VARCHAR(191) NOT NULL,
    `requester_middle_name` VARCHAR(191) NULL,
    `requester_last_name` VARCHAR(191) NOT NULL,
    `requester_email` VARCHAR(191) NOT NULL,
    `request_status` ENUM('sent', 'received', 'pending') NOT NULL,
    `requested_at` DATETIME(3) NOT NULL,
    `sent_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cv_request_requester_email_key`(`requester_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
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
    `project_status` ENUM('finished', 'ongoing', 'cancelled') NOT NULL,
    `is_ongoing` BOOLEAN NOT NULL,
    `personal_details_id_fk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_request` ADD CONSTRAINT `cv_request_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_personal_details_id_fk_fkey` FOREIGN KEY (`personal_details_id_fk`) REFERENCES `personal_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
