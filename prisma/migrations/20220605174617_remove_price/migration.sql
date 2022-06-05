/*
  Warnings:

  - You are about to drop the column `price` on the `Good` table. All the data in the column will be lost.
  - You are about to alter the column `summary` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Good" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "summary";

