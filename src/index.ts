import { app } from './app';
import { prismaClient } from './database/prisma.client';
import { Usuario } from './generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario; // Adiciona a propriedade `usuario` ao tipo Request
    }
  }
}

const PORT = process.env.PORT || 3030;

async function startServer() {
  try {
    // Testa a conexão com o banco de dados
    await prismaClient.$connect();
    console.log('Conexão com o banco de dados estabelecida.');

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

startServer();