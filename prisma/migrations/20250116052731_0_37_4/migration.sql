-- CreateTable
CREATE TABLE "cache" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" JSON NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cache_key_key" ON "cache"("key");
