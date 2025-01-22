-- CreateTable
CREATE TABLE "userProfileDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "workingExperience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "operationRoomExp" BOOLEAN NOT NULL,
    "lastPosition" TEXT NOT NULL,
    "salaryExpectation" INTEGER NOT NULL,

    CONSTRAINT "userProfileDetails_pkey" PRIMARY KEY ("id")
);
