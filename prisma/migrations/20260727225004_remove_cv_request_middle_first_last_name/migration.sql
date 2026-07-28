/*
  Warnings:

  - You are about to drop the column `requester_first_name` on the `cv_request` table. All the data in the column will be lost.
  - You are about to drop the column `requester_last_name` on the `cv_request` table. All the data in the column will be lost.
  - You are about to drop the column `requester_middle_name` on the `cv_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cv_request` DROP COLUMN `requester_first_name`,
    DROP COLUMN `requester_last_name`,
    DROP COLUMN `requester_middle_name`;
