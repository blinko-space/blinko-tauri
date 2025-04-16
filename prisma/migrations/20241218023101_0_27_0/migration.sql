-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;
