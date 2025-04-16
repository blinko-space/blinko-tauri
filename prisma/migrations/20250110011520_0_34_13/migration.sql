-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_noteId_fkey";

-- AlterTable
ALTER TABLE "attachments" ALTER COLUMN "noteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
