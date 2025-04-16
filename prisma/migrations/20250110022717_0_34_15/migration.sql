-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "accountId" INTEGER,
ALTER COLUMN "noteId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
