-- CreateTable
CREATE TABLE "noteHistory" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSON,
    "version" INTEGER NOT NULL,
    "accountId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noteHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "noteHistory_noteId_idx" ON "noteHistory"("noteId");

-- CreateIndex
CREATE INDEX "noteHistory_accountId_idx" ON "noteHistory"("accountId");

-- AddForeignKey
ALTER TABLE "noteHistory" ADD CONSTRAINT "noteHistory_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
