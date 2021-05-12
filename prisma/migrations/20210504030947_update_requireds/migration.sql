-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "active" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscriptions" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "statusId" DROP NOT NULL;
