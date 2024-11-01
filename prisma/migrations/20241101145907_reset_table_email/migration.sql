/*
  Warnings:

  - You are about to drop the column `opt` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PasswordReset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `otp` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_userId_fkey";

-- DropIndex
DROP INDEX "PasswordReset_userId_key";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "opt",
DROP COLUMN "userId",
ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_userEmail_key" ON "PasswordReset"("userEmail");

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
