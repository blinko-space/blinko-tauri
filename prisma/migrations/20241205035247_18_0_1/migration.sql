-- CreateTable
CREATE TABLE "noteReference" (
    "id" SERIAL NOT NULL,
    "fromNoteId" INTEGER NOT NULL,
    "toNoteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noteReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "noteReference_fromNoteId_toNoteId_key" ON "noteReference"("fromNoteId", "toNoteId");

-- AddForeignKey
ALTER TABLE "noteReference" ADD CONSTRAINT "noteReference_fromNoteId_fkey" FOREIGN KEY ("fromNoteId") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noteReference" ADD CONSTRAINT "noteReference_toNoteId_fkey" FOREIGN KEY ("toNoteId") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
