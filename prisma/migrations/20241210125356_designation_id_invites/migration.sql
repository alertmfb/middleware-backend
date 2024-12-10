-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_designationId_fkey";

-- AlterTable
ALTER TABLE "Designation" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "designationId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
