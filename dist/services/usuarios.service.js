"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.findUserByEmail = findUserByEmail;
exports.comparePassword = comparePassword;
const prisma_client_1 = require("../database/prisma.client");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Função para criar um novo usuário
async function createUser(data) {
    const hashedPassword = await bcrypt_1.default.hash(data.senha, 10);
    const usuarioCriado = await prisma_client_1.prismaClient.usuario.create({
        data: {
            ...data,
            senha: hashedPassword,
            avatar: data.avatar || null, // Define o avatar como opcional
        },
    });
    return usuarioCriado;
}
// Função para obter um usuário pelo ID
async function getUserById(id) {
    const usuarioPorId = await prisma_client_1.prismaClient.usuario.findUnique({
        where: { id: id },
    });
    return usuarioPorId;
}
// Função para atualizar um usuário
async function updateUser(id, data) {
    const usuarioAtualizado = await prisma_client_1.prismaClient.usuario.update({
        where: { id },
        data: data,
    });
    return usuarioAtualizado;
}
// Função para deletar um usuário
async function deleteUser(id) {
    const usuarioDeletado = await prisma_client_1.prismaClient.usuario.delete({
        where: { id: id },
    });
    return usuarioDeletado;
}
// Função para encontrar usuário por email
async function findUserByEmail(email) {
    const user = await prisma_client_1.prismaClient.usuario.findUnique({
        where: { email: email },
    });
    return user;
}
// Função para comparar a senha do login
// async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
//   return compare(password, hashedPassword);
// }
async function comparePassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
        throw new Error('Senha ou hash não fornecidos');
    }
    return bcrypt_1.default.compare(password, hashedPassword);
}
