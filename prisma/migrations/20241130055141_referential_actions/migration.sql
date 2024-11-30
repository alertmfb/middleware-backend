-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_inviterEmail_fkey";

-- DropForeignKey
ALTER TABLE "TwoFASecret" DROP CONSTRAINT "TwoFASecret_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermission" DROP CONSTRAINT "UserPermission_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_inviterEmail_fkey" FOREIGN KEY ("inviterEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFASecret" ADD CONSTRAINT "TwoFASecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
