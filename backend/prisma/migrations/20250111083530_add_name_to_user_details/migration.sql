/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `userDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userDetails" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "userDetails_password_key" ON "userDetails"("password");
