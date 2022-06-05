/*
  Warnings:

  - The `price` column on the `Good` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Good" DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0;
