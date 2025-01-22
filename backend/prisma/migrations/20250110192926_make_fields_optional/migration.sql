/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "app_user" ADD COLUMN     "password" VARCHAR(100),
ADD COLUMN     "username" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "app_user_username_key" ON "app_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "app_user_password_key" ON "app_user"("password");
