/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `hasMFAEnabled` on the `User` table. All the data in the column will be lost.
  - Added the required column `inviteToken` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inviterId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userEmail_fkey";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "userEmail",
ADD COLUMN     "inviteToken" TEXT NOT NULL,
ADD COLUMN     "inviterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasMFAEnabled",
ADD COLUMN     "has2FAEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TwoFASecret" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TwoFASecret_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwoFASecret_userId_key" ON "TwoFASecret"("userId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFASecret" ADD CONSTRAINT "TwoFASecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
