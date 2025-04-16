-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL DEFAULT '',
    "nickname" VARCHAR NOT NULL DEFAULT '',
    "password" VARCHAR NOT NULL DEFAULT '',
    "image" VARCHAR NOT NULL DEFAULT '',
    "apiToken" VARCHAR NOT NULL DEFAULT '',
    "note" INTEGER NOT NULL DEFAULT 0,
    "role" VARCHAR NOT NULL DEFAULT '',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "isShare" BOOLEAN NOT NULL DEFAULT false,
    "sharePassword" VARCHAR NOT NULL DEFAULT '',
    "name" VARCHAR NOT NULL DEFAULT '',
    "path" VARCHAR NOT NULL DEFAULT '',
    "size" DECIMAL NOT NULL DEFAULT 0,
    "noteId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR NOT NULL DEFAULT '',
    "config" JSON,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "content" VARCHAR NOT NULL DEFAULT '',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isRecycle" BOOLEAN NOT NULL DEFAULT false,
    "isShare" BOOLEAN NOT NULL DEFAULT false,
    "isTop" BOOLEAN NOT NULL DEFAULT false,
    "sharePassword" VARCHAR NOT NULL DEFAULT '',
    "metadata" JSON,
    "users" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL DEFAULT '',
    "icon" VARCHAR NOT NULL DEFAULT '',
    "parent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tagsToNote" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL DEFAULT 0,
    "tagId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tagsToNote_pkey" PRIMARY KEY ("noteId","tagId")
);

-- CreateTable
CREATE TABLE "scheduledTask" (
    "name" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "lastRun" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSuccess" BOOLEAN NOT NULL DEFAULT true,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "output" JSON,

    CONSTRAINT "scheduledTask_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagsToNote" ADD CONSTRAINT "tagsToNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagsToNote" ADD CONSTRAINT "tagsToNote_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
