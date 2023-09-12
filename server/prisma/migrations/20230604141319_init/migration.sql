/*
  Warnings:

  - You are about to drop the column `devicesId` on the `images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_devicesId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "devicesId",
ADD COLUMN     "deviceId" TEXT;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
