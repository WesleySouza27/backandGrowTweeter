import { prismaClient } from '../database/prisma.client';
import { Usuario } from '../generated/prisma/client';
import bcrypt, { hash, compare } from 'bcrypt';

// Função para criar um novo usuário
async function createUser(data: Pick<Usuario, 'nome' | 'email' | 'senha' | 'avatar'>): Promise<Usuario> {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  const usuarioCriado = await prismaClient.usuario.create({
    data: {
      ...data,
      senha: hashedPassword,
      avatar: data.avatar || null, // Define o avatar como opcional
    },
  });
  return usuarioCriado;
}

// Função para obter um usuário pelo ID
async function getUserById(id: string): Promise<Usuario | null> {
  const usuarioPorId = await prismaClient.usuario.findUnique({
    where: { id: id },
  });
  return usuarioPorId;
}

// Função para atualizar um usuário
async function updateUser(id: string, data: Partial<Omit<Usuario, 'id'>>): Promise<Usuario> {
  const usuarioAtualizado = await prismaClient.usuario.update({
    where: { id },
    data: data,
  });
  return usuarioAtualizado;
}

// Função para deletar um usuário
async function deleteUser(id: string): Promise<Usuario> {
  const usuarioDeletado = await prismaClient.usuario.delete({
    where: { id: id },
  });
  return usuarioDeletado
}

// Função para encontrar usuário por email
async function findUserByEmail(email: string): Promise<Usuario | null> {
  const user = await prismaClient.usuario.findUnique({
    where: { email: email },
  });
  return user;
}

// Função para comparar a senha do login
// async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
//   return compare(password, hashedPassword);
// }

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  if (!password || !hashedPassword) {
    throw new Error('Senha ou hash não fornecidos');
  }
  return bcrypt.compare(password, hashedPassword);
}

export { createUser, getUserById, updateUser, deleteUser, findUserByEmail, comparePassword };