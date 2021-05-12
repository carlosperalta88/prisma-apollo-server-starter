/*
  Warnings:

  - You are about to drop the column `usersId` on the `Subscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_usersId_fkey";

-- DropIndex
DROP INDEX "Subscriptions_usersId_unique";

-- AlterTable
ALTER TABLE "Subscriptions" DROP COLUMN "usersId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_userId_unique" ON "Subscriptions"("userId");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
