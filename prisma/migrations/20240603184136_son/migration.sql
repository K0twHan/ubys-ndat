/*
  Warnings:

  - A unique constraint covering the columns `[tc]` on the table `Advisor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tc]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tc]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dersSaati` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bolum` to the `Lectures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saat` to the `Lectures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bolum` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donem` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "dersSaati" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lectures" ADD COLUMN     "bolum" TEXT NOT NULL,
ADD COLUMN     "saat" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "bolum" TEXT NOT NULL,
ADD COLUMN     "donem" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_tc_key" ON "Advisor"("tc");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_tc_key" ON "Lecturer"("tc");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_tc_key" ON "Manager"("tc");
