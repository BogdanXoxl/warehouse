/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `GoodsInOrders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodsInOrders" DROP COLUMN "assignedAt",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1;
