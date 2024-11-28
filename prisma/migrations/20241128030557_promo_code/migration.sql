-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "usage" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);
