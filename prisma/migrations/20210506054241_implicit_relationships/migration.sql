/*
  Warnings:

  - You are about to drop the `SubsciptionProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersSubscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubsciptionProducts" DROP CONSTRAINT "SubsciptionProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "SubsciptionProducts" DROP CONSTRAINT "SubsciptionProducts_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "UsersProducts" DROP CONSTRAINT "UsersProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "UsersProducts" DROP CONSTRAINT "UsersProducts_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSubscriptions" DROP CONSTRAINT "UsersSubscriptions_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSubscriptions" DROP CONSTRAINT "UsersSubscriptions_userId_fkey";

-- DropTable
DROP TABLE "SubsciptionProducts";

-- DropTable
DROP TABLE "UsersProducts";

-- DropTable
DROP TABLE "UsersSubscriptions";

-- CreateTable
CREATE TABLE "_SubscriptionsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductsToSubscriptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubscriptionsToUsers_AB_unique" ON "_SubscriptionsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_SubscriptionsToUsers_B_index" ON "_SubscriptionsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToUsers_AB_unique" ON "_ProductsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToUsers_B_index" ON "_ProductsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToSubscriptions_AB_unique" ON "_ProductsToSubscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToSubscriptions_B_index" ON "_ProductsToSubscriptions"("B");

-- AddForeignKey
ALTER TABLE "_SubscriptionsToUsers" ADD FOREIGN KEY ("A") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionsToUsers" ADD FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToUsers" ADD FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToUsers" ADD FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSubscriptions" ADD FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSubscriptions" ADD FOREIGN KEY ("B") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
