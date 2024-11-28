-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "role" "ROLE" NOT NULL,
    "action" "ACTION" NOT NULL,
    "status" "PermissionStatus" NOT NULL DEFAULT 'ACTIVE',
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_role_action_key" ON "Permission"("role", "action");
