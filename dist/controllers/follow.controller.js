"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarSeguidorController = criarSeguidorController;
exports.obterSeguidorPorIdController = obterSeguidorPorIdController;
exports.deletarSeguidorController = deletarSeguidorController;
exports.obterSeguidoresDoUsuarioController = obterSeguidoresDoUsuarioController;
exports.obterSeguindoDoUsuarioController = obterSeguindoDoUsuarioController;
const follow_service_1 = require("../services/follow.service");
const api_response_1 = require("../utils/api-response");
// Controller para criar um novo seguidor (follow)
async function criarSeguidorController(req, res, next) {
    try {
        // Verifica se os IDs do seguidor e seguido foram fornecidos
        if (!req.body.followerId || !req.body.followingId) {
            api_response_1.ApiResponse.error(res, 'IDs do seguidor e seguido são obrigatórios', null, 400);
            return;
        }
        const dados = {
            follower: {
                connect: {
                    id: req.body.followerId,
                },
            },
            following: {
                connect: {
                    id: req.body.followingId,
                },
            },
        };
        // Verifica se o usuário já segue o outro
        const jaSegue = await (0, follow_service_1.verificarSeSegue)(req.body.followerId, req.body.followingId);
        if (jaSegue) {
            api_response_1.ApiResponse.error(res, 'Você já segue este usuário', null, 400);
            return;
        }
        const novoSeguidor = await (0, follow_service_1.criarSeguidor)(dados);
        api_response_1.ApiResponse.success(res, 'Seguidor criado com sucesso', novoSeguidor, 201);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para obter um seguidor pelo ID
async function obterSeguidorPorIdController(req, res, next) {
    try {
        const id = req.params.id;
        const seguidor = await (0, follow_service_1.obterSeguidorPorId)(id);
        if (!seguidor) {
            api_response_1.ApiResponse.error(res, 'Seguidor não encontrado', null, 404);
            return;
        }
        api_response_1.ApiResponse.success(res, 'Seguidor encontrado', seguidor);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para deletar um seguidor (unfollow)
async function deletarSeguidorController(req, res, next) {
    console.log("ID do seguidor a deletar:", req.params.id); // Adicione esta linha
    try {
        const id = req.params.id;
        await (0, follow_service_1.deletarSeguidor)(id);
        api_response_1.ApiResponse.success(res, 'Seguidor deletado com sucesso');
    }
    catch (erro) {
        if (erro.message === 'Seguidor não encontrado') {
            api_response_1.ApiResponse.error(res, 'Seguidor não encontrado', null, 404);
            return;
        }
        next(erro);
    }
}
// Controller para obter os seguidores de um usuário
async function obterSeguidoresDoUsuarioController(req, res, next) {
    try {
        const usuarioId = req.params.usuarioId;
        const seguidores = await (0, follow_service_1.obterSeguidoresDoUsuario)(usuarioId);
        api_response_1.ApiResponse.success(res, 'Seguidores encontrados', seguidores);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para obter os usuários que um usuário segue
async function obterSeguindoDoUsuarioController(req, res, next) {
    try {
        const usuarioId = req.params.usuarioId;
        const seguindo = await (0, follow_service_1.obterSeguindoDoUsuario)(usuarioId);
        api_response_1.ApiResponse.success(res, 'Seguindo encontrados', seguindo);
    }
    catch (erro) {
        next(erro);
    }
}
