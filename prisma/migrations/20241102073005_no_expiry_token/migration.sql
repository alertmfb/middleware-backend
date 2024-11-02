/*
  Warnings:

  - You are about to drop the column `expiryToken` on the `PasswordReset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "expiryToken";
