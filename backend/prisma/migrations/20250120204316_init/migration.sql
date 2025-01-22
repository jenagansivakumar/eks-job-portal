/*
  Warnings:

  - You are about to drop the column `operationRoomExp` on the `userProfileDetails` table. All the data in the column will be lost.
  - Added the required column `hasOperationRoomExp` to the `userProfileDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userProfileDetails" DROP COLUMN "operationRoomExp",
ADD COLUMN     "hasOperationRoomExp" BOOLEAN NOT NULL,
ALTER COLUMN "lastPosition" DROP NOT NULL,
ALTER COLUMN "salaryExpectation" DROP NOT NULL;
