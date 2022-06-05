/*
  Warnings:

  - You are about to drop the column `range` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `timeNoteid` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "timeNoteid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "range",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_timeNoteid_fkey" FOREIGN KEY ("timeNoteid") REFERENCES "TimeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
