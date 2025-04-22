import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuario.findMany();
  console.log(usuarios);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });