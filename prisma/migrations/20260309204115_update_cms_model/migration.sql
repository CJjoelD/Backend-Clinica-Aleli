/*
  Warnings:

  - You are about to drop the column `contenido` on the `CMS` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `CMS` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `CMS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CMS" DROP COLUMN "contenido",
DROP COLUMN "estado",
ADD COLUMN     "imagenUrl" TEXT,
ADD COLUMN     "tipo" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valor" TEXT NOT NULL;
