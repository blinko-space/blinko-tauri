-- CreateTable
CREATE TABLE "noteInternalShare" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "canEdit" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "noteInternalShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "noteInternalShare_noteId_idx" ON "noteInternalShare"("noteId");

-- CreateIndex
CREATE INDEX "noteInternalShare_accountId_idx" ON "noteInternalShare"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "noteInternalShare_noteId_accountId_key" ON "noteInternalShare"("noteId", "accountId");

-- AddForeignKey
ALTER TABLE "noteInternalShare" ADD CONSTRAINT "noteInternalShare_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noteInternalShare" ADD CONSTRAINT "noteInternalShare_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
