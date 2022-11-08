import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const nuevoprofesor = await prisma.profesor.create({
    data: {
      username: "adoview",
      email: "adoview@home.com",
      password: "123456",
    },
  });
  console.log("Nuevo profesro creado: ", nuevoprofesor);
  const allProfesores = await prisma.profesor.findMany();
  console.log("Todos los profesores: ");
  console.dir(allProfesores, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
