-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('HDD', 'SSD', 'NVME');

-- CreateEnum
CREATE TYPE "RamType" AS ENUM ('DDR2', 'DDR3', 'DDR4', 'DDR5');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Computer" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "computerName" TEXT NOT NULL,
    "model" TEXT,
    "processor" TEXT,
    "currentRamSize" INTEGER,
    "currentRamSlots" INTEGER,
    "currentRamType" "RamType",
    "currentRamFrequency" INTEGER,
    "dualChannel" BOOLEAN NOT NULL DEFAULT false,
    "currentStorageType" "StorageType",
    "currentStorageSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Computer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpgradeBudget" (
    "id" TEXT NOT NULL,
    "computerId" TEXT NOT NULL,
    "recommendedRamSize" INTEGER,
    "recommendedRamSlots" INTEGER,
    "recommendedRamType" "RamType",
    "recommendedRamFrequency" INTEGER,
    "recommendedStorageType" "StorageType",
    "recommendedStorageSize" INTEGER,
    "estimatedPrice" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UpgradeBudget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpgradeBudget" ADD CONSTRAINT "UpgradeBudget_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "Computer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
