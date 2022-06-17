-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT NOT NULL,
    "noteClient" TEXT,
    "signature" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "payments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
