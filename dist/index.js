"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const prisma_client_1 = require("./database/prisma.client");
const PORT = process.env.PORT || 3030;
async function startServer() {
    try {
        // Testa a conexão com o banco de dados
        await prisma_client_1.prismaClient.$connect();
        console.log('Conexão com o banco de dados estabelecida.');
        // Inicia o servidor
        app_1.app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}
startServer();
