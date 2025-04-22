"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarTweet = criarTweet;
exports.obterTweetPorId = obterTweetPorId;
exports.atualizarTweet = atualizarTweet;
exports.deletarTweet = deletarTweet;
exports.obterTodosTweets = obterTodosTweets;
exports.criarReply = criarReply;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
// // Função para criar um novo tweet
// async function criarTweet(dados: Omit<Prisma.TweetCreateInput, 'id'>): Promise<Tweet> {
//   const novoTweet = await prisma.tweet.create({ // Use "prisma" aqui
//     data: dados,
//   });
//   return novoTweet;
// }
// Função para criar um tweet
async function criarTweet(dados) {
    const novoTweet = await prisma.tweet.create({
        data: dados,
    });
    return novoTweet;
}
// Função para criar um reply vinculado a um tweet
async function criarReply(descricao, usuarioId, parentId) {
    const novoReply = await prisma.tweet.create({
        data: {
            descricao,
            tipo: 'reply', // Define o tipo como "reply"
            usuario: { connect: { id: usuarioId } },
            parent: { connect: { id: parentId } }, // Vincula ao tweet original
        },
    });
    return novoReply;
}
// Função para obter um tweet pelo ID
async function obterTweetPorId(id) {
    const tweet = await prisma.tweet.findUnique({
        where: { id },
        include: {
            usuario: true, // Inclui os dados do usuário que criou o tweet
            likes: true, // Inclui os likes do tweet
            replies: true, // Inclui as respostas ao tweet
            parent: true
        },
    });
    return tweet;
}
// Função para atualizar um tweet
async function atualizarTweet(id, dados) {
    const tweetAtualizado = await prisma.tweet.update({
        where: { id },
        data: dados,
    });
    return tweetAtualizado;
}
// Função para deletar um tweet
async function deletarTweet(id) {
    await prisma.tweet.delete({
        where: { id },
    });
}
// Função para obter todos os tweets
async function obterTodosTweets() {
    const tweets = await prisma.tweet.findMany({
        include: {
            usuario: true,
            likes: true,
            replies: true
        },
    });
    return tweets;
}
