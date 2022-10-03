-- CreateTable
CREATE TABLE "clicker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clicks" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clicker_id_key" ON "clicker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clicker_userId_key" ON "clicker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_session_key" ON "users"("session");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
