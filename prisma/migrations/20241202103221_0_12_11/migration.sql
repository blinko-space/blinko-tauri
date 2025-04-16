-- AlterTable
ALTER TABLE "config" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "config" ADD CONSTRAINT "config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
