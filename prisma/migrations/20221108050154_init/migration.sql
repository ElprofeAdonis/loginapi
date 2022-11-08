-- CreateTable
CREATE TABLE "profesor" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" SERIAL NOT NULL,
    "namecurso" TEXT NOT NULL,
    "codigocurso" TEXT NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profesor_email_key" ON "profesor"("email");

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
