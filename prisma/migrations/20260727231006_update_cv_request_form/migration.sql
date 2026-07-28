/*
  Warnings:

  - Added the required column `reason` to the `cv_request` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `cv_request_requester_email_key` ON `cv_request`;

-- AlterTable
ALTER TABLE `cv_request` ADD COLUMN `reason` VARCHAR(191) NOT NULL,
    MODIFY `request_status` ENUM('sent', 'received', 'pending') NOT NULL DEFAULT 'pending';
