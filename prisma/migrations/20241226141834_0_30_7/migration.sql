-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "shareEncryptedUrl" VARCHAR,
ADD COLUMN     "shareExpiryDate" TIMESTAMPTZ(6),
ADD COLUMN     "shareMaxView" INTEGER DEFAULT 0,
ADD COLUMN     "shareViewCount" INTEGER DEFAULT 0;
