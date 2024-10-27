/*
  Warnings:

  - You are about to drop the column `inviterId` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `inviterEmail` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_inviterId_fkey";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "inviterId",
ADD COLUMN     "inviterEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_inviterEmail_fkey" FOREIGN KEY ("inviterEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
