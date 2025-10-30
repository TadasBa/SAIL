-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Chatbot', 'Image', 'Video', 'Programming', 'Other');

-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('free', 'paid');

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "website" TEXT NOT NULL,
    "pricing" "Pricing" NOT NULL,
    "released" TIMESTAMP(3) NOT NULL,
    "company" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);
