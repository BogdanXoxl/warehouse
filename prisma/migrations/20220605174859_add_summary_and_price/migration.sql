-- AlterTable
ALTER TABLE "Good" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "summary" DOUBLE PRECISION NOT NULL DEFAULT 0;