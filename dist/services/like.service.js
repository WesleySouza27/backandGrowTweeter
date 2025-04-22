"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarLike = criarLike;
exports.obterLikePorId = obterLikePorId;
exports.deletarLike = deletarLike;
exports.verificarLikeUnico = verificarLikeUnico;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
// Função para criar um novo like
async function criarLike(dados) {
    const novoLike = await prisma.like.create({
        data: dados,
    });
    return novoLike;
}
// Função para obter um like pelo ID
async function obterLikePorId(id) {
    const like = await prisma.like.findUnique({
        where: { id },
    });
    return like;
}
// Função para deletar um like
async function deletarLike(id) {
    await prisma.like.delete({
        where: { id },
    });
}
// Função para verificar se um usuário já deu like em um tweet
async function verificarLikeUnico(usuarioId, tweetId) {
    const like = await prisma.like.findUnique({
        where: {
            usuarioId_tweetId: {
                usuarioId: usuarioId, // Use a variável usuarioId
                tweetId: tweetId, // Use a variável tweetId
            },
        },
    });
    return like;
}
