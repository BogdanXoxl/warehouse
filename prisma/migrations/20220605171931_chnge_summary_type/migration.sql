/*
  Warnings:

  - The `summary` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "summary",
ADD COLUMN     "summary" MONEY NOT NULL DEFAULT 0;
