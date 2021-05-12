/*
  Warnings:

  - A unique constraint covering the columns `[usersId]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_usersId_unique" ON "Subscriptions"("usersId");
