"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const usuarios = await prisma.usuario.findMany();
    console.log(usuarios);
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
