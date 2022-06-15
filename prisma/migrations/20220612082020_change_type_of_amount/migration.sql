/*
  Warnings:

  - Made the column `amount` on table `Good` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Good" ALTER COLUMN "amount" SET NOT NULL;
