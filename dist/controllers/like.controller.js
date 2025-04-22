"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarLikeController = criarLikeController;
exports.obterLikePorIdController = obterLikePorIdController;
exports.deletarLikeController = deletarLikeController;
const like_service_1 = require("../services/like.service");
const api_response_1 = require("../utils/api-response");
// Controller para criar um novo like
async function criarLikeController(req, res, next) {
    try {
        const dados = {
            usuario: {
                connect: {
                    id: req.body.usuarioId,
                },
            },
            tweet: {
                connect: {
                    id: req.body.tweetId,
                },
            },
        };
        // Verifica se o usuário já deu like neste tweet
        const likeExistente = await (0, like_service_1.verificarLikeUnico)(req.body.usuarioId, req.body.tweetId);
        if (likeExistente) {
            api_response_1.ApiResponse.error(res, 'Você já curtiu este tweet', null, 400);
            return;
        }
        const novoLike = await (0, like_service_1.criarLike)(dados);
        api_response_1.ApiResponse.success(res, 'Like criado com sucesso', novoLike, 201);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para obter um like pelo ID
async function obterLikePorIdController(req, res, next) {
    try {
        const id = req.params.id;
        const like = await (0, like_service_1.obterLikePorId)(id);
        if (!like) {
            api_response_1.ApiResponse.error(res, 'Like não encontrado', null, 404);
            return;
        }
        api_response_1.ApiResponse.success(res, 'Like encontrado', like);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para deletar um like
async function deletarLikeController(req, res, next) {
    try {
        const id = req.params.id;
        await (0, like_service_1.deletarLike)(id);
        api_response_1.ApiResponse.success(res, 'Like deletado com sucesso');
    }
    catch (erro) {
        next(erro);
    }
}
