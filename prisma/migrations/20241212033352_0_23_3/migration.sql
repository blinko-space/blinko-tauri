-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "accountId" INTEGER;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
