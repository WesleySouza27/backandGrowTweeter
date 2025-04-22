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

export default app;