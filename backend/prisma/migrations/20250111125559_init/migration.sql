-- DropIndex
DROP INDEX "userDetails_password_key";

-- AlterTable
ALTER TABLE "userDetails" ADD CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "jobDetail" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,

    CONSTRAINT "jobDetail_pkey" PRIMARY KEY ("id")
);
