-- CreateTable
CREATE TABLE "VirtualAccount" (
    "id" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VirtualAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAccount_accountNo_key" ON "VirtualAccount"("accountNo");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAccount_productCode_key" ON "VirtualAccount"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAccount_accountName_key" ON "VirtualAccount"("accountName");

-- CreateIndex
CREATE INDEX "VirtualAccount_accountNo_productCode_idx" ON "VirtualAccount"("accountNo", "productCode");
