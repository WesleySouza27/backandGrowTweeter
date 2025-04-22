"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarSeguidor = criarSeguidor;
exports.obterSeguidorPorId = obterSeguidorPorId;
exports.deletarSeguidor = deletarSeguidor;
exports.verificarSeSegue = verificarSeSegue;
exports.obterSeguidoresDoUsuario = obterSeguidoresDoUsuario;
exports.obterSeguindoDoUsuario = obterSeguindoDoUsuario;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
// Função para criar um novo seguidor (follow)
async function criarSeguidor(dados) {
    const novoSeguidor = await prisma.follower.create({
        data: dados,
    });
    return novoSeguidor;
}
// Função para obter um seguidor pelo ID
async function obterSeguidorPorId(id) {
    const seguidor = await prisma.follower.findUnique({
        where: { id },
    });
    return seguidor;
}
// Função para deletar um seguidor (unfollow)
async function deletarSeguidor(id) {
    try {
        await prisma.follower.delete({
            where: { id },
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error('Seguidor não encontrado');
        }
        throw error;
    }
}
// Função para verificar se um usuário segue outro
async function verificarSeSegue(followerId, followingId) {
    const seguidor = await prisma.follower.findUnique({
        where: {
            followerId_followingId: {
                followerId: followerId,
                followingId: followingId,
            },
        },
    });
    return seguidor;
}
// Função para obter os seguidores de um usuário
async function obterSeguidoresDoUsuario(usuarioId) {
    const seguidores = await prisma.follower.findMany({
        where: {
            followingId: usuarioId,
        },
        include: {
            follower: true, // Inclui os dados do seguidor
        },
    });
    return seguidores;
}
// Função para obter os usuários que um usuário segue
async function obterSeguindoDoUsuario(usuarioId) {
    const seguindo = await prisma.follower.findMany({
        where: {
            followerId: usuarioId,
        },
        include: {
            following: true, // Inclui os dados do usuário seguido
        },
    });
    return seguindo;
}
