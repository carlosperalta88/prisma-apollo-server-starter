/*
  Warnings:

  - You are about to drop the `ProductsMedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductsMedia" DROP CONSTRAINT "ProductsMedia_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsMedia" DROP CONSTRAINT "ProductsMedia_productId_fkey";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductsMedia";

-- AddForeignKey
ALTER TABLE "Media" ADD FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
