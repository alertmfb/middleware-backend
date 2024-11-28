-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ROLE" ADD VALUE 'SENIOR';
ALTER TYPE "ROLE" ADD VALUE 'JUNIOR';

UPDATE _prisma_migrations
SET rolled_back_at = NOW()
WHERE migration_name = '20241128084845_removed_roles_member_admin';