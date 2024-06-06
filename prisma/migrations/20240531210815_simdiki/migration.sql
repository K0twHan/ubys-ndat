/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'LECTURER', 'ADVISOR', 'MANAGER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "tc" CHAR(11) NOT NULL,
    "parola" TEXT NOT NULL,
    "gano" DECIMAL(65,30) NOT NULL,
    "akts" INTEGER NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lectures" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "kredi" INTEGER NOT NULL,
    "akts" INTEGER NOT NULL,
    "donem" INTEGER NOT NULL,
    "lecturerId" INTEGER NOT NULL,

    CONSTRAINT "Lectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentLecture" (
    "studentId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,

    CONSTRAINT "StudentLecture_pkey" PRIMARY KEY ("studentId","lectureId")
);

-- CreateTable
CREATE TABLE "Notes" (
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "not1" DECIMAL(65,30) NOT NULL,
    "not2" DECIMAL(65,30) NOT NULL,
    "proje" DECIMAL(65,30),

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "tc" CHAR(11) NOT NULL,
    "parola" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'MANAGER',

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "tc" CHAR(11) NOT NULL,
    "parola" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'LECTURER',

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advisor" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "tc" CHAR(11) NOT NULL,
    "parola" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'ADVISOR',

    CONSTRAINT "Advisor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_tc_key" ON "Students"("tc");

-- AddForeignKey
ALTER TABLE "Lectures" ADD CONSTRAINT "Lectures_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD CONSTRAINT "StudentLecture_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD CONSTRAINT "StudentLecture_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
