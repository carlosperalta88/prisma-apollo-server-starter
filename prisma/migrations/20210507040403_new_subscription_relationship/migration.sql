/*
  Warnings:

  - You are about to drop the column `name` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `_ProductsToSubscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubscriptionsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usersId` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.
  - Made the column `active` on table `Subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ProductsToSubscriptions" DROP CONSTRAINT "_ProductsToSubscriptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToSubscriptions" DROP CONSTRAINT "_ProductsToSubscriptions_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionsToUsers" DROP CONSTRAINT "_SubscriptionsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionsToUsers" DROP CONSTRAINT "_SubscriptionsToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "subscriptionTypeId" INTEGER,
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionType" ADD COLUMN     "price" INTEGER;

-- AlterTable
ALTER TABLE "Subscriptions" DROP COLUMN "name",
DROP COLUMN "description",
DROP COLUMN "version",
DROP COLUMN "price",
ADD COLUMN     "usersId" INTEGER NOT NULL,
ALTER COLUMN "active" SET NOT NULL;

-- DropTable
DROP TABLE "_ProductsToSubscriptions";

-- DropTable
DROP TABLE "_SubscriptionsToUsers";

-- AddForeignKey
ALTER TABLE "Products" ADD FOREIGN KEY ("subscriptionTypeId") REFERENCES "SubscriptionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
